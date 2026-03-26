# `vm$`

`vm$` is a view model observable. It's a stream that emits everything your template needs in one object. It means everything is centralised that is needed by the template. It represents the complete state of your UI needs and is updated reactively over time. It can be used in the template:

```ts
@if (vm$ | async as vm) {
    <h1>{{ vm.title }}</h1>
}
```

The `async` pipe subscribes and unsubscribes automatically.
  