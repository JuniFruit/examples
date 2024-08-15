"use strict";

const STATE = {
  FULFILLED: "fulfilled",
  PENDING: "pending",
  REJECTED: "rejected",
};

class CustomPromise {
  #thenCbs = [];
  #cathcCbs = [];
  #value;
  #state = STATE.PENDING;

  #onRejectBind = this.#onReject.bind(this);
  #onSuccessBind = this.#onSuccess.bind(this);

  constructor(callback) {
    try {
      callback(this.#onSuccessBind, this.#onRejectBind);
    } catch (error) {
      this.#onRejectBind();
    }
  }

  #invokeCbs() {
    if (this.#state === STATE.REJECTED) {
      this.#cathcCbs.forEach(cb => cb(this.#value));
      this.#cathcCbs = [];
    }

    if (this.#state === STATE.FULFILLED) {
      this.#thenCbs.forEach(cb => cb(this.#value));
      this.#thenCbs = [];
    }
  }

  #onReject(value) {
    queueMicrotask(() => {
      this.#value = value;
      this.#state = STATE.REJECTED;

      if (!this.#cathcCbs.length) throw new UncaughtPromiseError();

      this.#invokeCbs();
    });
  }

  #onSuccess(value) {
    queueMicrotask(() => {
      if (this.#state !== STATE.PENDING) return;

      if (value instanceof CustomPromise) {
        return value.then(this.#onSuccessBind, this.#onRejectBind);
      }
      this.#value = value;
      this.#state = STATE.FULFILLED;
      if (this.#thenCbs.length === 0) return this.#value;

      this.#invokeCbs();
    });
  }

  then(thenCb, catchCb) {
    return new CustomPromise((resolve, reject) => {
      this.#thenCbs.push(resultValue => {
        if (thenCb === null || thenCb === undefined) {
          resolve(resultValue);
          return;
        }

        try {
          const prev = thenCb(resultValue);
          resolve(prev);
        } catch (error) {
          reject(error);
        }
      });
      this.#cathcCbs.push(resultValue => {
        if (catchCb === null || catchCb === undefined) {
          reject(resultValue);
          return;
        }

        try {
          const prev = catchCb(resultValue);
          resolve(prev);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  catch(catchCb) {
    return this.then(null, catchCb);
  }

  finally(cb) {
    return this.then(
      result => {
        cb();
        return result;
      },
      result => {
        cb();
        throw result;
      }
    );
  }
  static all(...promises) {
    const results = [];
    let count = 0;
    return new CustomPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        const promise = promises[i];
        promise
          .then(result => {
            results[i] = result;
            count++;
            if (count === promises.length) resolve(results);
          })
          .catch(reject);
      }
    });
  }

  static reject(value) {
    return new CustomPromise((resolve, reject) => reject(value));
  }

  static resolve(value) {
    return new CustomPromise(resolve => resolve(value));
  }

  static allSettled(...promises) {
    const results = [];
    let count = 0;

    return new CustomPromise(resolve => {
      for (let i = 0; i < promises.length; i++) {
        let promise = promises[i];
        promise
          .then(result => {
            results[i] = { state: STATE.FULFILLED, value: result };
          })
          .catch(reason => {
            results[i] = { state: STATE.REJECTED, reason };
          })
          .finally(() => {
            count++;
            if (count === promises.length) resolve(results);
          });
      }
    });
  }

  static race(...promises) {
    return new CustomPromise((resolve, reject) => {
      for (let promise of promises) {
        promise.then(resolve).catch(reject);
      }
    });
  }
  static any(...promises) {
    const errors = [];
    let count = 0;
    return new CustomPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        let promise = promises[i];

        promise.then(resolve).catch(error => {
          errors[i] = error;
          count++;
          if (count === promises.length)
            reject({ errors, message: "All rejected" });
        });
      }
    });
  }
}

class UncaughtPromiseError extends Error {
  constructor(error) {
    super(error);

    this.stack = `(in promise) ${this.stack}`;
  }
}

void (() => {
  async function test() {
    CustomPromise.any(
      new CustomPromise((res, rej) => rej("resolve1")),
      new CustomPromise((res, rej) => rej("resolve2")),
      new CustomPromise((res, rej) => res("resolve3"))
    )
      .then(arr => console.log(arr))
      .catch(err => console.log(err));
  }
  test();
})();
