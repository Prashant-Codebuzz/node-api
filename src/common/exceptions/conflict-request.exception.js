import { HTTP_CONFLICT } from "../../../constants.js";
import GeneralError from "./general-error.js";

class ConflictException extends GeneralError {
  constructor(message) {
    super();
    this.message = message;
    this.status = HTTP_CONFLICT;
  }
}

export default ConflictException;
