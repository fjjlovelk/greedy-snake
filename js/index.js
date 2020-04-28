const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
// 蛇的默认位置
let snake = [
    {x: 2, y: 0},
    {x: 1, y: 0},
    {x: 0, y: 0}
];
// 食物的默认位置
const foodPos = {
    x: Math.floor( Math.random() * 20 ) *30,
    y: Math.floor( Math.random() * 20 ) *30
};
// 判断食物有没有被吃掉
let isEated = false;

setInterval(() =>{
    ctx.clearRect(0, 0, 600, 600);
    if(isEated){
        foodPos = {
            x: Math.floor( Math.random() * 20 ) *30,
            y: Math.floor( Math.random() * 20 ) *30
        };
    }
    drawFood();
    drawSnake();
    drawLine();
}, 1000/3);

// 绘制坐标系
function drawLine(){
    for(let i=1; i<20; i++){
        ctx.moveTo(0, i * 30 + 0.5);
        ctx.lineTo(600, i * 30 + 0.5);
        ctx.moveTo(i * 30 + 0.5, 0);
        ctx.lineTo(i * 30 + 0.5, 600);
    }
    ctx.strokeStyle = "#fff";
    ctx.stroke();
}
// 绘制食物
function drawFood(){
    ctx.fillStyle = "#FFC209";
    ctx.fillRect(foodPos.x, foodPos.y, 30, 30);
}
// 绘制蛇
function drawSnake(){
    ctx.fillStyle = "red";
    ctx.fillRect(snake[0].x * 30, snake[0].y * 30, 30, 30);
    ctx.fillStyle = "#33399F";
    for(let i=1; i<snake.length; i++){
        ctx.fillRect(snake[i].x * 30, snake[i].y * 30, 30, 30);
    }
    snake.pop();
    const oldHead = snake[0];
    const newHead = {
        x: oldHead.x + 1,
        y: oldHead.y
    }
    snake.unshift(newHead);
}