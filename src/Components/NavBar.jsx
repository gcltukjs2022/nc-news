import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export default function NavBar() {
  return (
    <nav>
      <Navbar className="bg-light">
        <Container>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
              <a className="nav-link active" href="/articles">
                Articles
              </a>
              <a className="nav-link active" href="/topics">
                Topics
              </a>
              <a className="nav-link active" href="/">
                Users
              </a>
            </div>
          </div>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">Temp</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </nav>
  );
}
