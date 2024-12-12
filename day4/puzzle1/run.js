const fs = require('node:fs');

function getDiagonalMatches(lineLength, totalLines, input, searchWord) {
    let matches = 0;
    const inverseSearchWord = searchWord.split("").reverse().join("");

    //create diagonal slices of cube using vertical axis
    for (let i = 0; i < totalLines; i++) {
        const diagonal = [];
        const inverseDiagonal = [];

        for (let n = 0; n <= i; n++) {
            const index = i * lineLength - (n * lineLength - n);
            const inverseIndex = index + (lineLength) * (totalLines - i) - (i + 1);

            diagonal.push(input[index]);
            inverseDiagonal.push(input[inverseIndex]);
        }

        if (diagonal.length >= searchWord.length) {

            let line = diagonal.join("");
            matches += searchForMatches(line, searchWord);
            matches += searchForMatches(line, inverseSearchWord);

            //if they are the same length it is same line
            const mirrorLine = inverseDiagonal.join("");
            if (mirrorLine !== line) {
                matches += searchForMatches(mirrorLine, searchWord);
                matches += searchForMatches(mirrorLine, inverseSearchWord);
            }
        }

    }

    return matches;
}

function getVerticalMatches(lineLength, totalLines, input, searchWord) {
    let matches = 0;
    const inverseSearchWord = searchWord.split("").reverse().join("");

    //create diagonal slices of cube using vertical axis
    for (let i = 0; i < totalLines; i++) {
        const column = [];

        for (let n = 0; n < totalLines; n++) {
            const index = n * lineLength + i;

            column.push(input[index]);
        }

        const line = column.join("");

        matches += searchForMatches(line, searchWord);
        matches += searchForMatches(line, inverseSearchWord);
    }

    return matches;
}

function getHorizontalMatches(lineLength, totalLines, input, searchWord) {
    let matches = 0;
    const inverseSearchWord = searchWord.split("").reverse().join("");

    //create diagonal slices of cube using vertical axis
    for (let i = 0; i < totalLines; i++) {
        const line = input.substr(i * lineLength, lineLength);

        matches += searchForMatches(line, searchWord);
        matches += searchForMatches(line, inverseSearchWord);
    }

    return matches;
}

function searchForMatches(input, searchWord) {
    let matches = 0;
    let lastMatch = 0;
    let line = new String(input);

    while (lastMatch !== -1) {
        lastMatch = line.indexOf(searchWord);
        if (lastMatch > -1) {
            matches++;
            line = line.substr(lastMatch + 1);
        }
    }

    return matches;
}

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    //get length of lines by finding first newline char
    const lineLength = data.indexOf("\r\n");
    const totalLines = [...data.matchAll(/\r\n/g)].length + 1;

    //replace all line breaks to create single line of text
    const forwardInput = data.replaceAll(/\r\n/g, '');
    //mirror image of the data to get diagonals in other direction
    const inverseInput = data.split("\r\n").map(line => line.split("").reverse().join("")).join("")

    const searchWord = "XMAS";

    let matches = 0;
    matches += getDiagonalMatches(lineLength, totalLines, forwardInput, searchWord);
    matches += getDiagonalMatches(lineLength, totalLines, inverseInput, searchWord);
    matches += getVerticalMatches(lineLength, totalLines, forwardInput, searchWord);
    matches += getHorizontalMatches(lineLength, totalLines, forwardInput, searchWord);

    console.log(matches);

});