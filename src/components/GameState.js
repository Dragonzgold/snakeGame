import { useEffect, useState } from "react";
import GamePieces from "./GamePieces";
import "../style/style.css"

const GameState = () => {

  const [score, setScore] = useState(0);
  const [hightScore, setHightScore] = useState(parseInt(localStorage.getItem("hightScore")) || 0);
  const [gameOver, setGameOver] = useState(false);
  const [collisiom, setCollisiomType] = useState("");

  const onGameOver = (type) => {
    setGameOver(true);

    if (score > hightScore) {
      setHightScore(score);
      localStorage.setItem("highScore", score.toString())
    }

    setCollisiomType(type)
  }

  const handleResetGame = () => {
    setScore(0)
    setGameOver(false);
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver && e.key === "Enter") {
        handleResetGame()
      }
    }
    window.addEventListener("keydown", handleKeyPress)
  }, [gameOver])

  return (
    <>
      <div>
        <div>
          <p className="score">Su puntuacion es de: {score}</p>
          <br />
          <p className="highScore">La puntuacion mas alta es de: {hightScore}</p>
          {
            gameOver && (
              <div>
                <p className="gameOver">Haz perdido {collisiom === "wall" ? "Te haz pegado contra la pared" : "Te haz comido a ti mismo"}</p>
                <p className="resetGame">Presione <b className="enterReset">ENTER</b> para iniciar un nuevo juego</p>
              </div>
            )
          }{
            !gameOver && (
              <GamePieces
                score={score}
                setScore={setScore}
                onGameOver={(type) => onGameOver(type)}
              />
            )
          }
        </div>
      </div>
    </>
  )
}

export default GameState;