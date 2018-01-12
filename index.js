const LanguagesTrigger = require('./triggers/language');
const TimezoneTrigger = require('./triggers/time_zone');
const CountryTrigger = require('./triggers/country');
const getPackage = require('./triggers/package');
const createSubscriber = require('./creates/subscriber');
const authentication = require('./authentication');

const includeSessionKeyHeader = (request, z, bundle) => {
  if (bundle.authData.sessionKey) {
    request.headers = request.headers || {};
    request.headers.cookie = `XSRF-TOKEN=${bundle.authData.token}; JSESSIONID=${bundle.authData.sessionKey}`;
    request.headers['X-XSRF-TOKEN'] = bundle.authData.token;
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
    [LanguagesTrigger.key]: LanguagesTrigger,
    [TimezoneTrigger.key]: TimezoneTrigger,
    [CountryTrigger.key]: CountryTrigger,
    [getPackage.key]: getPackage,
  },

  searches: {
  },

  creates: {
    [createSubscriber.key]: createSubscriber,
  }
};

module.exports = App;
