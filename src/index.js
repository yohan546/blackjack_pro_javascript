import "./styles/index.scss";
import Canvas from "./scripts/canvas"

const Game = require('./game')
document.addEventListener("DOMContentLoaded", startCanvas)

function startCanvas() {
    console.log('hello');

    const game = new Game();
    const canvas = new Canvas()
    canvas.createCanvas();
  
}
