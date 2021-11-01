import 'zone.js';
import { greenBright, yellowBright, redBright } from 'chalk';

let timer;

const z = Zone.current.fork({
  name: 'z',
  onScheduleTask(delegate, currentZone, targetZone, task) {
    const result = delegate.scheduleTask(targetZone, task);
    const name = task.callback.name;
    console.log(
      Date.now() - timer,
      greenBright(`task with callback '${name}' is added to the task queue`)
    );
    return result;
  },
  onInvokeTask(delegate, currentZone, targetZone, task, ...args) {
    const name = task.callback.name;
    console.log(
      Date.now() - timer,
      greenBright(`task with callback '${name}' will be invoke now`)
    );
    const result = delegate.invokeTask(targetZone, task, ...args);
    return result;
  }
});

function a1() {
  console.log(redBright('in a1'));
}
function a2() {
  console.log(redBright('in a2'));
}
function b() {
  console.log(redBright('in b'));
  timer = Date.now();
  setTimeout(a1, 2000);
  setTimeout(a2, 4000);
}

z.run(b);
