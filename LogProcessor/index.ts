const fs = require('fs');

import fillFields = require('./fillFields');
import validatedFields = require('./validateFields');
import structuredData = require('./structureData');

fs.readFile('./inputs/log-processor.log', 'utf8', (err: Object, data: string) => {
    if (err) {
        return console.log("Something went wrong with reading your file.");
    }

    const errFilePath = './outputs/log-processor.log.err';
    if (fs.existsSync(errFilePath)) {
        fs.unlinkSync(errFilePath);
    }

    const hostNames: string[] = fillFields.getHostName(data);
    const dates: string[] = fillFields.getTheDate(data);
    const hours: string[] = fillFields.getTheHour(data);
    const statusCode: string[] = fillFields.getStatusCode(data);
    const hitMissStatus: string[] = fillFields.getHitMissStatus(data);
    const bytes: number[] = fillFields.getBytes(data);
    
    // with the following function we will get the data ready for the json file
    const objectData = structuredData(hostNames, dates, hours, statusCode, hitMissStatus, bytes);
    fs.writeFile("./outputs/log-processor.json", objectData, (err: Object) => {
        if (err) {
            return console.log(err);
        }
        console.log("The .json file was saved!");
    });

    // with the following function we will get the errors data ready for the errors file
    const invalidData: string[] = validatedFields.validateFields(data, hitMissStatus);
    fs.writeFile("./outputs/log-processor.log.err", invalidData.join('\n'), (err: Object) => {
        if (err) {
            return console.log(err);
        }
        console.log("The errors file was saved!");
    });
});
