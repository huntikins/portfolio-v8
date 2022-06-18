---
title: "Understanding the difference between call, bind, and apply in JavaScript"
description: "It can be hard to tell when is the right time to use certain methods, especially if they perform a similar action. Let's take a look at call, bind, and apply to see when you should use each."
image: "/call-bind-apply.jpg"
created_at: "06/16/2022"
tags: ["JavaScript"]
---

The other day at work I was reading through some code a senior developer had written (this is a great way to step up your game btw) and I noticed that they had used `.call()` in one of their statements. I was somewhat familiar with it, but couldn't think of a reason why you would use `.call()` vs `.bind()` or `.apply()`. So I turned to sensei google and started to investigate exactly what the difference was between these three methods and when the appropriate time to use them was.

![Jim Carrey mouthing "oh boy, here we go"](https://media3.giphy.com/media/LpkBAUDg53FI8xLmg1/giphy.gif?cid=ecf05e478zeiadacrfrbxe22nqi5639ejuvq20kf9vvbx0oy&rid=giphy.gif&ct=g)

## What do they do?

All three methods are used to provide context to objects, they just go about it a little differently. For example, `.call()` accepts an object as an argument while `.apply()` accepts an array, but they both do the same thing; providing the value of `this` to a function. `.bind()` does the same, but is used when you want to invoke a method at a later time. More or less they all do the same thing just take different routes to get to the result.

- [MDN Docs on call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
- [MDN Docs on apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
- [MDN Docs on bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

## Let's take a look at call

```js
function animalSound() {
    const noise = `${this.animal} makes a ${this.noise} sound.`
    console.log(noise)
}

const animal = {
    animal: "Dolphin",
    noise: "EEKEEKEEKEEKEEK"
}

animalSound.call(animal) // "Dolphin makes a EEKEEKEEKEEKEEK sound."
```

By using `.call()` we are able to pass an object reference into a function, essentially defining the value of `this`. By allowing our function to inherit the value of our object we can keep our function anonymous in the event we want to pass in another object, or if we want to know what another animal sounds like.

## How does apply work?

```js
function animalSound(animal, sound) {
    return `${animal} makes a ${sound} sound.`
}

const animal = ["Dolphin","EEKEEKEEKEEKEEK"]

const noise = animalSound.apply(null, animal);

console.log(noise) // "Dolphin makes a EEKEEKEEKEEKEEK sound."
```

Notice how instead of an argument we have initiated an array, and the first position of the array matches with the first position in the `animalSound` function? We are still providing context to the function but instead of passing an object we are using an array as arguments. What if we were to add in an argument in the first position of `.apply()`?

```js
function animalSound(animal, sound) {
    return `The ${this.adjective} ${animal} makes a ${sound} sound.`
}

const animal = ["Dolphin","EEKEEKEEKEEKEEK"]

const describe = {
  adjective: "majestic"
}

const noise = animalSound.apply(describe, animal);

console.log(noise) // "The majestic Dolphin makes a EEKEEKEEKEEKEEK sound."
```

We added the `describe` object as our first argument and are able to provide a `this` context to our function the same as we can with `.call()`.

## Last but not least, bind

```js
function animalSound() {
    return `${this.animal} makes a ${this.sound} sound.`
}

const animal = { 
  animal: "Dolphin", 
  sound: "EEKEEKEEKEEKEEK"
}

const noise = animalSound.bind(animal);

console.log(noise()) // "Dolphin makes a EEKEEKEEKEEKEEK sound."
```

We pass in `animal` again to our animal sound function, but this time we are waiting for it to be invoked, hence why we need to call `noise()` in our console.log.

## When do we use call, apply, or bind?

The answer to that depends on what data you are working with and when you need to use it. If you have an array of arguments `.apply()` is going to be your best bet, but it seems like `.call()` would do the trick most of the time. `.bind()` is always there when you literally just want to bind a value and not invoke the method you are bound to.

![Bill Nye blowing minds](https://media3.giphy.com/media/SJX3gbZ2dbaEhU92Pu/giphy.gif?cid=ecf05e47ublc2gtr35qdeuauqatu2s8nvvp5xn4d9ch89uw6&rid=giphy.gif&ct=g)

I hope you enjoyed this article and learned a bit more about how `.bind()`, `.apply()` and `.call()` work!

Happy Coding!
