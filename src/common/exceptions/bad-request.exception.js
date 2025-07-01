import { HTTP_BAD_REQUEST } from "../../../constants.js";
import GeneralError from "./general-error.js";

class BadRequestException extends GeneralError {
  constructor(message) {
    super();
    this.message = message;
    this.status = HTTP_BAD_REQUEST;
  }
}

export default BadRequestException;
