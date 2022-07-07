const playButton = document.getElementById("play");
const editor = document.getElementById("editor").children

const output = document.getElementById("log");

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const SIZE = 50;
const SCALE = 10;

canvas.height = SIZE * SCALE
canvas.width = SIZE * SCALE

let data = new Array(SIZE * SIZE).fill(0);

function readData(x, y) {
    return data[(x % SIZE) + (y % SIZE) * SIZE];
}
function writeData(x, y, value) {
    data[(x % SIZE) + (y % SIZE) * SIZE] = value;
}

let distance = new Array(SIZE * SIZE).fill(null);
async function  calculate() {
    
    function surrounding(current) {
        current.complete = true;
        for (let dx = -1; dx < 2; dx++){
            for (let dy = -1; dy < 2; dy++) {
                if (dx !== 0 && dy !== 0 )continue;
                const cx = current.x+dx;
                const cy = current.y+dy;
                if (readData(cx, cy) !== 1 && cx >= 0 &&  cx < SIZE && cy >= 0 && cy < SIZE){
                    if (null === distance[cx + cy * SIZE]){
                        distance[cx + cy * SIZE] = {to:(Math.abs(cx-goal.x) + Math.abs(cy-goal.y)),from:current.from+1,path:{x:current.x, y:current.y}, x:cx, y:cy, complete:false}
                    }else if (distance[cx + cy * SIZE].from > current.from+1){
                        distance[cx + cy * SIZE].from = current.from+1;
                        distance[cx + cy * SIZE].path = {x:current.x, y:current.y};
                    }
                }
            }
        } 
    }

    output.innerHTML = "A* Path Finding Algorithm"
    output.style = "color: black;"  

    distance = new Array(SIZE * SIZE).fill(null);

    let start = null;
    let goal = null;
    for (let x = 0; x < SIZE; x++) {
        for (let y = 0; y < SIZE; y++) {
            const current = readData(x, y);
            if (current === 2) {
                start = { x, y }
                if (goal != null) {
                    break;
                }
            }
            else if (current == 3) {
                goal = { x, y }
                if (start != null) {
                    break;
                }
            }
        }
    }

    if (!start || !goal) {
        output.innerHTML = "No Start or Finish"
        output.style = "color: red;"
    } else {
        distance[start.x + start.y * SIZE] = {to:99999,from:0,path:{x:start.x, y:start.y}, x:start.x, y:start.y}
        start = distance[start.x + start.y * SIZE]
        ctx.fillStyle="grey"
        let lowest = [start];
        while (lowest[0].to !== 0){
            for (let i = 0; i < lowest.length; i++) {
                surrounding(lowest[i])
                ctx.fillRect(lowest[i].x * SCALE, lowest[i].y * SCALE, SCALE, SCALE);
            }
            await new Promise(resolve => setTimeout(resolve, 250));
            lowest = [start];

            let lowestDistance = 999999
            for (let x = 0; x < SIZE; x++) {
                for (let y = 0; y < SIZE; y++) {
                    const current = distance[x + y * SIZE]
                    if (current && !current.complete){
                        const currentDistance = current.to
                        if (lowestDistance > currentDistance){
                            lowestDistance = currentDistance
                            lowest = [current];
                        }else if (lowestDistance === currentDistance){
                            lowest.push(current)
                        }
                    }
                }
            }
            
            if (lowest[0] === start){
                break;
            }
        }
        
        lowest = distance[goal.x + goal.y * SIZE]
        if (lowest){
            while (lowest.from !== 0){
                ctx.fillStyle = 'pink';
                ctx.fillRect(lowest.x * SCALE, lowest.y * SCALE, SCALE, SCALE);
                let currentLowest = lowest
                for (let dx = -1; dx < 2; dx++){
                    for (let dy = -1; dy < 2; dy++) {
                        if (dx !== 0 && dy !== 0) continue;
                        const cx = lowest.x+dx;
                        const cy = lowest.y+dy;
                        if (cx >= 0 &&  cx < SIZE && cy >= 0 && cy < SIZE){
                            const current = distance[cx + cy * SIZE]
                            if (current && current.from < currentLowest.from){
                                currentLowest = current;
                            }
                        }
                        
                    }
                }
                lowest = currentLowest
            }
        }else{
            output.innerHTML = "Impossible Path"
            output.style = "color: red;"
        }
    }
}

function updateCanvas() {
    for (let x = 0; x < SIZE; x++) {
        for (let y = 0; y < SIZE; y++) {
            
            switch (readData(x, y)) {
                case 0:
                    //ctx.fillStyle = distance[x+y*SIZE]?'grey':'white';
                    ctx.fillStyle = 'white'
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
}
updateCanvas()

playButton.onclick = (e) => {
    calculate();
}

let pen = 1;
let isMouseDown = false;
editor[1].disabled = true;

for (let i = 0; i < editor.length; i++) {
    editor[i].onclick = (e) => {
        editor[pen].disabled = false;
        editor[i].disabled = true;
        pen = i;
    }
}

const rect = canvas.getBoundingClientRect()

canvas.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    const x = Math.floor((e.x - rect.left) / SCALE)
    const y = Math.floor((e.y - rect.top) / SCALE)
    if (pen === 2 || pen === 3) {
        deleteType(pen)
    }
    writeData(x, y, pen);
    updateCanvas()
})

canvas.addEventListener("mouseup", (e) => {
    isMouseDown = false;
})

canvas.addEventListener("mousemove", (e) => {
    if (isMouseDown) {
        const x = Math.floor((e.x - rect.left) / SCALE)
        const y = Math.floor((e.y - rect.top) / SCALE)
        if (x > SIZE || x < 0 || y > SIZE || y < 0) {
            return;
        }
        if (pen === 2 || pen === 3) {
            deleteType(pen)
        }
        writeData(x, y, pen);
        updateCanvas()
    }
})

function deleteType(value) {
    for (let x = 0; x < SIZE; x++) {
        for (let y = 0; y < SIZE; y++) {
            if (readData(x, y) === value) {
                writeData(x, y, 0)
            }
        }
    }
}

