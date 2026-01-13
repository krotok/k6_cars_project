// Find expensive cars (price > X)
export function searchExpensiveCars() {
    return `/search?price_gt=70000`;
}

// Find chip cars (price < X)
export function searchCheapCars() {
    return `/search?price_lt=20000`;
}

// Finf cars in range
export function searchCarsInRange() {
    return `/search?price_gt=30000&price_lt=60000`;
}

// Find nothing
export function searchNonExistingCars() {
    return `/search?price_gt=1000000`;
}
