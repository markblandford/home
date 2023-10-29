# Unit vs Integration Testing

The majority of this document is focused on Angular web applications. In object-oriented languages such as Java, I feel the distinction between Unit and Integration Testing is clearer due to the nature of the language and the design principles commonly followed in OO programming (encapsulation, well defined modules / layers, nature of the test frameworks etc.).

Even with Angular the distinction of what a Unit Test is I think is far clearer when it comes to artefacts such as services. The majority of the following is therefore focused on Angular Component testing and I think that is where there is much confusion about what the approach should be.

## Definitions

### Unit Test

> Asserts a unit of software works as expected **within isolation**

### Integration Test

> Asserts a unit of software interacts as expected **with another**

### What is the 'Unit' of a Unit Test?

The smallest piece of software where, for a given change to an input there is an observed (to the software / unit under test) change in output. For example a public method, which for a given input leads to a predictable, visible output (to the software / unit under test).

## Comparison

| Aspect            | 🧩 Unit Tests           | 🤝 Integration Tests      |
|-------------------|-------------------------|---------------------------|
| **Scope**         | 🔬 Isolated Units       | 🌐 Component Interactions |
| **Dependencies**  | 🧪 Mocked Dependencies  | 🛠️ Real or Mocked Backend |
| **Purpose**       | ✅ Isolated Code        | 🔄 Component Integration  |
| **Coverage**      | 💯 High Unit Coverage   | 🚀 Critical Integration   |
| **Fragility**      | 🪨 Resilient           | 🍌 More Fragile           |
| **Speed**         | 🚤 Fast                 | ⛵ Slower                 |
| **On Failure**    | 🎯 Easy to pinpoint     | 👓 Potentially harder     |

In summary, Unit Tests target small, isolated units of code without external dependencies, while Integration Tests examine the interactions and interfaces between components or services.

### What is 'Isolation' in the Context of an Angular Component?

If your test focuses on a single Angular component or service in isolation (e.g., HTTP requests), it's more likely to be a Unit Test.

If your test involves **rendering multiple Angular components together**, in a more real-world scenario, and / or **interacting with the DOM[^1]**, it is probably an Integration Test[^2].

For example, testing the click of a button on a component:

1. `component.onClick();` (assuming this is what the `onclick` event handler calls)
    * **Type of Test?** 🧩 Unit Test
    * **Why?** Interacting directly with the public interface of the class / unit under test.
2. `fixture.nativeElement.querySelector('button').click();`
    * **Type of Test?** 🤝 Integration / Component DOM Test
    * **Why?** The test interacts with the DOM, so likely needs to render other dependencies and components. One could argue the DOM itself is a dependency[^3].

> But that's not an Integration Test, it's a Component DOM test!

You're spot on. However, here is the definition of an Angular Component:

> ...a component is more than just its class. A component interacts with the DOM and with other components. The class-only tests can tell you about class behavior [sic]. They cannot tell you if the component is going to render properly, respond to user input and gestures, or integrate with its parent and child components.[^4]

So if Component DOM Tests are to address this, doesn't that mean the tests need to have dependencies and 'integrate with its parent and child'? Sounds pretty close to the definition of an Integration Test to me. Don't get me wrong, that isn't a problem. Personally, I don't really care too much about how you test your code but let's just be clear as to what the types of tests are together with what the expectation and the capability of each is (because they are different).

I felt there had to be a cleaner, more succinct way to draw the line between Angular Unit Tests / Component DOM Tests & Integration Tests. This is where I went back to my books[^5] and considered Sociable vs Solitary tests.

## Sociable vs Solitary Unit Tests

