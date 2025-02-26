# Estágio de construção
FROM node:20-alpine
WORKDIR /app

# Copiar arquivos de dependências primeiro para aproveitar o cache de camadas
COPY package.json package-lock.json* ./
RUN npm ci 

# Copiar o restante dos arquivos
COPY . .

EXPOSE 3000
