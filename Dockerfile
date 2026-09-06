FROM node:20-alpine
WORKDIR /app
RUN npm i -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build
EXPOSE 8080
CMD ["node", "build/index.js"]
