import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to RiddleRoyale</h1>
      <p>Battle your friends using your brain! Solve riddles and win!</p>
      <Link to="/create"><button>Create Game</button></Link>
      <Link to="/join"><button>Join Game</button></Link>
      <Link to="/single"><button>Play Single Player</button></Link>
    </div>
  );
}

export default Home;
