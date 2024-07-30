import Login from "./LoginSection";
import Signup from "./SignupSection";
import axiosConfig from "../axiosConfig";
import { StatusCodes } from "http-status-codes";
import { loadContent } from "../Router";

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

      // Signup

      interface SignupValues {
        userName?: string | null;
        email?: string | null;
        password?: string | null;
      }

      const signupValues = (): SignupValues => {
        const userName: HTMLInputElement | null =
          document.querySelector("#username");
        const email: HTMLInputElement | null = document.querySelector("#email");
        const password: HTMLInputElement | null =
          document.querySelector("#password");

        return {
          userName: userName?.value,
          email: email?.value,
          password: password?.value,
        };
      };

      const validator = (data: SignupValues | LoginData) => {
        let valid = true;

        const keys = Object.keys(data);

        Object.values(data).map((el, i) => {
          if (el == undefined || el == null || el == "") {
            valid = false;
            alert(`Provide a proper ${keys[i]} input`);
          }

          if (keys[i] == "userName") {
            if (el.length < 8) {
              valid = false;
              alert("Provide a Proper userName length");
            }
          }
        });

        return valid;
      };

      const fieldsCleaner = () => {
        const userName: HTMLInputElement | null =
          document.querySelector("#username");
        const email: HTMLInputElement | null = document.querySelector("#email");
        const password: HTMLInputElement | null =
          document.querySelector("#password");

        userName!.value = "";
        email!.value = "";
        password!.value = "";
      };

      const signup = async () => {
        const data = signupValues();
        console.log("userData::", data);

        if (validator(data)) {
          try {
            const response = await axiosConfig.put("/user/signup", data);

            if (response.status == StatusCodes.CREATED) {
              alert("User Created🚀🚀🚀");
              fieldsCleaner();
            } else {
              alert("Some Problem has occured🤔🤔");
            }
          } catch (err) {
            alert("Some Problem has occured🤔🤔");
          }
        }
      };

      document
        .querySelector("#signup-button")
        ?.addEventListener("click", (e) => {
          e.preventDefault();
          signup();
        });

      //Login

      interface LoginData {
        userName?: string | null;
        password?: string | null;
      }

      const getLoginData = (): LoginData => {
        const userName: HTMLInputElement | null =
          document.querySelector("#login-username");
        const password: HTMLInputElement | null =
          document.querySelector("#login-password");

        return { userName: userName?.value, password: password?.value };
      };

      const login = async () => {
        const data = getLoginData();

        if (validator(data)) {
          try {
            const response = await axiosConfig.post("/user/login", data, {
              withCredentials: true,
            });
            if (response.status == StatusCodes.OK) {
              history.pushState({ user: response.data }, "", "/home");
              loadContent(window.location.pathname);
            } else {
              alert("Login Failed🐉🐉");
            }
          } catch (err) {
            alert("Login Failed🐉🐉");
          }
        }
      };

      document
        .querySelector("#login-button")
        ?.addEventListener("click", (e) => {
          e.preventDefault();
          login();
        });
    },
    css: "./src/style/loginSignupPage.css",
  };
};

export default LoginSignup;
