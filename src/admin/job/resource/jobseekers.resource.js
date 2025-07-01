import { castToStorage } from "../../../common/helper.js";

import dotenv from 'dotenv';
dotenv.config();

export default class JobseekersResource {
  constructor(data) {
    this.id = data.id;
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.email = data.email
    this.phone = data.phone
    this.time = data.time
    this.gender = data.gender
    this.resume = data.resume
    ? castToStorage(data.resume)
    : data.resume;
    this.coverLatter = data.coverLatter
    this.jobId = data.jobId
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt
  }
}