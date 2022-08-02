// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

class Living {
  constructor(options: any) {
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
  constructor(options: any, extendedOptions: any) {
    const defaults = {
      int: 1,
      atkPrc: 1,
      defPrc: 1,
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
  defend(attacker: any) {
    let incomingPierce = attacker.atkPrc;
    let damage = incomingPierce - this.defPrc;

    this.health -= damage <= 0 ? 0 : damage;
    if (this.health <= 0) {
      this.isAlive = false;
    }
  }
  wake() {
    console.log(`${this.isAlive} ${this.name} wakes.`);
  }
}

export const cat: any = new Sentient(
  { name: 'cat', age: 2, health: 100 },
  { int: 5, atkPrc: 14, defPrc: 2 }
);
export const dog = new Sentient(
  { name: 'dog', age: 21, health: 100 },
  { int: 5, atkPrc: 8, defPrc: 5 }
);
