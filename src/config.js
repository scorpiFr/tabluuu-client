const config = {
  urlPrefix: process.env.REACT_APP_API_URL_PREFIX,
  imageDirectory: process.env.REACT_APP_IMAGE_DIRECTORY,
  sibKey: process.env.REACT_APP_BREVO_API_KEY,
  senderEmail: process.env.REACT_APP_BREVO_SENDER_EMAIL,
  barId: new URLSearchParams(window.location.search).get("barid"),
  table: new URLSearchParams(window.location.search).get("table"),
};

export default config;