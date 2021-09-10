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

var Utils = {
    leftPadOneZeroOrNone: (str) => {
        return leftPadOneZeroOrNone0(str);
    }
};

module.exports = Utils