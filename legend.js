class legendItem {
    constructor(cb, id, name) {
        this.itemId = id;
        this.itemName = name;
        this.callback = cb;
    }

    callback = null;

    itemId = null;

    itemName = "";

    itemStyle = null;

    setColor = (color) => {
        if (!this.itemStyle)
            this.itemStyle = {
                color: 0
            };

        this.itemStyle.color = color;
    }

    itemChecked = false;

    getCheckbox = () => `<input type="checkbox" id=${this.itemId} name="${this.itemName}" />`;
}

class legend {
    constructor(cb, element, url) {
        this.myElement = element;

        this.theUrl = url;

        this.callback = cb;
    }

    callback = null;

    items = null; //new Map();

    myElement = null;

    theUrl = null;

    buildItems = async() => {
        const items0 = new Map();

        const cb = this.callback;

        await $.ajax({
            type: "GET",
            url: this.theUrl,
            success: function(data) {
                if (Array.isArray(data) && data.length > 0) {
                    data.forEach(arr => {
                        const itemId = arr.Id;
                        const itemName = arr.Name;

                        const item = new legendItem(cb, itemId, itemName);

                        items0.set(itemId, item);
                    });
                }
            }
        });

        return items0;
    }

    getColorItem = (itemId) => {
        if (itemId > 0 && this.items && this.items.has(itemId))
            return this.items.get(itemId);
    }

    build = async() => {
        const cb = this.callback;

        this.items = await this.buildItems();

        const myItems = this.items;

        myItems.forEach(item => {
            let str = "";

            str += "<ul class=aks>";
            str += "<li>";
            str += item.getCheckbox();

            const itemId = `color_${item.itemId}`;

            str += `<input type="color" id="${itemId}" value="#ff0000"></input>`

            str += item.itemName;

            str += "</li>";
            str += "</ul>";

            $(`#${this.myElement}`).append(str);

            //$('input[type=color]').on('input',
            $(`#${itemId}`).on('input', (e) => {
                const elem0 = e.target;

                const color0 = elem0.value;

                const itemId = elem0.id;

                if (itemId) {
                    const arr = itemId.split("_");

                    if (Array.isArray(arr) && arr.length == 2 && arr[1]) {
                        const id = parseInt(arr[1]);

                        if (this.items.has(id)) {
                            const item0 = this.items.get(id);

                            if (item0) {
                                item0.setColor(color0);

                                console.log(color0);

                                if (cb)
                                    cb(color0);
                            }
                        }
                    }
                }
            });
        });
    }
}