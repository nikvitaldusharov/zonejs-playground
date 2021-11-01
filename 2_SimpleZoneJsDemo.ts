import 'zone.js';
import { greenBright } from 'chalk';

const childZone = Zone.current.fork({
  name: 'Child zone'
});

const handler = () => {
  console.log(greenBright(`Code executed in zone with name «${Zone.current.name}»`));
}
childZone.run(handler);

handler();