//import * as sl from './sortedList.js';

const distance10 = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

const val = "val";
const Id = "Id";
const Comment0 = "Comment";

const hitTest = (comments, row, col, arrayOfArrays) => {
    if (Array.isArray(arrayOfArrays) && arrayOfArrays.length == 2) {
        const objRow = { key: row };
        const objCol = { key: col };

        const arrRows = arrayOfArrays[0];
        const arrCols = arrayOfArrays[1];

        const clRow = searchArray(arrRows, objRow, 0, arrRows.arr.length - 1, (obj, obj0) => distance0(obj, obj0));
        const clCol = searchArray(arrCols, objCol, 0, arrCols.arr.length - 1, (obj, obj0) => distance0(obj, obj0));

        let objRow0;
        let objCol0;

        if (clRow && val in clRow && comments.has(clRow.val))
            objRow0 = comments.get(clRow.val);

        if (clCol && val in clCol && comments.has(clCol.val))
            objCol0 = comments.get(clCol.val);

        const obj = { Row: row, Col: col };

        const distRow = distance1(objRow0, obj);

        const distCol = distance1(objCol0, obj);

        return distCol < distRow ? { val: objCol, dist: distCol } : { val: objRow, dist: distRow };
    }
}

const distance1 = (obj, obj0) => Math.sqrt(Math.pow(obj.col - obj0.col, 2) + Math.pow(obj.row - obj0.row, 2));

const distance0 = (obj, obj0) => Math.abs(obj.key - obj0.key);

const searchArray = (list, obj, b, e, distance) => {
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