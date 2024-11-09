import Joi from 'joi';
import 'dotenv/config';

// Define only necessary environment variables
const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    INFURA_PROJECT_ID: Joi.string().required().description('Infura project id'),
    NETWORK: Joi.string().default('mainnet').description('Ethereum network'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  infura: {
    projectId: envVars.INFURA_PROJECT_ID,
    network: envVars.NETWORK,
  },
};

export default config;
