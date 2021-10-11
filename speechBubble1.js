const drawBubble1 = (text, canvas, radius, shpitzPercent = null) => {
    if (!shpitzPercent || shpitzPercent < 0)
        shpitzPercent = 10;

    if (shpitzPercent > 100)
        shpitzPercent = 50;

    //dispRow = y + top - 35 - canvas.height;
    //dispCol = 28; //x + left;

    //canvas.style.left = dispCol + "px";
    //canvas.style.top = dispRow + "px";

    var context = canvas.getContext("2d");

    // Set rectangle and corner values
    var rectX = 5;
    var rectY = 5;

    const totalHeight = canvas.height - rectY;
    const totalWidth = canvas.width - rectX;

    var rectWidth = canvas.width - rectX;
    var rectHeight = totalHeight * (100 - shpitzPercent) / 100;

    var cornerRadius = 5;

    // Reference rectangle without rounding, for size comparison
    //context.fillRect(200, 50, rectWidth, rectHeight);

    // Set faux rounded corners
    context.lineJoin = "round";
    context.lineWidth = cornerRadius;
    context.fillStyle = '#8ED6FF';
    // Change origin and dimensions to match true size (a stroke makes the shape a bit larger)
    //context.strokeRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
    //context.fillRect(
    //  rectX, // + (cornerRadius / 2),
    //rectY, // + (cornerRadius / 2),
    //rectWidth, // - cornerRadius,
    //rectHeight); // - cornerRadius);

    const shpitzHeight = totalHeight - rectHeight;
    const shpitzWidth = totalWidth * shpitzPercent / 100;

    context.beginPath();

    context.arc(radius, radius, radius, 3 * Math.PI / 2, Math.PI, true);
    context.lineTo(0, rectHeight - radius); //Startpoint (x, y)
    context.arc(radius, rectHeight - radius, radius, Math.PI, Math.PI / 2, true);
    context.lineTo(radius, totalHeight); //Startpoint (x, y)
    context.lineTo(radius + shpitzWidth, rectHeight); //Startpoint (x, y)
    context.lineTo(rectWidth - radius, rectHeight); //Startpoint (x, y)
    context.arc(rectWidth - radius, rectHeight - radius, radius, Math.PI / 2, 0, true);
    context.lineTo(rectWidth, radius); //Startpoint (x, y)
    context.arc(rectWidth - radius, radius, radius, 0, 3 * Math.PI / 2, true);

    //context.moveTo(rectX, rectY + rectHeight); //Startpoint (x, y)
    //context.lineTo(rectX, rectY + rectHeight + shpitzHeight); //Startpoint (x, y)
    //context.lineTo(rectX + shpitzWidth, rectY + rectHeight); //Startpoint (x, y)
    //context.lineTo(80, 85); //Point 1    (x, y)
    //context.lineTo(90, 69); //Point 2    (x, y)
    context.closePath();
    context.fillStyle = '#00FFFF';
    context.strokeStyle = '#000000';
    context.lineJoin = "bevel";
    context.lineWidth = 1;
    context.stroke();
    context.fill();

    // You can do the same thing with paths, like this triangle
    // Remember that a stroke will make the shape a bit larger so you'll need to fiddle with the
    // coordinates to get the correct dimensions.
    //context.beginPath();

    //context.moveTo(rectX, rectY + rectHeight); //Startpoint (x, y)
    //context.lineTo(rectX, rectY + rectHeight + shpitzHeight); //Startpoint (x, y)
    //context.lineTo(rectX + shpitzWidth, rectY + rectHeight); //Startpoint (x, y)
    //context.lineTo(80, 85); //Point 1    (x, y)
    //context.lineTo(90, 69); //Point 2    (x, y)
    //context.closePath();
    //context.fillStyle = '#8ED6FF';
    //context.strokeStyle = '#8ED6FF';
    //context.lineJoin = "bevel";
    //context.lineWidth = 1;
    //context.stroke();
    //context.fill();

    const measure = context.measureText(text);

    const textWidth = measure.width;

    let fontHeight = measure.fontBoundingBoxAscent + measure.fontBoundingBoxDescent;
    let actualHeight = measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent;

    const arr = wrapText(text, textWidth, actualHeight, rectWidth, rectHeight, radius);

    context.fillStyle = "#000000"; //<======= and here

    let index = 0;

    const height = rectHeight - 2 * radius;

    let h = radius;

    while (index < arr.length && h < height) {
        let line = arr[index];

        index++;

        context.fillText(line, radius, h);

        h += (actualHeight + 5);
    }
}

const wrapText = (text, textWidth, textHeight, rectWidth, rectHeight, radius) => {
    let arr = [];

    const width = rectWidth - 2 * radius;

    const div = textWidth / width;

    const len = text.length / div;

    let index = 0;

    while (index < text.length) {
        arr.push(text.substr(index, len));

        index += len;
    }

    return arr;
}