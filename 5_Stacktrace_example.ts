import 'zone.js';
import { greenBright } from 'chalk';

function c() {  // capturing stack trace
    try { throw new Error('throw new Error')
    } catch (e: any) {  
        console.log(e.stack);  
    }
}

function b() { 
   setTimeout(() => c()); 
}

function a() { 
   setTimeout(() => b()); 
}

a();
