var awsModule = require('aws-sdk');
var fileSystemModule = require('fs');

var s3 = new awsModule.S3();

var bucketName = '****';
var regex = /\.txt$/;

/**
 * Function to read contents of file passed as parameter and upload the same to S3 bucket
 * @param {String} fileName 
 */
function read(fileName) {
    fileSystemModule.readFile(fileName, function (err, data) {
        if (err) { throw err }

        s3.putObject({
            'Bucket': bucketName,
            'Key': fileName,
            'Body': data
        }, function (resp) {
            console.log(arguments);
            console.log('Successfully uploaded to bucket: ' + bucketName + ' with filename: ' + fileName);
        })
    })
}

/**
 * Anonymous function block to read files from directory as per regex
 */
fileSystemModule.readdir(".", function (err, files) {
    if (err) {
        console.log("Error in listing directory for files", err)
        process.exit(1)
    }

    var matchedFileName = files.filter(function (text) { return regex.test(text) })
    console.log("These are the files you have", matchedFileName)
    var numFiles = matchedFileName.length

    if (numFiles) {
        for (i = 0; i < numFiles; i++) {
            read(matchedFileName[i])
        }
    }
});
