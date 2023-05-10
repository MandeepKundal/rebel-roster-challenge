# Streaming Royalties Calculator
This web application is designed to implement the [Roster Challenge](https://github.com/rebeldotcom/roster-challenge) by Rebel.

The following functionality has been built:
- MVC structure with separate front and back ends.
- Stores data from a given json file and serves it to browser in a table.
- Calculates the payout amount for each artist in the roster.
- Added a checkbox that toggles (and persists) when user selects the artist payout as complete.
- Columns `Artist`, `Rate`, `Streams` and `Payout` are sortable when user clicks on the column headers.
- The table initially shows 15 records. A `Load More` button has been added to show more results.
- Artists can be filtered by name.

### Technologies used

- Front end: React
- API: RESTful
- Backend: Node/Express
- Storage: MongoDB Atlas

Let's look at how to get the code running.
### Requirements

- A clone of this [repository](https://github.com/MandeepKundal/rebel-roster-challenge.git) is needed. This requires `git` to be installed.
- [Node version = 18.16.0](https://nodejs.org/en/download) must be installed.
- [npm version = 9.6.5](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) must be installed.

### Starting the web application

The [repository](https://github.com/MandeepKundal/rebel-roster-challenge.git) 
is available on GitHub. To clone it open a terminal to a directory of your
choosing and run the following command:

```bash
git clone https://github.com/MandeepKundal/rebel-roster-challenge.git
```

Now we'll have the code in the directory `rebel-roster-challenge` directly under our
current directory. Next we change the directory to that.

```bash
cd rebel-roster-challenge
```

Next we install the required node dependencies for the server

```bash
npm install
```

Once all the dependencies have been installed, we will start the server 

```bash
npm start
```

Now we open a new terminal window and go to our current directory and then change directory to `client` to get React spun up

```bash
cd client
```

and then to install node dependencies

```bash
npm install
```

Once all the dependencies have been installed, we will start the server 

```bash
npm start
```

Our servers should be running on port `3000` and `5000` and the assignment is ready to be tested. Just open a browser and navigate to `http://localhost:3000/`.