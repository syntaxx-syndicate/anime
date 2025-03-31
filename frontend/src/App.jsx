import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/homePage";
import AnimeHome from "./pages/home/animeHome";
import MangaHome from "./pages/home/mangaHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/anime" element={<AnimeHome />} />
        <Route path="/manga" element={<MangaHome />} />
      </Routes>
    </Router>
  );
}

export default App;
