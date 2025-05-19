export const welcomeEmailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Welcome to Job Lix</title>
  <style>
    @media only screen and (max-width: 620px) {
      .container {
        width: 100% !important;
        padding: 0 15px !important;
      }
      .job-card {
        width: 100% !important;
        display: block !important;
      }
      .banner img {
        width: 100% !important;
        height: auto !important;
      }
      h1 {
        font-size: 24px !important;
      }
      h2 {
        font-size: 20px !important;
      }
      p {
        font-size: 15px !important;
      }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:hsl(220, 20%, 96%); font-family: Arial, sans-serif;">
  <table align="center" cellpadding="0" cellspacing="0" width="100%" style="background:hsl(220, 20%, 96%);">
    <tr>
      <td>
        <table class="container" align="center" cellpadding="0" cellspacing="0" style="max-width:650px; margin:30px auto; background:hsl(220, 20%, 96%); border-radius:12px; overflow:hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06);">
          <tr>
            <td style="background-color:hsl(0, 0%, 16%); padding:30px 20px; text-align:center;">
              <h1 style="color:hsl(0, 0%, 98%); margin:0;">Welcome to <span style="color:hsl(239, 100%, 71%)">Job Lix</span></h1>
              <p style="color:hsl(240, 3.8%, 46.1%); font-size:15px;">Connecting you with opportunities that matter.</p>
            </td>
          </tr>
          <tr>
            <td class="banner" style="padding-top:20px;">
              <img src="./jobs.avif" alt="Banner" style="width:100%; display:block;">
            </td>
          </tr>
          <tr>
            <td style="padding:25px;">
              <h2 style="color:hsl(240, 10%, 3.9%); margin-top:0;">Hi Job Seeker 👋,</h2>
              <p style="color:hsl(240, 3.8%, 46.1%);">We’re thrilled to have you onboard. At <strong style="color:hsl(239, 100%, 71%)">Job Lix</strong>, we connect talented professionals like you with top job opportunities. Discover exciting roles across multiple industries and find the perfect match for your skills.</p>
              <p style="color:hsl(240, 3.8%, 46.1%);"><strong>Explore different jobs below and start applying today!</strong></p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 20px 20px 20px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="job-card" width="50%" style="padding:10px;">
                    <div style="border:1px solid hsl(240, 5.9%, 90%); border-radius:10px; padding:15px; background-color:hsl(0, 0%, 100%); box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
                      <h4 style="margin:0; color:hsl(0, 0%, 12%);">UI/UX Designer</h4>
                      <p style="margin:5px 0; color:hsl(240, 5%, 64.9%);">🏢 Bright Studios</p>
                      <p style="margin:0; color:hsl(240, 3.8%, 46.1%);">🌍 Remote | 💰 $50k</p>
                    </div>
                  </td>
                  <td class="job-card" width="50%" style="padding:10px;">
                    <div style="border:1px solid hsl(240, 5.9%, 90%); border-radius:10px; padding:15px; background-color:hsl(0, 0%, 100%); box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
                      <h4 style="margin:0; color:hsl(0, 0%, 12%);">React Developer</h4>
                      <p style="margin:5px 0; color:hsl(240, 5%, 64.9%);">🏢 CodeCrafters</p>
                      <p style="margin:0; color:hsl(240, 3.8%, 46.1%);">📍 London | 💰 $65k</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="job-card" width="50%" style="padding:10px;">
                    <div style="border:1px solid hsl(240, 5.9%, 90%); border-radius:10px; padding:15px; background-color:hsl(0, 0%, 100%); box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
                      <h4 style="margin:0; color:hsl(0, 0%, 12%);">DevOps Engineer</h4>
                      <p style="margin:5px 0; color:hsl(240, 5%, 64.9%);">🏢 CloudNinjas</p>
                      <p style="margin:0; color:hsl(240, 3.8%, 46.1%);">📍 USA | 💰 $85k</p>
                    </div>
                  </td>
                  <td class="job-card" width="50%" style="padding:10px;">
                    <div style="border:1px solid hsl(240, 5.9%, 90%); border-radius:10px; padding:15px; background-color:hsl(0, 0%, 100%); box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
                      <h4 style="margin:0; color:hsl(0, 0%, 12%);">QA Analyst</h4>
                      <p style="margin:5px 0; color:hsl(240, 5%, 64.9%);">🏢 Testify Tech</p>
                      <p style="margin:0; color:hsl(240, 3.8%, 46.1%);">🌍 Remote | 💰 $40k</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="job-card" width="50%" style="padding:10px;">
                    <div style="border:1px solid hsl(240, 5.9%, 90%); border-radius:10px; padding:15px; background-color:hsl(0, 0%, 100%); box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
                      <h4 style="margin:0; color:hsl(0, 0%, 12%);">Data Analyst</h4>
                      <p style="margin:5px 0; color:hsl(240, 5%, 64.9%);">🏢 DataTech</p>
                      <p style="margin:0; color:hsl(240, 3.8%, 46.1%);">📍 Toronto | 💰 $58k</p>
                    </div>
                  </td>
                  <td class="job-card" width="50%" style="padding:10px;">
                    <div style="border:1px solid hsl(240, 5.9%, 90%); border-radius:10px; padding:15px; background-color:hsl(0, 0%, 100%); box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
                      <h4 style="margin:0; color:hsl(0, 0%, 12%);">Full Stack Engineer</h4>
                      <p style="margin:5px 0; color:hsl(240, 5%, 64.9%);">🏢 InnovateX</p>
                      <p style="margin:0; color:hsl(240, 3.8%, 46.1%);">🌍 Remote | 💰 $90k</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="job-card" width="50%" style="padding:10px;">
                    <div style="border:1px solid hsl(240, 5.9%, 90%); border-radius:10px; padding:15px; background-color:hsl(0, 0%, 100%); box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
                      <h4 style="margin:0; color:hsl(0, 0%, 12%);">Marketing Specialist</h4>
                      <p style="margin:5px 0; color:hsl(240, 5%, 64.9%);">🏢 Brandverse</p>
                      <p style="margin:0; color:hsl(240, 3.8%, 46.1%);">📍 Dubai | 💰 $55k</p>
                    </div>
                  </td>
                  <td class="job-card" width="50%" style="padding:10px;">
                    <div style="border:1px solid hsl(240, 5.9%, 90%); border-radius:10px; padding:15px; background-color:hsl(0, 0%, 100%); box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
                      <h4 style="margin:0; color:hsl(0, 0%, 12%);">Product Manager</h4>
                      <p style="margin:5px 0; color:hsl(240, 5%, 64.9%);">🏢 Roadmap Inc.</p>
                      <p style="margin:0; color:hsl(240, 3.8%, 46.1%);">📍 Berlin | 💰 $95k</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="text-align:center; padding:20px;">
              <a href="#" style="background:hsl(239, 100%, 71%); color:hsl(0, 0%, 98%); text-decoration:none; padding:12px 30px; border-radius:6px; display:inline-block; font-weight:bold;">Explore All Jobs</a>
            </td>
          </tr>
          <tr>
            <td style="background-color:hsl(0, 0%, 16%); color:hsl(240, 3.8%, 46.1%); padding:25px; text-align:center;">
              <p style="margin:0;">© 2025 Job Lix. All rights reserved.</p>
              <p style="margin:8px 0;">
                <a href="#" style="color:hsl(239, 100%, 71%); text-decoration:none;">Privacy Policy</a> |
                <a href="#" style="color:hsl(239, 100%, 71%); text-decoration:none;">Terms of Service</a> |
                <a href="#" style="color:hsl(239, 100%, 71%); text-decoration:none;">Unsubscribe</a>
              </p>
              <p style="margin:0; font-size:12px;">123 Job Street, Career City, Workland</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

export const verificationEmailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Your Job Lix OTP Code</title>
  <style>
    @media only screen and (max-width: 620px) {
      .container {
        width: 100% !important;
        padding: 20px !important;
      }
      h1 {
        font-size: 24px !important;
      }
      p, .otp-code {
        font-size: 18px !important;
      }
    }
  </style>
</head>
<body style="margin:0; padding:0; background:hsl(220, 20%, 96%); font-family:Arial, sans-serif;">
  <table align="center" cellpadding="0" cellspacing="0" width="100%" style="background:hsl(220, 20%, 96%);">
    <tr>
      <td>
        <table class="container" align="center" cellpadding="0" cellspacing="0" style="max-width:600px; margin:40px auto; background:hsl(0, 0%, 100%); border-radius:10px; overflow:hidden; box-shadow:0 0 10px rgba(0, 0, 0, 0.05);">
          <tr>
            <td style="background-color:hsl(0, 0%, 16%); padding:30px; text-align:center;">
              <h1 style="color:hsl(0, 0%, 98%); margin:0;">Verify Your Account</h1>
              <p style="color:hsl(240, 5%, 64.9%); margin:8px 0 0;">Your One-Time Password (OTP) is below</p>
            </td>
          </tr>
          <tr>
            <td style="padding:30px; text-align:center;">
              <p style="font-size:17px; color:hsl(240, 10%, 3.9%);">Hello 👋,</p>
              <p style="font-size:16px; color:hsl(240, 3.8%, 46.1%);">
                To complete your sign-up with <strong style="color:hsl(239, 100%, 71%)">Job Lix</strong>, please use the OTP code below. This code is valid for the next 10 minutes:
              </p>
              <div class="otp-code" style="margin:30px auto; background:hsl(210, 100%, 97%); padding:18px 32px; display:inline-block; font-size:26px; letter-spacing:8px; font-weight:bold; color:hsl(0, 0%, 16%); border:2px dashed hsl(239, 100%, 71%); border-radius:10px;">
                {otp}
              </div>
              <p style="font-size:14px; color:hsl(240, 5%, 64.9%); margin-top:20px;">
                If you didn’t request this, you can safely ignore this email.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color:hsl(0, 0%, 16%); color:hsl(240, 5%, 64.9%); padding:25px; text-align:center;">
              <p style="margin:0;">© 2025 Job Lix. All rights reserved.</p>
              <p style="margin:8px 0;">
                <a href="#" style="color:hsl(239, 100%, 71%); text-decoration:none;">Privacy Policy</a> |
                <a href="#" style="color:hsl(239, 100%, 71%); text-decoration:none;">Terms of Service</a> |
                <a href="#" style="color:hsl(239, 100%, 71%); text-decoration:none;">Unsubscribe</a>
              </p>
              <p style="margin:0; font-size:12px;">123 Job Street, Career City, Workland</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>

`;

export const forgotPasswordEmailTemplate = `
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Reset Your Job Lix Password</title>
  <style>
    @media only screen and (max-width: 620px) {
      .container {
        width: 100% !important;
        padding: 20px !important;
      }
      h1 {
        font-size: 24px !important;
      }
      p, a.button {
        font-size: 18px !important;
      }
    }
  </style>
</head>
<body style="margin:0; padding:0; background:hsl(220, 20%, 96%); font-family: Arial, sans-serif;">

  <table align="center" cellpadding="0" cellspacing="0" width="100%" style="background:hsl(220, 20%, 96%);">
    <tr>
      <td>
        <table class="container" align="center" cellpadding="0" cellspacing="0" style="max-width:600px; margin:40px auto; background:hsl(0, 0%, 100%); border-radius:10px; overflow:hidden; box-shadow:0 0 10px rgba(0,0,0,0.05);">
          <tr>
            <td style="background-color:hsl(0, 0%, 16%); padding:30px; text-align:center;">
              <h1 style="color:hsl(0, 0%, 98%); margin:0;">Reset Your Password</h1>
              <p style="color:hsl(240, 5%, 64.9%); margin:8px 0 0;">We received a request to reset your password</p>
            </td>
          </tr>
          <tr>
            <td style="padding:30px; text-align:center;">
              <p style="font-size:16px; color:hsl(240, 10%, 3.9%);">Hi there 👋,</p>
              <p style="font-size:16px; color:hsl(240, 3.8%, 46.1%);">
                If you requested a password reset for your <strong style="color:hsl(239, 100%, 71%)">Job Lix</strong> account, click the button below to set a new password:
              </p>
              <a href={link}
                 class="button"
                 style="display:inline-block; margin:25px 0; padding:12px 28px; background-color:hsl(239, 100%, 71%); color:#ffffff; text-decoration:none; font-weight:bold; border-radius:6px; font-size:16px;">
                Reset Password
              </a>
              <p style="font-size:14px; color:hsl(240, 5%, 64.9%);">
                This link is valid for 30 minutes. If you didn’t request this, please ignore this email.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color:hsl(0, 0%, 16%); color:hsl(240, 5%, 64.9%); padding:25px; text-align:center;">
              <p style="margin:0;">© 2025 Job Lix. All rights reserved.</p>
              <p style="margin:8px 0;">
                <a href="#" style="color:hsl(239, 100%, 71%); text-decoration:none;">Privacy Policy</a> |
                <a href="#" style="color:hsl(239, 100%, 71%); text-decoration:none;">Terms of Service</a> |
                <a href="#" style="color:hsl(239, 100%, 71%); text-decoration:none;">Unsubscribe</a>
              </p>
              <p style="margin:0; font-size:12px;">123 Job Street, Career City, Workland</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>

`;
