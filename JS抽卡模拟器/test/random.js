function _Random(min, max) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * min + 1, 10) - 1

        case 2:
            return parseInt(Math.random() * (max - min + 1) + min, 10)

        default:
            return 0
    }
}

let arr = new Array(100)

for (let i = 0; i < arr.length; i++) {
    arr[i] = 0;
}

for (let i = 0; i < 100000; i++) {
    arr[_Random(100)] += 1
}

console.log(arr)

let add = 0

for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    add += el
}

console.log(add/arr.length)