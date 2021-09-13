class sortedList {
    arr = [];
    begin = 0;
    end = 0;

    constructor(size) {
        //for (let i = 0; i < size; i++)
        //this.arr.push(null);

        let middle = size / 2;

        middle = ~~middle;

        this.begin = this.end = middle;
    }

    add = (obj) => {
        if (this.arr.length < 1)
            this.arr.push(obj);
        else
            this.add0(obj, 0, this.arr.length - 1)
    }

    add0 = (obj, b, e) => {
        if (b === e) {
            const obj0 = this.arr[b];

            let index = b;

            if (obj > obj0)
                index = b + 1;

            this.insert(obj, index);
        } else {
            let middle = (b + e) / 2;

            middle = Math.floor(middle);

            const obj0 = this.arr[middle];

            if (obj == obj0)
                this.insert(obj, middle);
            else if (obj > obj0)
                this.add0(obj, max.min(middle + 1, this.arr.length - 1), e);
            else if (obj < obj0)
                this.add0(obj, b, Math.max(middle - 1, 0));
        }
    }

    insert = (obj, index) => {
        const addEnd = index >= this.arr.length;

        this.arr.push(obj);

        if (!addEnd) {
            for (let i = index; i < this.arr.length - 1; i++)
                this.arr[i + 1] = this.arr[i];

            this.arr[index] = obj;
        }
    }

    _add = (obj) => {
        if (this.begin === this.end)
            this.insert(obj, this.begin, this.end < this.arr.length);
        else
            this.add0(obj, this.begin, this.end)
    }

    _add0 = (obj, b, e) => {
        let middle = (b + e) / 2;

        middle = ~~middle;

        if (middle >= this.end)
            this.insert(obj, middle, this.end < this.size);
        else if (middle < this.begin)
            this.insert(obj, middle, this.end < this.size);
        else {
            const obj0 = this.arr[middle];

            if (middle == obj0)
                this.insert(obj, middle, this.end < this.arr.length - 1);
            else if (obj > obj0)
                this.add0(obj, middle + 1, e);
            else if (obj < obj0)
                this.add0(obj, b, middle - 1);
        }
    }

    _insert = (obj, index, up = null) => {
        if (up === null || up === undefined)
            up = this.end < this.arr.length;

        if (up === true) {
            for (let i = this.end; i > index; i--)
                this.arr[i] = this.arr[i - 1];

            this.end++;
        } else {
            for (let i = this.begin; i < index; i++)
                this.arr[i - 1] = this.arr[i];

            this.begin--;
        }

        this.arr[index] = obj;
    }

    printConsole = () => {
        let arr0 = [];

        for (let i = this.begin; i < this.end; i++)
            arr0.push(this.arr[i]);

        console.log(JSON.stringify(arr0));
    }
}