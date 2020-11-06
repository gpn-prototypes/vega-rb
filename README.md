# Vega-RB

## Зависимости

- [Vega Frontend Configs](https://github.com/gpn-prototypes/frontend-configs)

## Начало работы

##### `yarn`
Установка зависимостей

##### `yarn start`
Запуск dev server `http://localhost:3009`

##### `yarn dev:shell`
Запуск dev server для работы из под обвязки `http://localhost:9004`

##### `yarn build`
Production build в папку `./dist`

##### `yarn build:shell`
Production build для обвязки в папку `./dist`

## Настройка proxy
Для необходимости изменить `proxy` по-умолчанию, например во время разработки, 
необходимо выполнить следующие шаги: 

1. Создать файл конфигурации (**.env** | **.env.development** | **.env.development.local**)
2. Определить переменную **REACT_APP_PROXY** с необходимым значением

Например: 
```bash
REACT_APP_PROXY=http://localhost:5000/
```

_Важный момент:_ Изменение поддерживается только для рабочего окружения `development`

## FAQ

#### Проблема при установке зависимостей

Если не получается установить зависимости, то:
1. Прочитать ошибку в консоли, скорее всего ошибка связана с авторизацией в github, следуйте к п.2
2. Сгенерировать токен: <a href="https://github.com/settings/tokens">https&#x3A;//github.com/settings/tokens</a> → Generate new token. Дополнительно нужно отметить `read:packages` и `write:packages`.
3. Авторизоваться из текущей директории в Github-реджистри через npm:

```shell
$ npm login --registry=https://npm.pkg.github.com`
> Username: USERNAME
> Password: TOKEN
> Email: PUBLIC-EMAIL-ADDRESS
```

#### Ошибка с запуском приложения из-за неверных окончаний строк

- Из-за того, что по-умолчанию в git может быть включена опция автопреобразования окончания
строк на `clrf` ее стоит отключить (хотя бы в настройках проекта, т.е. изменить локальные настройки git)
- Запустить автокоррекцию файлов используя `prettier` (команда `yarn lint-fix`)
