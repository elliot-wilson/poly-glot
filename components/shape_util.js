const ShapeUtil = {

    createSVGelement(letter) {
        let div = document.createElement('div');
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        
        svg.setAttribute("height", 100);
        svg.setAttribute("width", 100);
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("viewBox", "0 0 105 105");
        svg.classList.add(`${letter}-container`);
        
        let container = document.querySelector(".polygon-container");
        container.appendChild(div);
        div.appendChild(svg);
        
        return svg;
    },

    createHexagon(letter) {
        let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        
        polygon.setAttribute("points", "50 3, 100 28, 100 75, 50 100, 3 75, 3 28");
        
        let svg = document.querySelector(`.${letter}-container`);
        let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        
        text.setAttribute("x", "50%");
        text.setAttribute("y", "50%");
        text.setAttribute("dy", ".3em");
        
        text.innerHTML = letter;
        
        svg.appendChild(polygon);
        svg.appendChild(text);
        
        return polygon;
    },

    shuffleArray(array) {
        let currentIndex = array.length;
        let randomIndex;

        while (currentIndex != 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }

};

export { ShapeUtil };