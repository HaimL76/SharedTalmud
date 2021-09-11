const typeString = 'string';
const typeNumber = 'number';

const leftPadOneZeroOrNone0 = (num) => {
    //console.log(num);
    //console.log(typeof num);
    let out;

    if (typeof num === typeNumber)
        out = `${0}${num}`.slice(-2);

    return out;
}

const validateObject0 = (obj, arr = null) => {
    let isValid = false;

    if (obj) {
        const validArray = Array.isArray(arr) && arr.length > 0;

        if (!validArray) {
            isValid = true;
        } else {
            let foundInvalid = false;
            let index = 0;

            while (!foundInvalid && index < arr.length) {
                const p = arr[index++];

                const v = p && p in obj;

                if (!v)
                    foundInvalid = true;
            }

            if (!foundInvalid)
                isValid = true;
        }
    }

    return isValid;
}

const logLevel = 1;

const log0 = (text, level = 0) => {
    if (level >= logLevel)
        console.log(text);
}

const Utils = {
    leftPadOneZeroOrNone: (str) => {
        return leftPadOneZeroOrNone0(str);
    },
    validateObject: (obj, arr = null) => {
        return validateObject0(obj, arr);
    },
    log: (text, level = 0) => {
        return log0(text, level);
    }
};

module.exports = Utils