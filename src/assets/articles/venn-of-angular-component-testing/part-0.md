# The Venn of Angular Component Testing: The Grey Area

In my experience there is confusion between what I would consider a Unit Test and an Integration Test for an Angular Component. Drawing on my OO development experience and having practised Test-driven development for a number of years in Angular & Java (plus other languages & frameworks), I think I can help reduce the 'grey' in the landscape.

This series is limited to just testing of Angular Components. I feel the concept of Unit Testing other Angular objects, such as Services is more well defined.

## To Start

### A Definition of a Unit Test

> Asserts a unit of software works as expected **within isolation**

### A Definition of an Integration Test

> Asserts a unit of software interacts as expected **with another**

### What is the 'Unit' of a Unit Test?

The smallest piece of software where, for a given change to an input there is an observed (to the software / unit under test) change in output. For example a public method, which for a given input leads to a predictable, visible output (to the software / unit under test).

## A Comparison between a Unit Test & Integration Test

| Aspect            | 🧩 Unit Tests           | 🤝 Integration Tests      |
|-------------------|-------------------------|---------------------------|
| **Scope**         | 🔬 Isolated Units       | 🌐 Component Interactions |
| **Dependencies**  | 🧪 Mocked Dependencies  | 🛠️ Real or Mocked         |
| **Purpose**       | ✅ Isolated Code        | 🔄 Component Integration  |
| **Coverage**      | 💯 High Unit Coverage   | 🚀 Critical Integration   |
| **Fragility**     | 🪨 Resilient            | 🍌 More Fragile           |
| **Speed**         | 🚤 Fast                 | ⛵ Slower                 |
| **On Failure**    | 🎯 Easy to pinpoint     | 👓 Potentially harder     |

In summary, Unit Tests target small, isolated units of code without external dependencies, while Integration Tests examine the interactions and interfaces between components or services.

## How do these Relate to Angular Component Testing?

I think this where the lines blur between what [I would consider] a unit vs an integration test is. An Angular Component consists of:

> * An HTML template that declares what renders on the page
> * A TypeScript class that defines behavior [sic]
> * A CSS selector that defines how the component is used in a template
> * Optionally, CSS styles applied to the template
>
> -- <cite>[Angular Guide - Angular components overview](https://angular.io/guide/component-overview#angular-components-overview)<cite>

I ask you this question:

> What is *'Isolation'* or the *Unit Under Test* in the Context of an Angular Component?

1. I think if your test focuses on the **class** of a single Angular component in isolation, it's more likely to be a unit test.
2. If your test involves **rendering multiple Angular components together**, in a more real-world scenario, and / or **interacting with the DOM[^1]**, I think it is probably an Integration Test[^2].

## An example

For example, testing the click of a button on a component:

1. `component.onClick();` (assuming this is what the `onclick` event handler calls)
    * **Type of Test?** 🧩 Unit Test
    * **Why?** Interacting directly with the public interface of the class / unit under test.
2. `fixture.nativeElement.querySelector('button').click();`
    * **Type of Test?** 🤝 Integration Test
    * **Why?** The test interacts with the DOM, so likely needs to render other dependencies and components. One could argue the DOM itself is a dependency[^3].

***But that's not an Integration Test, it's a Component DOM Test!***

You're spot on. If you read the [Angular Guide for testing Components](https://angular.io/guide/testing-components-basics), the docs call the tests 'Component Class Tests' and 'Component DOM Tests', no where does it mention unit testing[^4]. Perhaps the terminology we use day-to-day is wrong? Either way I think this leads to a grey area of what we refer to as 'unit testing' Angular Components. Moreover, here is further definition of an Angular Component:

> ...a component is more than just its class. A component interacts with the DOM and with other components. The class-only tests can tell you about class behavior [sic]. They cannot tell you if the component is going to render properly, respond to user input and gestures, or integrate with its parent and child components.
>
> -- <cite>[Angular Guide - Component DOM testing](https://angular.io/guide/testing-components-basics#component-dom-testing)</cite>

So if Component DOM Tests are to address this 'limitation', that must mean the Component DOM Tests need to have dependencies and 'integrate with its parent and child components'? Sounds pretty close to the [definition of an Integration Test](#a-definition-of-an-integration-test) to me.

I felt there had to be a cleaner, more succinct way to draw the line between Component Unit Tests vs Component DOM Tests vs Integration Tests. This is where I went back to my books[^5] and considered Sociable and Solitary tests.

## Closing

In the next post, we'll explore more about Sociable and Solitary testing and why this concept could be a solution to the 'grey area', and how we describe and talk about Angular Component testing.

[^1]: [JSDOM](https://github.com/jsdom/jsdom) is a 'real' DOM:

    > jsdom is a pure-JavaScript implementation of many web standards, notably the WHATWG DOM...

[^2]: The Angular docs call these [Component DOM testing](https://angular.io/guide/testing-components-basics#component-dom-testing). I think they are just another type of Integration Test, more on that later.
[^3]: I suspect if you were to run [Jest without JSDOM](https://jestjs.io/docs/configuration#testenvironment-string), this sort of interaction would fail.
[^4]: On the [Basics of testing components](https://angular.io/guide/testing-components-basics) page anyway, and I cannot find anywhere where the Angular framework / team makes the link between Component tests (class or DOM) and unit tests. However, in the documentation for `ng test`, Angular describes command as "Runs unit tests...".
[^5]: ['The Art of Unit Testing' by Roy Osherove](https://www.artofunittesting.com/)

    ['Working Effectively with Unit Tests' by Jay Fields](https://leanpub.com/wewut)

    ['Test-Driven Development By Example' by Kent Beck](https://www.oreilly.com/library/view/test-driven-development/0321146530/)
