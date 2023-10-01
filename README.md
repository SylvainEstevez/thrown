# thrown

`catch(TypeError, e => { ... })`: Handle specific exceptions in Typescript like you would do in classic OOP languages.

## Install

`npm i @normality/thrown`

`yarn add @normality/thrown`

## Usage

The module exports a single utility `thrown(err)`:

```typescript
import { thrown } from '@normality/thrown';

try {
  // Might throw TypeError.
  doSomething(someArg);
} catch (err: any) {
  thrown(err)
    .catch(TypeError, e => {
      // "e" is of type TypeError.
      // Special handling for TypeError...
    })
    .rethrowUncaught(); // Any non TypeError will be thrown.
}
```

Catch multiple error types:

```typescript
try {
  // Might throw TypeError or a custom SomeError class.
  doSomething(someArg); // Might throw TypeError.
} catch (err: any) {
  thrown(err)
    .catch(TypeError, e => {
      // Special handling for TypeError...
    })
    .catch(SomeError, e => {
      // Special handling for SomeError...
    })
    // Any non TypeError will be thrown as is.
    .rethrowUncaught();
}
```

Catch any other type of error:

```typescript
try {
  // Might throw TypeError or a custom SomeError class.
  doSomething(someArg); // Might throw TypeError.
} catch (err: any) {
  thrown(err)
    .catch(TypeError, e => {
      // Special handling for TypeError...
    })
    .catch(SomeError, e => {
      // Special handling for SomeError...
    })
    .catchAny(e => {
      // Will catch errors that are not TypeError nor SomeError.
      // Beware that you are responsible for rethrowing in this case.
    });
}
```

Rethrow a generic error:

```typescript
try {
  // Might throw TypeError or a custom SomeError class.
  doSomething(someArg); // Might throw TypeError.
} catch (err: any) {
  thrown(err)
    .catch(TypeError, e => {
      // Special handling for TypeError...
    })
    .catch(SomeError, e => {
      // Special handling for SomeError...
    })
    // If not TypeError nor SomeError, rethrow a default error.
    .rethrowUncaught(new Error(err.message));
}
```

## License

Copyright (c) 2023 Sylvain Estevez

This project is licensed under the MIT License - see the LICENSE file for details.

