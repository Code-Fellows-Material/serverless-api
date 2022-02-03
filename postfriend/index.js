
const dynamoose = require('dynamoose');
const { nanoid } = require("nanoid");

exports.handler = async (event) => {

  let postObj;
  if(event.body){
    postObj = JSON.parse(event.body)
    console.log(event.body)
  } else {
    return {
      statusCode: 500,
      body: "No Event Body Passed to Function",
  };
  }
  
  let friendSchema = new dynamoose.Schema({
    id: String,
    name: String,
    phone: String
  });

  //uses the string provided to talk to that table on dynamoDB
  let Friends = dynamoose.model('friends', friendSchema);

  const newFriend = {
    "id": nanoid(),
    name: postObj.name ? postObj.name : 'undefined',
    phone: postObj.phone ? postObj.phone : 'undefined'
  }

//Check docs for these vvv
  //exec must be called
  let response;

    try {
        const friend = await Friends.create(newFriend); // If a user with `id=1` already exists in the table, an error will be thrown.
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
