import bodyParser = require("body-parser");
import compression = require("compression");
import cookieParser = require("cookie-parser");
import cors = require("cors");
import express = require("express");
import helmet = require("helmet");
import morgan = require("morgan");

import validator = require("express-validator");
import Fingerprint = require("express-fingerprint");

import { sequelize } from './helpers/db';

import { node } from "../config";
import { logger } from "./helpers";

export class Server {
    public async init() {
        const db = await this.database();
        const app = await this.configure();

        logger.info(`Connected to database ${db}`);
        logger.info(`Server for ${node.env} started on ${node.port}`);

        return { db, app };
    }

    private async database() {

        sequelize.authenticate()
        .then(() => {
            logger.info('Connection has been established successfully.');
        })
        .catch(err => {
            logger.error('Unable to connect to the database:', err);
            process.exit(1);
        });

        await sequelize.sync();
        return sequelize;
    }

    private async configure() {
        const app = express();

        app.use(cors());
        app.use(helmet());
        app.use(compression());
        app.use(cookieParser());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(validator());

        const { router } = await import("./routes");

        // router.get('/', (req,res)=>{ res.send('hello') })
        // router.post('/', (req,res)=>{ res.send('hello') })

        app.use(Fingerprint({
            parameters:[
                // Defaults 
                Fingerprint.useragent,
                Fingerprint.acceptHeaders,
                Fingerprint.geoip,
            ]
        }))
        app.use(function(req, res, next){
            let token = req.body.token || req.query.token || req.headers['x-api-token'];
            let device_name = req.headers['x-device-id']
            let express_fingerprint = {
                ...req['fingerprint'],
                ip: req.ip,
                ips: req.ips,
            }
            let finger_print = {
                token: token,
                device_name: device_name,
                fingerprint: express_fingerprint,
                body: req.body,
                params: req.params,
                url: req.url
            }
            let date = new Date();
            logger.info(`ACCESS LOG: ${date.toLocaleString()}`, finger_print);

            next();
        })

        app.use("/api", router);
        app.listen(node.port);
    
        return app;
    }
}
