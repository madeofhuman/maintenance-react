# Maintenance Tracker, a React Client

[![Build Status](https://travis-ci.org/madeofhuman/maintenance-react.svg?branch=develop)](https://travis-ci.org/madeofhuman/maintenance-react) [![Coverage Status](https://coveralls.io/repos/github/madeofhuman/maintenance-react/badge.svg?branch=develop)](https://coveralls.io/github/madeofhuman/maintenance-react?branch=develop)

## Introduction

This is a React client that consumes the [Maintenance Tracker](https://github.com/madeofhuman/Maintenance-Tracker-App) API.

*Maintenance Tracker is an application that provides users with the ability to reach out to operations or repairs department regarding repair or maintenance requests and monitor the status of their request.*

## Features

1. **Authentication:** _a sign up and a sign in form for creating a account and logging in. A successful sign up automatically logs the user in and redirects them to the user or admin dashboard depending on their role. These forms are displayed in a modal on the landing page at the root url path ('**/**'). A logout button is displayed at the top of the page when a user is logged in which logs them, out and clears their session._
2. **User dashboard:** _displays a paginated table of all the requests made by the user. This is found at the ('**/dashboard**') url path. It is a protected path accessible only by a signed in user, because the information displayed is unique to each user._
3. **Admin dashboard:** _displays a paginated table of all requests made by all users. This is found at the ('**/admin**') url path. This is a protected path accessible only by an admin. The information displayed is the same for any admin that accesses it._
4. **Request view:** _displays more information about a request. For a user, it also displays buttons to **edit** or **delete** the request if it is yet to be approved, disapproved, or resolved. For an admin, it displays buttons to **approve**, **disapprove** or **resolve** a request depending on its status. This is found at the ('**/view/:requestId**') url path, and is accessible only by a signed in user or admin._
5. **Edit request:** _a user can edit their request as long as it has not been approved, disapproved, or resolved. When the user clicks the edit button on the request page, a modal is displayed with a form containing the request details. This feature can only be accessed by a signed in user._
6. **Delete Request:** _a user can delete their request as long as it has not been approved, disapproved, or resolved. This is done by clicking the delete button on the request page This feature can only be accessed by a signed in user._ **This action cannot be reversed.**
7. **Approving, disapproving and resolving a request:** _This are admin functions, the buttons for which appear dynamically on the request view page. For further information, check out the **request lifecycle** section below._

## Request lifecycle

A request goes through various phases and has various statuses in its lifetime:

1. **Creation:** _at this stage, the request has a status of **in-review**. Only at this stage can a user edit or delete the request, i.e. the edit and delete buttons are only visible on the request page at this stage. For the admin, they can either approve or disapprove the request, i.e. the request view page will show only the buttons for approval and disapproval._
2. **Approval:** _once the request has been approved the status changes to **pending** and, the user can no longer edit or delete it. For the admin, there will be a button on the request page to resolve the request._
3. **Disapproval:** _when a request is disapproved by an admin, the status changes to **disapproved** and no further action can be performed on it by either the user or admin._
4. **Resolution:** _when work on a request has been completed, the admin marks it as resolved. This gives the request a status of **resolved**. This stage and the disapproval stage are the two possible ends of the request lifecycle._

## Technologies used

1. [React](https://reactjs.org/), a JavaScript library for building user interfaces. This is the main tool I used to build the client application.
2. [Redux](https://redux.js.org/), a state management library for JavaScript applications. I used it to manage the state of the application, as doing that with React's internal state manager will make the code unwieldy and unmaintainable.
3. [Node.js](https://nodejs.org/), a JavaScript runtime for building server-side JavaScript applications.
4. [NPM](https://www.npmjs.com/), a package manager for JavaScript. I used this to manage the packages I used in creating the app. It also provides me with certain command line tools to run scripts that perform or automate certain functions like starting the server and running tests.
5. [Express](https://expressjs.com/), a web framework for Node.js. I used this to serve the initial route of the application, before React handles the rest.
6. [Webpack](https://webpack.js.org/), a module bundler for mobile applications. I used this as a build tool to bundle my JS and CSS files into a single file respectively. I also used it to set up a dev server for local development.
7. [Babel](https://babeljs.io/), a toolchain that I used to convert ES5+ code into backwards-compatible JavaScript code for current or older browsers.
8. [Jest](https://jestjs.io/) and [Enzyme](https://github.com/airbnb/enzyme), testing utilities for JavaScript and React applications.
9. [ESLint](https://eslint.org/), a linter tool for pattern identification and reporting in JavaScript, which I used alongside the [Airbnb style guide](https://github.com/airbnb/javascript).

A full list of the tools and technologies I used in this project is available in the _package.json_ file.

## Contributing

This is an open-source project licensed under the MIT licensing agreement and as such contributions are highly welcome. However, there are some recommended guidelines to follow to ensure proper collaboration by everybody. Before we get to those, however, here is how you will get the project set up on your local development system (first ensure you have Node and npm installed):

### Getting set up

1. Clone the repo by running `git clone git@github.com:madeofhuman/Maintenance-Tracker-App.git` or downloading the [zip file](git@github.com:madeofhuman/maintenance-react.git).
2. Navigate to the root of the folder and install all packages with the command `npm install`.
3. You can start the dev server by running `npm run dev`, or the production server by running `npm start` (note that this will build the app and create a `dist` folder at the root directory of the application). Note that it is unnecessary to commit the `dist` directory (it has been excluded in the `.gitignore` file) as the app is set up to build on the server.
4. You can run the entire test suite by running the command `npm test`, or a single test file by running the command `npm test -- testFileName.spec.js`. Note that this will create some `__snapshot__` folders in some directories in the test directory. Do not commit these folders as they are just needed for the tests.

### Contribution guideline

Everything you need to know about this can be found in the [wiki](https://github.com/madeofhuman/maintenance-react/wiki). It includes formats for commit messages, branch naming and PR description.

#### Useful links:

[The Client](https://maintenance-react-staging.herokuapp.com/)

[The API](https://maintain-r.herokuapp.com/api/v1/)
