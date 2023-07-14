const prices = require('./src/data/place_types.js');

(async () => {
  const config = {'site':'vanguard', 'siteid':1};
  const p = await prices(config);
  console.log(JSON.stringify(p, null, 2));
})();