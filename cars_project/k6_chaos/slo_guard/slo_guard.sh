#!/bin/sh

PROM="http://prometheus:9090"
LATENCY_QUERY='histogram_quantile(0.95, rate(search_non_empty_rt_bucket[1m]))'

while true; do
  LATENCY=$(curl -s "$PROM/api/v1/query" \
    --data-urlencode "query=$LATENCY_QUERY" \
    | jq -r '.data.result[0].value[1]')

  echo "Current p95 latency: $LATENCY"

  if [ "$(echo "$LATENCY > 0.5" | bc)" -eq 1 ]; then
    echo "🚨 SLO BREACH — rollback chaos"
    kubectl delete networkchaos search-network-delay -n prod
    exit 0
  fi

  sleep 10
done
