import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/homePage";
import AnimeHome from "./pages/home/animeHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/anime" element={<AnimeHome />} />
      </Routes>
    </Router>
  );
}

export default App;
