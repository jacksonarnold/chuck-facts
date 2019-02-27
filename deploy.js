var fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
var lambda = new AWS.Lambda();


var content = fs.readFileSync('./deploy_package.zip', (err, data) => {
    if (err) throw err;
    console.log(data);
});

var params = {
    FunctionName: 'arn:aws:lambda:us-east-1:224521086614:function:chuck-facts',
    ZipFile: content
}

lambda.updateFunctionCode(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
});