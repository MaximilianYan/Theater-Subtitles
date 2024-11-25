'use stick'

class DataManager {

    fileInputNode;
    filesListNode;

    constructor(fileInputNode, filesListNode) {
        this.fileInputNode = fileInputNode;
        this.filesListNode = filesListNode;

        // this.fileReader.addEventListener('error', function () { alert(this.fileReader.error); }.bind(this));
        // this.fileReader.addEventListener('load', function () { alert(this.fileReader.result); }.bind(this));

        this.fileInputNode.addEventListener('input', this.readData.bind(this));
    }

    readData() {
        // verses.at(-1).activate();

        // this.fileReader.readAsText(document.forms['fileInputForm'].elements[0].files[0]);
        // alert(document.forms['fileInputForm'].elements[0].files.length);
        // document.getElementById('qwe').innerHTML = "good " + document.forms['fileInputForm'].elements[0].files[0].type + " ee";

        while (this.filesListNode.firstChild != null) {
            this.filesListNode.firstChild.remove();
        }

        for (let file of this.fileInputNode.files) {
            this.filesListNode.insertAdjacentHTML('beforeend',
                '<li>' +
                file.name +
                '</li>'
            );
        }

        let readFilePromises = new Array();
        for (let file of this.fileInputNode.files) {
            readFilePromises.push(this.readFile(file));
            // .then(() => { }, (error) => { alert("error: in readFile " + error) });
        }

    }

    async readFile(file) {
        let fileReader = new FileReader();

        await (new Promise(function (resolve, reject) {
            fileReader.onerror = function () { alert(fileReader.error); reject(); };
            fileReader.onload = function () { alert(fileReader.result); resolve(); };

            fileReader.readAsText(file);
        }.bind(this)));


        fileReader.onerror = undefined;
        fileReader.onload = undefined;
    }
}