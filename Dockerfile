FROM node:20-slim
WORKDIR /app
RUN npm i -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod
COPY build ./build
EXPOSE 8080
CMD ["node", "build/index.js"]
