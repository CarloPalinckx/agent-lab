#!/usr/bin/env bash
# Hammers GET /me with invalid tokens to push the 4xx rate above the alert threshold.
# The New Relic NRQL condition fires when rate exceeds 10 req/min for 2 minutes.

API_URL="${API_URL:-http://localhost:3001}"
REQUESTS="${REQUESTS:-60}"
INTERVAL="${INTERVAL:-1}"  # seconds between requests

echo "Sending $REQUESTS bad requests to $API_URL/me (interval: ${INTERVAL}s)"
echo "This should trigger the 'High 4xx error rate' alert in ~2 minutes."
echo ""

for i in $(seq 1 "$REQUESTS"); do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "Authorization: Bearer invalid.jwt.token" \
    "$API_URL/me")
  echo "[$i/$REQUESTS] HTTP $STATUS"
  sleep "$INTERVAL"
done

echo ""
echo "Done. Check New Relic and GitHub issues for the triggered alert."
