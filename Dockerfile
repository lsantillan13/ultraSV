FROM node:20-slim
WORKDIR /app
COPY package.json./
RUN npm install --omit=dev
COPY build./build
EXPOSE 8080
CMD ["node", "build/index.js"]