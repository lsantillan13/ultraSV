FROM node:20-slim
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

RUN npm run build || echo "no build script"

EXPOSE 8000
CMD ["node", "src/index.js"]