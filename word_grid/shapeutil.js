const ShapeUtil = {

    createSVGelement(letter) {
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("height", 105);
        svg.setAttribute("width", 105);
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.classList.add(`${letter}-container`);
        let container = document.querySelector(".polygon-container");
        container.appendChild(svg);
    },

    createHexagon(letter) {
        let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polygon.setAttribute("points", "50 3, 100 28, 100 75, 50 100, 3 75, 3 28");
        polygon.setAttribute("stroke", "black");
        polygon.setAttribute("fill", "yellow");
        polygon.setAttribute("stroke-width", "5");
        let svg = document.querySelector(`.${letter}-container`);
        let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", "50%");
        text.setAttribute("y", "50%");
        text.setAttribute("dy", ".3em");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("stroke-width", "2px");
        text.innerHTML = letter;
        svg.appendChild(polygon);
        svg.appendChild(text);
    }
};

export { ShapeUtil };