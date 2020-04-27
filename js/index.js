const snake = document.getElementById("snake");
let speed = 5;
document.onkeydown = function(event){
    const e = event || window.event || arguments.callee.caller.arguments[0];
    if(e){
        switch (e.keyCode) {
            case 38:
                snake.style.top = snake.offsetTop - speed + "px";
                break;
            case 39:
                snake.style.left = snake.offsetLeft + speed + "px";
                break;
            case 40:
                snake.style.top = snake.offsetTop + speed + "px";
                break;
            case 37:
                snake.style.left = snake.offsetLeft - speed + "px";
                break;
            default:
                break;
        }
    }
    if (snake.offsetLeft<0 || snake.offsetLeft>580 || snake.offsetTop<0 || snake.offsetTop>580){
        alert("游戏结束！");
    }
}