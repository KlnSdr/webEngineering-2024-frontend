FROM node:20-alpine AS build

WORKDIR /app

COPY package-lock.json .
COPY package.json .

RUN rm -rf node_modules && npm install

COPY . .
RUN npm run build

FROM nginx:stable-alpine AS production

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
