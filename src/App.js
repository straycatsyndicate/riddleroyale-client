import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import React from 'react';

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
  const [level, setLevel] = React.useState(1);
  const [score, setScore] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(90);

  // Level 1 — Riddle
  const riddles = [
    {
      question: "What has to be broken before you can use it?",
      options: ["An egg", "A code", "A door"],
      answer: "An egg",
      synonym: "Shell"
    }
  ];

  // Level 2 — generate scrambled word once per level
  const getAnagram = (word) =>
    word.split("").sort(() => Math.random() - 0.5).join("");

  const [scrambledWord, setScrambledWord] = React.useState(
    getAnagram(riddles[0].synonym)
  );
  const [anagramInput, setAnagramInput] = React.useState("");

  // Level 3 — Odd One Out
  const oddOneOut = [
    { clue: "Shell", words: ["Shell", "Leaf", "Stone"], odd: "Leaf" }
  ];

  // Timer effect
  React.useEffect(() => {
    if (gameOver) return;

    if (timeLeft <= 0) {
      setGameOver(true);
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameOver]);

  const nextLevel = () => {
    setLevel(level + 1);
    setTimeLeft(90); // reset timer for next level
    if (level === 1) {
      // Prepare scrambled word for level 2
      setScrambledWord(getAnagram(riddles[0].synonym));
      setAnagramInput("");
    }
  };

  const handleLevel1Answer = (selected) => {
    if (selected === riddles[0].answer) {
      setScore(score + 1);
      nextLevel();
    } else {
      setGameOver(true);
    }
  };

  const handleLevel2Submit = () => {
    if (anagramInput.trim().toLowerCase() === riddles[0].synonym.toLowerCase()) {
      setScore(score + 1);
      nextLevel();
    } else {
      setGameOver(true);
    }
  };

  const handleLevel3Answer = (selected) => {
    if (selected === oddOneOut[0].odd) {
      setScore(score + 1);
      setGameOver(true); // game ends after last level
    } else {
      setGameOver(true);
    }
  };

  if (gameOver) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Game Over!</h2>
        <p>Your score: {score} / 3</p>
        <button onClick={() => window.location.reload()}>Play Again</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h3>Time Left: {timeLeft}s</h3>

      {level === 1 && (
        <>
          <h2>Level 1: Riddle</h2>
          <p>{riddles[0].question}</p>
          {riddles[0].options.map((opt, idx) => (
            <button
              key={idx}
              style={{ display: "block", margin: "10px auto" }}
              onClick={() => handleLevel1Answer(opt)}
            >
              {opt}
            </button>
          ))}
        </>
      )}

      {level === 2 && (
        <>
          <h2>Level 2: Anagram</h2>
          <p>Unscramble this word: {scrambledWord}</p>
          <input
            type="text"
            value={anagramInput}
            onChange={(e) => setAnagramInput(e.target.value)}
            placeholder="Type your answer here"
          />
          <br />
          <button
            style={{ marginTop: "10px" }}
            onClick={handleLevel2Submit}
          >
            Submit
          </button>
        </>
      )}

      {level === 3 && (
        <>
          <h2>Level 3: Odd One Out</h2>
          <p>Select the odd one out (use Level 2 answer as a clue):</p>
          {oddOneOut[0].words.map((opt, idx) => (
            <button
              key={idx}
              style={{ display: "block", margin: "10px auto" }}
              onClick={() => handleLevel3Answer(opt)}
            >
              {opt}
            </button>
          ))}
        </>
      )}
    </div>
  );
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
