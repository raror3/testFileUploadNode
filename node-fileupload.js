var awsModule = require('aws-sdk');
var fileSystemModule = require('fs');

var s3 = new awsModule.S3();
var bucketName = '****';
var fileName = 'my dummy file';

/**
 * Anonymous block to read file and upload to S3
 */
fileSystemModule.readFile('file-to-be-uploaded.txt', function (err, data) {
    if (err) { throw err; }
    params = { Bucket: bucketName, Key: fileName, Body: data };
    s3.putObject(params, function (err, data) {
        if (err) {
            console.log(err + "Please check the logs ")
        } else {
            console.log("Successfully uploaded data to my test bucket: " + bucketName + " with filename: " + fileName);
        }
    });
});
