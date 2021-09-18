//import * as sl from './sortedList.js';

const distance10 = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

const val = "val";
const Id = "Id";
const Row = "Row";
const Col = "Col";
const Comment0 = "Comment";

const hitTest = (row, col, arrayOfArrays, threshold = 4) => {
    let obj0;

    if (Array.isArray(arrayOfArrays) && arrayOfArrays.length == 2) {
        const obj = { Row: row, Col: col };

        const arrRows = arrayOfArrays[0];
        const arrCols = arrayOfArrays[1];

        if (arrRows && Array.isArray(arrRows.arr) && arrRows.arr.length > 0 &&
            arrCols && Array.isArray(arrCols.arr)) {

            searchArray(arrCols, arrRows, obj, 0, arrRows.getLength() - 1, (obj, obj0, threshold) => distanceRow(obj, obj0));

            let found = false;
            let index = 0;

            const len = arrCols.getLength();

            if (len > 0)
                while (!found && index < len) {
                    const obj1 = arrCols.getObject(index);

                    index++;

                    const dx = Math.abs(obj1.getVal(Col) - obj.Col);

                    if (dx < threshold) {
                        const dy = obj1.getVal(Row) - obj.Row;

                        square = dx * dx + dy * dy;
                        tSquare = threshold * threshold;

                        if (square < tSquare)
                            obj0 = obj1;
                    }
                }

            /*
            let distRow;
            let distCol;

            if (clRow && val in clRow && clRow.val && Col in clRow.val) {
                const dy = Math.abs(row - clRow.key);

                if (dy < threshold) {
                    const dx = Math.abs(col - clRow.val.Col);

                    if (dx > threshold)
                        distRow = dx * dx + dy * dy;
                }
            }

            if (clCol && val in clCol && clCol.val && Row in clCol.val) {
                const dx = Math.abs(col - clCol.key);

                if (dx < threshold) {
                    const dy = Math.abs(row - clCol.val.Row);

                    if (dy < threshold)
                        distCol = dx * dx + dy * dy;
                }
            }

            return distCol < distRow ? { val: clCol, dist: distCol } : { val: clRow, dist: distRow };
            */
            return obj0;
        }
    }
}

const hitTestDistSquare = 16;

const distance1 = (obj, obj0) => Math.pow(obj.Col - obj0.Col, 2) + Math.pow(obj.Row - obj0.Row, 2);

const distanceRow = (obj, listObject) => {
    let dy;

    if (obj && Row in obj && listObject) {
        const row1 = obj.Row;
        const row2 = listObject.getVal(Row);

        dy = Math.abs(row1 - row2);
    }

    return dy;
}

const searchArray = (arrCols, list, obj, b, e, distance, threshold = 4) => {
    let distBefore;
    let distAfter;
    //if (typeof arr === )
    let middle = (b + e) / 2;

    middle = Math.floor(middle);

    const objMiddle = list.arr[middle];

    const distMiddle = distance(obj, objMiddle);

    if (distMiddle < threshold) {
        arrCols.add(objMiddle, Col);

        //let minDist = distMiddle;

        let distBeforeLowerThanThreashold = false;
        let distAfterLowerThanThreashold = false;

        let foundHigher = false;

        let index = middle;

        while (!foundHigher && index > 0) {
            index--;

            objBefore = list.arr[index];

            distBefore = distance(obj, objBefore);

            if (distBefore > threshold)
                foundHigher = true;
            else
                arrCols.add(objBefore, Col);
        }

        index = middle;

        foundHigher = false;

        while (!foundHigher && middle < list.arr.length - 1) {
            index++;

            objAfter = list.arr[index];

            distAfter = distance(obj, objAfter);

            if (distAfter > threshold)
                foundHigher = true;
            else
                arrCols.add(objAfter, Col);
        }
    } else {
        if (b < e) {
            if (middle < list.arr.length - 1) {
                objAfter = list.arr[middle + 1];

                distAfter = distance(obj, objAfter);
            }

            if (middle > 0) {
                objBefore = list.arr[middle - 1];

                distBefore = distance(obj, objBefore);
            }

            //if (distBefore < distMiddle)
            //return
            if (distBefore < distAfter)
                searchArray(arrCols, list, obj, b, middle - 1, distance);
            else
            //else if (distAfter < distMiddle)
            //return
                searchArray(arrCols, list, obj, middle + 1, e, distance);
            //else
            //  return objMiddle;
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