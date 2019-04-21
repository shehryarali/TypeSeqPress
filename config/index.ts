    
import Joi = require("joi");
import { config } from "dotenv";

config();

const schema = Joi.object({
	JWT_EXPIRY: Joi.string().default("1hr"),	

	NODE_PORT: Joi.number().default(3100),
	NODE_ENV: Joi.string()
    .allow(["development", "production"])
		.default("development"),

	DB_HOST: Joi.string().default("localhost"),
	DB_PORT: Joi.number().default(5432),
	DB_TYPE: Joi.string().default("postgres"),	
	DB_USER: Joi.string().default("postgres"),
	DB_PASS: Joi.string().default("postgres"),	
	DB_NAME: Joi.string().default("postgres"),
	DB_SYNC: Joi.boolean().default(true),
	DB_LOG: Joi.boolean()
})
  .unknown()
  .required();

const { error, value: env } = Joi.validate(process.env, schema);

if (error) {
  throw new Error(`Config Validation Error: ${error.message}`);
}

const db = { host: String(env.DB_HOST), port: Number(env.DB_PORT), username: String(env.DB_USER),
password: String(env.DB_PASS), name: String(env.DB_NAME), sync: env.DB_SYNC, log: env.DB_LOG };

const node = { env: env.NODE_ENV, port: env.NODE_PORT };

const jwt = { secret: "1.61803398875" , expiry: env.JWT_EXPIRY }

export { db, node, jwt };