// Функция: поиск дорогих машин (price > X)
export function searchExpensiveCars() {
    return `/search?price_gt=70000`;
}

// Функция: поиск дешёвых машин (price < X)
export function searchCheapCars() {
    return `/search?price_lt=20000`;
}

// Функция: поиск машин в диапазоне цен
export function searchCarsInRange() {
    return `/search?price_gt=30000&price_lt=60000`;
}

// Функция: поиск несуществующих машин (гарантированно пусто)
export function searchNonExistingCars() {
    return `/search?price_gt=1000000`;
}
