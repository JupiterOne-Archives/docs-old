const baseDeploy = require('lifeomic-deploy');
const toUpperCamelCase = baseDeploy.util.toUpperCamelCase;

const ADMINISTRATOR_ROLE_NAME = 'Administrator';

/**
 * This method hook will be called after the initial environment information
 * is loaded from the filesystem. We can customize the environment by
 * computing new derived properties or modifying existing properties.
 *
 * @param  {Object} env an environment object
 */
exports.computeEnvironmentProperties = async (env) => {
  // compute bucket name:
    // - "jupiterone-dev" gets "docs.dev.jupiterone.io"
    // - "jupiterone-prod-us" gets "docs.jupiterone.io"
  if (env.short_name === 'dev') {
    env.s3_redirect_bucket_name = 'docs.dev.jupiterone.io'
  } else if (env.short_name === 'prod-us') {
    env.s3_redirect_bucket_name = 'docs.jupiterone.io'
  } else {
    throw new Error('unknown environment: ' + env.name)
  }
};
