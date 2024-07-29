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
    eventInitializer: () => {
      const toLogin: HTMLAnchorElement | null =
        document.querySelector("#toLogin");
      const toSignup: HTMLAnchorElement | null =
        document.querySelector("#toSignup");
      const loginSignupSection: HTMLDivElement | null =
        document.querySelector(".login__signup-all");

      toLogin?.addEventListener("click", (e) => {
        e.preventDefault();
        loginSignupSection!.style.transform = "translateX(-50%)";
      });

      toSignup?.addEventListener("click", (e) => {
        e.preventDefault();
        loginSignupSection!.style.transform = "translateX(0%)";
      });
    },
    css: "./src/style/loginSignupPage.css",
  };
};

export default LoginSignup;
