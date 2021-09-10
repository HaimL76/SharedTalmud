const typenum = 'number';
const typefunc = 'function';

const intervalFunction = function(interval, timestamp, countdown, func) {
    if (typeof func === typefunc && typeof timestamp === typenum && typeof interval === typenum && typeof countdown === typenum) {
        const ts = Date.now();

        if ((ts - timestamp) > interval) {
            timestamp = ts;

            countdown--;

            func(countdown);
        }

        return [timestamp, countdown];
    }
}