class Living {
  constructor(options) {
    const defaults = {
      _isAlive: true,
      name: 'noname',
      age: 'default b age',
      health: 'default c health',
    };
    const populated = Object.assign(defaults, options);
    for (const key in populated) {
      if (populated.hasOwnProperty(key)) {
        this[key] = populated[key];
      }
    }
  }

  get isAlive() {
    return this._isAlive;
  }
  set isAlive(arg) {
    this._isAlive = arg;
  }

  speak() {
    console.log(`${this.name} SUPER first.`);
  }
  about() {
    return 'about';
  }
}

class Sentient extends Living {
  constructor(options, extendedOptions) {
    const defaults = {
      intelligence: 1,
      attPierce: 1,
      defPierce: 1,
    };
    const populated = Object.assign(defaults, extendedOptions);
    super(options);
    for (const key in populated) {
      if (populated.hasOwnProperty(key)) {
        this[key] = populated[key];
      }
    }
  }

  speak() {
    super.speak();
    console.log(`Sentient speaks.`);
  }
  defend(attacker) {
    let incomingPierce = attacker.attPierce;
    let damage = incomingPierce - this.defPierce;

    this.health -= damage <= 0 ? 0 : damage;
    if (this.health <= 0) {
      this.isAlive = false;
    }
  }
  wake() {
    console.log(`${this.isAlive} ${this.name} wakes.`);
  }
}

export const cat = new Sentient(
  { name: 'cat', age: 2, health: 100 },
  { intelligence: 5, attPierce: 14, defPierce: 2 }
);
export const dog = new Sentient(
  { name: 'dog', age: 21, health: 100 },
  { intelligence: 5, attPierce: 8, defPierce: 5 }
);
