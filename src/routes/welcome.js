function welcome(req, res) {
  res.status(200).json({
    message: "Welcome to the jungle",
    baseAPI: "/graphql",
    version: "1.0.0"
  });
}

module.exports = {
  welcome
};
