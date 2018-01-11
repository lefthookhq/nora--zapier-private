const createSubscriberAction = (z, bundle) => {
  //business logic
  //creat subscriber
  //create 2 slots
  //create subscription
};


let createSubscriber = function(z, bundle) {

  const subscriberPromise = z.request({
    method: 'POST',
    url: 'https://jsonplaceholder.typicode.com/posts',
    body: JSON.stringify({
      name: bundle.inputData.name
    })
  });



  return subscriberPromise
    .then(response => z.JSON.parse(response.content));

};

let activateSubscription = function(z, bundle) {

};

let addSlot = function(z, bundle) {

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
      { key: 'name', required: true },
      {key:'package', required:true, dynamic:'path here'}
    ],
    perform: createSubscriberAction
  }
};
