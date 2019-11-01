const data = {};

function structureData(hostNames: string[], dates: string[], hours: string[], statusCode: string[], hitMissStatus: string[], bytes: number[]) {
    for (let row = 0; row < hostNames.length; row++) {
        fillDynamicProps(data, hostNames[row]);
        fillDynamicProps(data[hostNames[row]], dates[row]);
        fillDynamicProps(data[hostNames[row]][dates[row]], hours[row]);
        fillDynamicProps(data[hostNames[row]][dates[row]][hours[row]], statusCode[row]);
        fillDynamicProps(data[hostNames[row]][dates[row]][hours[row]][statusCode[row]], hitMissStatus[row]);
        
        const prop = data[hostNames[row]][dates[row]][hours[row]][statusCode[row]][hitMissStatus[row]];
        fillStaticProps(prop, 'requests', 1);
        fillStaticProps(prop, 'bytes', bytes[row]);
    }
    return JSON.stringify(data);
}

function fillDynamicProps(parentProp: Object, childrenProp: string) {
    if (!parentProp.hasOwnProperty(childrenProp)) {
        parentProp[childrenProp] = {};
    }
}

function fillStaticProps(parentProp: Object, childrenProp: string, value: number) {
    if (!parentProp.hasOwnProperty(childrenProp)) {
        parentProp[childrenProp] = value;
    } else {
        parentProp[childrenProp] += value;
    }
}

export = structureData;
