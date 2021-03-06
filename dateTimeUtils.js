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
    const ms = isUtc ? dt.getUTCMilliseconds() : dt.getMilliseconds();

    //console.log(year);
    //console.log(month);
    //console.log(day);

    const strMonth = utils.leftPadOneZeroOrNone(month + 1);
    const strDay = utils.leftPadOneZeroOrNone(day);
    const strHour = utils.leftPadOneZeroOrNone(hour);
    const strMinute = utils.leftPadOneZeroOrNone(minute);
    const strSecond = utils.leftPadOneZeroOrNone(second);

    var strDate = `${year}${dateSeperator}${strMonth}${dateSeperator}${strDay}`;
    var strTime = `${strHour}${timeSeperator}${strMinute}${timeSeperator}${strSecond}.${ms}`;

    var strDateTime = `${strDate}${dateTimeSeparator}${strTime}`;

    //console.log(strDateTime);

    return strDateTime;
}

var DateTimeUtils = {
    formatDateTime: (dateTime, isUtc = false) => {
        return formatDateTime0(dateTime, isUtc);
    }
};

module.exports = DateTimeUtils