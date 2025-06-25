# frontend/Dockerfile
FROM node:22-slim

WORKDIR /usr/src/app

# 1️⃣ Forzamos que npm instale TODO (devDependencies incluidas)
ENV NODE_ENV=development
ENV NPM_CONFIG_PRODUCTION=false

COPY package.json package-lock.json ./
RUN npm install

# 2️⃣ Aseguramos permiso de ejecución a Vite
RUN chmod +x node_modules/.bin/vite

# 3️⃣ Copiamos el resto y arrancamos el servidor de desarrollo
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
