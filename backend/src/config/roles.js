const roleRights = new Map([
  ["user", ["createReview", "updateReview", "deleteReview"]],
  ["admin", ["manageUsers", "manageReviews"]],
]);

module.exports = {
  roleRights,
};