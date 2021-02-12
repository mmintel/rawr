## Installation

```bash
$ yarn
```

## Running the app
### Docker
```bash
# start development
$ yarn start:docker

# start detached
$ docker-compose up -d

# rebuild, e.g. after new packages
$ docker-compose up --build -V

# remove postgres data
$ docker-compose exec db bash rm -rf /var/lib/postgresql/data
```

### Manually
```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test
### Docker
```bash
# run e2e tests
$ yarn test:e2e:docker

# clear test db
$ yarn test:e2e:docker:clear
```

### Manually
```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
