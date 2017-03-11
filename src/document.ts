//-----------------------------------------------------------------------------
interface DocInfo {
    authors?: Array<string>;
    date?: Date;
    institution?: string;
    logo?: string;
}

//-----------------------------------------------------------------------------
class Doc {
    id: string;
    tools: Array<Tool>;
    toolsid: {};
    info: DocInfo = {};
    //layout: string;
    constructor(jsId: string, info: DocInfo = {}) {
        this.id = jsId;
        this.tools = [];
        this.toolsid = {};
        this.info.authors = (info.authors) ? info.authors : [];
        this.info.date   = (info.date) ? info.date : new Date();
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
    private getNumber(type: string) : string {
        this.toolsid[type] = this.toolsid.hasOwnProperty(type) ? this.toolsid[type] + 1 : 0;
        return type + "_" + this.toolsid[type].toString();
    }
    insertTool(index: number, type: string) : Tool {
        let tool: Tool;
        switch (type) {
            case "markdown":
                tool = new MarkdownTool(this.getNumber(type).toString(),this);
                break;
            case "txt":
                tool = new TextTool(this.getNumber(type).toString(),this);
                break;
            default:
                tool = new Tool(this.getNumber(type).toString(),this);
                break;
        }
        if (index >= 0 && index <= this.tools.length) { 
            this.tools.splice(index,0,tool); 
            return tool;
        }
        else { throw new Error(`Doc.insertTool : index out of range.`); }
    }
    removeTool(index: number) : Tool {
        let tools: Tool[] = [];
        if (index >= 0 && index < this.tools.length) {
            tools = this.tools.splice(index,1);
            return tools[0];
        }
        else { throw new Error(`Doc.removeTool : index out of range.`); }
    }
}


//-----------------------------------------------------------------------------
var EniBook = new Doc("EniBook");
$(document).ready( function() {
    $.getJSON("enibook-config.json", function(data) {  
        var items = [];
        $.each( data, function( key, val ) {
            items.push( "<li id='" + key + "'>" + val + "</li>" );
        });
 
        $( "<ul/>", { "class": "my-new-list", html: items.join( "" ) }).appendTo( "body" );
    } );
});