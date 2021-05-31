function swap(chars, i, j) {
    var tmp = chars[i];
    chars[i] = chars[j];
    chars[j] = tmp;
}

function getAnagrams(input) {
    var counter = [],
        anagrams = [],
        chars = input.split(""),
        length = chars.length,
        i;

    for (i = 0; i < length; i++) {
        counter[i] = 0;
    }

    anagrams.push(input);
    i = 0;
    while (i < length) {
        if (counter[i] < i) {
            swap(chars, i % 2 === 1 ? counter[i] : 0, i);
            counter[i]++;
            i = 0;
            anagrams.push(chars.join(""));
        } else {
            counter[i] = 0;
            i++;
        }
    }

    return anagrams;
}

function combinations(riasecCode: string) {
    const stringArray: string[] = riasecCode.split("");
    if (stringArray.length === 3) {
        const anagrams = getAnagrams(riasecCode);
        const order = [0, 3, 1, 4, 2, 5];
        const riasecMatches: string[] = [];
        for (let n = 0; n < order.length; n++) {
            const index = order[n];
            riasecMatches.push(anagrams[index]);
        }
        return riasecMatches;
    } else if (stringArray.length === 4) {
        const firstCode = stringArray.slice(0, 3).join("");
        const secondCode = [...stringArray.slice(0, 2), stringArray[3]].join(
            ""
        );
        const codes = [firstCode, secondCode];
        let anagrams = [];
        for (let n = 0; n < codes.length; n++) {
            const code = codes[n];
            anagrams = [...anagrams, ...getAnagrams(code)];
        }
        const order = [0, 6, 3, 9, 1, 7, 4, 10, 2, 8, 5, 11];
        const riasecMatches: string[] = [];
        for (let n = 0; n < order.length; n++) {
            const index = order[n];
            riasecMatches.push(anagrams[index]);
        }
        return riasecMatches;
    } else return riasecCode;
}

function getAllCombinations(word: string) {
    var fn = function(active: string, rest: string, a: string[]) {
        if (!active && !rest) return;
        if (!rest) {
            a.push(active);
        } else {
            fn(active + rest[0], rest.slice(1), a);
            fn(active, rest.slice(1), a);
        }
        return a;
    };
    return fn("", word, []);
}

const all = getAllCombinations("RIASEC").filter(str => str.length === 3);
let allPossibleCodeCombinations = [];
for (let a = 0; a < all.length; a++) {
    const code = all[a];
    const anagrams = getAnagrams(code);
    allPossibleCodeCombinations = [...allPossibleCodeCombinations, ...anagrams];
}

const allUniq = allPossibleCodeCombinations.filter(
    (date, index) => allPossibleCodeCombinations.indexOf(date) === index
);
// console.log(all);
// console.log(allUniq);
// console.dir(allUniq, { maxArrayLength: 130 });
// console.log("length:" + allUniq.length);
// console.log(allUniq.join("|"));
console.log(combinations("RIA"));
console.log(combinations("RAE"));
console.log(combinations("SEC"));
console.log(combinations("AIE"));
console.log(combinations("SAI"));
console.log(combinations("REI"));
console.log(combinations("RAIE"));
console.log(combinations("IRAS"));
