import 'zone.js';
import { greenBright, yellowBright } from 'chalk';

const zoneAC = Zone.current.fork({name: 'AC'});
const zoneB = zoneAC.fork({name: 'B'});
function c() {
  console.log(greenBright(`${Zone.current.name}; parent - ${Zone.current.parent?.name}`));  // AC
}
function b() {
  console.log(yellowBright(`${Zone.current.name}; parent - ${Zone.current.parent?.name}`));  // B
  zoneAC.run(c);
}
function a() {
  console.log(greenBright(`${Zone.current.name}; parent - ${Zone.current.parent?.name}`));  // AC
  zoneB.run(b);
}
zoneAC.run(a);