import 'zone.js';
import { greenBright, yellowBright, redBright } from 'chalk';

const z = Zone.current.fork({
  name: 'z',
  onInvoke(delegate, current, target, callback, ...args) {
    console.log(greenBright(`entering zone '${target.name}'`));
    delegate.invoke(target, callback, ...args);
    console.log(greenBright(`exiting zone '${target.name}'`))
  }
});

function b() {
  console.log(yellowBright('in b function'))
}

z.run(b);
