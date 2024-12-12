const fs = require('node:fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    //get length of lines by finding first newline char
    const lineLength = data.indexOf("\n") + 1;
    const totalLines = [...data.matchAll(/\n/g)].length + 1;

    //get postition  of all x characters
    const xIndices = [...data.matchAll(/X/g)].map(m => m.index);

    const searchWord = "XMAS";
    const searchCharsForward = searchWord.split('');
    const searchCharsReverse = searchCharsForward.reverse();
    const searchWordReverse = searchCharsReverse.join('');

    const total = xIndices.reduce((matches, curr) => {
        const lineNumber = Math.floor(curr / lineLength);
        const lineStart = lineNumber * lineLength;
        const lineEnd = lineStart + lineLength - 1; //line ending minus the newline char

        //if at least 4 chars away from right bound then check for "XMAS"
        if (lineEnd - curr >= searchWord.length) {
            const word = data.substr(curr, searchWord.length);
            if (word === searchWord) {
                matches++;
            }

            //if at least 4 lines from bottom check for top-left to bottom-right diagnonal spelling
            if (lineNumber + 1 + searchWord.length <= totalLines) {
                if (searchCharsForward.map((c, i) => data[curr + (lineLength * i) + i]).join('') === searchWord) {
                    matches++;
                }
            }

             //if at least 4 lines from top check for bottom-left to top-right diagnonal spelling
             if (lineNumber + 1 >= searchWord.length) {
                if (searchCharsForward.map((c, i) => data[curr - (lineLength * i) + i]).join('') === searchWord) {
                    matches++;
                }
            }
        }

        //if at least 4 chars away from left bound then check for "SAMX"
        if (curr - lineStart >= searchWord.length) {
            const word = data.substr(curr - searchWord.length, searchWord.length);
            if (word === searchWordReverse) {
                matches++;
            }

            //if at least 4 lines from bottom check for top-right to bottom-left forward
            if (lineNumber + 1 + searchWord.length <= totalLines) {
                if (searchCharsForward.map((c, i) => data[curr + (lineLength * i) - i]).join('') === searchWord) {
                    matches++;
                }
            }

            //if at least 4 lines from top check for bottom-right to top-left diagnonal forward spelling
            if (lineNumber + 1 >= searchWord.length) {
                if (searchCharsForward.map((c, i) => data[curr - (lineLength * i) - i]).join('') === searchWord) {
                    matches++;
                }
            }
        }

        //if at least 4 lines from top check for vertical bottom to top spelling
        if (lineNumber + 1 >= searchWord.length) {
            if (searchCharsForward.map((c, i) => data[curr - (lineLength * i)]).join('') === searchWord) {
                matches++;
            }
        }

        //if at least 4 lines from bottom check for vertical top spelling
        if (lineNumber + 1 + searchWord.length <= totalLines) {
            if (searchCharsForward.map((c, i) => data[curr + (lineLength * i)]).join('') === searchWord) {
                matches++;
            }
        }

        return matches;
    }, 0);

    console.log("Matches: " + total)

});