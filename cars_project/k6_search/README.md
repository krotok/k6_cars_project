
# Run server
python -m uvicorn app:app --host 0.0.0.0 --port 8000

# Run test
k6 run `
  -e TEST_DURATION=5m `
  -e TOTAL_VUS=10 `
  main.js