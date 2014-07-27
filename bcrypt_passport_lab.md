## Build your own authentication system

### The Problem:

You just started working at a small startup and the guy who was working on the project has set up a small database with usernames and passwords. However, he doesn't know too much about web security so his passwords are in plain text. After yelling at him that this is one of the worst things to possibly do as a developer, you set out to fix the problem.

___Task 1___ - using the sample database and template provided - include ```bcrypt``` and hash the passwords with salt and once the user successfully logs in, route them to ```/home```

Once you've completed this task - pat yourself one the back...that wasn't easy, but we still have a problem! Head to your /home route and see what happens if you don't log in....On top of that, it's pretty frustrating for users who log in and then refresh the page or go back soon to have to log in all over again.

Looks like we need some way to limit access to our /home page for logged in users only and ensure that once a user is logged in, our system will have some way of remembering that they logged in recently. 

___Task 2___ - using passport.js, implement an authorization system that stores a session when the users logs in and only allow logged in users to have access to the ```/home``` page

### Before you start coding....

Think of the steps you will need to take in order to complete these each task:

1. Include ```bcrypt```
2. Write a function 

__Bonus__:

1. include a catch-all route with some text and a link back to the root route
2. Include a 404 status code along with your catch-all route
3. Design a nice login form. Encorporate bootstrap, foundation or use your own css styling.