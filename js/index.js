const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
let snake = [
    {x: 2, y: 0},
    {x: 1, y: 0},
    {x: 0, y: 0},
]
drawFood();
drawSnake();

// 绘制坐标系
for(let i=1; i<20; i++){
    ctx.moveTo(0, i * 30 + 0.5);
    ctx.lineTo(600, i * 30 + 0.5);
    ctx.moveTo(i * 30 + 0.5, 0);
    ctx.lineTo(i * 30 + 0.5, 600);
}
ctx.strokeStyle = "#fff";
ctx.stroke();

// 绘制食物
function drawFood(){
    const x = Math.floor( Math.random() * 20 ) *30;
    const y = Math.floor( Math.random() * 20 ) *30;
    ctx.fillStyle = "#FFC209";
    ctx.fillRect(x, y, 30, 30);
}

// 绘制蛇
function drawSnake(){
    ctx.fillStyle = "red";
    ctx.fillRect(snake[0].x * 30, snake[0].y * 30, 30, 30);
    ctx.fillStyle = "#33399F";
    for(let i=1; i<snake.length; i++){
        ctx.fillRect(snake[i].x * 30, snake[i].y * 30, 30, 30);
    }
}