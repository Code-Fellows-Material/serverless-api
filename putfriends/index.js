const dynamoose = require("dynamoose");

exports.handler = async (event) => {
  let id;
  if (event.queryStringParameters && event.queryStringParameters.id) {
    id = event.queryStringParameters.id;
    console.log(id);
  } else {
    return {
      statusCode: 500,
      body: "No ID",
    };
  }

  let putObj;
  if (event.body) {
    putObj = JSON.parse(event.body);
    console.log(event.body);
  } else {
    return {
      statusCode: 500,
      body: "No Event Body Passed to Function",
    };
  }

  let friendSchema = new dynamoose.Schema({
    id: String,
    name: String,
    phone: String,
  });

  //uses the string provided to talk to that table on dynamoDB
  let Friends = dynamoose.model("friends", friendSchema);

  //Check docs for these vvv
  let response;
  try {
    let friend = await Friends.update({ id }, putObj);
    console.log(friend);
    response = {
      statusCode: 200,
      body: JSON.stringify(friend),
    };
  } catch (error) {
    console.error(error.errorMessage);
    response = {
      statusCode: 500,
      body: error.errorMessage,
    };
  }

  return response;
};
