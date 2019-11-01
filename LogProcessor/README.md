# Log Processor

## How to use?

1. Install all the dependencies, by running in the terminal the following command:
```javascript
npm install
```

2. To run the project files, first run the index.ts file with the following command:
```javascript
tsc index.ts
```
Then run the index.js file with the following command:
```javascript
node index.js
```

3. To run the tests from the debugger tab in VS code select the "Mocha Tests" configuration and Start debugging.

## What is it about?

Log-processor file will be loaded from the inputs folder and the data obtained from that file will saved in a .json summary file.

In case of any incorrect data, all the errors will be written in a processor.log.err file in the output folder.
