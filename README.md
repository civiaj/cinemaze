# Описание

Веб-приложение для просмотра информации о фильмах, их оценивания, поиска и ведения статистики оцененных фильмов. Проект включает клиентскую и серверную части, работает в Docker-контейнерах и развернут на VDS-сервере.

## Функциональность

- **Авторизация**: Регистрация и вход в систему.
- **Оценка фильмов**: Возможность оценивать фильмы, скрывать и удалять оценки.
- **Информация о фильмах**: Просмотр детальной информации о фильмах.
- **Поиск фильмов**: Удобный поиск по базе данных фильмов.
- **Статистика**: Просмотр статистики по оцененным фильмам.

## Технологии

### Клиентская часть:
- **React**
- **TypeScript**
- **Redux Toolkit**
- **RTK Query**

### Серверная часть:
- **Node.js**
- **Express**
- **MongoDB**

### Инфраструктура:
- **Nginx**: Веб-сервер для проксирования запросов.
- **Docker**: Развертывание и управление контейнерами.
- **VDS**: Виртуальный выделенный сервер для хостинга приложения.
