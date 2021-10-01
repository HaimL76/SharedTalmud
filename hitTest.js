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

            searchArray(arrCols, arrRows, obj, 0, arrRows.getLength() - 1, null, null, checkedObjects); //, (obj, obj0, threshold) => distanceRow(obj, obj0));

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
};

const rowDistance = (p1, p2) => p1.Row - p2.val.Row;

const threshold = {
    Distance: 4,
    Squared: 16
};

const setPoint = (index, distance) => {
    return {
        index: index,
        distance: distance
    };
};

const copyPoint = (point) => {
    return {
        index: point.index,
        distance: point.distance
    };
};

const setDoubleIndexPoint = (point, index, distance, threshold = null) => {
    if (point === null)
        point = {
            min: index,
            max: index,
            distance: distance
        };

    if (Math.abs(distance) < Math.abs(threshold)) {
        if (index < point.min)
            point.min = index;

        if (index > point.max)
            point.max = index;

        distance = 0;
    } else {
        if (Math.abs(distance) < Math.abs(point.distance) || index < point.min)
            point.min = index;

        if (Math.abs(distance) < Math.abs(point.distance) || index > point.max)
            point.max = index;

        point.distance = distance;
    }

    return point;
}

const searchArray = (arrCols, list, obj, b, e, prevPoint = null, minPoint = null, checkedObjects = null) => {
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

    if (Math.abs(rowDistMiddle) < Math.abs(threshold.Distance)) {
        const pointDistMiddle = pointDistance(obj, objMiddle);

        if (pointDistMiddle < threshold.Squared) {
            arrCols.add(objMiddle, Col);

            return;
        }

        prevPoint = setPoint(middle, rowDistMiddle);

        minPoint = setDoubleIndexPoint(minPoint, prevPoint.index, prevPoint.distance, threshold.Distance);

        if (middle > b)
            searchArray(arrCols, list, obj, b, middle - 1, prevPoint, minPoint, checkedObjects);

        if (middle < e)
            searchArray(arrCols, list, obj, middle + 1, e, prevPoint, minPoint, checkedObjects);
    } else {
        if (prevPoint === null) {
            prevPoint = setPoint(middle, rowDistMiddle);

            minPoint = setDoubleIndexPoint(minPoint, prevPoint.index, prevPoint.distance, threshold.Distance);

            if (middle > b)
                searchArray(arrCols, list, obj, b, middle - 1, prevPoint, minPoint, checkedObjects);

            if (middle < e)
                searchArray(arrCols, list, obj, middle + 1, e, prevPoint, minPoint, checkedObjects);
        } else {
            const prevPointTemp = prevPoint;
            const minPointTemp = minPoint;

            prevPoint = setPoint(middle, rowDistMiddle);

            let prevMin = null;
            let currMin = null;

            if (minPoint && "min" in minPoint)
                prevMin = minPoint.min;

            minPoint = setDoubleIndexPoint(minPoint, prevPoint.index, prevPoint.distance);

            if (minPoint && "min" in minPoint)
                currMin = minPoint.min;

            if (Math.abs(currMin) && Math.abs(prevMin)) {
                if (middle > b) // && middle > prevPointTemp.index)
                    searchArray(arrCols, list, obj, b, middle - 1, prevPoint, minPoint, checkedObjects);

                if (middle < e) // && middle < prevPointTemp.index)
                    searchArray(arrCols, list, obj, middle + 1, e, prevPoint, minPoint, checkedObjects);
            } else {
                if (Math.abs(rowDistMiddle) > Math.abs(prevPointTemp.distance)) {
                    if (middle > b && middle > prevPointTemp.index)
                        searchArray(arrCols, list, obj, b, middle - 1, prevPoint, minPoint, checkedObjects);

                    if (middle < e && middle < prevPointTemp.index)
                        searchArray(arrCols, list, obj, middle + 1, e, prevPoint, minPoint, checkedObjects);
                } else {
                    if (minPoint.distance > 0 && rowDistMiddle > minPoint.distance) {
                        const a = 0;
                    } else if (minPoint.distance < 0 && rowDistMiddle < minPoint.distance) {
                        const a = 0;
                    } else {
                        if (middle > b)
                            searchArray(arrCols, list, obj, b, middle - 1, prevPoint, minPoint, checkedObjects);

                        if (middle < e)
                            searchArray(arrCols, list, obj, middle + 1, e, prevPoint, minPoint, checkedObjects);
                    }













                    /*
                                        if (middle < e && middle > prevPointTemp.index) {
                                            if (middle < minPointTemp.min)
                                                searchArray(arrCols, list, obj, middle + 1, e, prevPoint, minPoint, checkedObjects);
                                            else if (middle > b)
                                                searchArray(arrCols, list, obj, b, middle - 1, prevPoint, minPoint, checkedObjects);
                                        }

                                        if (middle > b && middle < prevPointTemp.index) {
                                            if (middle > minPointTemp.max)
                                                searchArray(arrCols, list, obj, b, middle - 1, prevPoint, minPoint, checkedObjects);
                                            else if (e < middle)
                                                searchArray(arrCols, list, obj, middle + 1, e, prevPoint, minPoint, checkedObjects);
                                        }
                                        */
                }
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