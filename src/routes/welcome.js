function welcome(req, res) {
  res.status(200).json({
    message: "Welcome to the jungle",
    baseAPI: "api/v1",
    version: "1.0.0"
  });
}

module.exports = {
  welcome
};
