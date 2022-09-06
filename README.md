<div align="center">
<a name="readme-top"></a>
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

## Welcome Page
![Welcome Page Screen Shot](../Plantasynch/front-end/public/asset/WelcomePage.png)

## Home Page
![Home Page Screen Shot](../Plantasynch/front-end/public/asset/HomePage.png)

## Explore Page
![Explore Page Screen Shot](../Plantasynch/front-end/public/asset/ExplorePage.png)

Plantasync is a PERN Full Stack application that performs all CRUD operations. The intended use of Plantasync is to make the plant care process as simple as just adding new plants via the Explore Page or Add Page, editing existing plants in your personal garden, and deleting old plants.

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

1. Clone the repo
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
   ```js
   comming soon
   ```
5. Set up .ENV variables
   ```js
   comming soon
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
<!-- ## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
<!-- ## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature

See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->