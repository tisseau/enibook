//-----------------------------------------------------------------------------
class Tool {
    id: string;
    document: Doc;
    source: string;
    metadata: {};
    type: string;
    //layout: string;
    constructor(jsId: string, doc: Doc) {
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
}

//-----------------------------------------------------------------------------
class TextTool extends Tool {
    language: string;
    //theme: string;
    //placeholder: string;
    constructor(jsId: string, doc: Doc) { 
        super(jsId,doc);
        this.type = "txt";
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
}

//-----------------------------------------------------------------------------
class MarkdownTool extends TextTool {
    constructor(jsId: string, doc: Doc) { 
        super(jsId,doc);
        this.type = "markdown";
        //this.language = "ace/mode/markdown";
        //this.placeholder = "code markdown";
    }  
}
