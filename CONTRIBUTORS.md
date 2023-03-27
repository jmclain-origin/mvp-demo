# System Dependencies

- Docker Compose
- Node.js *- (would like to move to Docker)*
- Yarn *- (would like to move to Docker)*

## Getting Started

Start up MongoDB docker container by running command

```bash
docker-compose up -d
```

### Development Scripts

Start the full stack development application by running command

```bash
yarn start
```

Start the backend API server only by running command

```bash
yarn start:server
```

Start the frontend client only by running command

```bash
yarn start:client
```

## Contributors

Currently working on a Tarot card site section. Once completed then will setup CI/CD pipeline on AWS EC2 instance (or something similar).

## Development Note

> MERN all the way :smiley:

There are a lot more development dependencies then actual release dependencies.  
No `create-react-app` here. Using webpack for build to maintain full control over output.  
Eslint, Prettier and pre-commit hooks rules are being enforced to break during runtime to assist in quality of the source.

TailwindCSS is being implemented, no need for CSS files and managing class name, the only naming conventions are it should make since to the logic. Prefer to avoid abbreviations, but sometimes it does make sense to use it them. Don't need a lot of documentation about code if it is explains itself. That being said, I have definitely put some chunks in that I would actual submit in to a team or in the client applications. Creative logic welcomed.

### Pre-deployment checklist

With the Tarot site section the first things are

- [x] Catalog view and display for cards
- [x] Filter cards based on suit
- [x] Use query string to filter and search for cards (lazy lookup)
- [x] Modal or separate view for single card detailed display (possibly additional card data required)
- [ ] Page view for card readings and layout. 4 main readings, 2 are nearing the same. Might need 3 different pages for this?
- [ ] Configure for SSR and SSG, with having so many views this should be done before it gets to large
- [ ] Unit and integration tests using Jest, goal is 100% coverage but realistically I'd be happy with 80%.
- [ ] Finally a landing page for this section

The bigger ambitions for Tarot section

- [ ] User register and authentication, using social media strategies such as google, facebook, etc
- [ ] User dashboard for card reading history, will require data structure planning
- [ ] Register domain and capture usage analytics
- [ ] Just some fancy animated UI/UX to give it that allure

Additionally for the future, I would like to a couple other sections, looking for a free Astrology API beyond just  daily horoscopes to implement detailed natal/synastry reports from user input. Also want to do a blog/forum area for users.

---
