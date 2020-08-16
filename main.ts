const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let DotArray: Array<Dot> = [];

function randomIntFromInterval(min, max) {
    let r = Math.floor(Math.random() * (max - min + 1) + min);
    if (r !== 0) return r;
}

class Dot {
    xPos: number;
    yPos: number;
    xDir: number;
    yDir: number;
    size: number;
    color: string;

    constructor(
        xPos: number,
        yPos: number,
        xDir: number,
        yDir: number,
        size: number,
        color: string
    ) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.xDir = xDir;
        this.yDir = yDir;
        this.size = size;
        this.color = color;
    }

    draw() {
        this.xPos += this.xDir;
        this.yPos += this.yDir;

        if (this.xPos > canvas.width || this.xPos < 0) this.xDir *= -1;
        if (this.yPos > canvas.height || this.yPos < 0) this.yDir *= -1;

        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, this.size, Math.PI * 2, 0);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

(function initializeDots() {
    for (let i = 0; i < 100; i++) {
        let randomX = Math.floor(Math.random() * canvas.width);
        let randomY = Math.floor(Math.random() * canvas.height);
        let randomSize = Math.random() * 4 + 1;
        let dirX = randomIntFromInterval(-3, 3);
        let dirY = randomIntFromInterval(-3, 3);

        DotArray.push(
            new Dot(randomX, randomY, dirX, dirY, randomSize, 'white')
        );
    }
})();

(function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    DotArray.forEach((element) => {
        element.draw();
    });

    for (let i = 0; i < DotArray.length; i++) {
        for (let j = i; j < DotArray.length; j++) {
            let diffX = DotArray[i].xPos - DotArray[j].xPos;
            let diffY = DotArray[i].yPos - DotArray[j].yPos;

            let radius = 120;
            if (
                diffX < radius &&
                diffX > -radius &&
                diffY < radius &&
                diffY > -radius
            ) {
                ctx.beginPath();
                ctx.moveTo(DotArray[i].xPos, DotArray[i].yPos);
                ctx.lineTo(DotArray[j].xPos, DotArray[j].yPos);
                ctx.strokeStyle = '#ff11ff';
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(update);
})();
