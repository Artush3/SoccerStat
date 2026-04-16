# ⚽ SoccerStat

Приложение для просмотра футбольной статистики — лиги, команды, матчи.

## Стек технологий

- **React 19** + **TypeScript**
- **SCSS Modules** — стилизация с CSS-переменными
- **Zustand** — управление состоянием
- **React Router v7** — маршрутизация
- **FSD** (Feature-Sliced Design) — архитектура
- **ESLint** + **Stylelint** + **Prettier** — качество кода
- **Vite** — сборщик

## Структура проекта (FSD)

```
src/
├── app/                    # Инициализация приложения
│   ├── providers/          # AppRouter
│   └── styles/             # Глобальные стили, CSS-переменные
├── pages/                  # Страницы
│   ├── LeaguesPage/
│   ├── LeagueCalendarPage/
│   ├── TeamsPage/
│   └── TeamCalendarPage/
├── widgets/                # Составные UI-блоки
│   ├── Header/
│   ├── LeagueCard/
│   ├── TeamCard/
│   └── MatchCard/
├── features/               # Пользовательские действия
│   ├── search/
│   └── dateFilter/
├── entities/               # Бизнес-сущности (Zustand stores)
│   ├── league/
│   ├── team/
│   └── match/
└── shared/                 # Переиспользуемый код
    ├── api/
    ├── lib/
    ├── types/
    └── ui/
```

## Быстрый старт

### 1. Получить API-токен

Зарегистрируйтесь на https://www.football-data.org/ и получите бесплатный токен.

### 2. Настроить переменные окружения

```bash
cp .env.example .env
# Вставьте токен в .env:
# VITE_API_TOKEN=ваш_токен_здесь
# VITE_API_BASE_URL=https://api.football-data.org/v4
```

> Файл .env добавлен в .gitignore. Никогда не коммитьте токен в репозиторий.

### 3. Установить зависимости и запустить

```bash
npm install
npm run dev
```

## Команды

| Команда | Описание |
|---|---|
| `npm run dev` | Dev-сервер |
| `npm run build` | Production-сборка |
| `npm run preview` | Предпросмотр сборки |
| `npm run lint` | ESLint |
| `npm run lint:css` | Stylelint |
| `npm run format` | Prettier |

## Страницы

| Страница | Маршрут | Описание |
|---|---|---|
| Лиги | `/leagues` | Список лиг с поиском и пагинацией |
| Календарь лиги | `/leagues/:id` | Матчи лиги с фильтром по датам |
| Команды | `/teams` | Список команд с поиском и пагинацией |
| Календарь команды | `/teams/:id` | Матчи команды с фильтром по датам |

## Деплой на GitHub Pages

```bash
npm install -D gh-pages
# Добавьте в vite.config.ts: base: '/<repo>/'
# Добавьте в package.json:
#   "homepage": "https://<user>.github.io/<repo>"
#   "predeploy": "npm run build"
#   "deploy": "gh-pages -d dist"
npm run deploy
```
