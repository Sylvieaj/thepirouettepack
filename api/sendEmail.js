// api/sendEmail.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { type, email, order } = req.body || {};

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    return res.status(500).json({ error: 'Email credentials not configured in environment variables.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  });

  try {
    if (type === 'signup') {
      await transporter.sendMail({
        from: user,
        to: user,
        subject: 'New member signup 🎉',
        text: `A new member signed up with email: ${email}`
      });
    } else if (type === 'order') {
      await transporter.sendMail({
        from: user,
        to: user,
        subject: 'New order received 🛍️',
        text: `New order from ${order.email || 'unknown'}:\n\nItems:\n${order.items.map(i=>`- ${i.name} x${i.quantity} ($${i.price})`).join('\n')}\n\nTotal: $${order.total}`
      });
    } else {
      await transporter.sendMail({
        from: user,
        to: user,
        subject: 'Notification',
        text: JSON.stringify(req.body)
      });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
