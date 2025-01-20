FROM node:18

# Crear el directorio de trabajo
WORKDIR /usr/src/app

# Copiar archivos de configuración y dependencias
COPY package*.json ./
RUN npm install

# Copiar el código de la aplicación
COPY . .

# Comando de inicio
CMD ["npm", "start"]
