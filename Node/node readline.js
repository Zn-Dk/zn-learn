const readline = require("readline");

readline.question("What is your favorite food? ", (answer) => {
  console.log(`Oh, so your favorite food is ${answer}`);
});
