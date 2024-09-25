# Use the official NGINX image to serve the app
FROM nginx:alpine

# Copy your custom NGINX configuration file
COPY ./default.conf /etc/nginx/conf.d/default.conf

# Copy the build output directory from your local machine
COPY ./build /usr/share/nginx/html

# Expose port 82 to the outside world
EXPOSE 82

# Start NGINX when the container starts
CMD ["nginx", "-g", "daemon off;"]
