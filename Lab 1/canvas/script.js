const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const step = 25;
const width = canvas.width;
const height = canvas.height;
const centerX = width / 2;
const centerY = height / 2;

function drawGrid() {
    context.strokeStyle = "grey";
    context.lineWidth = 0.3;
    
    for (let x = 0; x <= width; x += step) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
    }

    for (let y = 0; y <= height; y += step) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
    }
}

function drawCartesianCoordinateSystem() {
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(0, centerY);
    context.lineTo(width, centerY);
    context.stroke();
    context.beginPath();
    context.moveTo(centerX, 0);
    context.lineTo(centerX, height);
    context.stroke();

    // по іксам стрілка
    context.fillStyle = "black";
    context.beginPath();
    context.moveTo(width - 10, centerY - 5);
    context.lineTo(width, centerY);
    context.lineTo(width - 10, centerY + 5);
    context.fill();

    // по ігрикам стрілка
    context.beginPath();
    context.moveTo(centerX - 5, 10);
    context.lineTo(centerX, 0);
    context.lineTo(centerX + 5, 10);
    context.fill();

    // підпис осі x
    context.font = "12px Arial";
    context.fillStyle = "black";
    context.textAlign = "right";
    context.textBaseline = "middle";
    context.fillText("x (м)", width - 10, centerY - 15);

    // підпис осі y
    context.font = "12px Arial";
    context.fillStyle = "black";
    context.textAlign = "left";
    context.textBaseline = "middle";
    context.fillText("y (м)", centerX + 10, 10); 

    // нуль у центрі
    context.font = "10px Arial";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("0", centerX - 7, centerY + 10);

    // цифри по осям
    for (let x = step; x < width; x += step ) {
        if (x !== width / 2) {
            context.fillText((x - width / 2) / step, x, centerY + 10);
        }
    }

    for (let y = step; y < height; y += step) {
        if (y !== height / 2) {
            context.fillText((height / 2 - y) / step, centerX - 10, y);
        }
    }
}


drawGrid();
drawCartesianCoordinateSystem()

function drawGraph() {
    let x0 = parseFloat(document.getElementById("x0").value) || 0;
    let y0 = parseFloat(document.getElementById("y0").value) || 0;
    let angle = parseFloat(document.getElementById("angle").value) || 0;
    let v0 = parseFloat(document.getElementById("speed").value) || 0;
    let a = parseFloat(document.getElementById("acceleration").value) || 0;
    if (a < 0) {
        alert("При від'ємному прискоренні відображення графіку може бути некоректним. Будь ласка, введіть значення більше або рівне 0 :)");
        document.getElementById("acceleration").value = "";
        a = 0;
    }
    let color = document.getElementById("color").value;
    
    let radianAngle = angle * Math.PI / 180;
    let vx = v0 * Math.cos(radianAngle);
    let vy = v0 * Math.sin(radianAngle);
    let ax = a * Math.cos(radianAngle);
    let ay = a * Math.sin(radianAngle);
    
    for (let t = 0; t < 5; t += 0.01) {
        let x = x0 + vx * t + (0.5 * ax * t * t);
        let y = y0 + vy * t + (0.5 * ay * t * t);
    
        let canvasX = centerX + x * step;
        let canvasY = centerY - y * step;
    
        context.fillStyle = color;
        context.beginPath();
        context.arc(canvasX, canvasY, 2, 0, Math.PI * 2);
        context.fill();
    }
    
}

function clearCanvas() {
    context.clearRect(0, 0, width, height);
    drawGrid();
    drawCartesianCoordinateSystem();
}