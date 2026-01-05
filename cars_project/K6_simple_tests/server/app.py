from fastapi import FastAPI, Query
from data import generate_cars
import random
import time

app = FastAPI()
CARS = generate_cars()

@app.get("/api/cars/search")
def search_cars(
    brand: str | None = None,
    engine_type: str | None = None,
    min_price: int | None = None,
    max_price: int | None = None
):
    time.sleep(random.uniform(0.01, 0.2))  # имитация latency

    results = CARS

    if brand:
        results = [c for c in results if c["brand"] == brand]

    if engine_type:
        results = [c for c in results if c["engine"]["type"] == engine_type]

    if min_price:
        results = [c for c in results if c["price"] >= min_price]

    if max_price:
        results = [c for c in results if c["price"] <= max_price]

    return {
        "count": len(results),
        "cars": results[:50]  # pagination
    }

@app.get("/api/cars/{car_id}")
def car_details(car_id: int):
    time.sleep(random.uniform(0.02, 0.3))

    car = next((c for c in CARS if c["id"] == car_id), None)
    if not car:
        return {"error": "not found"}

    return car
