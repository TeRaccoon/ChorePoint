# RxJS

## `pipe()`

`pipe()` is a way to chain operations on a stream of values. In other words, each step takes a value, transforms or reacts to it, then passes it to the next step. For example:

```ts
of(1).pipe(
  map(x => x + 1),
  map(x => x * 2)
)
```

The above snippets takes 1, adds 1 to it, then multiplies it by 2.

A pipe will only ever execute once it has been subscribed to.

## `of()`

Creates an observable that immediately emits the value(s) provided, then completes. It is necessary inside `pipe` because everything must return an observable. It's as simple as:

```ts
of(5)
```

Returning:

```ts
5
```
