import _ from 'lodash';

const formatGraphQLErrors = (error) => {
  const errorDetails = _.get(error, 'originalError.response.body');

  try {
    if (errorDetails) return JSON.parse(errorDetails);
  } catch (error) {
    console.log(error);
  }

  return error;
};

export default formatGraphQLErrors;