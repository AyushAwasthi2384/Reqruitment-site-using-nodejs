// Import the fs module
const fs = require('fs');

// Read a file named input.txt
fs.readFile('input.txt', 'utf8', (err, data) => {
  // Handle any errors
  if (err) {
    console.error(err);
  } else {
    // Get the file content
    var content = data;
    // Do something with it
    console.log(content);
  }
});

// Write a file named output.txt from a variable
var output = 'Hello, this is some data';
fs.writeFile('output.txt', output, (err) => {
  // Handle any errors
  if (err) {
    console.error(err);
  } else {
    // Log a success message
    console.log('Data written to file');
  }
});

