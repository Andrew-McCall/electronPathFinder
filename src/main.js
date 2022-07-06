const playButton = document.getElementById("play");
const editor = document.getElementById("editor").children
const clear = document.getElementById("clear");

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const SIZE = 50;
const SCALE = 10;

canvas.height = SIZE*SCALE
canvas.width = SIZE*SCALE

let data = new Array(SIZE*SIZE).fill(0);

function readData(x, y){
    return data[(x%SIZE) + (y%SIZE)*SIZE];
}
function writeData(x, y, value){
    data[(x%SIZE) + (y%SIZE)*SIZE] = value;
}

function calculate(){
    let start = null;
    let goal = null;
    for (let x = 0; x < SIZE; x++){
        for (let y = 0; y < SIZE; y++){
            const current = readData(x,y);
            if (current === 2) {
                start = {x,y}
                if (goal != null){
                    break;
                }
            }
            else if(current == 3) {
                goal = {x,y}
                if (start != null){
                    break;
                }
            }
        }
    }

    if (!start || !goal){
        console.log("TODO: Error for no start/goal")
    }else{
        
    }
    



}

function updateCanvas(){
    for (let x = 0; x < SIZE; x++){
        for (let y = 0; y < SIZE; y++){
            switch (readData(x,y)){
                case 0:
                    ctx.fillStyle = 'white'; 
                    break;
                case 1:
                    ctx.fillStyle = 'black'; 
                    break;
                case 2:
                    ctx.fillStyle = 'green';
                    break;
                case 3:
                    ctx.fillStyle = 'red'; 
                    break;
                case 5:
                    ctx.fillStyle = 'pink'; 
                    break;
            }
            ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
        }
    }
    calculate();
}
updateCanvas()

clear.onclick = (e) => {
    data = new Array(SIZE*SIZE).fill(0);
}

let pen = 0;
let isMouseDown = false;
editor[0].disabled = true;

for (let i = 0; i<editor.length; i++){
    editor[i].onclick = (e) =>{
        editor[pen].disabled = false;
        editor[i].disabled = true;
        pen = i;
    }
}

const rect = canvas.getBoundingClientRect()

canvas.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    const x = Math.floor((e.x - rect.left)/SCALE)
    const y = Math.floor((e.y - rect.top)/SCALE)
    if (pen === 2 || pen === 3){
        deleteType(pen)
    }
    writeData(x, y, pen);
    updateCanvas()
})

canvas.addEventListener("mouseup", (e) => {
    isMouseDown = false;
})

canvas.addEventListener("mousemove", (e) =>{
    if (isMouseDown){
        const x = Math.floor((e.x - rect.left)/SCALE)
        const y = Math.floor((e.y - rect.top)/SCALE)
        if (x > SIZE || x < 0 || y > SIZE || y < 0){
            return;
        }
        if (pen === 2 || pen === 3){
            deleteType(pen)
        }
        writeData(x, y, pen);
        updateCanvas()
    }
})

function deleteType(value){
    for (let x = 0; x < SIZE; x++){
        for (let y = 0; y < SIZE; y++){
            if (readData(x,y) === value) {
                writeData(x,y, 0)
            }
        }
    }
}

