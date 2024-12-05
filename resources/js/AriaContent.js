'use stick'

class AriaContent {
    verses = new Array();

    isRenderable = false;
    key;
    timeStart;

    constructor(content, isRenderable, key) {
        if (isRenderable == true) {
            this.isRenderable = true;
        } else {
            this.isRenderable = false;
        }

        if (this.isRenderable) {
            this.key = key;
        }

        // в fileContent большая строка

        let regExpNL = `\\r\\n`;
        let regExpTime = `(\\d{2}):(\\d{2}):(\\d\{2},\\d{3})`;
        let regExpArrow = ` --> `;

        let contInf;
        let contInfNext;
        let VtimeStart;
        let timeFinish;

        for (let num = 1; true; num++) {
            contInf = contInfNext;

            contInfNext = content.match(new RegExp(`^${num}` + regExpNL + regExpTime + regExpArrow + regExpTime, "md"));

            // alert("num: " + num + "\ncontInf: <" + contInf + ">\n");

            // alert(contInf[0]); // answer
            // alert(contInf[1]); // h1
            // alert(contInf[2]); // m1
            // alert(contInf[3]); // s1
            // alert(contInf[4]); // h2
            // alert(contInf[5]); // m2
            // alert(contInf[6]); // s2
            // alert(contInf.index); // begin index

            if (num == 1) {
                if (contInfNext == null) break;
                continue;
            }

            VtimeStart = ((+contInf[1]) * 60 + (+contInf[2])) * 60 + (+contInf[3].replace(/,/g, '.'));
            timeFinish = ((+contInf[4]) * 60 + (+contInf[5])) * 60 + (+contInf[6].replace(/,/g, '.'));

            let indexBegin = contInf.index + contInf[0].length + 2; // 2 for next line
            let indexEnd;
            if (contInfNext == null) indexEnd = content.length;
            else indexEnd = contInfNext.index - 4; // 4 for 2 lines

            if (this.isRenderable) {
                this.verses.push(new VerseContent(content.slice(indexBegin, indexEnd), VtimeStart, timeFinish, true,
                    this.key + "--v" + (+num - 1)));
            } else {
                this.verses.push(new VerseContent(content.slice(indexBegin, indexEnd), VtimeStart, timeFinish));
            }

            if (contInfNext == null) break;

        }
    }

    checkRenderable() {
        if (this.isRenderable) return true;

        alert("ERR tried to play unplaiable aria");
        return false;
    }

    start() {
        if (!this.checkRenderable()) return;

        this.timeStart = Date.now();
    }

    updateFrame() {
        if (!this.checkRenderable()) return;

        for (let verse of this.verses) {
            verse.updateFrame(this.timeStart);
        }
    }
}
