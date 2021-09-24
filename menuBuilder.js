//import $ = require("jquery");

class menuItem {

    constructor(parent, lName, arr, indexId = 0, indexName = 1) {
        if (arr) {
            this.ident = arr[indexId];

            this.name = arr[indexName];
        }

        this.myParent = parent;

        this.levelName = lName;

        this.level = this.myParent ? this.myParent.level + 1 : 0;
    }

    level = null;

    levelName = null;

    ident = 0;

    name = "root";

    myParent = null;

    childItems = [];

    myUl = null;

    buildItems(data, lName) {
        if (Array.isArray(data) && data.length > 0)
            data.forEach(arr => this.childItems.push(new menuItem(this, lName, arr)));
    }

    addToParent = () => {
        const parentIdent = `${parent.levelName}_${parent.ident}`;

        const myIdent = `${this.levelName}_${this.ident}`;

        $(`#${parentIdent}`).append(`<li id="${myIdent}"><span class="caret">${this.name}</span></li>`);
    }
}

class menuBuilder {
    constructor(levels) {
        this.arrLevels = levels;
    }

    arrLevels = null;

    async buildMenuItem(item) {
        if (!item)
            item = new menuItem(0, null, null, null);

        const levelData = this.arrLevels[item.level];

        const api = levelData.api;
        const lName = levelData.name;

        let theUrl = api;

        if (item.ident > 0)
            theUrl += item.ident;

        await $.ajax({
            type: "GET",
            url: theUrl,
            success: function(data) {
                if (Array.isArray(data) && data.length > 0) {
                    item.buildItems(data, lName);

                    item.childItems.forEach(child => child.addToParent());
                }
            }
        });
    }
}