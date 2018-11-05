# 1. Explain what is imperative programming, declarative programming, and functional programming. Provide code examples for each.

Starting with the wikipedia definitions:  https://en.wikipedia.org/wiki/Comparison_of_programming_paradigms

> Imperative programming – defines computation as statements that change a program state.
>Declarative programming – defines program logic, but not detailed control flow.
> Functional programming – treats programs as evaluating mathematical functions and avoids state and mutable data

This means there are several different types of programming, and these are just some examples amongst many. The definitions most often found are the following:
* Imperative programming focuses on describing how a program operates. (https://en.wikipedia.org/wiki/Imperative_programming). Object Oriented Programming is a kind of imperative programming.
* Declarative programming expresses the logic of a computation without describing its control flow. (https://en.wikipedia.org/wiki/Declarative_programming). Functional Programming is an example of declarative programming.
* A good illustration is a modern single page application calling a restful API:
Imperative programming: a Java micro service, that uses an ORM framework like Spring to manipulate and store data.
Declarative programming: a JavaScript frontend that uses React or similar modern JavaScript frameworks.

Here is the most straight forward example of this I could come up with:

```javascript
// Incrementing an integer by 1 in an imperative manner:
let x = 0;
x += 1:
return x;
```

```javascript
// Incrementing an integer by 1 in a declarative manner:
const x = 0;
const increment = x = > x + 1;
return increment(x);

// or
const x = 0;
return x + 1;
```

Notice how in the Declarative example, x can be declared as a const, its value is not (and cannot be) mutated, and there is no side-effect. This is the major appeal of declarative/functional programming: by not mutating objects, there are no side effects. This allows to lower the cognitive load (the effort to exercise working memory), make code easier to write and understand, and easier to debug.
Here’s the kind of code that I would often write when I transitioned to JavaScript after years of Java:

```javascript
// multiply all elements of an array by 2
// Imperative (array is mutated):
let a = [1, 2, 3];
for(let i=0; i < a.length; i++){
  a[i] = a[i] * 2;
}
```

My programming style evolved, and now this is how I would do the same things in a Declarative/Functional way, without mutating the array:

```javascript
const a = [1, 2, 3];
const b = a.map(v => v * 2); // [2, 4, 6 ]
```

Applications built with the framework React should be written in a declarative/functional programming style, because some of its major principles are applied: immutability is applied to component state and when using redux, the application store; components receive functions as arguments (consider a Button component with a handleClick prop, the component doesn't care what happens, it's called the function that is passed to it), and there is no direct manipulation of the DOM.

Other examples of functional programming:
* Currying functions 
* Ramda (https://ramdajs.com/) is a functional programming library for JavaScript which really helped me understand these concepts. Unlike many of the functions provided by underscore and lodash, Ramda does not mutate objects.

# 2. What are pure functions? Give a code example for a pure function, and for a function that is not pure.

The definition from Wikipedia:

> In computer programming, a pure function is a function that has the following properties: 
> * Its return value is the same for the same arguments 
> * Its evaluation has no side effects

Let’s write a function that multiplies all the terms of an array by a given value:

```javascript
const multiplier = 3;
const array = [1, 2, 3, 4];
const multiplyArray = () => array.forEach(v => {array[I] = v * multiplier; });
multiplyArray();
```

In this example, the function is impure because it fulfills neither condition, the returned value is different for the same arguments because it will depend on the values of the variables multiplier and array. It also causes a side effect, because it mutates the array object.

Let’s rewrite this so the returned value is the same for the same arguments (condition 1):

```javascript
const multiplyArray = (anArray, aMultiplier) => {
  anArray.forEach((v, idx) => {
    anArray[idx] = v * aMultiplier;
  });
  return anArray;
};
const multiplier = 3;
const array = [1, 2, 3, 4];
const multipliedArray = multiplyArray(array, multiplier);
```

In this example, the first condition (returned value is the same for the same arguments) is fulfilled, as nothing in the function depends on variables declared outside of its scope. However, there is a side effect, and a big one! The array that is passed to the function is mutated, and the return value is actually a reference copy of that array. Any change made to variable array, will also change the variable multipliedArray. This can get crazy to debug!

Let’s rewrite the previous code as a pure function so both conditions are fulfilled:

```javascript
const multiplyArray = (arr, multiplier) => arr.map(v => v * multiplier);
const arr = [1, 2, 3, 4, 5];
const multipliedArray = multiplyArray(arr, 3);
 ```

In this example, both conditions are fulfilled: the returned value will always be the same for the same arguments, and there is no side effect: the variable arr is not modified, and the return value has a difference reference.

Pure functions are easier to understand, to unit test, and cause no side effects, making the code more reliable.

# 3. Provide tips to reduce the cognitive load in computer programming. Provide examples and counter examples.

Cognitive load is a fancy term that describes the effort to exercise working memory. In computer programming, this translates easily: reading clear and simple code that is well written and easy to understand: low cognitive load. Reading spaghetti code: high cognitive load. Of course, this varies from person to person, but the rule is that with a lower cognitive load, the less likely it is to make a mistake. I started thinking about cognitive load after I read [this article](https://hackernoon.com/why-senior-devs-write-dumb-code-and-how-to-spot-a-junior-from-a-mile-away-27fa263b101a) which is a bit pedantic but has some good take aways. The author says the following, that has stayed with me since reading it: 
> What was so mystifying about “Senior Dev” code was not that I didn’t understand it, but that I could understand it immediately, it was fundamentally dumb.

I then started asking myself what makes code simple and easy to understand (and not dumb as the author put it), and here are some of the ways I could come up with:

* Use pure functions: when calling a function, you won’t have to ask yourself if a variable passed as a parameter will be mutated, nor if there are any side effects. When writing a function, you won’t have to ask yourself whether or not the object can be mutated. Freezing objects using [Immutable](https://facebook.github.io/immutable-js/), Object.freeze or [other techniques](https://confluence.jpmchase.net/confluence2/(https:/medium.freecodecamp.org/elegant-patterns-in-modern-javascript-ice-factory-4161859a0eee) can enforce this, as mutations will throw runtime errors.

* Don’t massage data types: in loosely typed languages, it’s sometimes possible to change the data type without realizing it. Stay consistent, if something is a Number or a string, treat it as such as much as possible. If there is a function named convertXtoY and another named convertYtoX, it should raise some flags.

* Apply the [YAGNI principle](https://martinfowler.com/bliki/Yagni.html): don’t add code you aren't going to need. There was a time where up-front planning of software development was a thing. It's no longer the case. 

* KISS: Keep it simple silly! The [Zen of Python](https://www.python.org/dev/peps/pep-0020/#id3) is a good reminder of this.

* Apply the Single responsibility principle: a function should only do one thing.
Avoid 1 line functions that are called once unless they clarify a difficult to understand piece of code.

    * This is not OK

        ```javascript
        function print(message){
        console.log(message);
        }
        ```

    * This is OK
        ```javascript
        function canUserRenewDriversLicense(user, license) {
            return user.isOver18() && 
                   (user.drivingTestScore() >= license.passingScore() * 100) && 
                   license.isExpired();
        }
        ```

* Avoid deeply nested code: if to understand a piece of code, I need to open functionA that calls functionB that calls functionC that calls functionD, my finger will itch to click on that “Needs work” button. This is even more likely to happen if some of the previous principles are violated (some of these functions are not pure functions, are 1 line functions executing a single instruction, are a placeholder for a hypothetical future behavior yet to be defined let alone implemented, do more than one thing, etc… )
* Return early and clearly: if the function has a failing condition, it should execute it early and clearly. A good example of this is in [the nodejs documentation](https://nodejs.org/docs/latest-v9.x/api/http.html#http_http_get_options_callback): which exits early and clearly if the HTTP status code is not 200. This pattern is particularly encourage in Promise callbacks

    ```javascript
    function resolve(response) {
    if (response.status !== 200) {
        throw new Error();
    }
    // do stuff
    }
    ```


There are plenty of other cool little tricks to keep code simple and easy to understand, [this article](https://chrismm.com/blog/writing-good-code-reduce-the-cognitive-load/) is a good read, and here are my key takeaways:
* Keep your personal quirks out of it. If you’re the only one on your team doing things a certain way, you may be the problem. This is one of the reasons I’ve decided to retire my use of the do…while. In a previous blog post, I jokingly mentionned surprising my peers whenever I used a ``do...while``. And by surprised, I really mean confused. You want to keep the [WTFs per minute low](http://commadot.com/wtf-per-minute/).
* Use [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle) and pure functions. This articles mentions how TDD is easier when using pure functions.
* Make it discrete and processable: maximize the use of your IDE, have it correctly configured and avoid the use of magic values as you won’t be able to keep your code integrated in the IDE. If there are red squiggly lines in your IDE that don't appear on your teammates computer, ask them to show you how to configure it properly. Vi was written for a world that no longer, learn how to use your modern IDE.
* Make it readable: stick with existing patterns, don’t stray from beaten paths without making sure the entire team is onboard and capable. The author talks about one of his developers getting stuck when ES7 was introduced. New concepts have to be rolled out gently.