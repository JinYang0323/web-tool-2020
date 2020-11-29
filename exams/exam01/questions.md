# Exam 1 Questions

- Answers should be roughly 2-5 sentences, and in your own words.
- Some questions ask for a code sample - keep them short and to the point.
- Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
- I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q: What is the difference between a dynamic asset and a static asset?

A dynamic asset may change based on user interaction, a static asset will not change once defined. When a dynamic asset is changed, the server must be restarted to reflect the change. When static assets are changed, there is no need to restart the server.

## Q: What is the difference between a relative and absolute file path in an href? What is the "webserver root/document root" and how do absolute/relative paths relate to this document root?

A relative path is relative to current page, an absolute file path is a completed path which is not related to current position. webserver root is the root of a website, also the '/'.

## Q: What is the difference between server-side and client-side JS?

client-side JS runs on the browser, while server-side runs on server. Client-side JS is visible to user/browser, but server-side is not, so the security check is in server side.

## Q: What are the differences between `var`, `const`, and `let`, and when should you use each of them?

var is the oldest method of the three in js to declare a variable. const defines a variable and once defined, it can not be changed. let declares a variable that can be changed, and is used in block context. We should not use var in any case through the course, and use const as frequently as posible. Use let when iteration.

## Q: What are the 4 ways to create inheritance in JS? (no examples needed, just a sentence describing each)

1 constructor - a constructor function
2 Object.create - call when creating a new object
3 ES6 classes - like constructor, can include a constructor function
4 Brute Froce Prototype Assisgnment - go through all fields and assign, not recommended

## Q: Give a short code demonstration of 1 way to create JS inheritance to **inherit** a method named "purr".

class Cat{
constructor(name) {
this.name = name;
}
purr() {
console.log(`This is a cat purr`);
}
}
const cola = new Cat('Cola');
cola.purr();

## Q: Give a short code demonstration of a different way to create JS inheritance to **inherit** a method named "hiss".

const Cat = function(name) {
this.name = name;
};
Cat.prototype.hiss = () => {
console.log(`This is a cat hiss`);
}
const cola = new Cat('Cola');
cola.hiss();

## Q: Explain what a callback is, and give an example.

callback is a function which is passed into another function
function callCallback(callback) {
callback();
}
callCallback(() => {console.log('This is callback')})

## Q: What are the words that would correctly fill in the space in this sentence:

"If a function using `this` is `_______`, then `this` will not have the intended implicit value"
a fat arrow function

## Q: In CSS, what does it mean "You shouldn't name your classes after what they look like"? Why? Give an example of a class that is well named and a class that is poorly named.

The sentence means that you should not name a class 'textbox' but instad 'userInput'. Because this makes more sence when applying styles and when coding.
well named: inputName
poorly names: red
