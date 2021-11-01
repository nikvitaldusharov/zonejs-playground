const chalk = require('chalk');

class Context {
    constructor(parentContext) {
      let context;
      if (parentContext) { // make a copy
        context = Object.create(parentContext)
        context.parent = parentContext;
        context.level++;
      } else {
        // return current context
        context = this;
        context.level = 0;
        context.message = 'initial message';
      }
      console.log('created context with level ' + context.level);
      return context;
    }

    fork() {  // return a copy
      let newContext = new Context(this);
      return newContext;
    }
  
    bind(fn) {
        const context = this;
        return () => {
          return context.run(fn);
        }
    }
      
    run(fn) {
        return fn.call(this); 
    }
      
}


context = new Context();
var nativeSetTimeout = global.setTimeout; // Подменяем setTimeout
context.setTimeout = (callback, time) => {
  callback = context.bind(callback);
  return nativeSetTimeout.call(global, callback, time);
};
global.setTimeout = function (){
  return context.setTimeout.apply(this, arguments);
};

context.message = "Context message here";
context.fork({}).run(function () {
  setTimeout(() => {
    console.log(
         `Message inside the context: «${this.message}; level: ${this.level};»`);
  }, 0);
});
console.log(
     `Message outside of context: «${this.message}»`);


console.log(chalk.redBright("END"));
