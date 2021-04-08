class Canvas {
    constructor(props) {
        this.canvas = document.createElement("canvas")
        this.coords = [0,0,600,350]
        this.fillColor = 'green'
        this.canvas.width = 300
        this.canvas.height = 300
        this.ctx = this.canvas.getContext("2d")
    }

    createCanvas() {
        document.body.append(this.canvas)
    }

    setColor(color) {
        this.fillColor = color;
        document.body.style.backgroundColor = color;
  }
}

export default Canvas;