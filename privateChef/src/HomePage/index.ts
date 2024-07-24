import Features from "./Features";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import "./../style/homePage.css";

const HomePage = () => {
  document.querySelector(".header")!.innerHTML = Header();
  document.querySelector(
    ".main__container"
  )!.innerHTML = `${Home()} ${Features()}`;
  document.querySelector(".footer")!.innerHTML = Footer();

  //setting background image in header logo section

  const element: HTMLDivElement = document.querySelector("#logo")!;
  element.style.backgroundImage = "url('./icons/chef.png')";
};

export default HomePage;
