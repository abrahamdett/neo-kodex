import { Canvas, useFrame } from '@react-three/fiber';
import { Float, GradientTexture, Html } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';
import PropTypes from 'prop-types';

function AnimatedIcosahedron({ color }) {
  const mesh = useRef();
  useFrame((state) => {
    if (!mesh.current) return;
    const { clock, pointer } = state;
    mesh.current.rotation.y = clock.elapsedTime * 0.25 + pointer.x * 0.6;
    mesh.current.rotation.x = clock.elapsedTime * 0.18 + pointer.y * 0.4;
  });

  return (
    <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.1}>
      <mesh ref={mesh} castShadow position={[0, 0.6, 0]}>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshStandardMaterial color={color} metalness={0.55} roughness={0.28} />
      </mesh>
    </Float>
  );
}

AnimatedIcosahedron.propTypes = {
  color: PropTypes.string.isRequired
};

function RibbonTorus({ color }) {
  const mesh = useRef();
  useFrame((state) => {
    if (!mesh.current) return;
    const { clock } = state;
    mesh.current.rotation.y = clock.elapsedTime * 0.35;
    mesh.current.rotation.z = Math.sin(clock.elapsedTime * 0.4) * 0.5;
  });

  return (
    <Float speed={2.2} rotationIntensity={1} floatIntensity={1.2}>
      <mesh ref={mesh} position={[-2.4, -1, -0.2]}>
        <torusKnotGeometry args={[0.75, 0.24, 220, 16]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.1} />
      </mesh>
    </Float>
  );
}

RibbonTorus.propTypes = {
  color: PropTypes.string.isRequired
};

function EnergyOrb({ accent, secondary }) {
  const shader = useRef();
  useFrame((state) => {
    if (shader.current) {
      shader.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColorA: { value: new THREE.Color(accent) },
    uColorB: { value: new THREE.Color(secondary) }
  }), [accent, secondary]);

  return (
    <Float speed={1.6} rotationIntensity={0.8} floatIntensity={0.9}>
      <mesh position={[2.6, 0.8, -0.6]}>
        <sphereGeometry args={[0.9, 64, 64]} />
        <shaderMaterial
          ref={shader}
          uniforms={uniforms}
          vertexShader={`
            uniform float uTime;
            varying vec2 vUv;
            void main() {
              vUv = uv;
              vec3 pos = position + normal * 0.08 * sin(uv.y * 16.0 + uv.x * 12.0 + uTime * 1.6);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `}
          fragmentShader={`
            uniform vec3 uColorA;
            uniform vec3 uColorB;
            varying vec2 vUv;
            void main() {
              float intensity = smoothstep(0.1, 1.0, length(vUv - 0.5));
              vec3 color = mix(uColorA, uColorB, intensity);
              gl_FragColor = vec4(color, 0.82);
            }
          `}
          transparent
        />
      </mesh>
    </Float>
  );
}

EnergyOrb.propTypes = {
  accent: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired
};

function AuroraParticles({ color }) {
  const points = useMemo(() => {
    const particles = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i += 1) {
      const i3 = i * 3;
      particles[i3] = (Math.random() - 0.5) * 10;
      particles[i3 + 1] = (Math.random() - 0.5) * 6;
      particles[i3 + 2] = (Math.random() - 0.5) * 8;
    }
    return particles;
  }, []);

  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={ref} rotation={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={points} count={points.length / 3} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.05} transparent opacity={0.45} sizeAttenuation depthWrite={false} />
    </points>
  );
}

AuroraParticles.propTypes = {
  color: PropTypes.string.isRequired
};

function HeroScene({ accentColor, secondaryColor }) {
  return (
    <Canvas shadows dpr={[1, 1.5]} gl={{ alpha: true }} camera={{ position: [0, 0, 6], fov: 50 }}>
      <ambientLight intensity={0.65} />
      <directionalLight position={[5, 5, 5]} intensity={1.1} />
      <directionalLight position={[-6, -4, -6]} intensity={0.7} color={secondaryColor} />
      <Suspense fallback={<Html center>cargando...</Html>}>
        <AuroraParticles color={secondaryColor} />
        <AnimatedIcosahedron color={accentColor} />
        <RibbonTorus color={secondaryColor} />
        <EnergyOrb accent={accentColor} secondary={secondaryColor} />
      </Suspense>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
      <mesh position={[0, -1.75, -2]} rotation={[-Math.PI / 2, 0, 0]}> 
        <planeGeometry args={[12, 12]} />
        <meshBasicMaterial>
          <GradientTexture
            stops={[0, 0.8, 1]}
            colors={[`${accentColor}11`, `${accentColor}0A`, '#00000000']}
            size={1024}
          />
        </meshBasicMaterial>
      </mesh>
    </Canvas>
  );
}

HeroScene.propTypes = {
  accentColor: PropTypes.string.isRequired,
  secondaryColor: PropTypes.string.isRequired
};

export default HeroScene;
