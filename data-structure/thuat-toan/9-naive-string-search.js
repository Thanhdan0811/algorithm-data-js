
/* 

    find number of short string aprpear in long string.
    loop throught long string
    inner loop through short string.
    with each character of long string, compare with each character in short string follow order  (short[j] !== long[i + j])
    if character of long string not equal with one of the short string then break inner loop
    only true when all match.

*/

function naiveStringSearch(long, short) {
    let count = 0;
    let result = [];
    for (let i = 0; i < long.length; i++) {
        for (let j = 0; j < short.length; j++) {
            if (short[j] !== long[i + j]) break;
            if (j === short.length - 1) {
                count++;
                result.push(i);
            }
        }
    }
    return result;
}

console.log(naiveStringSearch('hello thisits ia a new a item kittye lol alf', 'it'));