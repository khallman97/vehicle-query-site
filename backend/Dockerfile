FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Ensure Prisma binaries are rebuilt for the Alpine environment
RUN npx prisma generate

EXPOSE 4000
CMD ["node", "src/index.js"]
