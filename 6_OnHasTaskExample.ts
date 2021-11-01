import 'zone.js';
import { greenBright, yellowBright, redBright } from 'chalk';

const z = Zone.current.fork({
    name: 'z',
    onHasTask(delegate, current, target, hasTaskState) {
      console.log(greenBright(hasTaskState.change));          // "macroTask"
      console.log(yellowBright(JSON.stringify(hasTaskState, null, 2)));
    }
});
function a() {
    console.log(redBright('In a function'));
}
function b() {
   console.log(redBright('In b function'));
   Promise.resolve().then(() => {
    console.log(redBright('In promise'));
   });
   setTimeout(a, 2000);
}
z.run(b);