const box = document.getElementById("box");
const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");
const overDiv = document.getElementById("over");
const overTip = document.getElementById("over-tip");
let timer;
let isPause = false;
let isStart = false;
let isOver = false;

// 食物的构造方法
class DrawFood {
    constructor() {
        this.width = 3;
        this.height = 3;
    }
    display(){
        const f = document.createElement("div");
        this.state = f;
        f.style.width = this.width + "rem";
        f.style.height = this.height + "rem";
        f.style.backgroundColor = "red";
        f.style.position = "absolute";
        this.x = Math.floor(Math.random() * 20);
        this.y = Math.floor(Math.random() * 20);
        f.style.left = this.x * this.width + "rem";
        f.style.top = this.y * this.height + "rem";
        box.appendChild(f);
    }
}
const food = new DrawFood();

// 蛇的构造方法
class DrawSnake {
    constructor() {
        this.width = 3;
        this.height = 3;
        this.direction = "right";
        this.body = [
            {x: 2, y: 0},
            {x: 1, y: 0},
            {x: 0, y: 0}
        ]
    }
    display() {
        for(let i=0; i<this.body.length; i++){
            const s = document.createElement("div");
            this.body[i].state = s;
            s.style.width = this.width + "rem";
            s.style.height = this.height + "rem";
            if(i===0){
                s.style.backgroundColor = "green";
                s.style.zIndex = 10;
            }else{
                s.style.backgroundColor = "#93CAAB";
            }
            s.style.position = "absolute";
            s.style.left = this.body[i].x * this.width + "rem";
            s.style.top = this.body[i].y * this.height + "rem";
            box.appendChild(s);
        }
    }
    move() {
        clearInterval(timer);
        timer = setInterval(() => {
            // 清除蛇的身体
            for(let i=0; i<this.body.length; i++){
                if(this.body[i].state){
                    box.removeChild(this.body[i].state);
                }
            }
            // 吃到食物不删除最后一节，相当于增长一节
            if(this.body[0].x == food.x && this.body[0].y == food.y){
                score1.innerText ++;
                box.removeChild(food.state);
                food.display();
            }else{
                this.body.pop();
            }
            // 添加新的蛇头
            const newHead = {
                x: this.body[0].x,
                y: this.body[0].y
            };
            switch (this.direction) {
                case "up":
                    newHead.y -= 1;
                    break;
                case "right":
                    newHead.x += 1;
                    break;
                case "down":
                    newHead.y += 1;
                    break;
                case "left":
                    newHead.x -= 1;
                    break;
            }
            this.body.unshift(newHead);
            this.display();
            // 蛇头碰到边界游戏结束
            if(newHead.x < 0 || newHead.x >= 20 || newHead.y < 0 || newHead.y >= 20){
                overGame()
            }
            // 蛇头碰到身体游戏结束
            for(let i=1; i<this.body.length; i++){
                if(this.body[0].x === this.body[i].x && this.body[0].y === this.body[i].y){
                    overGame();
                }
            }
            
        }, 1000/3);
    }
}
const snake = new DrawSnake();

// 开始游戏
function startGame(){
    if(isStart) {
        return;
    }else{
        food.display();
        snake.display();
        snake.move();
        isStart = true;
    }
}
// 暂停游戏
function pauseGame(){
    if(isStart){
        overDiv.style.display = "flex";
        overTip.style.display = "none";
        clearInterval(timer);
        isPause = true;
    }
}
// 重新开始
function reStart(){
    box.innerHTML = "";
    isStart = false;
    isPause = false;
    clearInterval(timer);
    overDiv.style.display = "none";
    snake.direction = "right";
    snake.body = [
        {x: 2, y: 0},
        {x: 1, y: 0},
        {x: 0, y: 0}
    ]
    score1.innerText = 0;
    startGame();
    console.log(snake.body);
}
// 返回游戏
function backGame(){
    if(isOver){
        window.location.reload();
    }else{
        overDiv.style.display = "none";
        snake.move();
        isPause = false;
    }
}
// 游戏结束
function overGame(){
    clearInterval(timer);
    isOver = true;
    score2.innerText = score1.innerText;
    overDiv.style.display = "flex";
    overTip.style.display = "inline-block";
}

// 4个控制按键
function toUp(){
    if(snake.direction != "down"){
        snake.direction = "up";
    }
}
function toRight(){
    if(snake.direction != "left"){
        snake.direction = "right";
    }
}
function toDown(){
    if(snake.direction != "up"){
        snake.direction = "down";
    }
}
function toLeft(){
    if(snake.direction != "right"){
        snake.direction = "left";
    }
}


// 监听键盘方向键
document.addEventListener("keydown", (event)=>{
    const e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && !isPause){
        switch (e.keyCode) {
            case 38:
                toUp();
                break;
            case 39:
                toRight();
                break;
            case 40:
                toDown();
                break;
            case 37:
                toLeft();
                break;
        }
    }
})
