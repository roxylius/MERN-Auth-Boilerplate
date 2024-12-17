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
      <style>
          .button-30 {
              align-items: center;
              appearance: none;
              background-color: #FCFCFD;
              border-radius: 4px;
              border-width: 0;
              box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
              box-sizing: border-box;
              color: #36395A;
              cursor: pointer;
              display: inline-flex;
              font-family: "JetBrains Mono", monospace;
              height: 48px;
              justify-content: center;
              line-height: 1;
              list-style: none;
              overflow: hidden;
              padding-left: 16px;
              padding-right: 16px;
              position: relative;
              text-align: left;
              text-decoration: none;
              transition: box-shadow .15s, transform .15s;
              user-select: none;
              -webkit-user-select: none;
              touch-action: manipulation;
              white-space: nowrap;
              will-change: box-shadow, transform;
              font-size: 16px;
          }
          .button-30:focus {
              box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
          }
          .button-30:hover {
              box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset; transform: translateY(-2px);
          }
          .button-30:active {
              box-shadow: #D6D6E7 0 3px 7px inset;
              transform: translateY(2px);
          }
      </style>
  </head>
  <body>
      <p>Hello ${name},</p>
      <p>You requested a password reset. Click the button below to set a new password:</p>
      <p>
          <a class="button-30" href="${resetLink}" target="_blank">Reset Password</a>
      </p>
      <p>If the button above doesn't work, use this link: <a href="${resetLink}" target="_blank">${resetLink}</a></p>
      <p>If you didn't request this, you can ignore this email.</p>
      <p>Thanks,<br>Your Company</p>
  </body>
  </html>
  `;
}

module.exports = { generateResetPasswordEmail };