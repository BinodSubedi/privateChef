const Login = () => {
  return `
  <div class="login__container">
  <h1>Login</h1>
  <div class="login__inner">
    <div class="login__label-input">
      <div class="label__input">
        <label>Username:</label>
        <input type="text" id="username">
      </div>

        <div class="label__input">
        <label>Password:</label>
        <input type="text" id="password">
      </div>
    </div>

    <div class="login__login-signup">
      <button>Login</button>
      <a href="#" id="toSignup">Signup?</a>
    </div>
  </div>
</div> 
    `;
};

export default Login;
