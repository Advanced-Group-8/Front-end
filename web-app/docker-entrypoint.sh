#!/bin/sh
if [ -n "$VITE_API_BASE_URL" ]; then
  sed -i "s|VITE_API_BASE_URL:.*|VITE_API_BASE_URL: \"$VITE_API_BASE_URL\"|g" /usr/share/nginx/html/env.js
fi
exec "$@"