const drawBubble1 = (canvas, left, top, x, y) => {
    dispRow = y + top - 35 - canvas.height;
    dispCol = 28; //x + left;

    canvas.style.left = dispCol + "px";
    canvas.style.top = dispRow + "px";

    var context = canvas.getContext("2d");

    // Set rectangle and corner values
    var rectX = 5;
    var rectY = 5;
    var rectWidth = canvas.width;
    var rectHeight = canvas.height - 142;
    var cornerRadius = 5;

    // Reference rectangle without rounding, for size comparison
    //context.fillRect(200, 50, rectWidth, rectHeight);

    // Set faux rounded corners
    context.lineJoin = "round";
    context.lineWidth = cornerRadius;
    context.fillStyle = '#8ED6FF';
    // Change origin and dimensions to match true size (a stroke makes the shape a bit larger)
    //context.strokeRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
    context.fillRect(
        rectX, // + (cornerRadius / 2),
        rectY, // + (cornerRadius / 2),
        rectWidth, // - cornerRadius,
        rectHeight); // - cornerRadius);

    // You can do the same thing with paths, like this triangle
    // Remember that a stroke will make the shape a bit larger so you'll need to fiddle with the
    // coordinates to get the correct dimensions.
    context.beginPath();
    context.moveTo(rectX, rectY + rectHeight); //Startpoint (x, y)
    context.lineTo(rectX, rectY + rectHeight + 100); //Startpoint (x, y)
    context.lineTo(rectX + 42, rectY + rectHeight); //Startpoint (x, y)
    //context.lineTo(80, 85); //Point 1    (x, y)
    //context.lineTo(90, 69); //Point 2    (x, y)
    context.closePath();
    context.fillStyle = '#8ED6FF';
    context.strokeStyle = '#8ED6FF';
    context.lineJoin = "bevel";
    context.lineWidth = 1;
    context.stroke();
    context.fill();
}