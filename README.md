# Rawr

## Architecture
```
+-- core // contains shared code, e.g. definitions
|   +-- aggregate-root // mixed DDD and CQRS aggregate root
|   +-- entity // base class for entities after DDD
|   +-- factory // base class for factories after DDD
|   +-- unique-entity-id // value object for uuids used in entities
|   +-- value-object // base class for value objects after DDD
+-- modules // contains nestjs modules for IoC
|   +-- app // wire up the whole app
|   +-- module
|   |   +-- application // application layer after DDD, contains application logic
|   |   |   +-- commands // CQRS command handlers
|   |   |   +-- events // CQRS event handlers
|   |   |   +-- queries // CQRS query handlers
|   |   +-- domain // domain layer after DDD, contains domain knowdledge
|   |   |   +-- events // Domain events
|   |   |   +-- commands // Domain commands
|   |   |   +-- queries // Domain queries
|   |   |   +-- exceptions // Domain exceptions
|   |   |   +-- dto //  defines output for client
|   |   |   +-- entity //  domain entity after DDD
|   |   |   +-- mapper //  transforms data
|   |   |   +-- repository //  defines API for repositories
|   |   |   +-- factory //  manages entity creation
|   |   +-- infrastructure // infra layer after DDD, contains concrete implementations
|   |   |   +-- typeorm //  typeorm specific files
|   |   |   |   +-- entity //  typeorm entities, don't mix up with domain entity
|   |   |   |   +-- mapper //  implements concrete mapper, especially for persistence
|   |   |   |   +-- repository //  implements concrete typeorm repository
|   |   +-- interface // application layer after DDD
+-- main // starts server
+-- test // contains global tessts, e.g. e2e tests
```

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
