# WayFarer
A public transportation booking server that helps in easing the stress of transportation

[![Build Status](https://travis-ci.org/sa-ma/WayFarer.svg?branch=develop)](https://travis-ci.org/sa-ma/WayFarer)
[![Coverage Status](https://coveralls.io/repos/github/sa-ma/WayFarer/badge.svg?branch=develop)](https://coveralls.io/github/sa-ma/WayFarer?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/6c2358ee20e29e1e10b8/maintainability)](https://codeclimate.com/github/sa-ma/WayFarer/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6c2358ee20e29e1e10b8/test_coverage)](https://codeclimate.com/github/sa-ma/WayFarer/test_coverage)

## Getting Started
This instructions will help you get started in running the API

### Prerequisites
To run this program you need to have:
- NodeJs v10.16.0
- NPM
- Postgresql
- Git
- Postman or any other app to test endpoints

### Installation
- Clone the repo and cd into the directory
```shell
>> git clone https://github.com/sa-ma/WayFarer.git
>> cd Wayfarer
``` 
- Install dependencies `npm install`
- Create an .env file using env.sample as a sample
- run `npm run migrations` to seed database tables
- run `npm run build` to transpile the project
- run `npm start` to start the local server
- Use postman to access the server and  on `http://localhost:3000` and other endpoints

## Features
- User can sign up
- User can sign in
- Admin can create a trip
- Admin can cancel a trip
- Admin and Users can see all trips
- Users can book a seat on trip
- Admin can see all bookings and User can see all his/her bookings
- Users can delete their bookings
- Admin and Users can filter trips based on origin or destination  
## Tests
To run test run `npm test` command.
The test covers all the specified endpoints

## Deployments
This application was deployed to the following:
- [Heroku](https://wayfarerapp.herokuapp.com/) : API endpoints
- [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2359678) : Project Management

## API Documentation
- [Documentation](https://wayfarerapp.herokuapp.com/api-docs) : API Documentation

## API Endpoints
| METHOD | DESCRIPTION                                 | ENDPOINTS                            |
| ------ | ------------------------------------------- | ------------------------------------ |
| POST   | User's Sign up                              | `/api/v1/auth/signup`                |
| POST   | User's Sign in                              | `/api/v1/auth/signin`                |
| POST   | Admin can create a trip                     | `/api/v1/trips`                      |
| PATCH  | Admin can cancel a trip                     | `/api/trips/:tripId`                 |
| GET    | Admin and users can see all trips           | `/api/v1/trips`                      |
| POST   | Users can book a seat on a trip             | `/api/v1/bookings`                   |
| GET    | Admins and Users can see all bookings       | `/api/v1/bookings`                   |
| DELETE | Users can delete their bookings             | `/api/v1/bookings`                   |
| GET    | Admins & Users can get trips by origin      | `/api/v1/trips?origin=anything`      |
| GET    | Admins & Users can get trips by destination | `/api/v1/trips?destination=anything` |

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Author

* **Samaila Bala** - [SA-MA](https://github.com/sa-ma)


## Acknowledgments
- [Andela](https://www.andela.com) (For the opportunity to do this)
- All the wonderful people who take out time to create awesome tutorials.