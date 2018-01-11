const testAuth = (z , bundle) => {
  return z.request({
    url: 'https://mwjs.setplex.net/nora/api/networks/?count=true'
  });

};

const getSessionKey = (z, bundle) => {
  const promise = z.request({
    method: 'POST',
    url: 'https://mwjs.setplex.net/nora/auth',
    form: {
      username: bundle.authData.username,
      password: bundle.authData.password,
    }
  });

  return promise.then((response) => {
    if (response.status === 401) {
      throw new Error('The username/password you supplied is invalid');
    }
    var headers = response.headers.toJson();
    var sessionID = headers['Set-Cookie'].split(';')[0].split('=')[1];

    return {
      sessionKey: sessionID
    };
  });
};

module.exports = {
  type: 'session',
  fields: [
    {key: 'username', label: 'Username', required: true, type: 'string'},
    {key: 'password', label: 'Password', required: true, type: 'string'}
  ],
  test: testAuth,
  sessionConfig: {
    perform: getSessionKey
  }
};
