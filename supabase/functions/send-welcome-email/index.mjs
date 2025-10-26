import { sendWelcomeEmail } from '../../../automation/sendWelcomeEmail.js';

export default async function handler(req, res) {
  const { record } = req.body;
  const { email, nombre } = record ?? {};

  const result = await sendWelcomeEmail({ email, name: nombre });
  if (result?.error) {
    return res.status(500).json({ error: result.error });
  }

  return res.status(200).json({ success: true });
}
