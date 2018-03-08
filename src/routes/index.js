const express = require("express");
const router = express.Router();
const welcomeRouter = require('./welcome');

const schema = require('../graphql');
const graphqlExpress = require('express-graphql');

router.get("/welcome", welcomeRouter.welcome);
router.get("/", welcomeRouter.welcome);
router.use("/graphql", graphqlExpress({
    schema,
    graphiql:true
}));

module.exports = router;
