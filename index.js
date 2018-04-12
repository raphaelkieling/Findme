const { server } = require("./src");
const models = require("./src/models");

let listening = async () => {
    await models.sequelize.sync({ force: false, logging: false })

    const PORT = process.env.PORT || 3000;

    server.listen(PORT, () => {
        console.log(`Listening in port ${PORT}`);
    });
}

listening();

