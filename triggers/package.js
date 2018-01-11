// triggers on package with a certain tag
const triggerPackage = (z, bundle) => {
  const responsePromise = z.request({
    url: 'https://mwjs.setplex.net/nora/api/networks/?count=true',
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

module.exports = {
  key: 'package',
  noun: 'Package',

  display: {
    label: 'Get Package',
    description: 'Triggers on a new package.'
  },

  operation: {

    perform: triggerPackage
  }
};
