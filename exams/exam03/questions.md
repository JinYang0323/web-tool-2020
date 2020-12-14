# Exam 3 Questions

-   Answers should be roughly 2-5 sentences, and in your own words.
-   Some questions ask for a code sample - keep them short and to the point.
-   Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
-   I cannot assume knowledge you don't demonstrate, so be clear and explicit.

-   NOTE: Because there is no coding portion to Exam 3, each of these questions is worth more to your grade than the questions on previous Exams! Be sure to have answers you are confident shows your understanding!

## Q1: I have said that React JSX components are like functions and follow many of the same best practices. Give at least 2 such best practices that are good for both JS functions and JSX Components. (Be substantive!)

1. Separation of concern. Components, like functions, should be small and function-specific, meaning one components should only be dealing with one task, and render a specific part of the whole page.
2. leave comments, but only necessary ones, tells about the usage of the component instead of the component itself
3. always give meaningfull names, for example, instead of ComponentA, use Login instead

## Q2: I have said that using Progressive Enhancement (supporting both MPA and SPA) is best, but many places don't do so because of the effort involved. What is at least one major reason not to use SPA alone?

With progressive enhancement, it continues to work if there is no client side Javascript. So if the user is using other serach engines or devices, it is garanteed to be working.

## Q3: The "proxy" setting in your package.json is required for the create-react-app dev server to call a local service, but not if you are calling a service that will always be on a different domain. Explain what happens (in terms of network traffic) when your dev server is running on localhost port 3000 and the page makes a call to `/service` when you have "proxy" set to `http://localhost:4000` and a server running on localhost port 4000 that has the `/service` service. hint: This should list and describe multiple request/response steps, and be clear where each request is coming from and where the response is received.

when localhost 3000 makes a call to `/service`(`localhost:3000/service`) (first request), it does not match any existing path or file, so react server pass the request to localhost:4000 server (second request), and the localhost:4000 server return a response to react server (response to the second request), and the react server response to the localhost:3000(response to the first request).

## Q4: Follow-up: Using the above scenario, list and describe what the network calls are like after you run `npm run build` and are only running all of your content on localhost port 4000 when your JSX makes a call to `/service`

when npm run build is runned, everything in /public and /src are bundled into /build, and served as static files on port 4000. So now, localhost 4000 makes a call to `/service`(`localhost:4000/service`), and get the response fron server directly

## Q5: I have said that you can only pass data "down" in React, not "up". What does that mean? Give simple code sample if that makes it easier to describe.

It means data (state for example) can only be passed from parent component to child componet. An example would be like:
// Parent.js
const [status, setStatus] = useState('logged-in');
return <Parent>
<Child status={status}>
</Parent>
//Child.js
const [state, setState] = useState('');
<Child>
The status is {props.status}
</Child>

## Q6: Follow-up: If you can't pass data "up" the component tree, how can anything that is "down" change data? Give simple code samples if that makes it easier to describe.

Explanation: the child components can know the status in parent componnet because it is passed down in props, but the parent does not know anything about the state in child component

## Q7: Imagine you have a collection of student records, with each having a student id, a name, and an address. (an example of one item in the collection would be: { id: "654321", name: "Bao", address: "123 Main Street" }) Imagine you also have collection of steps to create a pizza, with each step having an ingredient, a quantity, and an instruction. (an example of one item in the collection would be the object { qty: "1 cup", ingredient: "shredded cheese", instructions: "sprinkle over pizza" })

Give a code sample where each collection is shown with at least one more element (2+ students for the first collection, 2+ pizza-making steps). Make sure you make proper use of arrays and objects. Explain why you've chosen each way of making a collection (e.g. Why you use an array for one or both, or why you use an object for one or both)

code sample:
const students = {
'654321': {
id: "654321",
name: "Bao",
address: "123 Main Street"
}
'654322': {
id: "654322",
name: "Amy",
address: "456 Main Street"
}
}

const ingredients = {
'1': {
qty: "1 cup",
ingredient: "shredded cheese",
instructions: "sprinkle over pizza"
},
'2': {
qty: "10 g",
ingredient: "suggar",
instructions: "add into flour"
}
}

I chose object or both because it is easier to manage, especially when you want to add or delete one student or ingredient. I am thinking of displaying the list of student to a professor when sesmter begin, it is very likely that the list will change, so an object would be easier for both getting info of a specific student or adding or removing a student. Also for the ingredients, people make add a new step or remove a step, so an object is also better than array in this case.

## Q8: How does inheritance in JS relate to a prototype? Give a simple code sample if it helps explain.

if a fuction is not found in something, js would look into its parent prototype for the function.
for example, if parent class `Dog` contains a function called bark, and the child class `Yorkie` does not. when yorkie.bark() is called, it can be inheritant from its parent class Dog

## Q9: What is wrong about this code sample? `if( !username || username == undefined) { ` be sure to explain why that is wrong.

== should be ===, because == ignores the datatype of the variable, and username == undefined also checks whether username is null. This is wrong because null is not equivalent to undefined.

## Q10: In your own words, what is decoupling? What is an example of decoupling in a React app? Why is this beneficial?

Decoupling is for each part to know other parts as less as possible, and only exchange info that are needed. one example would be our <App> with <Login> as a child component, onLogin function is passed in as a prop, and all the loading and username information is stored in <Login> as state, and <App> knows nothing about it, when login is success, the onLogin function will be triggered, but the <Login> does not need to worry about it. This is beneficial because evey component would have the minimum thing to consider and it is easier to make changes to any part.
