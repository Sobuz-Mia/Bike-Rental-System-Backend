import { TErrorSources, TGenericErrorResponse } from "../interface/error";

/* eslint-disable @typescript-eslint/no-explicit-any */
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  // Regular expression to match the value within the quotes after 'name:'
  const match = err.message.match(/name: "([^"]+)"/);

  // Extract the value if the match is found
  const extractedValue = match ? match[1] : null;

  const errorMessages: TErrorSources = [
    {
      path: "",
      message: `${extractedValue} is already exist`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Duplicate key",
    errorMessages,
  };
};
export default handleDuplicateError;
