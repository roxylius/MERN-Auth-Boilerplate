/**
 * This function generates the HTML for the reset password form.
 * @param {string} resetToken - The reset token to be included in the form action URL.
 * @returns {string} - The HTML string for the reset password form.
 */
function generateResetForm(resetToken) {
  return `
  <!doctype html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Reset Password</title>
      <style>
          @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

          * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              font-family: 'Quicksand', sans-serif;
          }

          body {
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background: #000;
          }

          section {
              position: absolute;
              width: 100vw;
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 2px;
              flex-wrap: wrap;
              overflow: hidden;
          }

          section .reset-pass {
              position: absolute;
              width: 400px;
              background: #222;
              z-index: 1000;
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 40px;
              border-radius: 4px;
              box-shadow: 0 15px 35px rgba(0, 0, 0, 9);
          }

          section .reset-pass .content {
              position: relative;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              gap: 40px;
          }

          section .reset-pass .content h2 {
              font-size: 2em;
              color: #0f0;
              text-transform: uppercase;
          }

          section .reset-pass .content .form {
              width: 100%;
              display: flex;
              flex-direction: column;
              gap: 25px;
          }

          section .reset-pass .content .form .inputBox {
              position: relative;
              width: 100%;
          }

          section .reset-pass .content .form .inputBox input {
              position: relative;
              width: 100%;
              background: #333;
              border: none;
              outline: none;
              padding: 25px 10px 7.5px;
              border-radius: 4px;
              color: #fff;
              font-weight: 500;
              font-size: 1em;
          }

          section .reset-pass .content .form .inputBox i {
              position: absolute;
              left: 0;
              padding: 15px 10px;
              font-style: normal;
              color: #aaa;
              transition: 0.5s;
              pointer-events: none;
          }

          .reset-pass .content .form .inputBox input:focus~i,
          .reset-pass .content .form .inputBox input:valid~i {
              transform: translateY(-7.5px);
              font-size: 0.8em;
              color: #fff;
          }

          .reset-pass .content .form .inputBox input[type="submit"] {
              padding: 10px;
              background: #0f0;
              color: #000;
              font-weight: 600;
              font-size: 1.35em;
              letter-spacing: 0.05em;
              cursor: pointer;
          }

          input[type="submit"]:active {
              opacity: 0.6;
          }
      </style>
  </head>

  <body>
      <section>
          <div class="reset-pass">
              <div class="content">
                  <h2>Reset Password</h2>
                  <div class="form">
                      <form action="/api/reset/${resetToken}" method="POST">
                          <div class="inputBox">
                              <input type="password" name="password" required> <i>Password</i>
                          </div>
                          <div class="inputBox">
                              <input type="password" name="confirmPassword" required> <i>Confirm Password</i>
                          </div>
                          <div class="inputBox">
                              <input type="submit" value="Reset">
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </section>
  </body>

  </html>
  `;
}

module.exports = { generateResetForm };