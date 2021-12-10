export function activateInstructionModalListener() {
    let instructionsModal = document.getElementById('instructions-modal');
    let instructionsButton = document.querySelector('.instructions');

    instructionsButton.addEventListener('click', () => {
        instructionsModal.style.display = "block";
    });

    window.addEventListener('click', (event) => {
        if (event.target === instructionsModal) {
            instructionsModal.style.display = "none";
        }
    })

}