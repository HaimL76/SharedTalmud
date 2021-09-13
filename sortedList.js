class sortedList {
    arr = [];

    constructor(size) {
        for (i = 0; i < size; i++)
            this.arr.push(null);
    }

    begin = end = 0;

    add(obj) {
        this.add(obj, this.begin, this.end)
    }

    add(obj, b, e) {
        if (b > this.end) {
            this[b] = obj;
        } else if (e < this.begin) {
            this[e] = obj;
        } else {
            middle = (b + e) / 2;

            const obj0 = arr[middle];

            if (middle == obj0)
                this.insert(obj, middle, this.end < this.arr.length - 1);
            else if (obj > obj0)
                this.add(obj, index + 1, e);
            else if (obj < obj0)
                this.add(obj, b, index - 1);
        }
    }

    insert(obj, index, up) {
        if (up) {
            for (i = end; i > index; i--)
                arr[i + 1] = arr[i];

            end++;
        } else {
            for (i = begin; i < index; i++)
                arr[i - 1] = arr[i];

            begin--;
        }

        arr[index] = obj;
    }
}