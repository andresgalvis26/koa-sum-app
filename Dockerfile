# Usa la imagen oficial de Node 22 (versión 22.12.0)
FROM node:22.12.0-alpine

# Instala dependencias útiles (bash, curl) para debugging en dev
RUN apk add --no-cache bash curl

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia package.json y package-lock.json primero (mejora la cache de Docker)
COPY package*.json ./

# Instala dependencias (solo las necesarias para producción)
RUN npm install

# Copia el resto del proyecto
COPY . .

# Expone el puerto que usa tu app (en index.js es 3000)
EXPOSE 3000

# Comando por defecto para ejecutar tu aplicación
CMD ["node", "index.js"]