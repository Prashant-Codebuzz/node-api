import { HTTP_NOT_FOUND } from "../../../constants.js";
import GeneralError from "./general-error.js";

class NotFoundException extends GeneralError {
  constructor(message) {
    super();
    this.message = message;
    this.status = HTTP_NOT_FOUND;
  }
}

export default NotFoundException;
