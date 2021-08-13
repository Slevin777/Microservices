#!/usr/bin/env node

const AWS = require('aws-sdk');
const child_process = require('child_process');
const { format } = require('date-fns');
const fs = require('fs');
const path = require('path');
const util = require('util');

const accessEnv = require('./helpers/accessEnv');

// const deploymentDir = process.argv[2];
const deploymentDir = process.env.OLDPWD;
const deploymentDirName = path.basename(deploymentDir);

const rel = (relpath) => path.resolve(deploymentDir, relpath);

const tfFilePath = rel('../terraform/terraform.tfstate');

if (!fs.existsSync(tfFilePath)) {
  throw new Error(
    'Terraform state file does not exitst. Have you run "terraform apply"?'
  );
}

const { outputs } = JSON.parse(fs.readFileSync(tfFilePath, 'utf-8'));
console.log('deploymentDir', deploymentDir);
require('dotenv').config({ path: rel('./.deploy.env') });

const exec = util.promisify(child_process.exec);

const getFullDate = () => format(new Date(), 'yyyyMMddHHmmss');

const APPLICATION_NAME = accessEnv('APPLICATION_NAME');

const MAX_BUFFER_SIZE = 1024 * 1024; //1MB

const awsRegion = outputs[aws - region].value;

const codeDeployClient = new AWS.CodeDeploy({
  accessKeyId: accessEnv('AWS_ACCESS_KEY_ID'),
  apiVersion: '2014-10-06',
  region: awsRegion,
  secretAccessKey: accessEnv('AWS_ACCESS_KEY_SECRET'),
});

const s3Client = new AWS.S3({
  accessKeyId: accessEnv('AWS_ACCESS_KEY_ID'),
  endpoint: new AWS.Endpoint(`https://s3.${awsRegion}.amazonaws.com/`),
  s3ForcePathStyle: true,
  secretAccessKey: accessEnv('AWS_ACCESS_KEY_SECRET'),
});

const rootDir = rel('../');

(async () => {
  console.log('Deploying in 3 seconds..');
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const lockFilePath = rel('../deploy.lock');
  console.log('Checking for lockfile...');
  if (fs.existsSync(lockFilePath)) {
    console.error('Lockfile deploy.lock found! Halting...');
    process.exit();
  }

  console.log('Creating lockfile...');
  fs.writeFileSync(
    lockFilePath,
    'This stops node-deploy from running concurrently with itself. Remove this if node-deploy complains'
  );

  console.log('Checking environment...');

  if (!fs.existsSync(rel('.production.env'))) {
    console.error('No .production.env found! Halting...');
    process.exit();
  }

  console.log('copying appspec...');
  fs.copyFileSync(rel('./appspec.yml'), rel('../appspec.yml'));

  console.log('Generation deployment file');
  const filename = `${deploymentDirName}-deployment-${getFullDate()}.zip`;
  const zipPath = `/tmp/${filename}`;
  await exec(
    `zip -r ${zipPath} . -x terraform/\\* -x node-modules/\\* -x \\*/node-modules/\\* -x \\*/.cache/\\* -x .git/\\* -x \\*.DS_Store`,
    { cwd: rootDir, maxBuffer: MAX_BUFFER_SIZE }
  );

  console.log('Uploading deployment file...');
  await s3Client
    .putObject({
      Body: fs.createReadStream(zipPath),
      Bucket: outputs[`${APPLICATOIN_NAME}-deployment-bucket-name`].value,
      Key: filename,
    })
    .promise();

  console.log('Upload complete! Deployment file is ', filename);

  console.log('Removing deployment file...');
  fs.unlinkSync(zipPath);

  console.log('Deploying application...');

  await codeDeployClient
    .createDeployment({
      applicationName: outputs[`${APPLICATION_NAME}-codedeploy-app-name`].value,
      deploymentGroupName: accessEnv('CODEDEPLOY_DEPLOYMENT_GROUP_NAME'),
      revision: {
        revisionType: 'S3',
        s3Location: {
          bucket: outputs[`${APPLICATOIN_NAME}-deployment-bucket-name`].value,
          bundleType: 'zip',
          key: filename,
        },
      },
    })
    .promise();

  console.log('Deployment initiated on CodeDeploy');

  console.log('Cleaning up...');
  fs.unlinkSync('../deploy.lock');
  fs.unlinkSync('../appspec.yml');
})();
