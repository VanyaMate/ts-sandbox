const { createWithRandomNumbers } = require('../mthds/array');

/**
 *  Данные
 */
const data = createWithRandomNumbers(20000000); // 20.000.000


/**
 * Поиск
 */

/**
 * Линейный поиск
 */
const linearSearch = function (array, searchItem) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === searchItem) {
            return i;
        }
    }

    return null;
}

/**
 * Бинарный поиск
 */
const binarySearch = function (array, searchItem) {
    let start = 0;
    let end   = array.length;
    let middle;

    while (start <= end) {
        middle = Math.floor((start + end) / 2);
        if (array[middle] === searchItem) {
            return middle;
        }
        if (searchItem < array[middle]) {
            end = middle - 1;
        } else {
            start = middle + 1;
        }
    }

    return null;
}

/**
 * Сортировка
 */
const selectionSort = function (array) {
    const sorted = [ ...array ];
    for (let i = 0; i < sorted.length - 1; i++) {
        let indexMin = i;
        for (let j = i + 1; j < sorted.length; j++) {
            if (sorted[indexMin] > sorted[j]) {
                indexMin = j;
            }
        }
        let min          = sorted[indexMin];
        sorted[indexMin] = sorted[i];
        sorted[i]        = min;
    }
    return sorted;
}

/**
 * Сортировка пузырьком
 */
const bubbleSort = function (array) {
    const sorted = [ ...array ];
    for (let i = 0; i < sorted.length; i++) {
        for (let j = 0; j < sorted.length - 1; j++) {
            if (sorted[j + 1] < sorted[j]) {
                let min       = sorted[j + 1];
                sorted[j + 1] = sorted[j];
                sorted[j]     = min;
            }
        }
    }
    return sorted;
}

/**
 * Быстрая сортировка (Хоара)
 */
const quickSort = function (array) {
    if (array.length <= 1) {
        return array;
    }
    let pivotIndex = Math.floor(array.length / 2);
    let pivot      = array[pivotIndex];
    let less       = [];
    let greater    = [];
    for (let i = 0; i < array.length; i++) {
        if (i === pivotIndex) {
            continue;
        }
        if (array[i] < pivot) {
            less.push(array[i]);
        } else {
            greater.push(array[i]);
        }
    }
    return [ ...quickSort(less), pivot, ...quickSort(greater) ];
}


console.time('search-linear');
linearSearch(data, 143256213);
console.timeEnd('search-linear');

console.time('sort-selection')
// const sorted_selection = selectionSort([ ...data ]);
console.timeEnd('sort-selection')

console.time('sort-bubble')
// const sorted_bubble = bubbleSort([ ...data ]);
console.timeEnd('sort-bubble')

console.time('sort-quick')
const sorted_quick = quickSort([ ...data ]);
console.timeEnd('sort-quick')


console.time('search-binary');
binarySearch(sorted_quick, 143256213);
console.timeEnd('search-binary');