// triggers on package with a certain tag
const triggerPackage = (z, bundle) => {
  const responsePromise = z.request({
    url: 'https://jsonplaceholder.typicode.com/posts',
    params: {
      tag: bundle.inputData.tagName
    }
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
    inputFields: [
      
    ],
    perform: triggerPackage,

    sample: {
      id: 1,
      name: 'Test'
    },

    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'name', label: 'Name'}
    ]
  }
};
