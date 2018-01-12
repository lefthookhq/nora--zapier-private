require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('session auth app', () => {
  let sessionKey;
  let token;
  
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
        token = newAuthData.token
        newAuthData.sessionKey.should.exist;
        done();
      })
      .catch(done);
  });

  it('auth should be valid', (done) => {
    const bundle = {
      authData: {
        sessionKey: sessionKey,
        token: token
      }
    };

    appTester(App.authentication.test, bundle)
      .then((response) => {
        response.status.should.eql(200);
        done();
      })
      .catch(done);
  });
  
  
  it('should get packages', done => {
    const bundle = { 
      authData:{
        sessionKey:sessionKey, 
        token : token
      }
    };

    appTester(App.triggers.package.operation.perform, bundle)
      .then(results => {
        results.should.be.an.Array();
        results.length.should.be.above(0);
        done();
      })
      .catch(done);
  });
});
