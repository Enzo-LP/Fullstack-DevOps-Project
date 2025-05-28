# Étape 1 : Construction de l'application Angular
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Étape 2 : Servir l'application avec Nginx
FROM nginx:alpine
COPY --from=build /app/dist/fs-project-frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80