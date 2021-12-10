export function registerMouseDown() {
    let divs = Array.from(document.querySelector('.polygon-container').children);
    divs.forEach(div => {
        let svg = div.children[0];
        svg.addEventListener("mousedown", event => {
            if (event.currentTarget === svg) {
                svg.classList.add("clicked-letter");
                svg.style.transform = "scale(0.8)";
            }
        });
    });
};

export function registerMouseUp() {
    let divs = Array.from(document.querySelector('.polygon-container').children);
    window.addEventListener("mouseup", event => {
        divs.forEach(div => {
            let svg = div.children[0];
            if (svg.classList.contains("clicked-letter")) {
                svg.classList.remove("clicked-letter");
                svg.style.transform = "scale(1)";
            }
        })
    })
}