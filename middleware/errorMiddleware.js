
////////// catch errors by application //////////
////////// respond with error number ex:401 //////////
////////// used in server.js //////////

const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
};

module.exports = errorMiddleware;
