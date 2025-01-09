const mongoose = require('mongoose');

// Export the configuration
module.exports = {
  env: 'development', // Environment: development, production, etc.
  port: 3000, // Application port
  mongoose: {
    url: 'mongodb+srv://Anushka:Anushka@cluster0.iaqp2.mongodb.net/movie_share?retryWrites=true&w=majority&appName=Cluster0',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: 'anushkaGoswamI', 
    accessExpirationMinutes: 30, 
    refreshExpirationDays: 7, 
  },
};
