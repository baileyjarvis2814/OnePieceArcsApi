const csv = require('csvtojson');
const fs = require('fs');

csv()
  .fromFile('OnePieceArcs.csv')
  .then((jsonObj) => {
    fs.writeFileSync('data.json', JSON.stringify(jsonObj, null, 2));
    console.log('CSV to JSON conversion completed.');
  })
  .catch((error) => {
    console.error('Error converting CSV to JSON:', error);
  });
