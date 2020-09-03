# Vega 1.0

#### `yarn`
Установка зависимостей

#### `yarn start`
Запуск dev server `http://localhost:3009`

#### `yarn build`
Production build в папку `./build`

## Настройка proxy
Для необходимости изменить `proxy` по-умолчанию, например во время разработки, 
необходимо выполнить следующие шаги: 

1. Создать файл конфигурации (**.env** | **.env.development** | **.env.development.local**)
2. Определить переменную **REACT_APP_PROXY** с необходимым значением

Например: 
```
REACT_APP_PROXY=http://localhost:5000/
```

_Важный момент:_ Изменение поддерживается только для рабочего окружения `development`
