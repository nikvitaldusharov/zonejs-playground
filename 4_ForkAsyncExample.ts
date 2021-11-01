import 'zone.js';
import { greenBright, yellowBright } from 'chalk';

const zoneBC = Zone.current.fork({name: 'BC'});
function c() { console.log(greenBright(Zone.current.name)); } // BC
function b() {
  console.log(greenBright(Zone.current.name));  // BC
  setTimeout(c, 2000);
}
function a() {
  console.log(greenBright( Zone.current.name)); 
  zoneBC.run(b);
}
a();
