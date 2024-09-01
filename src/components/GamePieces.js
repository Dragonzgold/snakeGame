import { useEffect, useRef, useState } from "react"
import "../style/style.css"

const GamePieces = ({ score, setScore, onGameOver }) => {

  const canvasRef = useRef();

  let [snakeSpeed, setSnakeSpeed] = useState(10)
  // posicion de la manzana
  const [apple, setApple] = useState({ x: 100, y: 200 })
  //Posicion de inicio de la serpiente || Hacer pruebas luego con los corchetes
  const [snake, setSnake] = useState([{ x: 100, y: 20 }, { x: 95, y: 20 }])
  const [direction, setDirection] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")

    // Dibujo de la serpiente

    const drawSnake = () => {
      snake.forEach((snakePark) => {
        ctx.beginPath();
        ctx.rect(snakePark.x, snakePark.y, 14, 14)
        ctx.fillStyle = "#90EE90";
        ctx.fill()
        ctx.closePath()
      })
    }

    //Dibujo de la manzana

    const drawApple = () => {
      ctx.beginPath();
      ctx.rect(apple.x, apple.y, 14, 14)
      ctx.fillStyle = "#FF0000";
      ctx.fill()
      ctx.closePath()
    }

    //Movimiento de la serpiente

    const moveSnake = () => {
      if (direction) {
        setSnake((prevSnake) => {
          const newSnake = [...prevSnake];
          const snakeHead = { x: newSnake[0].x, y: newSnake[0].y }


          for (let i = newSnake.length - 1; i > 0; i--) {
            newSnake[i].x = newSnake[i - 1].x
            newSnake[i].y = newSnake[i - 1].y
          }

          switch (direction) {
            case "right":
              snakeHead.x += snakeSpeed
              break;

            case "left":
              snakeHead.x -= snakeSpeed
              break;

            case "up":
              snakeHead.y -= snakeSpeed
              break;

            case "down":
              snakeHead.y += snakeSpeed
              break;
            default:
              break;
          }
          newSnake[0] = snakeHead;
          handleAppleCollision(newSnake);
          handleWallCollision(snakeHead);
          handleBodyCollision(newSnake);
          return newSnake
        })
      }
    }

    //Efecto de la colision de la serpiente

    const handleWallCollision = (snakeHead) =>{
      if(snakeHead.x + snakeSpeed > canvas.width || snakeHead.x + snakeSpeed < 0){
        onGameOver("wall")
      }
      if(snakeHead.y + snakeSpeed > canvas.height || snakeHead.y < 0){
        onGameOver("wall")
      }
    }

    const handleBodyCollision = (newSnake) =>{
      const snakeHead = newSnake[0]
      for(let i = 1; i < newSnake.length; i++){
        if(snakeHead.x === newSnake[i].x && snakeHead.y === newSnake[i].y){
          onGameOver("self")
        }
      }
    }

    
    //Coliosion de la manzana
    
    const handleAppleCollision = (newSnake) => {
      
      const snakeHead = newSnake[0]
      
      if (snakeHead.x === apple.x && snakeHead.y === apple.y) {
        
        setScore(score+1);
        
        setApple({
          x: Math.floor((Math.random() * canvas.width) / snakeSpeed) * snakeSpeed,
          y: Math.floor((Math.random() * canvas.height) / snakeSpeed) * snakeSpeed
        })

        
        newSnake.push({
          x: newSnake[newSnake.length - 1].x,
          y: newSnake[newSnake.length - 1].y
        })
      }
    }

    //Funcion para presionar la tecla y moverse a dicha direccion

    const handleKeyPress = (e) => {
      switch (e.key) {
        case "ArrowRight":
          setDirection("right")
          break;
        case "ArrowLeft":
          setDirection("left")
          break;
        case "ArrowUp":
          setDirection("up")
          break;
        case "ArrowDown":
          setDirection("down")
          break;
        default:
          break;
      }
    }

    //Deteccion de que se esta pulsando en el teclado

    window.addEventListener("keydown", handleKeyPress)

    //Funcion para limpiar en pantalla lo que hay en el juego

    const interval = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawSnake()
      drawApple()
      moveSnake()
    }, 100)

    return () => {
      clearInterval(interval)
    };
  }, [snake, direction])



  return (
    <>
      <div>
        {/* Aqui se coloca el diseño del mapa */}
        <canvas className="gameSpace" ref={canvasRef} width={750} height={420} />
      </div>
    </>
  )
}

export default GamePieces