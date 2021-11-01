import 'zone.js';
import { greenBright, yellowBright, redBright } from 'chalk';


const zoneAC = Zone.current.fork({name: 'AC', properties: { data: { value: 'ACdata'} }});
const zoneB = zoneAC.fork({name: 'B', properties: { data: { value: 'Bdata'} }});
const zoneD = zoneB.fork({name: 'D' });

function d() {
    console.log(redBright(`from d - ${Zone.current.name}; data.value - ${Zone.current.get('data')?.value}`));
}

function c() {
  setTimeout(() => {
    console.log(greenBright(`from c - ${Zone.current.name}; data.value - ${Zone.current.get('data')?.value}`));  // AC
    zoneD.run(d);
  }, 1000);
}

function b() {
  console.log(yellowBright(`from b - ${Zone.current.name}; data.value - ${Zone.current.get('data')?.value}`));  // B
  zoneAC.run(c);
}

function a() {
  console.log(greenBright(`from a - ${Zone.current.name}; data.value - ${Zone.current.get('data')?.value}`));  // AC
  Zone.current.get('data').value = 'AC new data'
  zoneB.run(b);
}
zoneAC.run(a);