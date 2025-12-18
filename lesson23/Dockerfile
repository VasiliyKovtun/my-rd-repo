# ===== Stage 1: build =====
FROM node:18-alpine AS build

# Установим git
RUN apk add --no-cache git

WORKDIR /app

# Клонируем репозиторий
RUN git clone https://github.com/AhmedShaykh/Expense-Tracker-App-With-React.JS.git .

# Устанавливаем зависимости
RUN npm install

# Собираем production build
RUN npm run build

# ===== Stage 2: nginx =====
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]