<br>
# Project Name & Description

Xenonstack - Hiring Portal

Xenonstack hiring portal built with React and React-Redux.<br/>

# Project Status

This project is currently in development mode.

# Installation and Setup Instructions

Below you will find some information on how to perform Installation and Setup tasks.


## Run App in Development mode
**Clone this repository**
```
git clone "http://git.xenonstack.com/util/career-xenonstack-hiring.git"
```

**Install Dependency**
```
npm install
```

**Start the application in development mode**
```
 npm start
```

Open [http://localhost:3009](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

Static files are served from the `public` folder, project JavaScript files are bundled from the `app` folder.

## Run App in Production build

**Start the application in Production mode**

 To build the project for Production Env run the following command.

```
npm run build
```
And serve by

```
serve -s build
```
The app will run on 5000 port for the Production mode.<br>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

## Folders and Files Structure

Your project directory should look something like this:

```
Xenonstack_hiring_portal
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    actions/
    components/
    constants/
    containers/
    middleware/
    App.js
    index.js
    route.js
    package.json
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.
You need to **put any JS and CSS files inside `src`**, otherwise, Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.

## Environment Variable

Set environment variable for App Base API and Auth API as below:

**App Environment Variable**

```
* REACT_APP_AUTH_API="https://career-admin.xenon.team/api/auth";
* REACT_APP_ASSIGN_USER_API="https://career-admin.xenon.team/api/ASSIGN_USER-portal";
* REACT_APP_DRIVE_API="https://career-admin.xenon.team/api/drive-portal";
* REACT_APP_COLLEGES_WS="ws://10.0.0.112:8001"
```

## Dependencies
* React, React-DOM and React Redux
 See `package.json` for more Dependencies and packages Required.
