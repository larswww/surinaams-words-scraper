## Puppeteer crawler

Using [Puppeteer](https://github.com/puppeteer/puppeteer) to visit each letter from a-z, taking the contents of each letter/page and parsing it with [node-html-parser](https://github.com/node-projects/node-html-parser) to extract the text for each word and log it to the console.

The job is only half-finished. The hard part is done; i.e. getting each word/letter. Now you need to replace the part where you see `console.log` with functions for however you want to extract, store or do with the data. 


## Running the script

With node 16 installed, simply do `npm install` to install all the dependencies in the `package.json`, then `npm run test` which will run the test suite. You will see all the content logged to the console.

Have a look in `test.test.js` to see how the various functions are used.