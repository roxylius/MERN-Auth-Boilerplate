/**
 * This function generate a html for reset password email
 * @param resetLink contains the password reset link
 * @param name contains the name of the user
 */
function generateResetPasswordEmail(resetLink, name) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Password Reset</title>
  </head>
  <body>
      <p>Hello ${name},</p>
      <p>You requested a password reset. Click the button below to set a new password:</p>
      <p>
        <a href="${resetLink}" class="button-30" style="background-color: #000; border: 1px solid #000; border-radius: 4px; color: #fff; cursor: pointer; display: inline-block; font-family: Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 20px; padding: 12px 40px; text-align: center; text-decoration: none; vertical-align: middle; white-space: nowrap;">Reset Password</a>
      </p>
      <p>If the button above doesn't work, use this link: <a href="${resetLink}" target="_blank">${resetLink}</a></p>
      <p>If you didn't request this, you can ignore this email.</p>
      <p>Thanks,<br>Your Company</p>
  </body>
  </html>
  `;
}

module.exports = { generateResetPasswordEmail };