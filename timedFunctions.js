const typenum = 'number';
const typefunc = 'function';

const intervalFunction = function(interval, timestamp, func) {
    if (typeof func === typefunc && typeof timestamp === typenum && typeof interval === typenum) {
        const ts = Date.now();

        if ((ts - timestamp) > interval) {
            timestamp = ts;

            func();
        }

        return timestamp;
    }
}