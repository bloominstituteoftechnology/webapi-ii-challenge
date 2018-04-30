const INPUT_ERROR = {
  error: { message: 'Please provide title and contents for the post.' },
  code: 400,
};

const SAVE_ERROR = {
  error: { message: 'There was an error while saving the post to the database' },
  code: 500,
};

const GET_ERROR = {
  error: { message: 'The posts information could not be retrieved.' },
  code: 500,
};

const NOT_FOUND_ERROR = {
  error: { message: 'The post with the specified ID does not exist.' },
  code: 404,
};

const DATABASE_RETRIEVAL_ERROR = {
  error: { message: 'The post information could not be retrieved.' },
  code: 500,
};

const PUT_ERROR = {
  error: { message: 'The post information could not be modified' },
  code: 500,
};

const REMOVE_ERROR = {
  error: { message: 'The post could not be removed.' },
  code: 500,
};

export {
  INPUT_ERROR,
  SAVE_ERROR,
  GET_ERROR,
  NOT_FOUND_ERROR,
  DATABASE_RETRIEVAL_ERROR,
  PUT_ERROR,
  REMOVE_ERROR,
};
