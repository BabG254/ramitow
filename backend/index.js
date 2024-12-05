const db = require('./config/db');

db.query('SELECT 1 + 1 AS result', (err, results) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Database Test Successful:', results);
  }
});
