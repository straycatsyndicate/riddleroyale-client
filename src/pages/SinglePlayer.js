import React, { useState, useEffect } from "react";

function SinglePlayer() {
  // List of riddles
  const riddles = [
    {
      question: "I speak without a mouth and hear without ears. What am I?",
      answer: "Echo",
      synonyms: ["sound", "reverberation", "reflection"],
    },
    {
      question: "What has keys but can’t open locks?",
      answer: "Piano",
      synonyms: ["keyboard", "organ", "instrument"],
    },
    {
      question: "The more of me you take, the more you leave behind. What am I?",
      answer: "Footsteps",
      synonyms: ["tracks", "marks", "imprints"],
    },
  ];

  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(90);
  const [currentRiddle, setCurrentRiddle] = useState(null);
  const [anagramWord, setAnagramWord] = useState("");
  const [shuffledWord, setShuffledWord] = useState("");
  const [anagramInput, setAnagramInput] = useState("");
  const [oddOptions, setOddOptions] = useState([]);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);

  // Timer
  useEffect(() => {
    if (gameOver) return;

    if (timeLeft <= 0) {
      setMessage("⏰ Time's up! You are eliminated.");
      setGameOver(true);
      return;
    }

    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, gameOver]);

  // Start Level 1
  useEffect(() => {
    if (level === 1) {
      const randomRiddle = riddles[Math.floor(Math.random() * riddles.length)];
      setCurrentRiddle(randomRiddle);
      setMessage("");
      setGameOver(false);
      setTimeLeft(90);
    }
  }, [level]);

  // Shuffle function
  const shuffleWord = (word) =>
    word.split("").sort(() => Math.random() - 0.5).join("");

  // Shuffle anagram once when Level 2 starts
  useEffect(() => {
    if (level === 2 && anagramWord) {
      setShuffledWord(shuffleWord(anagramWord));
    }
  }, [level, anagramWord]);

  // Level 1 answer handler
  const handleRiddleAnswer = (answer) => {
    if (answer === currentRiddle.answer) {
      setLevel(2);
      const synonym =
        currentRiddle.synonyms[
          Math.floor(Math.random() * currentRiddle.synonyms.length)
        ];
      setAnagramWord(synonym);
      setAnagramInput("");
      setTimeLeft(90);
      setMessage("");
    } else {
      setMessage("❌ Wrong answer! You are eliminated.");
      setGameOver(true);
    }
  };

  // Level 2 answer handler
  const handleAnagramSubmit = (e) => {
    e.preventDefault();
    if (anagramInput.trim().toLowerCase() === anagramWord.toLowerCase()) {
      setLevel(3);
      // Generate odd-one-out options
      const options = [...currentRiddle.synonyms];
      options.push("Banana"); // odd one out
      setOddOptions(options.sort(() => Math.random() - 0.5));
      setTimeLeft(90);
      setMessage("");
    } else {
      setMessage("❌ Wrong answer! You are eliminated.");
      setGameOver(true);
    }
  };

  // Level 3 answer handler
  const handleOddOneOut = (choice) => {
    if (choice === "Banana") {
      setMessage("🎉 You win! Congratulations!");
      setGameOver(true);
    } else {
      setMessage("❌ Wrong answer! You are eliminated.");
      setGameOver(true);
    }
  };

  // Render
  if (gameOver) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Game Over!</h2>
        <p>{message}</p>
        <button onClick={() => window.location.reload()}>Play Again</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Single Player Mode</h2>
      <p>⏱ Time Left: {timeLeft}s</p>

      {level === 1 && currentRiddle && (
        <div>
          <h3>Level 1: Riddle</h3>
          <p>{currentRiddle.question}</p>
          {["Echo", "Piano", "Footsteps"].map((opt, i) => (
            <button
              key={i}
              style={{ display: "block", margin: "10px auto" }}
              onClick={() => handleRiddleAnswer(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {level === 2 && (
        <div>
          <h3>Level 2: Anagram</h3>
          <p>Unscramble this word:</p>
          <p>{shuffledWord}</p>
          <form onSubmit={handleAnagramSubmit}>
            <input
              type="text"
              value={anagramInput}
              onChange={(e) => setAnagramInput(e.target.value)}
              placeholder="Type your answer here"
            />
            <br />
            <button type="submit" style={{ marginTop: "10px" }}>
              Submit
            </button>
          </form>
        </div>
      )}

      {level === 3 && (
        <div>
          <h3>Level 3: Odd One Out</h3>
          <p>Select the odd one out (use Level 2 answer as a clue):</p>
          {oddOptions.map((choice, i) => (
            <button
              key={i}
              style={{ display: "block", margin: "10px auto" }}
              onClick={() => handleOddOneOut(choice)}
            >
              {choice}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SinglePlayer;
