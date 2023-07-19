const q = require('./src/data/rooms.js');

(async () => {
  const config = {'site': 'vanguard', 'siteid': 1, 'year': 2023};
  const p = await q(config);
  console.log(JSON.stringify(p, null, 2));
})();