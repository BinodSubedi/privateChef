const Header = () => {
  return `
    <nav>
  <div class="nav__left">
    <div class="input-boxes">
    <input type='text' id="searchBox" placeholder="Search...."/>
    <input type='text' id="fileSpecifier" placeholder="Optional"/>
    </div>
    <button id="submit">Submit</button>
  </div>
  <div class="nav__right">
  <div class="profile" style="background-image:url('./icons/profile.png')">
  </div>
  </div>
  </nav>
    `;
};

export default Header;
