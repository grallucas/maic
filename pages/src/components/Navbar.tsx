import "./assets/css/navbar.css";
pages\src\components\library\assets\library\css\navbar.css

interface NavBarProps {
  page: string;
}

const NavBar = (props: NavBarProps) => {
  return (
    <div id="toolbar" style={{ textAlign: "center" }}>
      <h3>
        <a href="/">
          <img
            className="logo"
            src={
              window.location.href.includes("3000")
                ? "/Sticker.png"
                : "/api/v1/library/Sticker/image"
            }
            alt="Logo"
            height="25px"
            style={{
              float: "left",
              paddingRight: "10px",
              paddingTop: "5px",
              paddingBottom: "5px",
            }}
          />
        </a>
      </h3>
      <a
        className={`${props.page === "Home" ? "active" : ""}`}
        href="/index.html"
      >
        <p>Home</p>
      </a>
      <a
        className={`${props.page === "Library" ? "active" : ""}`}
        href="/library"
      >
        <p>Library</p>
      </a>
      <a
        className={`${props.page === "Research" ? "active" : ""}`}
        href="/Research.html"
      >
        <p>Research</p>
      </a>
      <a
        className={`${props.page === "Workshops" ? "active" : ""}`}
        href="/Workshops.html"
      >
        <p>Workshops</p>
      </a>
      <a
        className={`${props.page === "Merch" ? "active" : ""}`}
        href="/Merch.html"
      >
        <p>Merch</p>
      </a>
      <a
        className={`${props.page === "Contact" ? "active" : ""}`}
        href="/Contact.html"
      >
        <p>Contact</p>
      </a>
      <a
        className={`${props.page === "About" ? "active" : ""}`}
        href="/About.html"
      >
        <p>About</p>
      </a>
    </div>
  );
};

export default NavBar;
