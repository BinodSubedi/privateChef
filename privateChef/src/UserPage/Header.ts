const Header = () => {
  return `
    <nav>
  <div class="nav__left">
    <div class="input-boxes">
    <input type='text' id="questionBox" placeholder="Ask a Question"/>
    <input type='text' id="fileSpecifier" placeholder="File(Optional)"/>
    </div>
    <button id="submit-button">Submit</button>
  </div>
  <div class="nav__right">
  <div class="profile" style="background-image:url('./icons/profile.svg')">
  <div class="profile-options">
  <div class="logout-button">
  <p id="logout">
  Log-Out
  </p>
  </div>
  </div>
  </div>
  </div>
  </nav>
    `;
};

export default Header;
