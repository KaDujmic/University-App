# University Application

Built using node.js[https://nodejs.org/], express[https://expressjs.com/], postgresql[https://www.postgresql.org/] and sequelize[https://sequelize.org/]

## Appliaction functionality

- CRUD for Professor, Student, Course, Exam, Major, Department, Result, Enrollment and Professor on Course
- View for Students on Course
- View for Professors on Course
- View Student Enrollments
- View Student Results
- Log in as a user
- Restricted Professor and Student Routes to only Logged in users
- Professor routes are restricted to only logged in professor
- And the list goes on, once the setup of the app is complete look at the swagger documentation and see all the functionality

---

# Prerequisites for the application


**Node.js** - https://nodejs.org/en/
**Postgresql** - https://www.postgresql.org/


---

# How to use the application

#### Steps to start the application

> ---
>
> 1. `npm install` - Install all the dependencies needed for your application
> 2. The database postgresql should be installed and running locally
> 3. `npm run migreate:dev` - Create Tables and dependencies in you DB
> 4. `npm run seed:dev` - Populate Tables with correct entities
> 5. `npm run start:dev` - This will start your node server
> 6. `Use the port displayed in the console -> default loacalhost:4000`
>
> ---

##### Steps to run the tests on the application

> ---
>
> 1. `steps above are completed`
> 2. `npm run test` - Tests will be executed on test database, migration and seeding is included in the tests
>
> ---

#### Additional information

> ---
>
>> There are more scripts u can use, see package json for any additional information you need
>> There is an example of a .env file. For all other environments you need or want to use, edit the config.js file and add .env.{{your_env}} file
>> The script to start the server should look like 
>> `"npm run start:{{your_env}}": "node -r dotenv/config server dotenv_config_path=.env.{{your_env}}"` 
>> And then the migrations or seeders 
>>>```
>>>"migrate:{{your_env}}": "npx sequelize-cli db:migrate --env={{your_env}}"
>>>```
>>>```
>>>"seed:{{your_env}}": "npx sequelize-cli db:seed:all --env={{your_env}}"
>>>```
>
>> Also if you want to run tests and have multiple databases and run your tests on a different database,
>> you can install **docker** - https://www.postgresql.org/ and run the provided compose yml file
>>> `docker compose up` will create 2 images in a container, you can edit the ports in docker-compose file
>
> ---

# API

Here is a list of all routes and requests you can use.
API testing application is required for these tests (e.g. Postman).

> ---
>
> #### You can view the Swagger Documentation on this link
>
> > http://localhost:4000/api-docs/
>
> ---
