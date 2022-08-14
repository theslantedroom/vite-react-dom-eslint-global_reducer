// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { boxingPunches } from '../hardData/boxingPunches';
import { boxingTargetsBody } from '../hardData/boxingTargetsBody';

class Living {
  constructor(options: any) {
    const defaults = {
      _isAlive: true as boolean,
      _type: 'living' as string,
      name: 'noname' as string,
      age: 0 as number,
      health: 100 as number,
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

  get type() {
    return this._type;
  }
  set type(arg) {
    this._type = arg;
  }

  get isAlive() {
    return this._isAlive;
  }
  set isAlive(arg) {
    this._isAlive = arg;
  }

  speak() {
    console.log(`${this.name} speaks... (SUPER first)`);
  }
  about() {
    return 'this is a top level class';
  }
}

export class Sentient extends Living {
  constructor(options: any, extendedOptions: any) {
    const defaults = {
      int: 1 as number,
      damage: 1 as number,
      absorbDamage: 1 as number,
      _type: 'sentient' as string,
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
    this.lastWords = 'The Sentient spoke!';
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

export class Boxer extends Sentient {
  name: any;
  constructor(options: any, extendedOptions: any) {
    const defaults = {
      _type: 'boxer' as string,
      punches: boxingPunches,
      boxingTargetsBody: boxingTargetsBody,
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
    const said = 'I am a boxer!';
    super.speak();
    this.lastWords = said;
    console.log(`${this.name} says "${said}"`);
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

export const testBoxerOne = new Boxer(
  { name: 'testBoxerOne', age: 21, health: 100 },
  { int: 5, damage: 38, absorbDamage: 5 }
);

export const testBoxerTwo = new Boxer(
  { name: 'testBoxerTwo', age: 51, health: 110 },
  { int: 10, damage: 25, absorbDamage: 8 }
);
