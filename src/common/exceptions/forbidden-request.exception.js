import { HTTP_FORBIDDEN } from "../../../constants.js";
import GeneralError from "./general-error.js";

class ForbiddenException extends GeneralError {
  constructor(message) {
    super();
    this.message = message;
    this.status = HTTP_FORBIDDEN;
  }
}

export default ForbiddenException;
