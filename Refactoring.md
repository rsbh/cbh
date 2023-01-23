# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

I have created `createHash` helper function in file local scope. As we are creating hash in 2 places now, it will create problem in maintaining because if we make change in hash generation in future and forget to update in 1 place, then this will create problem. It is ideal to move hash generation at 1 place.

I also created a helper to get `partitionKey` from event. The logic to get `partitionKey` from event is not related to other part of function and can be seperated from main function.

Same with generating `partitionKey` from event.

I also avoid mutating the `candidate` variable.
