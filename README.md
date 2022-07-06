# Movie App - Angular based Movie app

## What's inside & assumptions

A movie app created using angular. There are 3 roles user, admin and prime.
Default user and admin credentials are attached in the login page.

Note: Default users cannot be upgraded to Prime

In this move app we have used a Open source movie API to fetch, search filter movies.
Admin also can add movies and they will be listed on Recently added on Home page.
Admin added movies won't be available to filter and search.

For favorites, watch later, watched and reviews we have used local storage to store those values.

### Bonus features

- Category based movie filtering
- Translation(Localization) - language selection avaialbe between english and french

## Getting Started

- Github - https://github.com/hashaneranda/movieApp-angular
- Deployed - http://movie-app-angular-lilac.vercel.app/

### Installation

Clone the repo:

```bash
git clone https://github.com/hashaneranda/movieApp-angular
cd order-form
```

Install the dependencies:

```bash
yarn install
```

and create a new file .env and copy the content of .env.sample

### Commands

Running locally:

```bash
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
```

Building the app for production:

```bash
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
```

Testing:

```bash
# run all tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.4.

## Project Structure

```
src\
 |-- app\
    |--|--components\     # Application shared componenets
    |--|--directives\     # Shared directives
    |--|--helpers\        # common Compoenents and utilities
    |--|--models\         # Models
    |--|--pipes\          # Shared Pipes
    |--|--screens\        # App pages
    |--|--services\       # App services
 |-- assets\
    |--|--i18n\           # Localization configuration files
```
