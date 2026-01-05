import random

BRANDS = {
    "BMW": ["X3", "X5", "M3"],
    "Audi": ["A4", "Q7", "A6"],
    "Tesla": ["Model S", "Model 3", "Model Y"],
    "Toyota": ["Corolla", "Camry", "RAV4"],
    "Mercedes": ["C-Class", "E-Class", "GLE"]
}

ENGINES = [
    {"type": "petrol", "volume": 2.0, "hp": 180},
    {"type": "diesel", "volume": 3.0, "hp": 250},
    {"type": "hybrid", "volume": 2.5, "hp": 220},
    {"type": "electric", "volume": 0, "hp": 400},
]

def generate_cars(count=2000):
    cars = []
    for i in range(1, count + 1):
        brand = random.choice(list(BRANDS.keys()))
        model = random.choice(BRANDS[brand])
        engine = random.choice(ENGINES)

        cars.append({
            "id": i,
            "brand": brand,
            "model": model,
            "engine": engine,
            "year": random.randint(2015, 2024),
            "price": random.randint(15000, 120000),
            "fuel_consumption": round(random.uniform(4.0, 12.0), 1),
            "available": random.choice([True, True, True, False])
        })
    return cars
