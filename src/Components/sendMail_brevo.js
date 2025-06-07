import config from "../config.js";

async function sendMail_brevo(
  tableName,
  htmlContent,
  subject,
  email,
  serviceName
) {
  const body = {
    sender: {
      name: tableName ?? serviceName,
      email: config.senderEmail,
    },
    to: [
      {
        name: email,
        email: email,
      },
    ],
    subject: subject,
    htmlContent: htmlContent,
  };
  const headers = {
    Accept: "application/json",
    "api-key": config.sibKey,
    "Content-Types": "application/json",
  };
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    body: JSON.stringify(body),
    headers: headers,
    method: "POST",
  });
  if (!res.ok) {
    console.log("email not sent", res, JSON.stringify(body));
  }
}

export default sendMail_brevo;
