const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const SIZE = 25;
const SCALE = 20;

canvas.height = SIZE*SCALE
canvas.width = SIZE*SCALE

let data = new Array(SIZE*SIZE).fill(0);

function readData(x, y){
    return data[(x%SIZE) + (y%SIZE)*SIZE];
}
function writeData(x, y, value){
    data[(x%SIZE) + (y%SIZE)*SIZE] = value;
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
                    ctx.fillStyle = 'red';
                    break;
                case 3:
                    ctx.fillStyle = 'blue'; 
                    break;
            }
            ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
        }
    }
}
updateCanvas()