# The Venn of Angular Component Testing: Clearing the Grey

If you haven't read the previous parts to this series, please take a look as this provides some important background and context to the rest of this post.

## Sociable vs Solitary Unit Tests

I think it was Jay Fields that coined the term Sociable & Solitary Tests. Martin Fowler has a [good article](https://martinfowler.com/bliki/UnitTest.html) that mentions the concept too.

> **Solitary** Tests prefer to **isolate** the unit under test.
>
> **Sociable** Tests often **rely on** other units to fulfil the behaviour.

I think this more subtly describes the different approaches to 'unit testing' Angular components most Angular engineers take. Think about this too:

> [A Solitary Unit Test] Never cross boundaries
>
> -- <cite>['Working Effectively with Unit Tests' by Jay Fields](https://leanpub.com/wewut)</cite>

I would consider the interface between the Component Template and the Component Class a boundary. Thus Component DOM Tests must be Sociable.

Distilling this down further, I think this leads us to:

> 🧩 **Component Class Tests =** Solitary Unit Tests
>
> 🤝 **Component DOM Tests =** Sociable / Integration Tests

I fall firmly into the Solitary camp of unit testing approaches: I can probably count on one hand the number of Angular, Sociable Unit Tests I have ever *had* to write.

My predisposition probably comes down to my development background. For example, it's simply not possible to test a WPF UI (or View) binding / interaction with the 'class' (View Model), with the unit test framework, [NUnit](https://nunit.org/). Furthermore, the 'View' should never have any logic anyway. I would argue, for the large part, it should be the same for Angular Templates too!

In addition, the Sociable Tests exhibit traits similar to Integration tests for example: [fragility](#fragility) & [speed](#speed). To better describe this, look at this basic example.

### An Example comparing Solitary & Sociable Angular Component Tests

Take this Angular component as an example.

```typescript
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

And here are the tests, written in the two different approaches:

<details>
  <summary>1. Solitary Unit Tests</summary>

  ```typescript
  describe('AppComponent - Solitary Unit Tests', () => {
    describe('when the button is clicked', () => {
      it('should increment the counter value', () => {
        const component = new AppComponent();
        component.counterValue = 0;

        component.increment();

        expect(component.counterValue).toBe(1);
      });

      it('should emit an event', () => {
        const component = new AppComponent();

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
  <summary>2. Sociable Tests</summary>

  ```typescript
  describe('AppComponent - Sociable Tests', () => {
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

Notice how the Sociable Tests are subtly different - A Sociable Test wouldn't normally test the `counterIncremented` event is dispatched. That would be on the responsibility of the parent 'subscriber' (which in turn shouldn't need to know under what circumstances it is emitted).[^1]

Where as the Solitary Unit Tests can be said to provide 100% coverage, the Sociable / Component DOM Tests can not. If you just had the Sociable Tests, you could delete the `this.counterIncremented.emit();` line, which could be critical, and yet no tests would fail. 🙁

Given these examples, let's outline the key differences:

### Key Differences: Solitary vs Sociable Tests

| Aspect               | 🧩 Solitary Test           | 🤝 Sociable / Component DOM Test                         |
|----------------------|----------------------------|----------------------------------------------------------|
| **Scope**            | 🔬 Isolated Units          | 🌐 Component Interaction                                 |
| **Dependencies**     | 🥸 None / Mocked           | 🎨 DOM & Angular Change Detection                        |
| **Purpose**          | 📐 Component Class logic   | 🔄 Verify the Component Class and Template work together |
| **Coverage**         | 💯 High Unit Coverage      | 〽️ Lower Coverage                                        |
| **Fragility**        | 💪 Highly Resilient        | 💀 More Fragile                                          |
| **Speed (100 runs)** | 🚀 **2.2ms Avg**           | 🐌 26.9ms Avg                                               |
| **On Failure**       | 🎯 Easy to Pinpoint        | 🪨 Harder                                                |

#### Fragility

How many times have you added a new component, only to then find some, relatively unrelated suite of tests now fail or you see console warnings? Likely this is because another component test suite, imports an ancestor of your new component. When this happens, you're probably thinking "I know but that ancestor shouldn't care about my new grandchild component". I think you're right. It feels to me like, the ancestor test suite is more like an Integration Test suite, simply because it has a hierarchy of dependencies.

> Sociable Unit Tests are more susceptible to cascading failures.
>
> -- <cite>['Working Effectively with Unit Tests' by Jay Fields](https://leanpub.com/wewut)</cite>

This all comes down to using, the `TestBed` or notably `TestBed.configureTestingModule()`.[^2]

On the other hand, the Solitary Unit Tests can not suffer this same fate: they have zero knowledge of any descendants.

#### Speed

Remember Unit Tests are meant to be fast. They should enable an engineer to be able to run them often, ideally after any change they make. Running two, Sociable Unit Tests in an average of 26.9ms is pretty good right? But how about running tests, that give you more coverage and greater confidence but **12 times faster**? Just scale that up to when you have over 2,000 tests. That's the difference between the entire test run taking 27 seconds (which is still really fast but these are very simple tests) vs 2 seconds! That's what Solitary Unit Tests give you.

If Unit Tests are meant to be fast, then I'll take running 2,000 of them in ~2 seconds please.

Furthermore, I think most engineers find it quicker and easier to write Solitary Unit Tests than they do Sociable Unit Tests (Component DOM Tests), plus maintain the component dependencies in the tests.[^3]

## Closing

In the final post in this series, I'll introduce the 'The Venn of Angular Component Testing'.

[^1]: You could of course wrap the component in the test with a dummy component but you are 100% then into Integration Test territory (as far as I'm concerned). Not to mention introducing additional complexity into the tests which is just something else that can break / fail your tests.
[^2]: Some of this can be overcome using mocking frameworks such as [ng-mocks](https://github.com/help-me-mom/ng-mocks) but I struggle to then understand the value in the added boilerplate compared to simple Solitary Tests instead.
[^3]: How many console warnings (*"component A is not a known element"*) do you see when you run your tests? Potentially hiding the warnings you really care about.
