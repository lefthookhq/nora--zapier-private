const triggerCountry = (z, bundle) => {
 const responsePromise = z.request({
    url: 'https://mwjs.setplex.net/nora/api/info/countries',

  });
  return responsePromise
    .then(response => 
    z.JSON.parse(response.content)
    //this is an object parse this into an array with objects with name and id
    //send 2 letter code
    );
};

module.exports = {
  key: 'country',
  noun: 'Country',

  display: {
    label: 'Get Country',
    description: 'Triggers on a new country.',
    hidden:true
  },

  operation: {
    perform: triggerCountry
  }
};
