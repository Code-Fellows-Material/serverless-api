
const dynamoose = require('dynamoose');

exports.handler = async (event) => {

  let id;
  if(event.queryStringParameters && event.queryStringParameters.id){
    id = event.queryStringParameters.id;
    console.log(id)
  } else {
    return {
      statusCode: 500,
      body: "No ID",
    };
  }
  
  let friendSchema = new dynamoose.Schema({
    id: String,
    name: String,
    phone: String
  });

  //uses the string provided to talk to that table on dynamoDB
  let Friends = dynamoose.model('friends', friendSchema);

  //Check docs for these vvv
    //exec must be called
  let response;
    try {      
        await Friends.delete({id});
        response = {
          statusCode: 200,
          body: "{}",
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
