const createWithRandomNumbers = function (length) {
    const array = new Array(length);
    for (let i = 0; i < length; i++) {
        array[i] = Math.floor(Math.random() * 100000 - Math.random() * 100000);
    }
    return array;
}

module.exports = {
    createWithRandomNumbers
}