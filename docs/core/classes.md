# Classes

This document will discuss different things you can do with classes. The descriptions below are based upon the following code:

```ts
export class AuthError extends Error {
  constructor(public type: AuthErrorType) {
    super(getAuthErrorMessage(type));
  }
}
```

## Extend

You can define a class that extends a built in class. For instance:

```ts
export class AuthError extends Error
```

This means that the class `AuthError` will take the functionality of `Error` but you can build on top of it.

### Constructor parameter

```ts
constructor(public type: AuthErrorType)
```

This automatically sets the property, `type`, of your class to whatever you pass in. This is because of the public keyword. TypeScript expands it to this behind the scenes:

```ts
type: AuthErrorType;

constructor(type: AuthErrorType) {
  this.type = type;
}
```

### Super

When you do:

```ts
super(getAuthErrorMessage(type));
```

This calls the parent class constructor. So in essence, it is doing:

```ts
new Error("INVALID_CREDENTIALS")
```

This sets the `message` property of the parent class (the first parameter is message) which you can access later.
