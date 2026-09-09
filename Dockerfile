FROM node:20-slim
WORKDIR /app

# 1. Dependencias
COPY package.json ./
COPY package-lock.json* ./
RUN npm install --omit=dev

# 2. Copiar todo el proyecto (src, build, etc)
COPY . .

# 3. Si tenés script build, se ejecuta. Si no, no rompe
RUN if [ -f "package.json" ] && grep -q '"build"' package.json; then npm run build || true; fi

EXPOSE 8000
CMD ["npm", "start"]