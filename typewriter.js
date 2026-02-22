
document.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('hover-char')) {
        const target = e.target;
        target.style.top = '1px';
        if (e.target.classList.contains('yellow')) {
            target.style.color = 'hsl(48, 100%, 80%)';
        } else {
            target.style.color = 'hsl(261, 100%, 80%)';
        }
        
        const prev = target.previousElementSibling;
        if (prev && prev.classList.contains('hover-char')) {
            prev.style.top = '0.5px';
            if (prev.classList.contains('yellow')) {
                prev.style.color = 'hsl(48, 100%, 90%)';
            } else {
                prev.style.color = 'hsl(261, 100%, 90%)';
            }
        }
        
        const next = target.nextElementSibling;
        if (next && next.classList.contains('hover-char')) {
            next.style.top = '0.5px';
            if (next.classList.contains('yellow')) {
                next.style.color = 'hsl(48, 100%, 90%)';
            } else {
                next.style.color = 'hsl(261, 100%, 90%)';
            }
        }
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('hover-char')) {
        const target = e.target;
        target.style.top = '';
        target.style.color = '';
        
        const prev = target.previousElementSibling;
        if (prev && prev.classList.contains('hover-char')) {
            prev.style.top = '';
            prev.style.color = '';
        }
        
        const next = target.nextElementSibling;
        if (next && next.classList.contains('hover-char')) {
            next.style.top = '';
            next.style.color = '';
        }
    }
});

function wrapCharacters(element) {
    if (['weather_value', 'spotify_value', 'time_value', 'hrt_timer', 'hrt'].includes(element.id)) return;
    if (element.classList && element.classList.contains('link')) return;
    
    if (element.hasChildNodes()) {
        Array.from(element.childNodes).forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                if (child.textContent.trim().length > 0) {
                    const newHtml = Array.from(child.textContent).map(char => {
                        if (char.trim() === '') return char;
                        if (element.classList.contains("isod")) {
                            return `<span class="hover-char yellow">${char}</span>`;
                        }
                        return `<span class="hover-char">${char}</span>`;
                    }).join('');
                    
                    const wrapper = document.createElement('span');
                    wrapper.innerHTML = newHtml;
                    child.replaceWith(...wrapper.childNodes);
                }
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                if (!['SCRIPT', 'STYLE', 'IMG', 'BR', 'CANVAS', 'SVG', 'META', 'LINK'].includes(child.tagName)) {
                   wrapCharacters(child);
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const main = document.getElementById('main');
    if (main) wrapCharacters(main);
    
    const spiral = document.getElementById('limbo');
    if (spiral) wrapCharacters(spiral);
});
