const express = require("express");
const router = express.Router();
const welcomeRouter = require('./welcome');
const schema = require('../graphql/schema');
const graphqlExpress = require('express-graphql');
const extractJWTMiddleware = require('../middlewares/extract-jwt.middlewares');

const db = require('../models');

router.get("/welcome", welcomeRouter.welcome);
router.get("/", welcomeRouter.welcome);
router.use("/graphql",
    extractJWTMiddleware(),
    (req, res, next) => {
        req['context'].db = db;
        next();
    }
    , graphqlExpress({
        schema,
        graphiql: true,
        context: {
            db
        }
    }));

module.exports = router;
