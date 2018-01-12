const createSubscriberAction = (z, bundle) => {
  //business logic
  //creat subscriber
  //create 2 slots
  //create subscription
};


let createSubscriber = function(z, bundle) {
  //add accountNumber of null to generate account number for this subscriber.
  return z.request({
    method: 'POST',
    url: 'https://jsonplaceholder.typicode.com/posts',
    body: JSON.stringify({
      name: bundle.inputData.name
    })
  })
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
      {key:'package', type:"string", required:true, dynamic:'package.id.name'},
      {key: 'name', label:"Username", type:"string", required: true },
      {key:'password', label:"Password", type:"password", required:false},
      {key:'pincode', label:"Pin Code", type:"string", required:true},
      {key:'firstname', label:"First Name", type:"string", required:true},
      {key:'lastname', label:"Last Name", type:"string", required:true},
      {key:'phone', label:"Phone", type:"string",  required:true, helpText:"Format 555-555-5555"},
      {key:'address', label:"Address", type:"string",  required:true},
      {key:'city', label:"City", type:"string",  required:true},
      {key:'zipcode', label:"Zip Code", type:"string",  required:true},
      {key:'country', label:"Country", type:"string", required:true, dynamic:"country.id.name"},
      {key:'state', label:"State", type:"string",  required:false},
      {key:'language', label:"Language", type:"string",  required:false, dynamic:"language.id.name"},
      {key:'dateOfBirth', label:"Date Of Birth", type:"datetime",  required:false},
      {key:'timeZone', label:"Time Zone", type:"datetime",  required:true}
    ],
    perform: createSubscriberAction
  }
};
