# Why I practice TDD

## What is TDD?

> Test-driven development (TDD) is a software development process relying on software requirements being converted to test cases before software is fully developed, and tracking all software development by repeatedly testing the software against all test cases. This is as opposed to software being developed first and test cases created later.
>
> -- <cite>[Wikipedia - Test-driven development](https://en.wikipedia.org/wiki/Test-driven_development)<cite>

In essence, write the tests first and then the production code.

> Red/green/refactor - the TDD mantra.
>
> -- <cite>[Test-driven development: by Example - Kent Beck](https://www.oreilly.com/library/view/test-driven-development/0321146530/)<cite>

1. Red - You write a test that doesn't work (it probably won't even compile as the Unit Under Test doesn't [yet] exist).
2. Green - Make the test work - You build the Unit Under Test / production code.
3. Refactor - clean up the test, removing duplication etc. (but please follow ['AHA'](https://en.wikipedia.org/wiki/Don't_repeat_yourself#AHA) in the test).

## Some of the feedback I hear about why Engineers don't TDD

> TDD is slower

I disagree. If your team has a mentality for quality software, then you already must have a culture of automated testing. As such, why not build the tests first?

*In fact, the opposite is actually true. I believe it has been proven / accepted that engineers who practice TDD, write more tests but are subsequently more productive.*

> When I don't write tests, development is faster

Yep, it sure would be: at first. Give it a few weeks or months and I expect you'll hit a wall, with confidence dwindling that the software still works.

> I don't like writing tests

I get it, but this is where TDD has helped me. I think practicing TDD, makes you better at writing tests and as such, the aversion evaporates. I actually love writing tests now.

> TDD is hard

Now we're getting somewhere. I think you're right, at least at first. In my experience, this differs between languages and competence too. For example, I began practicing TDD in .Net, an OO language. I found the strictness comforting and because of my level of experience at the time, it was easier.

Then, when I started developing Angular applications, I simply couldn't use TDD as I had been use to. I had to adapt. I didn't know the language & test framework well enough. I struggled with the 'laziness' of the language. Likewise, when I develop in Python, I try but I cannot do 'full' Test Driven Development but I try. This brings us onto the next section, when to TDD.

## When to TDD

I would challenge for even the strongest of engineers to be able to practice 'full' TDD all of the time:

1. If you don't know or cannot predict the result of a scenario, then I don't think you can TDD.
2. If you simply don't know how to write tests, then you can't practice TDD but then I think you're not ready to develop fully featured, robust & maintainable software.
3. If you don't have an idea of how to get to the result / outcome, then you probably can't TDD. For example, if you need to 'trial and error' to get there. However, you maybe able to figure it out as you go (so try and start with TDD).
4. If you don't have a solid understanding of the language, then TDD will be hard, but again I think you can start.

## The Benefits I get from TDD

How many engineers plan the work they are about to develop? I bet most of you don't. This is the first three benefits I get from TDD:

1️⃣ TDD helps me plan / acts as a To-Do list for the work ahead.
2️⃣ TDD forces me to break a task into smaller pieces (units).
3️⃣ This process immediately makes me think about how the feature is going to work and even raise any questions if the requirements aren't clear. I find this really beneficial, as it means any clarification on the requirements is completed right at the start, and not when you're already head-deep in the code.

How many times have you been working on a new feature, and got to a point where you've added a little extra[^1] as you think it will be required in the future?

4️⃣ TDD stops me developing more than what has been requested. It stops me trying to predict the future.

I bet most engineers, who don't subscribe to TDD, have gotten to where the production code is done, and they've come to write the tests and found the code isn't easily testable. This probably means your code doesn't adhere to some well regarded development patterns.

5️⃣ TDD helps me write better code.
6️⃣ TDD also helps me learn and get more comfortable with the test frameworks: I actually enjoy writing tests!

Similar, you've written the production code, and you are beat, you're done. The last thing you want to do is write tests. You're validated further when you tell your business stakeholders, *"the work is done I just have the tests to write"*. They're response: *"don't bother, we need that feature out"*.

7️⃣ I've written the tests up-front, and I get that regular feedback, as the tests go from red 🔴 to green 🟢.
8️⃣ TDD gives me confidence that when all the tests are green 🟢, I've completed the full, working feature. There have been times where I have such confidence, I don't even need to manually test the changes: I know it works because my tests tell me so.

## How I TDD

Let's go through two examples, for TDD with unit tests:  one in [Angular](#angular) and another in [Java](#java-spring-boot).

### Angular

#### The UI Requirement

> I want to be able to change the colour scheme on my website, between three different themes: Default, Night & Sunny.
>
> At this time, the specs of the themes are out of scope but will be controlled depending on the value of `data-theme` attribute on the `html` element.

#### What we need to develop for the UI feature

1. An Angular Service to update the `data-theme` attribute on the `html` element.
2. a UI element for the customer to select one of the three themes.

For the brevity of this post, we'll just address step 1, the Angular Service. FYI, this is what I have on [my own website](https://www.blandford.dev).

With these requirements, let's now write our 'to-do' list but as unit tests & test setup:

```typescript
describe('ThemeService', () => {
  it('should set the html data-theme attribute to the provided theme', () => {
    const dom = {} as jest.MockedObject<Document>;

    const service = new ThemeService(dom);

    throw new Error('Not implemented');
  });
});
```

Working backwards, this describes what we have to do:

1. We need a new Angular Service.
2. The service has a dependency on the DOM / `Document`.
3. The service will need a public method to enable the selected theme.

Now, we know that if we even attempt to run the test, it'll fail immediately because `ThemeService` doesn't exist. 🔴

I always ensure too, that my new test throws a 'Not Implemented' exception. Test Frameworks generally mark tests as passed 🟢, if there is no assertion. Ensuring the test throws an exception, immediately means the test is 🔴.

> 💡**Tip:** I have added a shortcut / code snippets in my IDEs, to enable me to quickly insert a 'Not implemented' exception. I can type <kbd>nie</kbd> + <kbd>tab</kbd> and depending on the language, I get the new exception added.

Next, I actually create the Production Service:

```typescript
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) { }
}
```

At this point, I can now run the test. The spec will now compile but thanks to the `throw new Error('Not implemented')`, will still fail. Now back to the test.

I think I want a public method called, `enableTheme(theme: string)`, which should take the theme and do as required:

1. Use `querySelector()` on the dom /` Document` to select the `html` element.
2. Call `setAttribute` to set the `data-theme` attribute with the provided theme.

This takes us to:

1. Update the `dom` Mock, to mock the `querySelector` method, as we'll need to call it.
2. Implement the rest of the test.

```typescript
it('should set the html data-theme attribute to the provided theme', () => {
  const dom = {
    querySelector: jest.fn(),
  } as jest.MockedObject<Document>;

  const htmlStub = {
    setAttribute: jest.fn(),
  } as jest.MockedObject<HTMLHtmlElement>;

  jest.spyOn(dom, 'querySelector').mockReturnValue(htmlStub);

  const service = new ThemeService(dom);
  service.enableTheme('Sunny');

  expect(htmlStub.setAttribute).toHaveBeenCalledWith('data-theme', 'Sunny');
});
```

Now we implement the shell of the real, `enableTheme(theme: string)` method, again with a 'Not implemented' exception:

```typescript
enableTheme(theme: string): void {
  throw new Error('Not implemented');
}
```

The test will now run but with the 'Not implemented' exception coming from the production code. We're getting there. Finally, we can implement the guts of the Unit Under Test.

```typescript
enableTheme(theme: string): void {
  const root = this.document.querySelector('html');

  root.setAttribute('data-theme', theme);
}
```

Viola, we have a passing test, which means we have a fully implemented feature.

Next, we'd refactor not only the test but also the production code, safe in the knowledge we have a working test to fallback on. For example, `theme` would probably be better as an `enum`.

### Java Spring Boot

#### The Integration Layer Requirement

> I want to be able to serve the list of themes available to the UI, from our API, but where the themes are provided by a 3rd party at `https://example.com/themes`
>
> The response should be a list of theme names, sorted alphabetically.

#### What we need to develop for the API feature

1. A new, [Feign](https://github.com/OpenFeign/feign) client, to make the `get` request to `https://example.com/themes`.
  1. This client will expose a `get()` method.
2. A new Java service to call the new client.
3. A new end-point on our controller which calls the new service.
  1. This is what our UI will interface with.

For the brevity of this post, we'll just address step 2. the Java Service.

With these requirements, let's now write our 'to-do' list but as unit tests & test setup.


This leads to the following tests:

**This code is untested** 😛

```java
public class CustomThemesServiceUnitTest {
    @Test
    void getThemes_themesAvailable_listofSortedThemes() {
        throw new NotImplementedException();
    }

    @Test
    void getThemes_themesUnavailable_emptyStringArray() {
        throw new NotImplementedException();
    }
    // in reality, we would probably have more tests, covering error responses etc.
}
```

Working backwards, these tests describe what we need to implement to achieve our objective:

1. We need a new Java Service, `CustomThemes`.
2. The service will have a dependency on the soon-to-be developed, Feign client.
  1. The Feign client will have a `get()` method we need to call to retrieve the themes.
3. The service will have a public, `getThemes()` method.
  1. The method will need to ensure the list is sorted alphabetically, when there are themes available.
  2. The method will need to elegantly handle when no themes are available.

Again, we know the tests will fail 🔴 immediately because of the 'Not implemented' exception.

Next, I write the shell of the new service (for brevity I'm not including Spring Boot decorators, interfaces etc.).

```java
public class CustomThemesService {
    public String[] getThemes() {
        throw new NotImplementedException();
    }
}
```

We've not done much here, but it means we can continue with our tests, and they will at least compile. Now let's write the tests:

```java
public class CustomThemesServiceUnitTest {
    @Test
    void getThemes_themesAvailable_listofSortedThemes() {
        // we will assume the `ThemeClient` interface has already been created
        // I'm using Mockito to mock the dependencies
        ThemeClient mockThemeClient = mock(ThemeClient.class);

        // not sorted, so we can verify the list is sorted
        String[] themes = { "Sunny", "Default", "Night"};
        when(mockThemeClient.get()).thenReturn(themes);

        CustomThemesService cut = new CustomThemesService(mockThemeClient);

        assertEquals(cut.getThemes(), { "Default", "Night", "Sunny" });
    }

    @Test
    void getThemes_themesUnavailable_emptyStringArray() {
        ThemeClient mockThemeClient = mock(ThemeClient.class);

        when(mockThemeClient.getThemes()).thenReturn(null);

        CustomThemesService cut = new CustomThemesService(mockThemeClient);

        assertEquals(0, cut.getThemes().length);
    }
}
```

These look like some pretty good tests to me, that satisfy the requirements. If we run them, they will fail, as we have our 'Not implemented' exception in the Unit Under Test, so let's build that now.

```java
public class CustomThemesService {
    private final ThemeClient themeClient;

    // we will assume the `ThemeClient` interface has already been created
    CustomThemesService(ThemeClient themeClient) {
      this.themeClient = themeClient;
    }

    public String[] getThemes() {
        String[] themes = themeClient.get();

        // sort the themes
        Arrays.sort(themes);

        return themes;
    }
}
```

If we run our tests, now we should have one passing 🟢 and one failing 🔴. This is great and exactly what we want. Now to finish the implementation to handle when no themes are returned.

```java
public class CustomThemesService {
    public String[] getThemes() {
        String[] themes = themeClient.get();

        if (themes == null) {
          return new String[0];
        }

        // sort the themes
        Arrays.sort(themes);

        return themes;
    }
}
```

And that should be that. Again, this is untested but looks about right to me. 🤞

### Integration Tests

If it is warranted, I highly recommend TDD with Integration Tests. I actually find these easier, and depending on the Unit Under Test absolutely lead to better quality. By following TDD with Integration Tests also prevents me from forgetting to implement the tests, which I think happens frequently.

For example:

1. You're developing a new end-point for a Java API.
    1. You already use a tool such as [Rest-assured](https://rest-assured.io/) for your Integration Tests.
    2. You know what the new end-point is to be, what the responses are etc.
2. You're developing a new Angular UI component.
    1. You have the designs and know what HTML elements etc. should be used.
    2. You already use tools such as [Playwright](https://playwright.dev/) or [Cypress](https://www.cypress.io/) for your Integration Tests.

In both of these situations, it is then really, really easy to write the Integration Tests. They won't work but when they finally do, you know you're dev complete. Furthermore, it'll make you think about the response permutations and potential edge-cases. Things, that may ordinarily get missed when diving head-first into the code.

### Defect fix or update an existing feature

When you need to squash a bug or update an existing feature the process is very similar.

1. Update your existing tests, or create a new test(s) to cover the new, expected behaviour.
2. Run your tests. The ones you have updated, should fail 🔴.
3. Implement the changes required to the production code.
4. Run your tests. If you've fixed the issue, then you tests are green 🟢 and you're done.

## Summary

1. Write the test shells, as a 'to-do' list, covering just what the requirements are.
    * Remember to throw your 'Not implemented' exceptions.
2. Implement the skeleton of the production code / Unit Under Test.
    * Remember to throw your 'Not implemented' exceptions.
    * The tests will now compile.
3. Write the body of the tests.
    * The tests will still fail, but with 'Not implemented' exceptions from the Unit Under Test.
4. Implement the code in the Unit Under Test.
5. The tests should now all pass 🟢.
6. Go back around, and refactor / improve what has just been implemented with the confidence that you are covered with working tests.

I would guess that the majority of Software Engineers can at least complete steps 1 & 2, on the majority of the code they write. If you can start there, then I think in no time at all, you'll be able to practice TDD, through all the steps outlined. At the very least, your starting to use TDD concepts and I guarantee that will lead to better quality code.

[^1]: I always think back to a time when I built a really cool Easter Egg in a 404 error page. I was then pulled up by a more senior engineer, who (rightfully) challenged me on how I was going to test it. Needless to say, that 404 page never saw the light of day. Thank you, Richard, I'll never forget that valuable lesson!
