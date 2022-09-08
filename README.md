<a name="readme-top"></a>

<div align="center">
  <a href="https://github.com/JC-MT/Plantasynch">
    <img src="https://cdn-icons-png.flaticon.com/512/628/628324.png" alt="Logo" width="100" height="100"/>
  </a>

<h1 align="center">Plantasync</h1>

</div>

[Plantasync](https://plantasync.netlify.app) is a web-application that provides users with general plant information and suggested plant care for all types of plants. You can easily keep track of your plants suggeted care with Plantasync.

## Important Links

- [Deployment API Server](https://plantasynchapi.herokuapp.com)
- [Deployment Frontend](https://plantasync.netlify.app)
- [Trello Board](https://trello.com/b/D5uD8VjO/plantasynch-trello)
- [ERD](https://miro.com/app/board/uXjVPchihEA=/)
- [Wireframes](https://wireframe.cc/2U5inf)

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

 ### _Plantasync_ is a PERN (Postgres, Express, React, Node) Full Stack application that performs all CRUD (Create, Read, Update, Delete) operations. The intended use of Plantasync is to make the plant care process as simple as just adding new plants via the Explore Page or Add Page, editing existing plants in your personal garden, and deleting old plants. Once any of your plants are ready to be watered, Plantasync will send you a helpfull email reminder (*make sure your plants have the right email on file) so you'll never miss your plants water schedule again.

## Welcome Page
<img width="600" alt="Welcome" src="https://github.com/JC-MT/Plantasynch/blob/main/front-end/public/asset/WelcomePage.png?raw=true">

## Home Page
<img width="600" alt="Home" src="https://github.com/JC-MT/Plantasynch/blob/main/front-end/public/asset/HomePage.png?raw=true">

## Explore Page
<img width="600" alt="Explore" src="https://github.com/JC-MT/Plantasynch/blob/main/front-end/public/asset/ExplorePage.png?raw=true">

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With:
![Built With](https://skillicons.dev/icons?i=postgres,express,react,nodejs,tailwind)

### Deployed With:
![Deployed With](https://skillicons.dev/icons?i=netlify,heroku)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
To get a local copy up and running, follow these simple steps. We are assuming you have both Node and Postgres installed on your local machine.

### Installation

1. Fork, then Clone the repo
   ```sh
   git clone https://github.com/JC-MT/Plantasynch.git
   ```
2. Install NPM packages (Frontend)
   ```sh
   cd front-end && 
   npm install axios react-router-dom react-toastify tailwindcss
   ```
3. Install NPM packages (Backend)
   ```sh
   cd back-end && 
   npm install cors dotenv express node-cron nodemailer pg-promise
   ```
4. Run Schema & Seed
   ```sh
   cd back-end &&
   npm run db:init && npm run db:seed
   ```
5. Set up .ENV variables
    ```sh
    cd back-end && touch .env
    ```
    ```sh
    cd front-end && touch .env
    ```
    _Back-end Variables_: this might look different for your specific set up.
    ```sh
      PORT=3000
      PG_HOST=localhost
      PG_PORT=5432
      PG_DATABASE=plantasynch_db
      PG_USER=postgres
      PG_PASSWORD=""
    ```
    ## Note: Additional configurations are needed for the password you will be adding here. More details on Usage.
    ```sh
      EMAIL_ADDRESS=yourEmail@gmail.com
      EMAIL_PASSWORD='yourPassword'
    ```
    _Front-end Variable_: this might look different for your specific set up.
    ```sh
      REACT_APP_API_URL=http://localhost:3000
    ```
  
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

### Node-Mailer
To use your Gmail with NodeMailer, you will have to make sure you have the right settings and have been granted an -**APP Password**-.

_For a simple walkthrough, please refer to this [Guide](https://miracleio.me/snippets/use-gmail-with-nodemailer/)_.

### Node-Cron
NodeCron is set to run every minute locally. If this is not your preference, feel free to look up the Cron Syntax documentation below for more info.

_For Cron Syntax, please refer to the [Documentation](https://nodecron.com/docs/#cron-syntax)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [ ] Adding Alert messages to users when they are watering their plants too often. 
- [ ] Adding User Sign-In. Users should be able to create their own database and be the only once to have access to their plants.
- [ ] Dynamic Navbar notifications. Users should see the amount of plants that need to be watered on the _Home_ icon. This should update if anything has changed.

See the [open issues](https://github.com/JC-MT/Plantasynch/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>