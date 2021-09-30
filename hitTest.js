const val = "val";
const Id = "Id";
const Row = "Row";
const Col = "Col";
const Comment0 = "Comment";

const hitTest = (row, col, arrayOfArrays, threshold = {
    Distance: 4,
    Squared: 16
}, maxList = 1) => {
    let obj0;

    if (Array.isArray(arrayOfArrays) && arrayOfArrays.length == 2) {
        const obj = { Row: row, Col: col };

        const arrRows = arrayOfArrays[0];
        const arrCols = arrayOfArrays[1];

        if (arrRows && Array.isArray(arrRows.arr) && arrRows.arr.length > 0 &&
            arrCols && Array.isArray(arrCols.arr)) {

            const checkedObjects = [];

            searchArray(arrCols, arrRows, obj, 0, arrRows.getLength() - 1, null, threshold, maxList, checkedObjects); //, (obj, obj0, threshold) => distanceRow(obj, obj0));

            let found = false;
            let index = 0;

            const len = arrCols.getLength();

            if (len > 0)
                while (!found && index < len) {
                    const obj1 = arrCols.getObject(index);

                    index++;

                    const dx = Math.abs(obj1.getVal(Col) - obj.Col);

                    if (dx < threshold.Distance) {
                        const dy = obj1.getVal(Row) - obj.Row;

                        square = dx * dx + dy * dy;
                        tSquare = threshold.Squared;

                        if (square < tSquare)
                            obj0 = obj1;
                    }
                }

            return obj0;
        }
    }
}

const pointDistance = (p1, p2) => {
    const dx = p1.Col - p2.val.Col;
    const dy = p1.Row - p2.val.Row;

    return dx * dx + dy * dy;
}

const rowDistance = (p1, p2) => Math.abs(p1.Row - p2.val.Row);

const searchArray = (arrCols, list, obj, b, e, prevMiddle = null, threshold = {
    Distance: 4,
    Squared: 16
}, maxList = 1, checkedObjects = null) => {
    let distBefore;
    let distAfter;

    if (e < b)
        return;

    const middle = Math.floor((b + e) / 2);

    const objMiddle = list.arr[middle];

    const rowDistMiddle = rowDistance(obj, objMiddle);

    if (Array.isArray(checkedObjects))
        checkedObjects.push({
            index: middle,
            row: objMiddle.val.Row,
            col: objMiddle.val.Col,
            dist: rowDistMiddle
        });

    if (rowDistMiddle < threshold.Distance) {
        const pointDistMiddle = pointDistance(obj, objMiddle);

        if (pointDistMiddle < threshold.Squared)
            arrCols.add(objMiddle, Col);

        let foundHigher = false;

        let index = middle;

        while (!foundHigher && index > 0 && arrCols.arr.length < maxList) {
            index--;

            objBefore = list.arr[index];

            rowDistBefore = rowDistance(obj, objBefore);

            if (rowDistBefore > threshold.Distance) {
                foundHigher = true;
            } else {
                pointDistBefore = pointDistance(obj, objBefore);

                if (pointDistBefore < threshold.Squared)
                    arrCols.add(objBefore, Col);
            }
        }

        index = middle;

        foundHigher = false;

        while (!foundHigher && index < list.arr.length - 1 && arrCols.arr.length < maxList) {
            index++;

            objAfter = list.arr[index];

            rowDistAfter = rowDistance(obj, objAfter);

            if (rowDistAfter > threshold.Distance) {
                foundHigher = true;
            } else {
                pointDistAfter = pointDistance(obj, objAfter);

                if (pointDistAfter < threshold.Squared)
                    arrCols.add(objAfter, Col);
            }
        }
    } else {
        const newPrevMiddle = {
            Location: middle,
            Distance: rowDistMiddle
        };

        if (!prevMiddle) {
            if (middle > b)
                searchArray(arrCols, list, obj, b, middle - 1, newPrevMiddle, threshold, maxList, checkedObjects);

            if (middle < e)
                searchArray(arrCols, list, obj, middle + 1, e, newPrevMiddle, threshold, maxList, checkedObjects);
        } else {
            let prevMiddleDistance;
            let prevMiddleLocation;

            if ("Location" in prevMiddle)
                prevMiddleLocation = prevMiddle.Location;

            if ("Distance" in prevMiddle)
                prevMiddleDistance = prevMiddle.Distance;

            if (rowDistMiddle > prevMiddleDistance) {
                if (middle > prevMiddle.Location)
                    searchArray(arrCols, list, obj, b, middle - 1, newPrevMiddle, threshold, maxList, checkedObjects);
                else
                    searchArray(arrCols, list, obj, middle + 1, e, newPrevMiddle, threshold, maxList, checkedObjects);
            } else {
                if (middle > b)
                    searchArray(arrCols, list, obj, b, middle - 1, newPrevMiddle, threshold, maxList, checkedObjects);

                if (middle < e)
                    searchArray(arrCols, list, obj, middle + 1, e, newPrevMiddle, threshold, maxList, checkedObjects);
                /*
                let rowDistMiddleLower;
                let rowDistMiddleUpper;

                let middleLower;
                let middleUpper;

                if (middle > b) {
                    middleLower = Math.floor((b + middle - 1) / 2);

                    const objMiddleLower = list.arr[middleLower];

                    rowDistMiddleLower = rowDistance(obj, objMiddleLower);
                }

                if (middle < e) {
                    middleUpper = Math.floor((middle + 1 + e) / 2);

                    const objMiddleUpper = list.arr[middleUpper];

                    rowDistMiddleUpper = rowDistance(obj, objMiddleUpper);
                }

                if (middle > 0 && rowDistMiddleLower <= rowDistMiddleUpper)
                    searchArray(arrCols, list, obj, b, middleUpper - 1, null, threshold, maxList, checkedObjects);

                if (middle < list.arr.length - 1 && rowDistMiddleUpper <= rowDistMiddleLower)
                    searchArray(arrCols, list, obj, middleLower + 1, e, null, threshold, maxList, checkedObjects);
                    */
            }
        }
    }
}

// Naive method, to be replaced with a proper one.
const hitTest0 = (col, row, arr) => {
    let dist = 0;
    let obj = null;

    if (Array.isArray(arr) && arr.length > 0)
        arr.forEach(element => {
            const x2 = element[2];
            const y2 = element[3];

            const d = distance(col, row, x2, y2);

            if (d < dist || obj === null) {
                obj = element;

                dist = d;
            }
        });

    return obj;
}