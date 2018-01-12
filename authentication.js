const testAuth = (z, bundle) => {
  return z.request({
    url: 'https://mwjs.setplex.net/nora/api/networks/?count=true'
  })


};


const getXSRF = (z, bundle) => {
  return z.request({
      url: 'https://mwjs.setplex.net/nora/auth'
    })
    .then(r => {
      var headers = r.headers.toJSON();
      var token = headers['set-cookie'].split(';')[0].split('=')[1];

      return {
        token: token
      };
    })
}




const sessionAuth = (z, bundle, token) => {
  return z.request({
      method: 'POST',
      url: 'https://mwjs.setplex.net/nora/auth',
      form: {
        username: bundle.authData.username,
        password: bundle.authData.password,
      },
      headers:{
        "X-XSRF-TOKEN": token,
        cookie: `XSRF-TOKEN=${token}`
      }
    })
    .then((response) => {
      if (response.status === 401) {
        throw new Error('The username/password you supplied is invalid');
      }
      var headers = response.headers.toJSON();
      var sessionID = headers['set-cookie'].split(';')[0].split('=')[1];

      return {
        sessionKey: sessionID
      };
    });
}


const getSessionKey = (z, bundle) => {
  let XSRFToken; 
 return getXSRF(z, bundle)
 .then(r=>{
   XSRFToken = r.token;
   return sessionAuth(z, bundle, XSRFToken)
 })
 .then(r=>{
   return {
     sessionKey: r.sessionKey,
     token: XSRFToken
   }
 })
};

module.exports = {
  type: 'session',
  fields: [
    { key: 'username', label: 'Username', required: true, type: 'string' },
    { key: 'password', label: 'Password', required: true, type: 'string' },
    {key: 'token', type: 'string', required: false, computed: true}
  ],
  test: testAuth,
  sessionConfig: {
    perform: getSessionKey
  }
};
