# Contributors

Currently working on a Tarot card site section. Once completed then will setup CI/CD pipeline on AWS EC2 instance (or something similar). 

## Developer Docs

> MERN all the way :smiley:

A lot more development dependencies then actual release dependencies.  
No `create-react-app` setup webpack manually to maintain full control over output.  
Eslint and Prettier is being enforced to break during development runtime to assist along with pre-commit hooks.

TailwindCSS is being implemented, no need for CSS files and managing class name, the only naming conventions are it should make since to the logic. Prefer to avoid abbreviations, but sometimes it does make sense to use it them. Don't need a lot of documentation about code if it is explains itself. That being said, I have definitely put some chunks in that I would actual submit in to a team or in the client applications. Creative logic welcomed.

### Pre-deployment checklist

With the Tarot site section the first things are

- [x] Catalog view and display for cards
- [x] Filter cards based on suit
- [ ] Use query string to filter and search for cards (lazy lookup)
- [ ] Modal or separate view for single card detailed display (possibly additional card data required)
- [ ] View layout for card readings. 4 main readings, 2 are nearing the same. May be 3 different pages for this
- [ ] Configure for SSR and SSG, with having so many views this should be done before it gets to large
- [ ] Unit and integration tests using Jest, goal is 100% coverage but realistically I'd be happy with 80%.
- [ ] Also a landing page for this section

The bigger ambitions for Tarot site

- [ ] User register and authentication, using social media strategies such as google, facebook, etc
- [ ] User dashboard for card reading history, will require data structure planning
- [ ] Register domain and capture usage analytics
- [ ] Just some fancy animated UI/UX to give it that allure

Additionally for the future, I would like to a couple other sections, looking for a free Astrology API beyond just  daily horoscopes to implement a detailed natal/synastry reports. Also want to do a blog/forum area for users.

---

### System Dependencies

- Docker Compose
- Node.js *- (would like to move to Docker)*
- Yarn *- (would like to move to Docker)*

Start up MongoDB docker container by running command

```bash
docker-compose up -d
```

### Dev Scripts

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

## Project Structure

To try and avoid a dependency mess while running 2 apps during development I setup on this project handling all dependencies at root level (without using workspaces, I learned that after starting this not sure which way I prefer yet). Since at build the two apps bundle into one, using Express to deliver the static files output from React build. Allowing for use of a single EC2 instance to host the full application.

- root directory contains the project build configurations  
- client folder for the frontend  
- server folder for the backend  
- *additional info coming soon*
