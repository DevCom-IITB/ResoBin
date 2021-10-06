FROM node:16-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM nginx:latest

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
