# Routing

This page will talk about routing in Angular.

## Routing Module

The file `app.route.ts` is responsible for defining paths. The route is specified, followed by the component that should be rendered. For instace:

```ts
export const routes: Routes = [
  { path: 'login', component: Login },
];
```

Then in the `app.html` is:

```html
<router-outlet />
```

This is where the component will appear.

## pathMatch

The following options will use the example route below as an example:

```text
/home/stats
```

There are 2 options:

### Full

Only matches the exact URL. For example, `/home` will be matched, but `/home/stats` will not.

### Prefix

Will match based on the start of the URL. For example, `/home` will be matched, *and* `/home/stats`. Prefix is useful for parent routes with children. First, `home` would be loaded and then the rest would continue to be matched, ie `stats`. Paths use prefix matching by default.
