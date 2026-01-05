# k6_cars_project
1. kubectl apply -f deploy/search-service.yaml //Start backend
2. k6 run k6/search_test.js or k6 run --out prometheus k6/search_test.js //Run load
3. kubectl apply -f chaos/network-latency.yaml //Start chaos
4. kubectl apply -f slo-guard/slo-guard-job.yaml //Start SLO Guard
5. Observation
kubectl get networkchaos -n prod
kubectl logs job/slo-guard -n prod
6. 
