const generatePropertyChecker = property => obj => typeof obj[property] !== 'undefined';
const checkForTitle = body => generatePropertyChecker('title')(body);
const checkForContents = body => generatePropertyChecker('contents')(body);

const validateBody = body => checkForContents(body) && checkForTitle(body);
const respondWithError = (response, error) => response.status(error.code).json(error.error);

export {
  validateBody,
  respondWithError,
};
