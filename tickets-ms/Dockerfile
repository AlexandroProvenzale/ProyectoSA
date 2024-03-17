# Usar una imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo en la imagen
WORKDIR /app

# Copiar el package.json y package-lock.json (si existe) para instalar las dependencias
COPY package*.json ./
COPY .env ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto en el que se ejecuta la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación cuando se inicie el contenedor
CMD [ "node", "app.js" ]
