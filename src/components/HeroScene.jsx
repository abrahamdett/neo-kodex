import { Canvas, useFrame } from '@react-three/fiber';
import { GradientTexture, Html } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';

function createNeuralNetworkData(count = 140) {
  const nodes = [];
  const connectionsSet = new Set();

  for (let i = 0; i < count; i += 1) {
    const base = new THREE.Vector3(
      THREE.MathUtils.randFloatSpread(2),
      THREE.MathUtils.randFloatSpread(2),
      THREE.MathUtils.randFloatSpread(2)
    ).normalize().multiplyScalar(THREE.MathUtils.lerp(1.8, 3.2, Math.random()));

    const axis = new THREE.Vector3(
      THREE.MathUtils.randFloatSpread(1),
      THREE.MathUtils.randFloatSpread(1),
      THREE.MathUtils.randFloatSpread(1)
    ).normalize();

    nodes.push({
      origin: base,
      axis,
      amplitude: 0.18 + Math.random() * 0.35,
      frequency: 0.4 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2
    });
  }

  nodes.forEach((node, index) => {
    const distances = nodes
      .map((candidate, candidateIndex) => ({
        index: candidateIndex,
        distance: node.origin.distanceTo(candidate.origin)
      }))
      .filter((entry) => entry.index !== index)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 4);

    distances.forEach(({ index: neighbourIndex }) => {
      const [min, max] = index < neighbourIndex ? [index, neighbourIndex] : [neighbourIndex, index];
      connectionsSet.add(`${min}-${max}`);
    });
  });

  const connections = Array.from(connectionsSet).map((key) => {
    const [from, to] = key.split('-').map(Number);
    return { from, to };
  });

  return { nodes, connections };
}

function NeuralNetwork({ accentColor, secondaryColor, reducedMotion }) {
  const groupRef = useRef();
  const pointsRef = useRef();
  const linesRef = useRef();
  const materialRef = useRef();

  const { nodes, connections } = useMemo(() => createNeuralNetworkData(150), []);
  const animatedPositions = useRef(nodes.map((node) => node.origin.clone()));

  const nodePositions = useMemo(() => new Float32Array(nodes.length * 3), [nodes.length]);
  const nodeColors = useMemo(() => {
    const colors = new Float32Array(nodes.length * 3);
    const colorA = new THREE.Color(accentColor);
    const colorB = new THREE.Color(secondaryColor);
    nodes.forEach((_, index) => {
      const mix = index / nodes.length;
      const tint = colorA.clone().lerp(colorB, mix * 0.75 + Math.random() * 0.1);
      tint.toArray(colors, index * 3);
    });
    return colors;
  }, [nodes.length, accentColor, secondaryColor]);

  const linePositions = useMemo(() => new Float32Array(connections.length * 6), [connections.length]);

  const lineColors = useMemo(() => {
    const colors = new Float32Array(connections.length * 6);
    const color = new THREE.Color(secondaryColor);
    connections.forEach((_, index) => {
      const intensity = 0.35 + (index % 5) * 0.05;
      const shaded = color.clone().multiplyScalar(intensity);
      shaded.toArray(colors, index * 6);
      shaded.toArray(colors, index * 6 + 3);
    });
    return colors;
  }, [connections.length, secondaryColor]);

  useFrame((state) => {
    const { clock, pointer } = state;
    const time = clock.elapsedTime;

    if (groupRef.current) {
      const rotationIntensity = reducedMotion ? 0.02 : 0.06;
      const lerpFactor = reducedMotion ? 0.02 : 0.06;
      const targetY = pointer.x * 0.45;
      const targetX = pointer.y * -0.25;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY + time * rotationIntensity, lerpFactor);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, lerpFactor);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, pointer.y * 0.5, 0.04);
    }

    nodes.forEach((node, index) => {
      const animated = animatedPositions.current[index];
      const wobble = reducedMotion ? 0 : Math.sin(time * node.frequency + node.phase) * node.amplitude;
      animated.copy(node.origin).addScaledVector(node.axis, wobble);
      const i3 = index * 3;
      nodePositions[i3] = animated.x;
      nodePositions[i3 + 1] = animated.y;
      nodePositions[i3 + 2] = animated.z;
    });

    connections.forEach((connection, index) => {
      const start = animatedPositions.current[connection.from];
      const end = animatedPositions.current[connection.to];
      const i6 = index * 6;
      linePositions[i6] = start.x;
      linePositions[i6 + 1] = start.y;
      linePositions[i6 + 2] = start.z;
      linePositions[i6 + 3] = end.x;
      linePositions[i6 + 4] = end.y;
      linePositions[i6 + 5] = end.z;
    });

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.array.set(nodePositions);
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (linesRef.current) {
      linesRef.current.geometry.attributes.position.array.set(linePositions);
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (materialRef.current && !reducedMotion) {
      materialRef.current.size = 0.085 + Math.sin(time * 0.8) * 0.015;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[nodeColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={materialRef}
          vertexColors
          size={0.09}
          sizeAttenuation
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.4} linewidth={0.001} />
      </lineSegments>
    </group>
  );
}

NeuralNetwork.propTypes = {
  accentColor: PropTypes.string.isRequired,
  secondaryColor: PropTypes.string.isRequired,
  reducedMotion: PropTypes.bool.isRequired
};

function FloatingDust({ color, reducedMotion }) {
  const pointsRef = useRef();
  const positions = useMemo(() => {
    const array = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i += 1) {
      const index = i * 3;
      array[index] = THREE.MathUtils.randFloatSpread(8);
      array[index + 1] = THREE.MathUtils.randFloatSpread(5);
      array[index + 2] = THREE.MathUtils.randFloatSpread(6);
    }
    return array;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || reducedMotion) return;
    pointsRef.current.rotation.y += 0.0008;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.04) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.02} transparent opacity={0.2} sizeAttenuation depthWrite={false} />
    </points>
  );
}

FloatingDust.propTypes = {
  color: PropTypes.string.isRequired,
  reducedMotion: PropTypes.bool.isRequired
};

function HeroScene({ accentColor, secondaryColor }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 8], fov: 48 }}
    >
      <color attach="background" args={["transparent"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 4, 6]} intensity={0.8} color={accentColor} />
      <directionalLight position={[-6, -3, -4]} intensity={0.5} color={secondaryColor} />
      <Suspense fallback={<Html center>cargando...</Html>}>
        <FloatingDust color={`${secondaryColor}99`} reducedMotion={prefersReducedMotion} />
        <NeuralNetwork
          accentColor={accentColor}
          secondaryColor={secondaryColor}
          reducedMotion={prefersReducedMotion}
        />
      </Suspense>
      <mesh position={[0, -3, -4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 18]} />
        <meshBasicMaterial transparent>
          <GradientTexture
            stops={[0, 0.7, 1]}
            colors={[`${accentColor}1A`, `${secondaryColor}0F`, '#00000000']}
            size={512}
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
