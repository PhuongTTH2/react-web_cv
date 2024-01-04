const apiGets = {
  refreshCredentials: "/auth/refresh-token",
  getAccount: "/account",
  signUpConfirm: "/auth/signup/confirm",
  getBookDetails: "/book/{id}",
  getBookChapters: "/book/{book_id}/chapter",
  getBookTopicDetails: "/book/get-topic/{topic_id}",
  getTestInfluences: "/Test/influences",
  joinedTests: "/account/joined-Tests",
  getJoinedTests: "/account/joined-Tests",
  getFollowedTests: "/account/followed-Tests",
  getFeatureTest: "/Test/feature",
  listTests: "/list-Tests",
  getTestMembers: "",
};
export default apiGets;
