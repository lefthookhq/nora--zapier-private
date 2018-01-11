// create a particular subscriber by name
const createSubscriber = (z, bundle) => {
  const responsePromise = z.request({
    method: 'POST',
    url: 'https://jsonplaceholder.typicode.com/posts',
    body: JSON.stringify({
      name: bundle.inputData.name
    })
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

module.exports = {
  key: 'subscriber',
  noun: 'Subscriber',

  display: {
    label: 'Create Subscriber',
    description: 'Creates a subscriber.'
  },

  operation: {
    inputFields: [
      {key: 'name', required: true}
    ],
    perform: createSubscriber,

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
