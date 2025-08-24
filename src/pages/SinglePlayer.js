import React, { useState, useEffect } from "react";

function SinglePlayer() {
  const riddles = [
    {
      question: "I speak without a mouth and hear without ears. What am I?",
      answer: "Echo",
      synonyms: ["Sound", "Reverberation", "Reflection"],
    },
    {
      question: "What has keys but can’t open locks?",
      answer: "Piano",
      synonyms: ["Keyboard", "Organ", "Instrument"],
    },
    {
      question: "The more of me you take, the more you leave behind. What am I?",
      answer: "Footsteps",
      synonyms: ["Tracks", "Marks", "Imprints"],
    },
  ];

  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(90);
  const [currentRiddle, setCurrentRiddle] = useState(null);
  const [anagramWord, setAnagramWord] = useState("");
  const [anagramInput, setAnagramInput] = useState("");
  const [oddOptions, setOddOptions] = useState([]);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);

  // ⏱ Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setMessage("Time's up! You are eliminated.");
      setGameOver(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // 🎲 Start game
  useEffect(() => {
    if (level === 1) {
      const random = riddles[Math.floor(Math.random() * riddles.length)];
      setCurrentRiddle(random);
      setMessage("");
      setGameOver(false);
      setTimeLeft(90);
    }
  }, [level]);

  // 🔀 Shuffle letters (used for anagram)
  function shuffleWord(word) {
    return word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }

  // ✅ Handle Level 1 answer
  function handleRiddleAnswer(answer) {
    if (answer === currentRiddle.answer) {
      setLevel(2);
      const synonym =
        currentRiddle.synonyms[
          Math.floor(Math.random() * currentRiddle.synonyms.length)
        ];
      setAnagramWord(synonym);
      setTimeLeft(90);
      setMessage("");
    } else {
      setMessage("Wrong answer! You are eliminated.");
      setGameOver(true);
    }
  }

  // ✅ Handle Level 2 answer
  function handleAnagramSubmit(e) {
    e.preventDefault();
    if (anagramInput.toLowerCase() === anagramWord.toLowerCase()) {
      setLevel(3);
      const options = [...currentRiddle.synonyms];
      options.push("Banana"); // add an odd one out
      options.sort(() => Math.random() - 0.5);
      setOddOptions(options);
      setTimeLeft(90);
      setMessage("");
    } else {
      setMessage("Wrong answer! You are eliminated.");
      setGameOver(true);
    }
  }

  // ✅ Handle Level 3 answer
  function handleOddOneOut(choice) {
    if (choice === "Banana") {
      setMessage("🎉 You win! Congratulations!");
      setGameOver(true);
    } else {
      setMessage("Wrong answer! You are eliminated.");
      setGameOver(true);
    }
  }

  // 🎨 Render UI
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Single Player Mode</h2>
      <p>⏱ Time Left: {timeLeft}s</p>

      {!gameOver && level === 1 && currentRiddle && (
        <div>
          <h3>{currentRiddle.question}</h3>
          <div>
            {["Echo", "Piano", "Footsteps"].map((choice, i) => (
              <button key={i} onClick={() => handleRiddleAnswer(choice)}>
                {choice}
              </button>
            ))}
          </div>
        </div>
      )}

      {!gameOver && level === 2 && (
        <div>
          <h3>Solve the Anagram:</h3>
          <p>{shuffleWord(anagramWord)}</p>
          <form onSubmit={handleAnagramSubmit}>
            <input
              type="text"
              value={anagramInput}
              onChange={(e) => setAnagramInput(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {!gameOver && level === 3 && (
        <div>
          <h3>Select the odd one out:</h3>
          {oddOptions.map((choice, i) => (
            <button key={i} onClick={() => handleOddOneOut(choice)}>
              {choice}
            </button>
          ))}
        </div>
      )}

      {message && <h3>{message}</h3>}
    </div>
  );
}

export default SinglePlayer;
