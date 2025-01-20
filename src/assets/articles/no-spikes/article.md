# No Spikes

I thought about writing this post a while ago but has recently come to mind once again.

## A Spike is

> ...a timeboxed experiment meant to gather information to reduce risk and enable more accurate estimates for complex user stories.
> 
> -- <cite>[Agilemania - What is an Agile Spike Story?](https://agilemania.com/agile-spike-story-what-is-a-spike-in-agile)</cite>

## I'm not a fan

First off, let me be clear I'm not 100% against completing Spikes. The big issue I do have is the tendency to over-rely on them for even the tiniest uncertainty. I'm generally of the opinion an engineering team should be skilled and knowledgeable enough, plus have the confidence, to 'jump in' and engineer a solution. However, let's dig a little further.

## Breakdown of what a Spike is

### Time-boxed ⏳

OK, so we're not commiting (if there is such as thing) to an estimate, but instead we will limit the time needed to gather the information needed. How large is this 'time-box'?

* A day?
* A week?
* A month?

Surely, if we can come up with an accurate time-box, then we have some certainty of the unknown? Can that not be factored into the 'uncertainty' of estimating the actual Story?

#### What happens if the Spike gives us what we're looking for?

Then what? The findings get written down, the prototype put to one-side (to decay) and the team switches context to something else. When the team then come back to start the implementation, are the findings of the Spike still accurate? Do they even make sense / do we understand them still / would the prototype still work?

#### What happens if we still don't have enough information at the end of the time-box?

1. Do we extend it or commit to a new Spike? - How long for? ⏱️
2. Do we stop and do the *actual* work? - So what was the point of the Spike if we are going to get going without the information anyway? We've just wasted the 'spike time-box' time.

**Winner - Story**

### Experiment 🧪

This is possibly the only, possible case I can see for a Spike, but it's small. Even with using a Spike to experiment or prototype a solution, what happens when it's done?

1. Do we throw away the prototype? - If so, then we've probably wasted that time.
2. Do we 'productionise' the prototype in the Story? - Probably could have avoided the Spike then and just done the work. If you're already neck-deep in it, it is costly to stop and come back later.
3. Do we document the findings of the experiment for later? - We've just introduced a huge context switch. Whoever picks up the actual work, which may not be the engineer who completed the Spike, may have a slight head-start but...
    * They may not understand the findings (another Spike perhaps? 🙂)
    * Things might have changed since. Depending on how long ago the Spike was completed, the findings may no longer be relevant.

If an experiment is to be carried out because there are two or more potential solutions, which all deliver the value in the Story, don't bother and simply implement the most simple and iterate on that solution.

**Winner - Story (just)**

### Gather Information 💭

I'm a strong believer in empowering Software Engineers to engineer solutions. I would expect any engineer worth their salt to be capable of gathering the information they need to complete a Story. However, if it is about gathering requirements, then that is **not** the responsibility of the engineer and the request should not even be in the team yet.

I'm struggling to think of occasions where there wouldn't at least be **some** information to be able to start work on a Story. After all, the ACs should be enough to get going and figure it out as you go.

**Winner - Story**

### Reduce Risk 🛡️

OK, so we're completing a Spike because we don't know if something is technically feasible or something similar. I.e. you don't want to commit to an implementation that may not work. If your team already aims to deliver MVP and iterate on it, what is the harm in trying? You should know fairly quickly whether something is going to work, if it is great, continue if not, stop and do something else. Doing this as a Spike, doesn't really change the 'risk' just makes it slower to implement a solution.

**Winner - Story**

### More accurate Estimates

Who cares? An estimate should not be a measure of time or effort. In my opinion an estimate is made up of three components:

1. Development / Test Effort
2. Complexity
3. Uncertainty

I guess you might complete a Spike to try and reduce the uncertainty. Why not simply adjust your estimate of the Story instead? If you're uncertain, perhaps the estimate (in Story Points, Fibonacci Sequence) from a 3 to a 5, or perhaps a 5 to an 8. An estimate is just that and should reflect what is known at that point. That's why a team should ideally estimate their Stories only shortly before they plan to work on them.

**Winner - Story**

### Complex Stories

If the story is as small as it can be to still offer value to the customer, does it matter if it's complex? Again, the level of perceived complexity should be a factor of the Story's estimate.

**Winner - Story**

## Conclusion

I can probably count on one hand the number of times when I've genuinely felt a Spike was needed because the path was so unknown or brand-new then determining whether something could even ever be done was unclear. Perhaps it's just the type of work I do but it has probably been years since I've seen the value in a Spike.

If a Spike is needed to develop the 'gold-standard' of requirements or an approach to a solution, isn't that Waterfall?
