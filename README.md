# Acme Voting (Votem Coding Assesment)

## Using the App
The website is hosted on [heroku](https://acme-voting.herokuapp.com), the website should be fairly intuitive. The following information will help you navigate around.

The API's are writing to a json file on the server, data will persist until I push another release.

**Login Credentials**

Username: `admin`

Password: `password`

**Direct Route to Ballot**

Use code `KING`


## A note to Votem 
I have put about a weeks worth of work into this project, stumbled over more than a few unique challenges, and I apreciate the opportunity to flex my creative thinking muscles. Generally im really pleased with what ive produced(with some caveats), I hope you guys like what you see. If you require explanation on anything please let me know. 

If more time was allotted, I would have liked include or refactored the following things.

- Add better session management, curently the session resets everytime the window is closed. This improvment would likely include a JWT handshake, a timeout function, and some better route guards
- Some sort of results view on the thank you page.
- better route guard for editing, can edit, etc for past and active elections. Currently the navigation is obscured but you could route directly if you knew the id.
- Better error handling, most of the forms have basic validation, but i need to put in more for api responses and routing errors. 
- More user testing, and some design improvments. My mom was helpful, but more research would be nice.
- Table sorting on the dashboard, filter/search, etc
- Increase the test coverage, currently a little over 80% I think.
- The ability to add a freeform answer to polls, a small oversight on my part.
- The ability to delete an election, nothing crazy here, just ran out of time.
- XSS is handled by angular, I didnt override and of the sanitation features.
- An ssl cert would encrypt the post data, other client side encryptions seems like a moot point, maybe you guys can teach me something

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.7.

## Running the project locally

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `node server-local` so start up the node server. It runs on port 3000.

---

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test --sourcemap=false` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
