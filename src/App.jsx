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
import NonExistentPath from "./Components/NonExistentArticle";
import NonExistentArticle from "./Components/NonExistentArticle";
import NonExistentTopic from "./Components/NonExistentTopic";
import AllUsers from "./Components/AllUsers";

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
          <Route path="/users" element={<AllUsers />}></Route>
          <Route
            path="/articles/:nonexistentid/article_not_found"
            element={<NonExistentArticle />}
          ></Route>
          <Route
            path="/topics/:nonexistenttopic/topic_not_found"
            element={<NonExistentTopic />}
          ></Route>
          <Route path="*" element={<NonExistentPath />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
