/**
 * Utility type to constrain classes as parameter.
 */
type ObjectConstructor<T extends Object> = new (...args: any[]) => T;

type Predicate<T> = (v: any) => v is T;

/**
 * Handler for a caught error.
 */
export interface Catcher<Err> {
  (error: Err): void;
}

/**
 * Thrown
 */
export class Thrown {
  private readonly err: any;
  private caught: boolean;

  public constructor(err: any) {
    this.err = err;
    this.caught = false;
  }

  /**
   * Same as catch(), but using a predicate to match the error type.
   */
  public catchPredicate<Err extends Object>(predicate: Predicate<Err>, catcher: Catcher<Err>): this {
    if (!this.caught) {
      if (predicate(this.err)) {
        this.caught = true;
        catcher(this.err);
      }
    }

    return this;
  }

  /**
   * Catch a specific error type. Doing so will prevent the error from being rethrown.
   * Note that the constructor does not have to derive from Error.
   */
  public catch<Err extends Object>(errCtor: ObjectConstructor<Err>, catcher: Catcher<Err>): this {
    if (!this.caught) {
      if (this.err instanceof errCtor) {
        this.caught = true;
        catcher(this.err);
      }
    }

    return this;
  }

  /**
   * Catch any error not matching a specific handler.
   */
  public catchAny<T = any>(catcher: Catcher<T>) {
    if (!this.caught) {
      catcher(this.err);
    }
  }

  /**
   * Rethrow any error that did not have a specific handler.
   */
  public rethrowUncaught(override?: any) {
    if (!this.caught) {
      throw (override ?? this.err);
    }
  }
}

/**
 * Convenience export.
 */
export function thrown(err: any): Thrown {
  return new Thrown(err);
}