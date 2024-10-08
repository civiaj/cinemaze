# Описание

Веб-приложение для просмотра информации о фильмах, их оценивания, поиска и ведения статистики оцененных фильмов. Проект включает клиентскую и серверную части, работает в Docker-контейнерах и развернут на VDS-сервере. 
Ссылка: [https://cinemaze-app.ru/](https://cinemaze-app.ru/)

## Функциональность

- **Авторизация**: Регистрация и вход в систему с использованием электронной почты или с использованием Google через OAuth 2.0. В первом случае пользователю автоматически отправляется письмо с ссылкой для подтверждения аккаунта. Подтверждение аккаунта является необьязательным.
- **Управление профилем**: Возможность изменять информацию о себе: имя пользователя, фото профиля, роль, управление сессиями.
- **Роли пользователей**: Стандартная, Ограниченная роль администратора (по умолчанию - для просмотра полного функционала приложения), Полноценная роль администратора с расширенными правами.
- **Оценка фильмов**: Возможность оценивать фильмы, скрывать и удалять оценки.
- **Информация о фильмах**: Просмотр детальной информации о фильмах: краткий обзор, изображения, награды, похожие фильмы, рецензии зрителей.
- **Поиск фильмов**: Удобный поиск по базе данных фильмов.
- **Статистика**: Просмотр статистики по оцененным фильмам.
- **Настройка интерфейса**: Выбор языка, настройка отображения карточек фильмов, переключение темы.
- **Управление пользователями**: Администратор может изменять информацию о пользователях, а также блокировать их на определенный срок с указанием причины.

## Технологии

### Клиентская часть:
- **React**
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
