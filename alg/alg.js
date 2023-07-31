/**
 *  Данные
 */
const data = [ 5, 2, 1, 8, 7, 4, 0, 11, 3, 9, 0, 34, 9, 1, -3, -4, 23, 1001, -1002, 0, 0, 3, 4, 5, -2 ];


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

console.log(linearSearch(data, 3));
console.log(selectionSort(data));
console.log(bubbleSort(data));
console.log(quickSort([ ...data ]));
console.log(binarySearch(selectionSort(data), 3));
