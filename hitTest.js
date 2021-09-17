//import * as sl from './sortedList.js';

const distance10 = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

const val = "val";
const Id = "Id";
const Row = "Row";
const Col = "Col";
const Comment0 = "Comment";

const hitTest = (comments, row, col, arrayOfArrays, threshold = 4) => {
    if (Array.isArray(arrayOfArrays) && arrayOfArrays.length == 2) {
        const obj = { Row: row, Col: col };

        const arrRows = arrayOfArrays[0];
        const arrCols = arrayOfArrays[1];

        if (arrRows && Array.isArray(arrRows.arr) && arrRows.arr.length > 0 &&
            arrCols && Array.isArray(arrCols.arr) && arrCols.arr.length > 0) {
            const clRow = searchArray(arrRows, obj, 0, arrRows.arr.length - 1, (obj, obj0) => distance0(obj, obj0));
            const clCol = searchArray(arrCols, obj, 0, arrCols.arr.length - 1, (obj, obj0) => distance0(obj, obj0));

            let distRow;
            let distCol;

            if (clRow && val in clRow && clCol.val && Col in clCol.val) {
                const x = clCol.val.Col;
                const y = clRow.key;

                distRow = x * x + y * y;
            }

            if (clCol && val in clCol && clCol.val && Row in clCol.val) {
                const y = clCol.val.Row;
                const x = clCol.key;

                distCol = x * x + y * y;
            }

            return distCol < distRow ? { val: clCol, dist: distCol } : { val: clRow, dist: distRow };
        }
    }
}

const hitTestDistSquare = 16;

const distance1 = (obj, obj0) => Math.pow(obj.Col - obj0.Col, 2) + Math.pow(obj.Row - obj0.Row, 2);

const distance0 = (obj, obj0) => Math.abs(obj.key - obj0.key);

const searchArray = (list, obj, b, e, distance, threshold = 4) => {
    //if (typeof arr === )
    let middle = (b + e) / 2;

    middle = Math.floor(middle);

    const objMiddle = list.arr[middle];

    const distMiddle = distance(obj, objMiddle);

    let minDist = distMiddle;

    let distBefore = distMiddle;
    let distAfter = distMiddle;

    if (middle > 0) {
        objBefore = list.arr[middle - 1];
        distBefore = distance(obj, objBefore);
    }

    if (middle < list.arr.length - 1) {
        objAfter = list.arr[middle + 1];
        distAfter = distance(obj, objAfter);
    }

    if (distBefore < distMiddle)
        return searchArray(list, obj, b, middle - 1, distance);
    else if (distAfter < distMiddle)
        return searchArray(list, obj, middle + 1, e, distance);
    else
        return objMiddle;
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