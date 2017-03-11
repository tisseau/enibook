var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//-----------------------------------------------------------------------------
var Doc = (function () {
    //layout: string;
    function Doc(jsId, info) {
        if (info === void 0) { info = {}; }
        this.info = {};
        this.id = jsId;
        this.tools = [];
        this.toolsid = {};
        this.info.authors = (info.authors) ? info.authors : [];
        this.info.date = (info.date) ? info.date : new Date();
        this.info.institution = (info.institution) ? info.institution : "";
        this.info.logo = (info.logo) ? info.logo : "";
        /*this.layout = `
<!-- begin notebook -->
<div class="notebook" id="${this.id}">
    <div class="notebook-header" id="${this.id + '-header'}"></div>
    <ul class="notebook-tools" id="${this.id + '-tools'}"></ul>
</div>
<!-- end notebook -->
`;*/
    }
    Doc.prototype.getNumber = function (type) {
        this.toolsid[type] = this.toolsid.hasOwnProperty(type) ? this.toolsid[type] + 1 : 0;
        return type + "_" + this.toolsid[type].toString();
    };
    Doc.prototype.insertTool = function (index, type) {
        var tool;
        switch (type) {
            case "markdown":
                tool = new MarkdownTool(this.getNumber(type).toString(), this);
                break;
            case "txt":
                tool = new TextTool(this.getNumber(type).toString(), this);
                break;
            default:
                tool = new Tool(this.getNumber(type).toString(), this);
                break;
        }
        if (index >= 0 && index <= this.tools.length) {
            this.tools.splice(index, 0, tool);
            return tool;
        }
        else {
            throw new Error("Doc.insertTool : index out of range.");
        }
    };
    Doc.prototype.removeTool = function (index) {
        var tools = [];
        if (index >= 0 && index < this.tools.length) {
            tools = this.tools.splice(index, 1);
            return tools[0];
        }
        else {
            throw new Error("Doc.removeTool : index out of range.");
        }
    };
    return Doc;
}());
//-----------------------------------------------------------------------------
var EniBook = new Doc("EniBook");
$(document).ready(function () {
    $.getJSON("enibook-config.json", function (data) {
        var items = [];
        $.each(data, function (key, val) {
            items.push("<li id='" + key + "'>" + val + "</li>");
        });
        $("<ul/>", { "class": "my-new-list", html: items.join("") }).appendTo("body");
    });
});
//-----------------------------------------------------------------------------
var Tool = (function () {
    //layout: string;
    function Tool(jsId, doc) {
        this.id = jsId;
        this.document = doc;
        this.type = "tool";
        this.source = "";
        this.metadata = {};
        /*this.layout = `
<!-- begin ${this.id} -->
<div class="tool" id="${this.id}"></div>
<!-- end ${this.id} -->
`;*/
    }
    return Tool;
}());
//-----------------------------------------------------------------------------
var TextTool = (function (_super) {
    __extends(TextTool, _super);
    //theme: string;
    //placeholder: string;
    function TextTool(jsId, doc) {
        var _this = _super.call(this, jsId, doc) || this;
        _this.type = "txt";
        return _this;
        //this.placeholder = "texte libre";
        //this.theme = "ace/theme/cirru";
        //this.language = "ace/mode/text";
        /*this.layout = `
<!-- begin ${this.id} -->
<div class="texteditor" id="${this.id}">
    <textarea class="texteditor-textarea" id="${this.id + '-textarea'}" placeholder="${this.placeholder}"></textarea>
</div>
<!-- end ${this.id} -->
`;*/
    }
    return TextTool;
}(Tool));
//-----------------------------------------------------------------------------
var MarkdownTool = (function (_super) {
    __extends(MarkdownTool, _super);
    function MarkdownTool(jsId, doc) {
        var _this = _super.call(this, jsId, doc) || this;
        _this.type = "markdown";
        return _this;
        //this.language = "ace/mode/markdown";
        //this.placeholder = "code markdown";
    }
    return MarkdownTool;
}(TextTool));
