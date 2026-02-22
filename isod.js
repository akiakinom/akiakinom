const Isod = {
    init() {
        this.cacheDOMElements();
        if (!this.isodContainer || !this.isod || !this.label) {
            console.error("Required DOM elements not found for isod.js.");
            return;
        }
        this.setupSkewEffect();
        this.setupShadowEffect();
        this.setupCanvasAnimation();
    },

    cacheDOMElements() {
        this.isodContainer = document.getElementById("isod-container");
        this.isod = document.getElementById('isod');
        this.label = this.isod ? this.isod.querySelector('span') : null;
    },

    setupSkewEffect() {
        this.isod.addEventListener('mousemove', (e) => {
            const rect = this.isod.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distanceX = 1.2 * (e.clientX - centerX) / (rect.width / 2);
            const distanceY = 1.2 * (e.clientY - centerY) / (rect.height / 2);
            const skewDeg = distanceX * 20 * distanceY;
            const scaleVal = 1 + Math.pow(distanceY, 2) * 0.5;
            this.label.style.transform = `skew(${skewDeg}deg) scaleY(${scaleVal})`;
        });

        this.isod.addEventListener('mouseleave', () => {
            this.label.style.transform = 'skew(0deg) scaleY(1)';
        });
    },

    setupShadowEffect() {
        let isHovered = false;
        this.isod.addEventListener('mouseenter', () => isHovered = true);
        this.isod.addEventListener('mouseleave', () => isHovered = false);

        setInterval(() => {
            if (!this.label) return;
            const shadow = document.createElement('span');
            shadow.innerText = this.label.innerText;
            shadow.className = 'isod-shadow';

            const radius = isHovered ? 100 : 60;
            const angle = Math.random() * Math.PI * 2;
            const tx = Math.cos(angle) * radius;
            const ty = Math.sin(angle) * radius;

            shadow.style.setProperty('--tx', `${tx}px`);
            shadow.style.setProperty('--ty', `${ty}px`);
            shadow.style.transform = `translate(-50%, -50%) ${this.label.style.transform}`;
            
            this.isodContainer.appendChild(shadow);

            setTimeout(() => {
                shadow.remove();
            }, 1000);
        }, 100);
    },

    setupCanvasAnimation() {
        const canvas = document.createElement("canvas");
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.zIndex = "0";
        this.isod.prepend(canvas);

        const ctx = canvas.getContext("2d");

        const resizeCanvas = () => {
            const rect = this.isod.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        let barY = 0;
        let barHeight = 4;
        let speed = 2;
        let direction = 1;
        const backgroundColor = "black";

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "rgba(255, 255, 0, 0.5)";

            ctx.fillRect(0, barY, canvas.width, barHeight);

            barY += speed * direction;

            if (barY + barHeight > canvas.height) {
                barY = 0;
                direction = -1;
            } else if (barY < 0) {
                direction = 1;
                barY = 0;
            }
            
            requestAnimationFrame(draw);
        };

        draw();
    }
};

(() => {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", Isod.init.bind(Isod));
    } else {
        Isod.init();
    }
})();
