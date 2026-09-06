FROM node:20-slim
WORKDIR /app
RUN npm i -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm run build
EXPOSE 8080
CMD ["node", "build/index.js"]
