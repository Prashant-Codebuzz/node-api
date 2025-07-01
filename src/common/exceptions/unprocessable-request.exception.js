import { HTTP_UNPROCESSABLE } from "../../../constants.js";
import GeneralError from "./general-error.js";

class UnprocessableException extends GeneralError {
  constructor(message) {
    super();
    this.message = message;
    this.status = HTTP_UNPROCESSABLE;
  }
}

export default UnprocessableException;
