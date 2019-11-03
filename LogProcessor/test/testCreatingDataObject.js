const expect = require('chai').expect;
const structuredData = require('../structureData');

describe('Test the function responsible for filling the data from the file to an object', function() {
    let hostNames;
    let dates;
    let hours;
    let statusCode;
    let hitMissStatus;
    let bytes;
    beforeEach('set testing dummydata', function() {
        hostNames = ['images.chem.co.uk', 'asset3.turfcdn.com', 'asset1.turfcdn.com', 'images.tedbakerimages.com'];
        dates = ['2014-04-02', '2014-04-02', '2014-04-02', '2014-04-02'];
        hours = ['02:00', '02:10', '02:30', '01:30'];
        statusCode = [200, 300, 404, 201];
        hitMissStatus = ['hit', 'hit', 'miss', 'hit'];
        bytes = [23567, 1268, 57843, 12];
    });

    describe('Test the function which will create the object for the json report', function() {
        it('should be and object', function() {
            const testData = structuredData(hostNames, dates, hours, statusCode, hitMissStatus, bytes);
            const result = JSON.parse(testData);
            expect(result).to.be.an('object');
        });
        it('should have property images.chem.co.uk', function () {
            const testData = structuredData(hostNames, dates, hours, statusCode, hitMissStatus, bytes);
            const result = JSON.parse(testData);
            expect(result).to.have.property('images.chem.co.uk');
        });
        it('should have all keys ', function () {
            const testData = structuredData(hostNames, dates, hours, statusCode, hitMissStatus, bytes);
            const result = JSON.parse(testData);
            expect(result).to.have.all.keys('images.chem.co.uk', 'asset3.turfcdn.com', 'asset1.turfcdn.com', 'images.tedbakerimages.com');
        });
    });
});
