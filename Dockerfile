FROM node:14 as build-stage
WORKDIR /usr/src/client
ENV VUE_APP_API_URL=http://localhost:3000
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM nginx as production-stage
COPY --from=build-stage /usr/src/client/dist /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]