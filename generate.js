const generateSecret = require('./utils/generateSecret');

const secret = generateSecret();
console.log('Generated JWT Secret:', secret);
