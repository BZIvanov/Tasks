function handleCommand(event) {
    event.preventDefault();
    const userInput = event.target.parentNode.userInput.value;
    event.target.parentNode.userInput.value = '';
    if (userInput === '') {
        return;
    }
    
    const isValidInput = validateUserInput(userInput);
    if (isValidInput) {
        const handlers = {
            'I': createCanvas,
            'C': clearCanvas,
            'L': colourPixel,
            'V': drawVerticalLine,
            'H': drawHorizontalLine,
            'F': fillRegion,
            'S': showContent,
            'X': terminateSession
        };
        const command = userInput[0];
        handlers[command](userInput);
    } else {
        invalidInputNotification(userInput);
    }
}
