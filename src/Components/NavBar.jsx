import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { UserContext } from "./UserProvider";

export default function NavBar() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const refreshPage = () => {
    window.location.reload();
  };

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
              <a className="nav-link active" href="/users">
                Users
              </a>
            </div>
          </div>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {Object.keys(loggedInUser).length > 0 ? (
              <Navbar.Text>
                {loggedInUser.username}{" "}
                <img
                  src={loggedInUser.avatar_url}
                  alt="user-avatar"
                  width={20}
                />{" "}
                <a
                  href="#"
                  onClick={() => {
                    setLoggedInUser({});
                    localStorage.clear();
                    refreshPage();
                  }}
                >
                  Log out
                </a>
              </Navbar.Text>
            ) : (
              <Navbar.Text>
                <a href="/users">Login</a>
              </Navbar.Text>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </nav>
  );
}
