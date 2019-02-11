# Review Questions

## What is Node.js?

- NodeJS is a runtime environment that allows javascript to be run on the back-end where it wasn't able to before. Other languages that were able to do this before are C, C++, Java, Python, Ruby, and C#.
- NodeJS uses JavaScript Object Notation to exchange data between client and server.
- Some advantags of NodeJS include sharing the same language between front-end and back-end which helps reduce context switching, is extremely fast running single threads, is not blocked by synchronous processes, and has a large ecosystem of useful libraries.
- Some disadvantages of NodeJS include not being able to use other languages which might be better, cannot use multiple cores/processors, more difficult for developers coming from a synchronous background, and choice paralysis between NPM packages along with introducing potential vulnerabilities to our code.

## What is Express?

- Express can be thought of as a light framework on NodeJS much like how ReactJS is a framework for javascript
- It's light and unopinionated, meaning one might have to bring in a lot of external resources.
- Express helps build RESTful web services that work with JSON and reduce the common workload with this process.
- Express is also useful to serve single page applications, static content, and still compatible with connect middleware.

## Mention two parts of Express that you learned about this week.

- Connect middleware is an extensive collection of modules which you can download and helps "glue" together middlewares to handle requests.
- REST is a general architectural recommendation and not the standard.
- `idempotent` means the same command executed multiple times but the resources on the server are the same, like pure functions in React.

## What is Middleware?

- Middleware is an array of functions that execute in the order it's presented to help handle our routes. There are built-in middleware, third-party middleware, and custom middleware that we write. Some examples mentioned in class include morgan, cors, and helmet.

## What is a Resource?

- A resource is an item in the server that can be used and passed between server and client.
- They represent the payload of the route handler functions most of the time in the form of JSON.

## What can the API return to help clients know if a request was successful?

- The API can return a HTTP code to let users know the request was a success. In this case, "200" is the proper code for this. Other codes include "201" for successfully created and "202" for accepted.

## How can we partition our application into sub-applications?

- We can write custom middleware that acts on our routes, which also happens to be middleware themselves. We can separate them out to different files having these modular middlewares that can be used across one or many of our route handler paths.

## What is express.json() and why do we need it?

- Express.json() is the body parser of the Express package. In the past, body parser package was necessary to interpret data submitted by the user. This reached a point where it was so commonly used, expressed decided to add this into their core package for all users to benefit from.