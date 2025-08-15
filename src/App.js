import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to RiddleRoyale</h1>
      <p>Battle your friends using your brain! Solve riddles and win!</p>
      <Link to="/create"><button>Create Game</button></Link>
      <Link to="/join"><button>Join Game</button></Link>
      <Link to="/single"><button>Play Single Player</button></Link>
    </div>
  );
}

function CreateGame() {
  return <h2>Create Game Page (coming soon)</h2>;
}

function JoinGame() {
  return <h2>Join Game Page (coming soon)</h2>;
}

function SinglePlayer() {
  return <h2>Single Player Mode (coming soon)</h2>;
}

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
