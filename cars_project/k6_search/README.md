
# Make docker image 
docker build -f Dockerfile_server -t sever_for_cars 
# Run docker
docker run -d -p 8000:8000 --name my_server6 sever_for_cars
docker run -it --rm sever_for_cars bash //for debug

# K8s
# install helm. Open powershell as administrator
choco install kubernetes-helm 
# install cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml Verification: kubectl get pods -n cert-manager
# install helm 
helm repo add grafana https://grafana.github.io/helm-charts //set Grafana repository
helm repo update
helm install k6-operator grafana/k6-operator //install Helm
# Run server in K8s: cars-server-nodeport.yaml
# Build k6 image with k6 project: docker build -f Dockerfile_k6 -t server_for_k6:1.0.2 .
# Run k6 pods in K8s: k6-testrun.yaml
.
# Make yaml for the test run
kubectl apply -f k6-scripts-configmap.yaml

# Run server
python -m uvicorn app:app --host 0.0.0.0 --port 8000

# Run test
k6 run `
  -e TEST_DURATION=5m `
  -e TOTAL_VUS=10 `
  main.js

# Run test in K8s
kubectl apply -f k6-testrun.yaml

# Run VictoriaMetrics  amd64-v1.133 without license
victoria-metrics-windows-amd64-prod.exe