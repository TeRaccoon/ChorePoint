# Data Pipeline

## Code Example

```ts
  private refresh$ = new Subject<void>();

  vm$!: Observable<{
    chore: Chore | null;
    choreSubmission: ChoreSubmission | null;
  }>;

  private loadChore(id: number) {
    this.vm$ = this.refresh$.pipe(
      startWith(void 0),
      switchMap(() =>
        combineLatest([this.choreService.getById(id), this.choreSubmissionService.getCurrent(1)]),
      ),
      map(([chore, choreSubmission]) => ({ chore, choreSubmission })),
      catchError((error) => {
        if (error.name === 'TimeoutError') {
          console.error('Request timed out');
        } else {
          console.error('Error loading chore details:', error);
        }
        return of({ chore: null, choreSubmission: null });
      }),
    );
  }

  markComplete() {
    this.choreSubmissionService.completeChore(this.getChoreIdFromRoute()!).subscribe({
      next: () => {
        this.refresh$.next();
      },
      error: (err: string) => {
        console.error('Failed to complete chore', err);
      },
    });
  }
```

Essentially, this is a reactive data pipeline (`vm$`) which reloads itself whenever the signal `refresh$` emits.

### `startWith(void 0)`

`startWith(x)` makes an observable emit `x` immediately when someone subscribes whereas otherwise the observable would only emit when you manually call `.next()`. The emitted value `void 0` (essentially the same as `undefined`). The actual value in this example is irrelevant because it isn't being used.

### `switchMap`

Takes a value, starts a new observable, and cancels the pervious one if a new value comes in. It is similar to a map with the difference only showing with async behaviors, where it unwraps the inner observable for you. For example:

```ts
map(() => this.choreService.getById(id))
```

Returns:

```ts
Observable<Observable<Chore>>
```

Whereas:

```ts
switchMap(() => this.choreService.getById(id))
```

Returns:

```ts
Observable<Chore>
```

In reference to the code example, whenever a refresh happens, cancel any current API call and start a fresh one.

### `combineLatest`

Takes multiple observables and emits their latest values together whenever they have all emitted at least once. For example:

```text
obsA: ----1--------------2--------
obsB: ---------A-------------B----
```

Output:

```text
     ------[1,A]-----[2,A]--[2,B]
```

The rules are, once all observables have emitted at least once, it emits, and then after that, whenever any of them emits, all latest values are emitted. This means they are always in sync and you get a clean single stream.