const svg = d3.select("#chart svg");
const width = parseInt(svg.attr("width"));
const height = parseInt(svg.attr("height"));
const step = 25;
const centerX = width / 2;
const centerY = height / 2;


function drawGrid() {
    // лінії по x
    let lineStepsX = d3.range(0, width, step);
    for (let i = 0; i < lineStepsX.length; i++) {
        let lineCoordinate = lineStepsX[i];
        svg.append("line")
            .attr("x1", lineCoordinate)
            .attr("y1", 0)
            .attr("x2", lineCoordinate)
            .attr("y2", height)
            .attr("stroke", "grey")
            .attr("stroke-width", 0.3);
    }

    // лінії по y
    let lineStepsY = d3.range(0, height, step);
    for (let i = 0; i < lineStepsY.length; i++) {
        let lineCoordinate = lineStepsY[i];
        svg.append("line")
            .attr("x1", 0)
            .attr("y1", lineCoordinate)
            .attr("x2", width)
            .attr("y2", lineCoordinate)
            .attr("stroke", "grey")
            .attr("stroke-width", "0.3px");
    }
    
}

function drawCartesianCoordinateSystem() {
    // вісь x
    svg.append("line")
        .attr("x1", 0)
        .attr("y1", centerY)
        .attr("x2", width)
        .attr("y2", centerY)
        .attr("stroke", "black")
        .attr("stroke-width", "2px");

    // вісь y
    svg.append("line")
        .attr("x1", centerX)
        .attr("y1", 0)
        .attr("x2", centerX)
        .attr("y2", height)
        .attr("stroke", "black")
        .attr("stroke-width", "2px");

    // стрілка по x
    svg.append("path")
        .attr("d", `M ${width - 10} ${centerY - 5} L ${width} ${centerY} L ${width - 10} ${centerY + 5} Z`);
    
    // стрілка по y
    svg.append("path")
        .attr("d", `M ${centerX - 5} 10 L ${centerX} 0 L ${centerX + 5} 10 Z`);

    // підпис осі x
    svg.append("text")
        .attr("x", width - 10)
        .attr("y", centerY - 10)
        .attr("text-anchor", "end")
        .attr("font-size", "12px")
        .text("x (м)");

    // підпис осі y
    svg.append("text")
        .attr("x", centerX + 10)
        .attr("y", 10)
        .attr("text-anchor", "start")
        .attr("font-size", "12px")
        .text("y (м)");

    // нумерація по осі x
    let numberingStepsX = d3.range(step, width, step);
    for (let i = 0; i < numberingStepsX.length; i++) {
    let numbersCoordinate = numberingStepsX[i];
    svg.append("text")
        .attr("x", numbersCoordinate)
        .attr("y", centerY + 15)
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .text(function() {
            if (numbersCoordinate === centerX) {
                return "";
            } else {
                return (numbersCoordinate - centerX) / step;
            }
        });
    }

    // нумерація по осі y
    let numberingStepsY = d3.range(step, height, step);
    for (let i = 0; i < numberingStepsY.length; i++) {
    let numbersCoordinate = numberingStepsY[i];
    svg.append("text")
        .attr("x", centerX - 5)
        .attr("y", height - numbersCoordinate + 3)
        .attr("text-anchor", "end")
        .attr("dominant-baseline", "middle")
        .attr("font-size", "10px")
        .text(function() {
            if (numbersCoordinate === centerY) {
                return "";
            } else {
                return (numbersCoordinate - centerY) / step;
            }
        });
    }

    // нуль посередині системи координат
    svg.append("text")
        .attr("x", centerX - 7)
        .attr("y", centerY + 15)
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .text("0");

}

drawGrid();
drawCartesianCoordinateSystem();

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

    let points = [];

    for (let t = 0; t < 5; t += 0.01) {
        let x = x0 + vx * t + (0.5 * ax * t * t);
        let y = y0 + vy * t + (0.5 * ay * t * t);

        let svgX = x * step + centerX;
        let svgY = -y * step + centerY;

        if (svgX > width || svgY > height) break;

        points.push({x: svgX, y: svgY});
    }

    for (let i = 0; i < points.length; i++) {
        svg.append("circle")
            .attr("class", "chartPoints")
            .attr("cx", points[i].x)
            .attr("cy", points[i].y)
            .attr("r", "2px")
            .attr("fill", color);
    }
}

function clearChart() {
    svg.selectAll(".chartPoints").remove();
}