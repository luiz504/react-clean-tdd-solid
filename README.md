# React - TDD - SOLID - Clean Architecture

Project made following an outdated course [ReactJS, Hooks, Recoil, TDD, Clean Architecture, SOLID](https://www.udemy.com/course/react-com-mango/), focused on TDD, Clean Architecture and SOLID on front-end #react-way, to flex some different approaches.

- Filtering out bad practices that have been improved over time, especially in front-end testing practices.

- Ignoring some design choices and improving others;

- Integrating new tools like Vite, Vitest, tailwind, github-actions;

- In the future, the goal is to refactor the project to use the Next.js Router and its associated `shenanigans`;

## Notes

[Login Page Architecture Draft](https://drive.google.com/file/d/1uv8j8g3y8jRRDBekXaK9XROR2-qSjINr/view?usp=sharing)

### highlights

- YAGNI - You aren't gonna need it
  keep it simple and implement when needed

## Disclaimers about the course

- While the course has its value, it has aged poorly in some aspects. Some cases will require additional knowledge, like find the other twin course that the same author made on github but with backend stuff, because the API links from the course uses is down for long time. Some libs changed a lot like react-router-dom, so be prepared :)

- Cost and Time Investment: The course is not cheap, considering its price and the time required to ignore outdated content, resolve old dependencies, and find the APIs used in the course.

## Test Doubles

Stub -> don't care with the implementation, its returns or properties are flexible to the test scenario needs;
Spy -> don't care with the implementation, but captureValues and is able to mock return and properties;
Mock -> Just capture de values
