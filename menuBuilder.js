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

    getIdent = () => {
        let levelValid = !!this.levelName;
        let identValid = this.ident > 0;

        if (!levelValid || !identValid) {
            if (!levelValid && !identValid)
                return "root";
            else throw "invalid menu item";
        }

        return `${this.levelName}_${this.ident}`;
    }

    buildItems(data, lName) {
        if (Array.isArray(data) && data.length > 0)
            data.forEach(arr => this.childItems.push(new menuItem(this, lName, arr)));
    }

    addToParent = () => {
        const parentIdent = `${parent.levelName}_${parent.ident}`;

        const myIdent = `${this.levelName}_${this.ident}`;

        $(`#${parentIdent}`).append(`<li id="${myIdent}"><span class="caret">${this.name}</span></li>`);
    }

    getHtml = () => {
        let myIdent = this.getIdent();

        let html = null;

        if (Array.isArray(this.childItems) && this.childItems.length > 0) {
            html = `<ul id="${myIdent}"><span class="caret">${this.name}</span>`

            this.childItems.forEach(child => {
                html += `<li id="${myIdent}"><span class="caret">${this.name}</span></li>`
            });

            html += "</ul>";
        } else {
            html = `<li id="${myIdent}"><span class="caret">${this.name}</span></li>`
        }

        return html;
    }

    addToExternal = (externalIdent) => {
        const html = this.getHtml(); // $(`#${myIdent}`).innerHTML;

        $(`#${externalIdent}`).append(html);
    }
}

class menuBuilder {
    constructor(levels) {
        this.arrLevels = levels;
    }

    arrLevels = null;

    root = null;

    addToExternal = (externalIdent) => {
        if (this.root)
            this.root.addToExternal(externalIdent);
    }

    async buildMenuItem(item) {
        if (!item) {
            if (this.root)
                throw "there is already a root element";

            this.root = item = new menuItem(0, null, null, null);
        }

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