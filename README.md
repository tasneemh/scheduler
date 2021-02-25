# Interview Scheduler
Finding it difficult to keep track of all the interviews you conduct? Try Interview Scheduler! Built with modern React, Interview Scheduler helps you stay on top of all the appointments.

Book, edit, and cancel interviews as you like. Keep track of the scheduled appointments easier than ever before.

# Final Product

!["Front image"](https://github.com/tasneemh/scheduler/blob/master/images/frontPage.png?raw=true)

!["Book interview"](https://github.com/tasneemh/scheduler/blob/master/images/bookInterview.png?raw=true)

!["Delete interview"](https://github.com/tasneemh/scheduler/blob/master/images/DeleteAppointment.png?raw=true)

# Technology

Single-page application built with modern React practices such as hooks and functional components.

Front-End: HTML, SCSS, React

Back-End: Node, Express, PostgreSQL

# Dependencies
- React 16.9.0 or above
- Axios
- Classnames
- Node.js
- Express
- Node-postgres

# How To Use Interview Scheduler

- Book an Interview
  - Click on any available spot, enter the name of the interviewee and select an interviewer.
  - If no spots are available, you can choose a different day on the left sidebar.

- Edit an interview
  - Something changed? No problem.
  - Simply hover over an interview, click the edit button, do the changes, and hit save.

- Delete an Interview
  - Is there an emergency and cannot make it for an interview. Don't worry! Hover over an interview and click the delete button.

# Testing

This app was extensively tested using the following technologies:

- Storybook for unit testing
- Jest for unit and  integration testing
- Cypress for end to end testing

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