I think it was Jay Fields that coined the term Sociable & Solitary tests. Martin Fowler has a [good article](https://martinfowler.com/bliki/UnitTest.html) that mentions it too.

> **Sociable** tests often **rely on** other units to fulfil the behaviour.
>
> **Solitary** tests prefer to **isolate** the unit under test.

When it comes to Angular, I think this more subtly describes the difference in the Unit Test approach engineers take where there is more of a grey area in the Unit Test space. I fall firmly into the Solitary camp of Unit Testing approaches: I can probably count on one hand the number of Angular Sociable Unit Tests[^6] I've ever *had* to write. My reasons largely boil down to two points: fragility & speed.

### An Example comparing Sociable, Solitary & Integration Tests

Take this Angular component as an example.

```angular
@Component({
  selector: 'app-root',
  template: `
    <button (click)="increment()">Increment</button>
    <p>{{ counterValue }}</p>
  `
})
export class AppComponent {
  @Input() counterValue: number = 0;
  @Output() counterIncremented = new EventEmitter<void>();

  increment() {
    this.counterValue++;
    this.counterIncremented.emit();
  }
}
```

Here are the tests, written in the three different approaches:

<details>
  <summary>1. Sociable Unit Tests</summary>

  ```typescript
  describe('AppComponent - Unit Tests - TestBed', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [AppComponent],
      });

      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
    });

    describe('when the button is clicked', () => {
      it('should increment the counter value', () => {
        component.counterValue = 0;

        component.increment();

        expect(component.counterValue).toBe(1);
      });

      it('should emit an event', () => {
        let emitted = false;
        component.counterIncremented.subscribe(() => {
          emitted = true;
        });

        component.increment();

        expect(emitted).toBe(true);
      });
    });
  });
  ```

</details>

<details>
  <summary>2. Solitary Unit Tests, completely excludes the DOM and even Angular Lifecycle & Change Detection</summary>

  ```typescript
  describe('AppComponent - Unit Tests - Solitary', () => {
    let component: AppComponent;

    beforeEach(() => {
      component = new AppComponent();
    });

    describe('when the button is clicked', () => {
      it('should increment the counter value', () => {
        component.counterValue = 0;

        component.increment();

        expect(component.counterValue).toBe(1);
      });

      it('should emit an event', () => {
        let emitted = false;
        component.counterIncremented.subscribe(() => {
          emitted = true;
        });

        component.increment();

        expect(emitted).toBe(true);
      });
    });
  });
  ```

</details>

<details>
  <summary>3. Integration Tests (aka Component DOM Tests)</summary>

  ```typescript
  describe('AppComponent - Integration Tests', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [AppComponent],
      });

      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
    });

    it('should display the initial counter value', () => {
      component.counterValue = 5;
      fixture.detectChanges();

      const displayedValue = fixture.nativeElement.querySelector('p').textContent;
      expect(displayedValue.trim()).toBe('5');
    });

    it('should increment the counter when the button is clicked', () => {
      const button = fixture.nativeElement.querySelector('button');
      button.click();

      fixture.detectChanges();

      const displayedValue = fixture.nativeElement.querySelector('p').textContent;
      expect(displayedValue.trim()).toBe('1');
    });
  });
  ```

</details>

Notice how the Integration Tests are subtly different - An Integration Test wouldn't normally test the `counterIncremented` event is dispatched. That would be on the responsibility of the parent 'subscriber' (which in turn shouldn't need to know under what circumstances it is emitted).[^7] As such, where as the Unit Tests can be said to provide 100% coverage, the Integration / Component DOM Tests can not. So if you just had Component DOM tests, you could delete the `this.counterIncremented.emit();` line and no tests will fail. 🙁

Given these examples, let's outline the key differences:

### Key Differences: Solitary vs Sociable vs Integration Tests

| Aspect               | 🫧 Solitary Test           | 🧩 Sociable Unit Test    | 🤝 Integration / Component DOM Test                                  |
|----------------------|----------------------------|--------------------------|----------------------------------------------------------------------|
| **Scope**            | 🔬 Isolated Units          | 🔬 Isolated Units        | 🌐 Component Interaction                                             |
| **Dependencies**     | 🥸 None / Mocked           | 🔀 DOM & Angular [^6]    | 🎨 DOM & Angular Change Detection (`OnPush` CD will break the tests) |
| **Purpose**          | 📐 Component Class logic   | 📐 Component Class logic | 🔄 Verify the Component Class and Template work together             |
| **Coverage**         | 💯 High Unit Coverage      | 💯 High Unit Coverage    | 〽️ Lower Coverage                                                    |
| **Fragility**        | 💪 Highly Resilient        | 🍌 Fairly Resilient      | 💀 More Fragile                                                      |
| **Speed (100 runs)** | 🚀 **2.2ms Avg**           | 34.4ms Avg               | 26.9ms Avg                                                           |
| **On Failure**       | 🎯 Easy to Pinpoint        | 🎱 Potentially Harder    | 🪨 Harder                                                            |

#### Fragility

How many times have you added a new component, only to then find some, relatively unrelated suite of tests now fail or you see console warnings? Likely this is because another component test suite, imports an ancestor of your new component. When this happens, you're probably thinking "I know but that ancestor shouldn't care about my new grandchild component". I think you're right. Feels to me like, the ancestor test suite is more like an Integration Test suite (or Sociable Unit Tests), simply because it has this long chain of dependencies, which in my opinion, the unit under test shouldn't care about.

> Sociable Unit Tests are more susceptible to cascading failures.[^8]

This all comes down to using, the `TestBed` or notably `TestBed.configureTestingModule()`.[^9]

On the other hand, the Solitary Unit Tests can never suffer this same fate: they have zero knowledge of any descendants.

#### Speed

Remember Unit Tests are meant to be fast? They should enable an engineer to be able to run them often, ideally after any change they make. Running two, Sociable Unit Tests in an average of 34.4ms is pretty good right? But how about running tests, that give you same coverage and confidence but **15 times faster**? Just scale that up to when you have over 2,000 tests. That's the difference between the entire test run taking 35 seconds (which is still really fast but these are very simple tests) vs 2 seconds! That's what Solitary Unit Tests give you.

