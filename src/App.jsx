import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Articles from "./Components/Articles";
import Header from "./Components/Header";
import NavBar from "./Components/NavBar";

import Home from "./Components/Home";
import Topics from "./Components/Topics";
import Topic from "./Components/Topic";
import SingleArticle from "./Components/SingleArticle";

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/articles" element={<Articles />}></Route>
          <Route path="/topics" element={<Topics />}></Route>
          <Route path="/topics/:topic" element={<Topic />}></Route>
          <Route path="/articles/:id" element={<SingleArticle />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
