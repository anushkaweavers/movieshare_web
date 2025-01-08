const mongoose = require('mongoose');

// Export the configuration
module.exports = {
  env: 'development', // You can change this to production or other environments as needed
  port: 3000, // Port value directly specified
  mongoose: {
    url: 'mongodb+srv://Anushka:Anushka@cluster0.iaqp2.mongodb.net/movie_share?retryWrites=true&w=majority&appName=Cluster0',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
