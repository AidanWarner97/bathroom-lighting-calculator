document.getElementById('lengthForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the values from the form
    const gapMillimeters = parseFloat(document.getElementById('gap').value);
    const incrementMillimeters = parseInt(document.getElementById('lengthType').value);

    // Available lengths for each type
    const availableLengths25 = [500, 1000, 2000, 3000];
    const availableLengths21 = [1000, 2000, 3000];

    // Choose the appropriate available lengths based on the selected increment
    const availableLengths = incrementMillimeters === 25 ? availableLengths25 : availableLengths21;

    // Find the smallest available length that can be cut to fit into the gap
    let suggestedLength = null;
    let cutLength = null;

    for (let length of availableLengths) {
        if (length >= gapMillimeters) {
            // Calculate the largest multiple of the increment that fits into the gap
            const maxFit = Math.floor(gapMillimeters / incrementMillimeters) * incrementMillimeters;
            suggestedLength = length;
            cutLength = maxFit;
            break;
        }
    }

    if (suggestedLength !== null && cutLength !== null) {
        // Convert the suggested length and cut length back to meters
        const suggestedLengthMeters = suggestedLength / 1000;
        const cutLengthMeters = cutLength / 1000;
        document.getElementById('result').textContent = `You should purchase a length of ${suggestedLengthMeters.toFixed(0)} meters and cut it to ${cutLength} milimeters.`;
    } else {
        document.getElementById('result').textContent = `No suitable length found to fit the gap.`;
    }
});