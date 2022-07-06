const playButton = document.getElementById("play");
const editor = document.getElementById("editor").children
const clear = document.getElementById("clear");

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const SIZE = 10;
const SCALE = 50;

canvas.height = SIZE * SCALE
canvas.width = SIZE * SCALE

let data = new Array(SIZE * SIZE).fill(0);

function readData(x, y) {
    return data[(x % SIZE) + (y % SIZE) * SIZE];
}
function writeData(x, y, value) {
    data[(x % SIZE) + (y % SIZE) * SIZE] = value;
}

function calculate() {
    function surrounding(coords) {
        const current = distance[coords.x + coords.y * SIZE]
        current.complete = true;
        for (let dx = -1; dx < 2; dx++){
            for (let dy = -1; dy < 2; dy++) {
                if (dx === 0 && dy === 0) continue;
                const cx = coords.x+dx;
                const cy = coords.y+dy;
                if (readData(cx, cy) !== 1 && cx >= 0 &&  cx < SIZE && cy >= 0 && cy < SIZE){
                    
                    if (null === distance[cx + cy * SIZE]){
                        distance[cx + cy * SIZE] = {to:Math.abs(goal.x-cx) + Math.abs(goal.y-cy),from:current.from+1,path:coords, x:cx, y:cy, complete:false}
                    }else if (distance[cx + cy * SIZE].from > current.from+1){
                        distance[cx + cy * SIZE].from = current.from+1;
                        distance[cx + cy * SIZE].path = coords;
                    }
                }
            }
        } 
        lowest = start;
    }
    let distance = new Array(SIZE * SIZE).fill(null);

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
        console.log("TODO: Error for no start/goal")
    } else {
        distance[start.x + start.y * SIZE] = {to:Math.abs(start.x-goal.x) + Math.abs(start.y-goal.x),from:0,path:{x:start.x, y:start.y}, x:start.x, y:start.y}
        start = distance[start.x + start.y * SIZE]

        let lowest = start;
        while (lowest.to !== 0){
            surrounding(lowest, distance)
            let lowestDistance = lowest.to + lowest.to + lowest.from
            for (let x = 0; x < SIZE; x++) {
                for (let y = 0; y < SIZE; y++) {
                    const current = distance[x + y * SIZE]
                    if (current && !current.complete){
                        const currentDistance = current.to + current.to + current.from
                        if (lowestDistance > currentDistance){
                            lowestDistance = currentDistance;
                            lowest = current;
                        }
                    }
                }
            }
        }

        while (lowest.from !== 0){
            ctx.fillStyle = 'pink';
            ctx.fillRect(lowest.x * SCALE, lowest.y * SCALE, SCALE, SCALE);
            let currentLowest = lowest
            for (let dx = -1; dx < 2; dx++){
                for (let dy = -1; dy < 2; dy++) {
                    if (dx === 0 && dy === 0) continue;
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


    }

}

function updateCanvas() {
    for (let x = 0; x < SIZE; x++) {
        for (let y = 0; y < SIZE; y++) {
            switch (readData(x, y)) {
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
}
updateCanvas()

playButton.onclick = (e) => {
    calculate();
}

clear.onclick = (e) => {
    data = new Array(SIZE * SIZE).fill(0);
}

let pen = 0;
let isMouseDown = false;
editor[0].disabled = true;

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

