This is the frontend of the reverse recipe search project.

It provides a graphical interface for the REST-Api defined in the [Backend](https://gitlab.dit.htwk-leipzig.de/webeng-schekahn-kircheis-schneider/backend).

You need node.js installed with a version of 16+

### Installation
To install all dependencies cd into the `frontend-react` directory and run:
```bash
npm install
```

Now you should b abled to run:
```bash
npm run start
```
to start the development server for the frontend.

### Running tests
To execute all test for the project run:
```bash
npm test
```
in the `frontend-react` directory. Per default only new/changed tests are run. If you want all tests to be evaluated type `a` in the terminal.

### Starting the docker container
Simply run:
```bash
docker compose down && docker compose up --build -d
```
in the project root. This will spin up a fresh container hosting the frontend. If the backend containers are already running, the frontend container will be added to the same group and network as them.
