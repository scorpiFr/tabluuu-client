import config from "../config.js";

async function sendMail_brevo(barid, tableName, price, htmlContent, email) {
  const formData = new FormData();
  formData.append("barid", barid);
  formData.append("table", tableName);
  formData.append("price", price);
  formData.append("receiverEmail", email);
  formData.append("htmlContent", htmlContent);

  try {
    const response = await fetch(`${config.tabluuu_server}/sendmail`, {
      method: "POST",
      body: formData,
      // Pas besoin de préciser 'Content-Type', FormData le gère tout seul (multipart/form-data)
    });

    if (!response.ok) throw new Error("Erreur réseau");
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error);
  }
}

export default sendMail_brevo;
