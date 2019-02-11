/*
    Copyright
    本程式所使用的注音對照表來源為：https://github.com/openvanilla/McBopomofo/blob/master/Source/Data/BPMFBase.txt
    版權屬於原作者所有
*/

var fs = require('fs');
var path = require('path');
var readline = require('readline')
var data = {};

var rl = readline.createInterface({
    input: require('fs').createReadStream('BPMFBase.txt')
});

rl.on('line', function (line) {
    data[line.split(' ')[0]] = line.split(' ')[1];
});

rl.on('close', function () {
    fs.writeFile('BPMF.json', JSON.stringify(data), function (err) {
        if (err)
            console.log(err);
        else
            console.log('Done!');
    });
});
