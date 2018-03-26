const { server } = require('./server');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost/auth-users', { useMongoClient: true})
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to database: ', err);
  });

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
