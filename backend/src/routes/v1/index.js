const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const reviewRoute = require('./review.route'); 
const postRoute = require('./post.route');

const router = express.Router();

const defaultRoutes = [
  { path: '/auth', route: authRoute },
  { path: '/users', route: userRoute },
  { path: '/reviews', route: reviewRoute }, 
  {path: '/posts', route: postRoute}
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
