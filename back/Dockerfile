FROM node:20-alpine AS build

WORKDIR /app

COPY back/package.json back/package-lock.json ./
RUN npm ci

COPY back/ .
RUN npm run build
RUN ls -la dist/  # ← ajoute cette ligne pour voir ce qui est généré

FROM node:20-alpine

WORKDIR /app

COPY back/package.json back/package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist
COPY --from=build /app/DataSource.ts ./DataSource.ts

EXPOSE 3000

CMD ["node", "dist/main.js"]