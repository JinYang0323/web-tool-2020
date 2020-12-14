# Web tool final project - Jin Yang

## Basic idea

a website where people can write a diary for their pets

## Key features

### Pet profile

-   pet information including name, type (dog or cat), breed, gender, weight
-   Users are able to update profile
-   Multiple pets (maybe)

### Expense tracking

-   Track the expenses in time order

### Pet Encyclopedia

-   Breed Information
-   Vaccines Information
    -   Vaccine introduction
    -   Vaccine Schedule
    -   Polling (maybe)

## Installation

The project can run with `npm install`, `npm start`, and got to localhost:5000

## Usage

### Login

Use username to login, username ‘cat’ is not allowed, special characters are also not allowed. You can use username 'test' to test the system with existing data.

### Profile

Pet information. Name, type, breed, gender are required, weight is optional.

### Expenses

Check the list of expenses, and add new expense by including date, cost, category and notes (optional)

### Encyclopedia

-   Breed Information based on user input, user can choose to switch between imperial and metric
-   If profile not exist, will prompt user to fill in profile
-   Get vaccine list and click on vaccine to view instruction of the vaccine
    Table of vaccine schedule

## Source

Use TheDogAPI and TheCatAPI to get the list of all breeds, and the information about the breed.
Api link: https://www.thedogapi.com/ & https://www.thecatapi.com/
Icons are downloaded from https://www.flaticon.com/

## License

This project is not licensed
