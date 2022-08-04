// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

class Living {
  constructor(options: any) {
    const defaults = {
      _isAlive: true as boolean,
      name: 'noname' as string,
      age: 0 as number,
      health: 'default c health' as string,
      lastWords: 'hello world' as string,
    };
    //setup defaults
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

export class Sentient extends Living {
  constructor(options: any, extendedOptions: any) {
    const defaults = {
      int: 1,
      damage: 1,
      absorbDamage: 1,
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
    this.lastWords = 'I spoke!';
    console.log(`${this.name} speaks.`);
    console.log(`${this.lastWords}`);
  }
  defend(attacker: any) {
    let incomingPierce = attacker.damage;
    console.log('incomingPierce', incomingPierce);
    console.log('', this.name, 'defends');
    let damage = incomingPierce - this.absorbDamage;

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
  { int: 5, damage: 14, absorbDamage: 32 }
);
export const dog = new Sentient(
  { name: 'dog', age: 21, health: 100 },
  { int: 5, damage: 38, absorbDamage: 5 }
);