If Unit Tests are meant to be fast, then I'll take running 2,000 of them in ~2 seconds please.

Furthermore, I think most engineers find it quicker and easier to write Solitary Unit Tests than they do Sociable Unit Tests (or Component DOM / Integration Tests), plus maintain the component dependencies in the tests (how many console warnings (*"component A is not a known element"*) do you see when you run your tests? Potentially hiding warnings you really care about).

## Closing

> OK, I'm on board but I'm now no longer testing the DOM and the bindings to the component class?

You are right and that's deliberate. Think about why we test interactions in the DOM? I think we do it to test how the customer is going to use our component / application. Think about it. We already use tools like [Playwright](https://playwright.dev) and [Cypress](https://learn.cypress.io/) for our Integration Testing.[^10] This also describes a constraint of a Solitary Unit Test:

> [A Solitary Unit Test] Never cross boundaries

I would consider the interface between the Component Template and the Component Class a boundary. Thus Component DOM tests are Socialable.

How many times have you faced problems in the past with writing your Sociable Unit Tests to assert something in the DOM and you just cannot get it to work, no matter how many `fixture.detectChanges()` you add? 😄 I know I've spent too much time down that rabbit hole when I know the code 'works'. It is probably quicker[^11] (and easier) to extend the existing Playwright / Cypress tests to cover your new functionality. Plus, if there isn't any, observable change in the DOM, why bother including it in either a Sociable Unit Test or Jest Integration / Component DOM Test at all? Furthermore, I was taught that if you're polluting the production code just so you can test something (think of the `data-testid` attribute for one, or even simply changing the scope of a method to make it 'easier' to test), then you maybe doing something wrong or unconventional.[^12]

If I could change three conventions regarding the general testing approach we take in Angular applications, it would be to have:

1. ⏫ Far more Solitary Unit Tests.
2. 🔼 More 'real' Integration Tests (using tools such as Playwright or Cypress).
3. ⏬ Fewer (10s of, if not less) Sociable and Jest Integration / Component DOM Test Tests.

I believe if you get to this state the results will be:

1. More Unit Tests.
2. Unit Tests that are focussed more on the important logic and edge cases.
3. Integration Tests focussed on 'is the correct *thing* in the DOM' and less on 'is *something* in the DOM'.
4. Integration Tests focussed on real customer behaviour and expectations.
5. Fewer test failures (even with more tests).
6. Beyond tests, a more component-driven architecture (including higher reuse), as component dependency management becomes obsolete in our tests.
7. Happier engineers, who should be less frustrated with the entire test suite.

> We've removed the 'grey area' of our test strategy, each 'type of test' now has it's own, single responsibility.

I think there probably is a place for Sociable and Jest Integration / Component DOM Tests but they must not be duplicating what would / should be covered by the 'real' Integration Tests performed by the more appropriate tools (Playwright, Cypress etc.).

[^1]: [JSDOM](https://github.com/jsdom/jsdom) is a 'real' DOM:

    > jsdom is a pure-JavaScript implementation of many web standards, notably the WHATWG DOM...

[^2]: The Angular docs call these [Component DOM testing](https://angular.io/guide/testing-components-basics#component-dom-testing) but we often confuse them by calling them Unit Tests. I think they are just another type of Integration Test.
[^3]: I suspect if you were to run [Jest without JSDOM](https://jestjs.io/docs/configuration#testenvironment-string), this sort of interaction would fail.
[^4]: Taken from [https://angular.io/guide/testing-components-basics#component-dom-testing](https://angular.io/guide/testing-components-basics#component-dom-testing).
[^5]: ['The Art of Unit Testing' by Roy Osherove](https://www.artofunittesting.com/)

    ['Working Effectively with Unit Tests' by Jay Fields](https://leanpub.com/wewut)

    ['Test-Driven Development By Example' by Kent Beck](https://www.oreilly.com/library/view/test-driven-development/0321146530/)
[^6]: Basically using the [`ComponentFixture`](https://angular.io/api/core/testing/ComponentFixture) boilerplate.
[^7]: You could of course wrap the component in the test with a dummy component but you are 100% then into Integration Test territory (as far as I'm concerned).
[^8]: Taken from ['Working Effectively with Unit Tests' by Jay Fields](https://leanpub.com/wewut).
[^9]: Some of this can be overcome using mocking frameworks such as [ng-mocks](https://github.com/help-me-mom/ng-mocks).
[^10]: If we're not, then we should be. Plus in my experience we tend to mock the API layer in these tests so they aren't ever, really performing end-to-end testing (like we'd normally call them).
[^11]: To write, not to run.
[^12]: That's a whole other conversation however.