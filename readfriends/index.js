
const dynamoose = require('dynamoose');

exports.handler = async (event) => {
  
  let id = event.queryStringParameters && event.queryStringParameters.name ? event.queryStringParameters.name : null;

  let friendSchema = new dynamoose.Schema({
    id: String,
    name: String,
    phone: String
  });

  //uses the string provided to talk to that table on dynamoDB
  let Friends = dynamoose.model('friends', friendSchema);

//Check docs for these vvv
  //exec must be called

  let friendRecord; 
  
  if(id){
    friendRecord = await Friends.query('id').eq(id).exec();
  }else{
    friendRecord = await Friends.scan().exec();
  }
  //search query by ID
  //Search All

  // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify(friendRecord),
    };
    return response;
};
