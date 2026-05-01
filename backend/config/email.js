// config/email.js
// Uses Gmail SMTP. For production, consider SendGrid or Resend for better deliverability.
// Gmail setup: Google Account → Security → App Passwords → generate one for "Mail"

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,  // App Password, NOT your Gmail password
  },
});

/**
 * Send notification email to admin when a new order arrives
 */
async function sendOrderNotification(order) {
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#18181b;color:#fff;padding:32px;border-radius:8px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px">
        <div style="background:#dc2626;color:#fff;font-weight:900;font-size:16px;padding:8px 12px;border-radius:4px">JS</div>
        <h2 style="margin:0;color:#fff">New Project Request</h2>
      </div>
      <table style="width:100%;border-collapse:collapse">
        ${[
          ['Name', order.name],
          ['Email', order.email],
          ['Phone', order.phone || '—'],
          ['Department', order.department],
          ['Domain', order.domain],
          ['Deadline', order.deadline],
        ].map(([k, v]) => `
          <tr>
            <td style="padding:8px 12px;background:#27272a;color:#a1a1aa;font-size:13px;width:120px">${k}</td>
            <td style="padding:8px 12px;background:#3f3f46;color:#fff;font-size:13px">${v}</td>
          </tr>
        `).join('')}
      </table>
      <div style="margin-top:16px;padding:16px;background:#27272a;border-radius:4px">
        <p style="margin:0 0 8px;color:#a1a1aa;font-size:12px;text-transform:uppercase;letter-spacing:1px">Description</p>
        <p style="margin:0;color:#fff;font-size:14px;line-height:1.6">${order.description}</p>
      </div>
      <a href="${process.env.FRONTEND_URL}/admin" 
         style="display:inline-block;margin-top:24px;padding:12px 24px;background:#dc2626;color:#fff;text-decoration:none;font-weight:700;border-radius:4px;font-size:14px">
        View in Admin Dashboard →
      </a>
    </div>
  `;

  await transporter.sendMail({
    from: `"JS Systems" <${process.env.GMAIL_USER}>`,
    to: process.env.NOTIFICATION_EMAIL,
    subject: `🔔 New Order: ${order.domain} — ${order.name}`,
    html,
  });
}

/**
 * Send confirmation email to client after order submission
 */
async function sendOrderConfirmation(order) {
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#18181b;color:#fff;padding:32px;border-radius:8px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px">
        <div style="background:#dc2626;color:#fff;font-weight:900;font-size:16px;padding:8px 12px;border-radius:4px">JS</div>
        <h2 style="margin:0;color:#fff">We Got Your Request!</h2>
      </div>
      <p style="color:#a1a1aa;line-height:1.7">Hi <strong style="color:#fff">${order.name}</strong>, thanks for reaching out to JS Systems. We've received your project request and will get back to you within <strong style="color:#ef4444">24 hours</strong>.</p>
      <div style="margin:24px 0;padding:16px;background:#27272a;border-left:3px solid #dc2626">
        <p style="margin:0 0 4px;color:#a1a1aa;font-size:12px">Your project domain</p>
        <p style="margin:0;color:#fff;font-weight:600">${order.domain}</p>
      </div>
      <p style="color:#a1a1aa;font-size:13px">Questions? Reply to this email or WhatsApp us directly.</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"JS Systems" <${process.env.GMAIL_USER}>`,
    to: order.email,
    subject: `✅ JS Systems — Project Request Received`,
    html,
  });
}

module.exports = { sendOrderNotification, sendOrderConfirmation };
