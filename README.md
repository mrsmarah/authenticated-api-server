# authenticated-api-server

### Author: Marah Joudeh

### Links and Resources

- [submission PR 1](https://github.com/marah-401-advanced-javascript/authenticated-api-server/pull/1)

- [submission PR 2](https://github.com/marah-401-advanced-javascript/authenticated-api-server/pull/2)

- [heruko app](https://auth-api-marah.herokuapp.com/)


### Setup

#### `.env` requirements

- `PORT` 3000
- `MONGODB_URI` mongodb://localhost:27017/auth-api-db

#### Routes

- `/signup`:
  * POST: send username and password 
- `/signin`
  * POST: send username and password with basic authentication
- `/users`
  * GET: get all users from database
- `/categories`:
  * POST: add a new category 
- `/products`:
  * POST: add a new product 
- `/categories`
  * GET: get all categories from database
- `/products`
  * GET: get all products from database
- `/categories/:id`
  * GET: get one categories from database
- `/products/:id`
  * GET: get one products from database
- `/categories/:id`
  * PUT: update one categories from database
- `/products/:id`
  * PUT: update one products from database
- `/categories/:id`
  * DELETE: delete one categories from database
- `/products/:id`
  * DELETE: delete one products from database


#### Running the server

- `nodemon`

#### Tests

- `npm test`
- `npm run lint`
- `npm run jsdoc`

#### UML

![UML](/assets/uml.jpg)

![UML](/assets/uml11.PNG)





