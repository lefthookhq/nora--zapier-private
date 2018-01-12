// triggers on time zone with a certain tag
const triggerTimezone = (z, bundle) => {
  const responsePromise = z.request({
    url: 'https://mwjs.setplex.net/nora/api/info/timezones',

  });
  return responsePromise
    .then(response => 
    z.JSON.parse(response.content)
    //this is an array of timezones to send map to array of objects attack to timeZone
    );
};

module.exports = {
  key: 'time_zone',
  noun: 'Time zone',

  display: {
    label: 'Get Time zone',
    description: 'Triggers on a new time zone.',
    hidden: true
  },

  operation: {
    perform: triggerTimezone
  }
};
