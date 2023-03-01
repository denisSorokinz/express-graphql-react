import logo from "../assets/logo.png";

const Header = () => {
  return (
    <nav className="navbar bg-light mb-4 p-0">
      <a href="/" className="navbar-brand">
        <div className="d-flex">
          <img src={logo} alt="Logo" className="mr-2" />
          <span>ProjectMgmt</span>
        </div>
      </a>
    </nav>
  );
};

export default Header;
