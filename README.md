# Weather App

https://weather-app-simon.herokuapp.com/

## Development Setup

npm: v8.0.0
node: v16.11.1
browser: Chrome

To install the dependencies:

npm install

To start the project:

npm start

To Run the testing:

npm test

FYI:

1. If you click search icon and some alert like `exceed time out 1000ms` appears, just retry it a couple of times and the api request will work as expected
2. If the key expired from weather api, you can simply renerate one and put it in httpClient under axios folder

## Tech stack

react, typescript, context, d3.js, formik, yup, axios, @testing-library/react, msw, css, material-ui@5

## Introduction

### Structure (folder)

1. test: Contains all the test files using jest and testing-library
2. test_utils: Helper function for test.
3. assets: Images and Icons are putted here
4. axios: Http client set up with base url
5. components: Contains charts and forms (reusable level component)
6. config: for some static arrays or enums
7. context: Set up state management
8. mock: Set up MSW's server and handler for testing
9. pages: Component that will render at App.tsx
10. services: API call
11. utils: Helper function for drawing charts

### UI/UX:

1. Before I start coding, I went to some designing website to see how professional UI/UX designer will design a weather application. Just to have a overall idea of how this weather app going to look like.
2. Download the necessary resources, such as Icon, background images, GIF images
3. Reviewing material-ui library to see if there is any existing component could match exactly what I want

### UI implementation

1. The majority of styling part is completed by css
2. Made use of few material-ui components
3. Responsiveness is based on break point

### State management

1. Use context and useState
2. Reason for picking context instead of redux:
   The state is not very complex, and does not require a very hight-frequency updates
3. Reason for picking useState in context instead of useReducer:  
   State could be relative independent in this project. When one element of my state relies on the value of another element of my state, then useReducer would be better

Overall, either using useState or useReducer is ok as along as we try to seperate and handle state wisely.

### API

1. Went through the weather.api.com documentations and play around with ther API Explorer.
2. Contact their Technical Support, as there Forecast API can only return me the weather day for the next TWO days instead of THREE days. However, it turns out that I have to pay to upgrade if I want the forecast value of three days. So I choose to stick on the free plan (no hard feelings)

### Testing

1. After Comparing the difference between Jest Mock and MSW, I eventually choose msw for helping test cases that involves api request
2. Test covers: form validation, api request on network level, dom updates, d3 charts snapshot, errors and alerts

### Deployment

1. Heroku

## What will be continue to implement

1. Different weather will show different background image (currently we only get cloudy)
2. Create necessary tooltip for d3 charts. when mouse hover on any specific of on the charts the responsive data at that point will be shown quickly and smoothly
3. When click on the Upcoming data on the right list. it will regenerate the charts based on the data on that day.

## Conclusion

In real-world application, I believe, there will always be room for improvement in product quality, functionality, and code quality. For this app, there is still a lot of things that can be improved or implemented like ui responsiveness or the features I mentioned above. But as matter of time, I will stop for now, but will keep working on it in the future.
