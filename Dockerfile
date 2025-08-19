FROM node:22-alpine

WORKDIR /app/
COPY . .

RUN npm run build

CMD ["node","backend/server.js"]