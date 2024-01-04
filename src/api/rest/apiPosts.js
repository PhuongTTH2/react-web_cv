const apiPosts = {
  signIn: "/auth/signin",
  signUpValidateEmail: "/auth/signup/validate-email",
  signUp: "/auth/signup",
  signUpConfirm: "/auth/signup/confirm",
  forgotPasswordInitiate: "/auth/forgot-password/initiate",
  forgotPasswordInitiateEmail: "/auth/forgot-password/initiate/email",
  forgotPasswordChange: "/auth/forgot-password/change",
  SET_MEMBERSHIP: "/set-membership",
  changePassword: "/account/change-password",
  terminateAccount: "/account/terminate",
  applyTest: "/account/apply-Test",
  createBook: "/book",
  createBookChapter: "/book/{book_id}/chapter",
  createBookTopic: "/book/{book_id}/chapter/{chapter_id}/topic",
  createTest: "/Test/create",
  createCommunication: "/post/create-communication",
  createEvent: "/post/create-event",
  createPoll: "/post/create-poll",
  signOut: "/account/signout",

  book: "/book",
};
export default apiPosts;
