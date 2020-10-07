let AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "ap-south-1" });

const randomdomTask = () => {
  const tasks = [
    "https://drive.google.com/file/d/1v5W_mLI79sPSJIJ_OstRaTAwknJyc8nj/view?usp=sharing",
    "https://drive.google.com/file/d/1r3t0NYiSAUadnZNNFJN1UR72s_4621R5/view?usp=sharing",
    "https://drive.google.com/file/d/1R16MiAo7sr0PEtVPTslibjRVJ7-FzO-2/view?usp=sharing",
    "https://drive.google.com/file/d/1hX92QTJ2xmNjOBIVsravmkQgMRURNevP/view?usp=sharing",
    "https://drive.google.com/file/d/1wBIuyrJCcccYIjeLonkUhroWVtsjkACM/view?usp=sharing",
  ];

  let index = Math.floor(Math.random() * 5);

  return tasks[index];
};

let sendEmails = email => {
  let emails = {
    ccAddress: "chayanchawra03@gmail.com",
    toAddress: email,
  };

  let sentEmails = [];

  if (sentEmails.includes(email)) {
    console.log("email exists");
  } else {
    sentEmails.push(email);
    let task = randomdomTask();

    // Create sendEmail params
    var params = {
      Destination: {
        /* required */
        CcAddresses: [
          emails.ccAddress,
          /* more items */
        ],
        ToAddresses: [
          emails.toAddress,
          /* more items */
        ],
      },
      Message: {
        /* required */
        Body: {
          /* required */
          Html: {
            Charset: "UTF-8",
            Data: `<a href=${task}>Click here</a> to know your task.`,
          },
          Text: {
            Charset: "UTF-8",
            Data: "",
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Test email",
        },
      },
      Source: "chayan@antstack.io" /* required */,
      ReplyToAddresses: [
        "chayan@antstack.io",
        /* more items */
      ],
    };

    // Create the promise and SES service object
    var sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
      .sendEmail(params)
      .promise();

    // Handle promise's fulfilled/rejected states
    sendPromise
      .then(function (data) {
        console.log(data.MessageId);
      })
      .catch(function (err) {
        console.error(err, err.stack);
      });
  }
};

module.exports = sendEmails;
