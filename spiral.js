const Spiral = {
    init() {
        this.cacheDOMElements();
        if (!this.spiralContainer) {
            console.error("Required DOM element #limbo not found for spiral.js.");
            return;
        }

        this.PIXEL_SIZE = 8;
        this.FREQUENCY = 0.9;
        this.BASE_SPEED = 0.05;
        this.width = 0;
        this.height = 0;
        this.time = 0;
        this.hoverSpeed = 0;
        this.isHovered = false;

        this.setupCanvas();
        this.setupHoverEffect();
        
        this.draw = this.draw.bind(this);
        this.draw();
    },

    cacheDOMElements() {
        this.spiralContainer = document.getElementById("limbo");
    },

    setupCanvas() {
        this.spiralCanvas = document.createElement("canvas");
        this.spiralCanvas.style.position = "absolute";
        this.spiralCanvas.style.top = "0";
        this.spiralCanvas.style.left = "0";
        this.spiralCanvas.style.width = "100%";
        this.spiralCanvas.style.height = "100%";
        this.spiralCanvas.style.zIndex = "0";
        this.spiralCanvas.style.imageRendering = "pixelated";
        this.spiralContainer.prepend(this.spiralCanvas);

        this.spiralCtx = this.spiralCanvas.getContext("2d");

        const boundResize = this.resize.bind(this);
        window.addEventListener("resize", boundResize);
        window.addEventListener("load", boundResize);
        boundResize();
    },

    resize() {
        const rect = this.spiralContainer.getBoundingClientRect();
        this.width = Math.ceil(rect.width / this.PIXEL_SIZE);
        this.height = Math.ceil(rect.height / this.PIXEL_SIZE);
        this.spiralCanvas.width = this.width;
        this.spiralCanvas.height = this.height;
    },

    setupHoverEffect() {
        this.spiralContainer.addEventListener("mouseenter", () => this.isHovered = true);
        this.spiralContainer.addEventListener("mouseleave", () => this.isHovered = false);
    },

    draw() {
        const imgData = this.spiralCtx.createImageData(this.width, this.height);
        const data = imgData.data;

        const cx = this.width / 2;
        const cy = this.height / 2;

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const index = (y * this.width + x) * 4;

                const dx = (x - cx) * (this.height / this.width * 0.5);
                const dy = y - cy;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx);

                const value = Math.sin(dist * this.FREQUENCY - angle * 2 + this.time);
                
                const intensity = Math.floor((value * 0.5 + 0.5) * 200);
                
                data[index] = 0;
                data[index + 1] = 0;
                data[index + 2] = 0;
                data[index + 3] = intensity;
            }
        }

        this.spiralCtx.putImageData(imgData, 0, 0);

        if (this.isHovered) {
            this.hoverSpeed = Math.min(this.hoverSpeed + 0.01, 0.4);
        } else {
            this.hoverSpeed = Math.max(this.hoverSpeed - 0.01, 0);
        }

        const currentSpeed = this.BASE_SPEED + this.hoverSpeed;
        this.time -= currentSpeed;
        requestAnimationFrame(this.draw);
    }
};

(() => {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", Spiral.init.bind(Spiral));
    } else {
        Spiral.init();
    }
})();
