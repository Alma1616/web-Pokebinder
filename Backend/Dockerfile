FROM node:22-slim
WORKDIR /usr/src/app

# Configuramos entorno de desarrollo
env NODE_ENV=development

# Instalamos devDependencies 
COPY package.json package-lock.json ./
RUN npm ci --include=dev

#Instalar a nivel global vite !!!!!!!!!!
RUN npm install -g vite 

# Copiamos el resto del código
COPY . .

# Exponemos el puerto de desarrollo de Vite
EXPOSE 5173

# Arrancamos Vite en modo dev y escuchando en todas las interfaces
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
