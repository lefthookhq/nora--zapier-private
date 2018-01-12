const triggerLanguages = (z, bundle) => {
  const responsePromise = z.request({
    url: 'https://jsonplaceholder.typicode.com/posts',
  });
  return responsePromise
    .then(response => 
    z.JSON.parse(response.content)
    //this is an array of languages. attach to language remapp this to an array of objects with name and id. 
    );
};

module.exports = {
  key: 'language',
  noun: 'Languages',

  display: {
    label: 'Get Languages',
    description: 'Triggers on a new languages.',
    hidden:true
  },

  operation: {
    perform: triggerLanguages
  }
};
