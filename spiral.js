const spiralContainer = document.getElementById("limbo");

// Create canvas
const spiralCanvas = document.createElement("canvas");
spiralCanvas.style.position = "absolute";
spiralCanvas.style.top = "0";
spiralCanvas.style.left = "0";
spiralCanvas.style.width = "100%";
spiralCanvas.style.height = "100%";
spiralCanvas.style.zIndex = "0";
spiralCanvas.style.imageRendering = "pixelated"; 
spiralContainer.prepend(spiralCanvas);

const spiralCtx = spiralCanvas.getContext("2d");

const PIXEL_SIZE = 8;
const FREQUENCY = 0.9;
const BASE_SPEED = 0.05;
let width, height;

function resize() {
    const rect = spiralContainer.getBoundingClientRect();
    width = Math.ceil(rect.width / PIXEL_SIZE);
    height = Math.ceil(rect.height / PIXEL_SIZE);
    spiralCanvas.width = width;
    spiralCanvas.height = height;
}

window.addEventListener("resize", resize);
window.addEventListener("load", resize);
resize();

let isHovered = false;
spiralContainer.addEventListener("mouseenter", () => isHovered = true);
spiralContainer.addEventListener("mouseleave", () => isHovered = false);

let time = 0;
let hoverSpeed = 0;

function draw() {
    const imgData = spiralCtx.createImageData(width, height);
    const data = imgData.data;

    const cx = width / 2;
    const cy = height / 2;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;

            const dx = (x - cx) * (height / width * 0.5);
            const dy = y - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);

            const value = Math.sin(dist * FREQUENCY - angle * 2 + time);
            
            const intensity = Math.floor((value * 0.5 + 0.5) * 200); 
            
            // rgb(142, 81, 255)
            data[index] = 0;
            data[index + 1] = 0;
            data[index + 2] = 0;
            data[index + 3] = intensity;
        }
    }

    spiralCtx.putImageData(imgData, 0, 0);

    if (isHovered) {
        hoverSpeed = Math.min(hoverSpeed + 0.01, 0.4);
    } else {
        hoverSpeed = Math.max(hoverSpeed - 0.01, 0);
    }

    const currentSpeed = BASE_SPEED + hoverSpeed;
    time -= currentSpeed;
    requestAnimationFrame(draw);
}

draw();
