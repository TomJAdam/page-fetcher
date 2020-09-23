//page fetcher, downloads a page to a destination
const fs = require('fs');
const request = require('request');
const readline = require('readline');
const { pathToFileURL } = require('url');

//readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//node line input
const input = process.argv.splice(2);

//page request
request(input[0], (error, response, body) => {

  if (error) {
    console.log('error:', error);
    rl.close();

  } else if (fs.existsSync(input[1])) {
    rl.question(`This file already exists! Press y to over write, press any other key to exit`, (answer) => {

      if (answer.toLowerCase() === 'y') {
        fs.writeFile(input[1], body, (err) => {
          if (err) throw err;
          console.log(`Downloaded and saved ${body.length} bytes to ${input[1]}`);
        });

      } else if (answer.toLowerCase() !== 'y') {
        rl.close();
      }
      rl.close();
    });
  }
});




