document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("my-canvas");
    const context = canvas.getContext("2d");

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const fontSize = 20;
    const fontFamily = "Arial";
    const fontColor = "yellow";

    context.font = `${fontSize}px ${fontFamily}`;
    context.fillStyle = fontColor;

    context.textAlign = "center";
    context.textBaseline = "middle";

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "blue";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = fontColor;

    const characterToDraw = "A";

    context.fillText(characterToDraw, centerX, centerY);

    function getPixelColors() {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const pixelColors = [];

        for (let i = 0; i < imageData.data.length; i += 4) {
            const r = imageData.data[i];
            const g = imageData.data[i + 1];
            const b = imageData.data[i + 2];
            const hexColor = rgbToHex(r, g, b);
            pixelColors.push(hexColor);
        }

        const pixelColorsText = pixelColors.join("\n");

        const dataUri = "data:text/plain;charset=utf-8," + encodeURIComponent(pixelColorsText);

        const downloadLink = document.getElementById("downloadLink");
        downloadLink.href = dataUri;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function componentToHex(c) {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    document.getElementById("downloadLink").addEventListener("click", getPixelColors);
});