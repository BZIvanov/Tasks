const expect = require('chai').expect;
const fillers = require('../fillFields');

describe('Test the function responsible for filling the data from the file to an object', function() {
    let data;
    beforeEach('set testing dummydata', function() {
        data = `#Fields: date time time-taken c-ip filesize s-ip s-port sc-status sc-bytes cs-method cs-uri-stem - rs-duration rs-bytes c-referrer c-user-agent customer-id x-ec_custom-1
        2014-04-02 02:12:09 0 113.67.181.139 2863 68.232.40.109 80 TCP_HIT/200 3125 GET http://images.chem.co.uk/SMA-Wysoy-Soya-Infant-Formula-192594.jpg?o=gL1biz9dm5vMSjIVW9Npa@nLNCIj&V=iIxj&h=97&w=97&q=80 - 0 1214 "-" "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36" 26792 "http://results.chemistdirect.co.uk/search?p=Q&lbc=chemistdirect-uk&uid=18973090&ts=redesign&w=Baby&isort=score&method=and&view=grid&af=department:babychildcare&format=cat1"
        2014-04-02 02:00:16 1 159.253.135.146 55726 46.22.73.243 80 TCP_HIT/200 55989 GET http://asset3.turfcdn.com/bnx@DLT2Lasz8Sg@csGRqwwTC9wj.jpg?w=630&h=630&q=80 - 0 381 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:14.0) Gecko/20100101 Firefox/14.0.1" 26792 "-"
        2014-04-02 02:01:29 0 159.253.135.146 29354 46.22.73.243 80 TCP_HIT/200 29617 GET http://asset1.turfcdn.com/B9kzYruhLgtCyi$XgKN03OPntkcj.jpg?w=630&h=630&q=80 - 0 381 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:14.0) Gecko/20100101 Firefox/14.0.1" 26792 "-"
        2014-04-02 02:01:55 0 77.249.39.219 8283 46.22.73.243 80 TCP_HIT/200 8545 GET http://images.tedbakerimages.com/WS3W_LLIMA_79-PALE-YELLOW_1.jpg?o=Gp3@zvVtrGc2CKyFdsf6zyb3epMj&V=x51X&w=260%26h=326%26q=85 - 0 552 "-" "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0_2 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A501 Safari/9537.53" 26792 "http://www.tedbaker.com/row/Womens/Outlet/NAUVT-Batwing-jumpsiut-Black/p/101420-00-BLACK"`;
    });

    describe('Test the function which will extract the host names', function() {
        it('should return an array', function() {
            const testData = fillers.getHostName(data);
            expect(testData).to.be.an('array');
        });
        it('should not be empty array', function() {
            const testData = fillers.getHostName(data);
            expect(testData).to.not.be.empty;
        });
        it('should be a string', function() {
            const testData = fillers.getHostName(data);
            expect(testData[0]).to.be.a('string');
        });
        it('should contains "." character', function() {
            const testData = fillers.getHostName(data);
            expect(testData[0]).to.include('.');
        });
    });

    describe('Test the function which will extract the dates', function() {
        it('should return an array', function() {
            const testData = fillers.getTheDate(data);
            expect(testData).to.be.an('array');
        });
        it('should be a string', function() {
            const testData = fillers.getTheDate(data);
            expect(testData[0]).to.be.a('string');
        });
        it('should contains "-" character', function() {
            const testData = fillers.getTheDate(data);
            expect(testData[0]).to.include('-');
        });
        it('should match the pattern for example date: 2014-02-03', function() {
            const testData = fillers.getTheDate(data);
            expect(testData[0]).to.match(/^2\d{3}-\d{2}-\d{2}$/);
        });
    });

    describe('Test the function which will extract the hours', function() {
        it('should return an array', function() {
            const testData = fillers.getTheHour(data);
            expect(testData).to.be.an('array');
        });
        it('should be a string', function() {
            const testData = fillers.getTheHour(data);
            expect(testData[0]).to.be.a('string');
        });
        it('should match the pattern for example hour: 02:20', function() {
            const testData = fillers.getTheHour(data);
            expect(testData[0]).to.match(/^\d{2}:\d0$/);
        });
    });

    describe('Test the function which will extract the status codes', function() {
        it('should return an array', function() {
            const testData = fillers.getStatusCode(data);
            expect(testData).to.be.an('array');
        });
        it('should be a string', function() {
            const testData = fillers.getStatusCode(data);
            expect(testData[0]).to.be.a('string');
        });
        it('should match the pattern for example status code: 200', function() {
            const testData = fillers.getStatusCode(data);
            expect(testData[0]).to.match(/^\d{3}$/);
        });
    });

    describe('Test the function which will extract the hit or miss status', function() {
        it('should return an array', function() {
            const testData = fillers.getHitMissStatus(data);
            expect(testData).to.be.an('array');
        });
        it('should be a string', function() {
            const testData = fillers.getHitMissStatus(data);
            expect(testData[0]).to.be.a('string');
        });
        it('should match the pattern for example miss or hit', function() {
            const testData = fillers.getHitMissStatus(data);
            expect(testData[0]).to.match(/^miss|hit$/);
        });
    });

    describe('Test the function which will extract the bytes', function() {
        it('should return an array', function() {
            const testData = fillers.getBytes(data);
            expect(testData).to.be.an('array');
        });
        it('should be a number', function() {
            const testData = fillers.getBytes(data);
            expect(testData[0]).to.be.a('number');
        });
        it('should match the pattern for a number', function() {
            const testData = fillers.getBytes(data);
            expect(testData[0]).to.match(/^\d+$/);
        });
    });

    describe('Test the function which will split the data into an array', function() {
        it('should return an array', function() {
            const testData = fillers.splitRawData(data);
            expect(testData).to.be.an('array');
        });
        it('should not have empty elements', function() {
            const testData = fillers.splitRawData(data);
            expect(testData).to.not.include('');
        });
    });
});
