const config = {
  urlPrefix: process.env.REACT_APP_API_URL_PREFIX,
  imageDirectory: process.env.REACT_APP_IMAGE_DIRECTORY,
  tabluuu_server: process.env.REACT_APP_TABLUUU_SERVER,
  barId: new URLSearchParams(window.location.search).get("barid"),
  table: new URLSearchParams(window.location.search).get("table"),
};

export default config;
