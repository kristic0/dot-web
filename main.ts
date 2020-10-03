const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let DotArray: Array<Dot> = [];

function randomIntFromInterval(min, max) {
    let r = Math.floor(Math.random() * (max - min + 1) + min);
    if (r !== 0) return r;
}

interface IVector2 {
    x: number;
    y: number;
}

class Dot {
    xPos: number;
    yPos: number;
    speed: IVector2;
    size: number;
    color: string;

    constructor(
        xPos: number,
        yPos: number,
        speed: IVector2,
        size: number,
        color: string
    ) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.speed = speed;
        this.size = size;
        this.color = color;
    }

    init() {
        this.xPos += this.speed.x;
        this.yPos += this.speed.y;

        if (this.xPos > canvas.width || this.xPos < 0) this.speed.x *= -1;
        if (this.yPos > canvas.height || this.yPos < 0) this.speed.y *= -1;

        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, this.size, Math.PI * 2, 0);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

(function initializeDots() {
    const speedConst = 3;
    for (let i = 0; i < 100; i++) {
        let randomX = Math.floor(Math.random() * canvas.width);
        let randomY = Math.floor(Math.random() * canvas.height);
        let randomSize = randomIntFromInterval(2, 6);
        let speed: IVector2 = {
            x: randomIntFromInterval(-speedConst, speedConst),
            y: randomIntFromInterval(-speedConst, speedConst),
        };

        DotArray.push(new Dot(randomX, randomY, speed, randomSize, 'white'));
    }
})();

(function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    DotArray.forEach((element) => {
        element.init();
    });

    for (let i = 0; i < DotArray.length; i++) {
        for (let j = i; j < DotArray.length; j++) {
            let alpha = 0;
            let diffX = DotArray[i].xPos - DotArray[j].xPos;
            let diffY = DotArray[i].yPos - DotArray[j].yPos;

            const accel = 0;

            if (DotArray[j].speed.x != 0 && DotArray[j].speed.x > 0) {
                DotArray[j].speed.x -= accel;
            } else if (DotArray[j].speed.x != 0 && DotArray[j].speed.x < 0) {
                DotArray[j].speed.x += accel;
            }

            if (DotArray[j].speed.y != 0 && DotArray[j].speed.y > 0) {
                DotArray[j].speed.y -= accel;
            } else if (DotArray[j].speed.y != 0 && DotArray[j].speed.y < 0) {
                DotArray[j].speed.y += accel;
            }

            let radius = 120;
            let isTrue =
                diffX < radius &&
                diffX > -radius &&
                diffY < radius &&
                diffY > -radius;

            if (isTrue) {
                alpha = 1 - (Math.abs(diffX) + Math.abs(diffY)) / 200;
                ctx.beginPath();
                ctx.moveTo(DotArray[i].xPos, DotArray[i].yPos);
                ctx.lineTo(DotArray[j].xPos, DotArray[j].yPos);
                ctx.closePath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.stroke();
                ctx.fill();
            }
        }
    }

    requestAnimationFrame(update);
})();
