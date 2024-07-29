const Signup = () => {
  return `
<div class="signup__container">
  <h1>Signup</h1>
  <div class="signup__inner">
    <div class="signup__label-input">
      <div class="label__input">
        <label>Username:</label>
        <input type="text" id="username">
      </div>

      <div class="label__input">
        <label>Email:</label>
        <input type="text" id="email">
      </div>

      <div class="label__input">
        <label>Password:</label>
        <input type="text" id="password">
      </div>
    </div>

    <div class="signup__signup-login">
      <button>Signup</button>
      <a href="#" id="toLogin">Login?</a>
    </div>
  </div>
</div>

    `;
};

export default Signup;
