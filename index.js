const app = require("./src");
const models = require("./src/models");

function listenServer() {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Listening in port ${PORT}`);
  });
}

models.sequelize.sync({ force: false, logging: false }).then(() => {
  listenServer();
});
