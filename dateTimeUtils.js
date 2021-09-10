const dateSeperator = "/";
const timeSeperator = ":";
const dateTimeSeparator = " ";
const leadingZero = 0;

const utils = require('./Utils.js')

const formatDateTime0 = (dateTime, isUtc = false) => {
    const dt = dateTime;

    const year = isUtc ? dt.getUtcFullYear() : dt.getFullYear();
    const month = isUtc ? dt.getUTCMonth() : dt.getMonth();
    const day = isUtc ? dt.getUTCDate() : dt.getDate();
    const hour = isUtc ? dt.getUTCHours() : dt.getHours();
    const minute = isUtc ? dt.getUTCMinutes() : dt.getMinutes();
    const second = isUtc ? dt.getUTCSeconds() : dt.getSeconds();

    //console.log(year);
    //console.log(month);
    //console.log(day);

    const strMonth = utils.leftPadOneZeroOrNone(month + 1);
    const strDay = utils.leftPadOneZeroOrNone(day);
    const strHour = utils.leftPadOneZeroOrNone(hour);
    const strMinute = utils.leftPadOneZeroOrNone(minute);
    const strSecond = utils.leftPadOneZeroOrNone(second);

    var strDate = `${year}${dateSeperator}${strMonth}${dateSeperator}${strDay}`;
    var strTime = `${strHour}${timeSeperator}${strMinute}${timeSeperator}${strSecond}`;

    var strDateTime = `${strDate}${dateTimeSeparator}${strTime}`;
    //("0" + (month + 1)).slice(-2) + dateSeperator +
    //("0" + dt.getUTCDate()).slice(-2) + dateTimeSeparator +
    //("0" + dt.getUTCHours()).slice(-2) + timeSeperator +
    //("0" + dt.getUTCMinutes()).slice(-2) + timeSeperator +
    //("0" + dt.getUTCSeconds()).slice(-2);

    console.log(strDateTime);

    return strDateTime;
}

var DateTimeUtils = {
    formatDateTime: (dateTime, isUtc = false) => {
        formatDateTime0(dateTime, isUtc);
    }
};

module.exports = DateTimeUtils