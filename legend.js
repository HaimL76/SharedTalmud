class legendItem {
    constructor(id, name) {
        this.itemId = id;
        this.itemName = name;
    }

    itemId = null;

    itemName = "";

    itemStyle = null;

    setColor = (color) => this.itemStyle.color = color;

    itemChecked = false;

    getCheckbox = () => `<input type="checkbox" id=${this.itemId} name="${this.itemName}" />`;
}

class legend {
    constructor(element, url) {
        this.myElement = element;

        this.theUrl = url;
    }

    items = null; //new Map();

    myElement = null;

    theUrl = null;

    buildItems = async() => {
        const items0 = new Map();

        await $.ajax({
            type: "GET",
            url: this.theUrl,
            success: function(data) {
                if (Array.isArray(data) && data.length > 0) {
                    data.forEach(arr => {
                        const itemId = arr.Id;
                        const itemName = arr.Name;

                        const item = new legendItem(itemId, itemName);

                        items0.set(itemId, item);
                    });
                }
            }
        });

        return items0;
    }

    build = async() => {
        this.items = await this.buildItems();

        this.items.forEach(pair => {
            let str = "";

            str += "<ul>";
            str += "<li>";
            str += pair.getCheckbox();


            str += `<input type="color" id="color_${pair.itemId}" onchange="clickColor(0, -1, -1, 5)" value="#ff0000"></input>`


            str += "</li>";
            str += "</ul>";

            $(`#${this.myElement}`).append(str);
        });
    }
}