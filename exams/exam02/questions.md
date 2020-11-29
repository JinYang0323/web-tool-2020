# Exam 2 Questions

-   Answers should be roughly 2-5 sentences, and in your own words.
-   Some questions ask for a code sample - keep them short and to the point.
-   Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
-   I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q1: The first rule I've given about REST services is that the URL should represent a resource. What does that mean? Give an example where a url DOES not represent a resource, then describe how to modify it so that it does.

A resource is something you can interact with. For example, '/addpeople' does not represent a resource, but represents a method(or an interaction), we can change it to 'POST /people' so that it represent a resource.

## Q2: If the service returns the username as a plain text string, what is wrong with the below and what would fix it? (Assume the service works without error)

```
  const username = fetch('/username');
  console.log(`user is named ${username}`);
```

In this case, username is the response, instead of the string it self, also, when the console.log is called, the response may not have been received. The fix:

```
fetch('/username').then(response => console.log(`user is named ${response.json()}`));
```

## Q3: What does it mean to "store your state in the DOM"? Why shouldn't you do this?

To store state in DOM means include the code in client side code, in other word in the /public folder. You should not do this because user can easily see the DOM in browser and it is not safe to store data if people can view and even change them.

## Q4: Explain the differences between a multiple-page-web application and single-page-web application. Be sure to fully demonstrate your understanding.

A MPA loads the whole page when there is any update in the page, while SPA loads only part of the page. For MPA, user gets the whole page information, but for SPA, user includes what is needed in request to server and the server response with the data in need.

## Q5: What is Progressive Enhancement? What is the difference in an SPA that uses Progressive Enhancement compared to an SPA that doesn't use Progressive Enhancement?

Progressive Enhancement is taking a non-client-side js web app and augment it with JS. It's not required but it is good for some older engines where client side js cannot be understood. SPA without progressive enhancement is can seperate page into different views and only show the view user would like to see by adding eventlistener to listen to the state change

## Q6: Explain how a REST service is or is not similar to a dynamic asset.

A rest service is similar to a dynamic asset because they are both changeable and are highly dependent on user interaction.

## Q7: Give an example of a piece of information you should not store in a cookie, and why you should not store it that way.

For example, we should not store user's passwords in a cookie, because it is unsafe as other people may be able to see it.

## Q8: Explain why it is useful to separate a function that fetches data from what you do with that data

Seperation of concern make the logic clearer and thus easy for developers to maintain and make changes. when fetching data, we do not want to change the data, so separating fetching from changing data can make sure the data are not mischanged.

## Q9: Explain why try/catch is useless when dealing with asynchronous errors (assume you aren't using async/await)

Because when the catch part is executed, the promise may not be fulfilled yet, so it cannot catch the error by that time.

## Q10: Is separation of concerns a front end issue, a server-side issue, or both? Describe an example the demonstrates your answer.

Both, in front end, we should seperate different part of the view(like login view and todo list view in last assignment), and in backend we should seperate the data (like seperating session info and user info in last assisgnment).
