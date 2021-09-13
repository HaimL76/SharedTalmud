class sortedList {
    arr = [];
    begin = 0;
    end = 0;

    constructor(size) {
        for (let i = 0; i < size; i++)
            this.arr.push(null);

        let middle = size / 2;

        middle = ~~middle;

        this.begin = this.end = middle;
    }

    add = (obj) => {
        if (this.begin === this.end)
            this.insert(obj, this.begin, this.end < this.arr.length);
        else
            this.add0(obj, this.begin, this.end)
    }

    add0 = (obj, b, e) => {
        let middle = (b + e) / 2;

        middle = ~~middle;

        const obj0 = this.arr[middle];

        if (middle == obj0)
            this.insert(obj, middle, this.end < this.arr.length - 1);
        else if (obj > obj0)
            this.add0(obj, middle + 1, e);
        else if (obj < obj0)
            this.add0(obj, b, middle - 1);
    }

    insert = (obj, index, up = null) => {
        if (up === null)
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