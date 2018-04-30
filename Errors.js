const INPUT_ERROR = {
  errorMessage: 'Please provide title and contents for the post.',
};

const SAVE_ERROR = {
  error: 'There was an error while saving the post to the database',
};

const GET_ERROR = {
  error: 'The posts information could not be retrieved.',
};

const NOT_FOUND_ERROR = {
  message: 'The post with the specified ID does not exist.',
};

const DATABASE_RETRIEVAL_ERROR = {
  error: 'The post information could not be retrieved.',
};

const PUT_ERROR = {
  error: 'The post information could not be modified',
};

module.exports = {
  INPUT_ERROR,
  SAVE_ERROR,
  GET_ERROR,
  NOT_FOUND_ERROR,
  DATABASE_RETRIEVAL_ERROR,
  PUT_ERROR,
};
