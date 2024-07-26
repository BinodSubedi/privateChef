import Login from "./LoginSection";
import Signup from "./SignupSection";

const LoginSignup = () => {
  return {
    content: `
   <main>
   <div class="left-right__container">
   <div class="left__side" style="background-image:url('./images/login_signup.jpg')">
   </div>
   <div class="right__side">
   <div class="login__signup-all">
    ${Signup()}
    ${Login()}
   </div>
   </div>
   </div>
   </main> 
    `,
    eventIntializer: () => {},
    css: "./src/style/loginSignupPage.css",
  };
};

export default LoginSignup;
