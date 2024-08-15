class Subject {
  __value;

  constructor(value) {
    this.__value = value;
    this.__observers = [];
  }

  set value(newValue) {
    this.__value = newValue;
    for (const observer of this.__observers) {
      observer.update(this);
    }
  }

  get value() {
    return this.__value;
  }

  subscribe(observer) {
    this.__observers.push(observer);
  }
}

class Observer {
  update(subject) {
    console.log(`new value: ${subject.value}`);
  }
}

// In Vue we can use Effect as an Observer;

let activeEffect;

class Effect {
  constructor(fn, scheduler) {
    this.fn = fn;
    this.scheduler = scheduler;
  }

  run() {
    activeEffect = this;
    const result = this.fn();
    activeEffect = undefined;
    return result;
  }
}

function effect(fn, scheduler) {
  const _effect = new Effect(fn, scheduler);
  _effect.run();
  return _effect;
}

// Setup track/triggering fns

function track(target) {
  // if we have any activeEffect
  if (activeEffect) {
    target.dep.add(activeEffect);
  }
}

function trigger(target) {
  const effects = [...target.dep];
  for (const effect of effects) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}

// Vue Ref

class Ref {
  constructor(value) {
    this.dep = new Set();
    this.value = value;
  }

  set value(value) {
    this._inner_value = value;
    trigger(this);
  }

  get value() {
    track(this);
    return this._inner_value;
  }
}

function ref(value) {
  return new Ref(value);
}
const firstname = ref("Test 1");
const lastname = ref(" Lastname");
let fullname = "";

effect(() => {
  fullname = `${firstname.value} ${lastname.value}`;
});

console.log(fullname); // Test 1 Lastname

firstname.value = "Test 2";

console.log(fullname); // Test 2 Lastname

class Computed {
  constructor(name, getter) {
    this.dep = new Set();
    this._cached_value = undefined;
    this._dirty = true;
    this._name = name;
    this.effect = new Effect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        trigger(this);
      }
    });
  }

  get value() {
    track(this);
    if (this._dirty) {
      this._dirty = false;
      console.log(`run computed effect ${this._name}`);
      this._cached_value = this.effect.run();
    }
    return this._cached_value;
  }
}

function computed(name, fn) {
  return new Computed(name, fn);
}

const number = ref(1);
const number2 = ref(2);

const sum = computed("sum", () => {
  return number.value + number2.value;
});
// run computed effect sum

console.log(sum.value); // 3

number.value = 2;
// run computed effect sum

console.log(sum.value); // 4

const sumDescription = computed("sumDescription", () => {
  return `sum(${number.value}, ${number2.value}) = ${sum.value}`;
});

console.log(sumDescription.value);
// run computed effect sumDescription
// sum(2, 2) = 4

number.value = 1;

console.log(sumDescription.value);
// run computed effect sum
// run computed effect sumDescription
// sum(1, 2) = 3
