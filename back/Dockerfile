FROM node:20-alpine AS build

WORKDIR /app

COPY back/package.json back/package-lock.json ./
RUN npm ci

COPY back/ .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY back/package.json back/package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/src/main.js"]