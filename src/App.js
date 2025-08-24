import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import CreateGame from "./pages/CreateGame";
import JoinGame from "./pages/JoinGame";
import SinglePlayer from "./pages/SinglePlayer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateGame />} />
        <Route path="/join" element={<JoinGame />} />
        <Route path="/single" element={<SinglePlayer />} />
      </Routes>
    </Router>
  );
}

export default App;
