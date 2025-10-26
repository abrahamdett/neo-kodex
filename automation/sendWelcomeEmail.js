// Ejemplo de función serverless para enviar un correo de bienvenida cuando se registre un nuevo lead.
// Este archivo puede ejecutarse en un entorno Node 18+ (Vercel Functions, Supabase Edge Functions o NestJS).

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.WELCOME_FROM_EMAIL ?? 'hola@neo-kodex.com';

export async function sendWelcomeEmail({ email, name }) {
  if (!RESEND_API_KEY) {
    console.warn('Configura la variable RESEND_API_KEY para activar el correo transaccional.');
    return { error: 'Falta configurar la API key' };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: `NEO-KODEX <${FROM_EMAIL}>`,
      to: [email],
      subject: '¡Gracias por confiar en NEO-KODEX!',
      html: `
        <main style="font-family: 'Inter', system-ui, sans-serif; background:#070b18; color:#f8fbff; padding:32px;">
          <section style="max-width:560px; margin:0 auto; background:rgba(15,23,42,0.9); border-radius:18px; padding:32px;">
            <h1 style="margin-top:0; font-size:28px;">Hola ${name ?? 'equipo'} 👋</h1>
            <p style="line-height:1.7;">Recibimos tu mensaje y en menos de 12 horas hábiles agendaremos una videollamada para revisar tu reto.</p>
            <p style="line-height:1.7;">Mientras tanto, puedes descargar nuestra guía de descubrimiento y preparar preguntas clave.</p>
            <a href="https://neo-kodex.com/guia-descubrimiento" style="display:inline-block; padding:12px 20px; border-radius:999px; background:linear-gradient(135deg,#7f5af0,#00d1ff); color:#fff; text-decoration:none;">Descargar guía de descubrimiento</a>
            <p style="margin-top:32px; font-size:14px; opacity:0.75;">Si este correo no era para ti, ignóralo. Cuidamos tus datos con cifrado TLS y cumplimos con GDPR y la Ley Federal de Protección de Datos.</p>
          </section>
        </main>
      `
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error enviando correo' }));
    return { error: error.message };
  }

  return { success: true };
}

export default sendWelcomeEmail;
