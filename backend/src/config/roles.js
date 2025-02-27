const roleRights = new Map([
  ["user", ["createPost", "editPost", "deletePost", "createReview", "updateReview", "deleteReview"]],
  ["admin", ["manageUsers", "manageReviews", "managePosts"]],
]);

module.exports = {
  roleRights,
};
