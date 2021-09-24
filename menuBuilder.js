//import $ = require("jquery");

class menuItem {

    constructor(builder, parent, lName, arr, indexId = 0, indexName = 1) {
        if (arr) {
            this.ident = arr[indexId];

            this.name = arr[indexName];
        }

        this.myBuilder = builder;

        this.myParent = parent;

        this.levelName = lName;

        this.level = this.myParent ? this.myParent.level + 1 : 0;
    }

    myBuilder = null;

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

    buildItems = (data, lName, add = false) => {
        if (Array.isArray(data) && data.length > 0) {
            this.childItems = [];

            data.forEach(arr => this.childItems.push(new menuItem(this.myBuilder, this, lName, arr)));

            if (add)
                this.addItems();
        }
    }

    addItems = () => {
        this.childItems.forEach(child => child.addToParent());
    }

    clear = () => {
        const myIdent = this.getIdent();

        $(`#${myIdent}`).children().remove();
    }

    clearParent = () => {
        const parentIdent = this.myParent.getIdent();

        $(`#${parentIdent}`).children().remove();
    }

    addToParent = () => {
        const parentIdent = this.myParent.getIdent();

        const myIdent = this.getIdent();

        $(`#${parentIdent}`).append(`<li id="${myIdent}"><span class="caret">${this.name}</span></li>`);
    }

    strLevel = "level";

    getChildrenHtml = () => {
        let myIdent = this.getIdent();

        let html = null;

        if (Array.isArray(this.childItems) && this.childItems.length > 0) {
            html = `<ul id="${myIdent}"><span class="caret">${this.name}</span>`

            this.childItems.forEach(child => {
                const childIdent = child.getIdent();

                const myLevel = `${this.strLevel}_${child.level}`;

                //for (let i = 0; i < child.level; i++)
                //html += "&emsp;";

                const strStyle = `margin-left: ${child.level}ch;`;

                html += `<li class=${myLevel} id="${childIdent}" style="${strStyle}"><span class="caret">${child.name}</span></li>`
            });

            html += "</ul>";
        }

        return html;
    }

    addToExternal = async(externalIdent) => {
        await this.myBuilder.buildMenuItem(this);

        const html = this.getChildrenHtml(); // $(`#${myIdent}`).innerHTML;

        $(`#${externalIdent}`).append(html);

        //$(`#${myIdent}`).on("click", () => {
        //  this.myBuilder.buildMenuItem(this);
        //});
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

            this.root = item = new menuItem(this, 0, null, null, null);
        }

        const itemIdent = item.getIdent();

        //item.clearParent();

        item.clear();

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
                    item.buildItems(data, lName, true);
                }
            }
        });
    }
}