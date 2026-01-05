from fastapi import FastAPI, Query
import random

app = FastAPI(title="Car Search Service")

# --- Справочники для генерации ---
BRANDS_MODELS = {
    "BMW": ["X1", "X3", "X5", "3 Series", "5 Series"],
    "Audi": ["A3", "A4", "A6", "Q5", "Q7"],
    "Mercedes": ["C-Class", "E-Class", "GLC", "GLE"],
    "Toyota": ["Corolla", "Camry", "RAV4", "Land Cruiser"],
    "Honda": ["Civic", "Accord", "CR-V"],
    "Tesla": ["Model 3", "Model Y", "Model S"],
    "Volkswagen": ["Golf", "Passat", "Tiguan"],
    "Ford": ["Focus", "Mustang", "Explorer"],
}

ENGINES = ["petrol", "diesel", "hybrid", "electric"]
FUELS = ["gasoline", "diesel", "electric", "hybrid"]

# --- Генерация машин ---
def generate_cars(count: int = 1500):
    cars = []

    for car_id in range(1, count + 1):
        brand = random.choice(list(BRANDS_MODELS.keys()))
        model = random.choice(BRANDS_MODELS[brand])
        engine = random.choice(ENGINES)
        fuel = "electric" if engine == "electric" else random.choice(FUELS)
        hp = random.randint(90, 500)
        price = random.randint(15000, 120000)

        cars.append({
            "id": car_id,
            "brand": brand,
            "model": model,
            "engine": engine,
            "fuel": fuel,
            "hp": hp,
            "price": price
        })

    return cars


# --- Данные в памяти сервера ---
CARS = generate_cars(1500)


# --- API ---
@app.get("/search")
def search_cars(
    price_gt: int | None = Query(None),
    price_lt: int | None = Query(None),
    brand: str | None = Query(None),
    engine: str | None = Query(None)
):
    """
    Поиск машин по цене, бренду и типу двигателя
    """
    result = CARS

    if price_gt is not None:
        result = [c for c in result if c["price"] > price_gt]

    if price_lt is not None:
        result = [c for c in result if c["price"] < price_lt]

    if brand is not None:
        result = [c for c in result if c["brand"].lower() == brand.lower()]

    if engine is not None:
        result = [c for c in result if c["engine"] == engine]

    return result


@app.get("/health")
def health():
    return {
        "status": "ok",
        "cars_loaded": len(CARS)
    }
