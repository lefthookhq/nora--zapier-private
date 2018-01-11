require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('session auth app', () => {
  let sessionKey;
  it('has an exchange for username/password', (done) => {
    const bundle = {
      authData: {
        username: 'extotheizzle@gmail.com',
        password: 'E=mcsquared0'
      }
    };

    appTester(App.authentication.sessionConfig.perform, bundle)
      .then((newAuthData) => {
        sessionKey = newAuthData.sessionKey;
        newAuthData.sessionKey.should.exist;
        done();
      })
      .catch(done);
  });

  it('auth should be valid', (done) => {
    const bundle = {
      authData: {
        sessionKey: sessionKey
      }
    };

    appTester(App.authentication.test, bundle)
      .then((response) => {
        response.status.should.eql(200);
        done();
      })
      .catch(done);
  });
});
