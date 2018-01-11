const getPackage = require('./triggers/package');
const createSubscriber = require('./creates/subscriber');
const authentication = require('./authentication');

const includeSessionKeyHeader = (request, z, bundle) => {
  if (bundle.authData.sessionKey) {
    request.headers = request.headers || {};
    request.headers['Cookie'] = `JESSIONID=${bundle.authData.sessionKey}`
  }
  return request;
};

const sessionRefreshIf401 = (response, z, bundle) => {
  if (bundle.authData.sessionKey) {
    if (response.status === 401) {
      throw new z.errors.RefreshAuthError('Session key needs refreshing.');
    }
  }
  return response;
};

const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: authentication,

  beforeRequest: [
    includeSessionKeyHeader
  ],

  afterResponse: [
    sessionRefreshIf401
  ],

  resources: {
  },

  triggers: {
    [getPackage.key]: getPackage,
  },

  searches: {
  },

  creates: {
    [createSubscriber.key]: createSubscriber,
  }
};

module.exports = App;
