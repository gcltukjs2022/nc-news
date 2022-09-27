import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Articles from "./Components/Articles";
import Header from "./Components/Header";
import NavBar from "./Components/NavBar";

import Home from "./Components/Home";

function App() {
  return (
    <div className="App">
      <Header />
      <nav>
        <NavBar />
      </nav>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/articles" element={<Articles />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
