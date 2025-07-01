import dotenv from 'dotenv';
dotenv.config();

// module.exports = {
//   /**
//    * App port
//    */
//   serverPort: process.env.PORT || 2020,
  
//   /**
//    * App base url
//    * @param {string} path
//    */
//   baseUrl(path = null) {
//     const host = process.env.APP_URL_fOR_OTHER
//     const url = `${host}`
//     return url + (path ? `/${path}` : '')
//   },

//   /**
//    * Api base url
//    * @param {string} path
//    */
//   apiBaseUrl(path = null) {
//     const url = `${this.baseUrl()}/api/v1`
//     return url + (path ? `/${path}` : '')
//   },
// }

// module.exports.DEVICE_TOKEN = {
//   ANDROID: 'Android',
//   IOS: 'IOS',
// }



// module.exports.HTTP_INTERNAL_SERVER = 500
// module.exports.HTTP_UNPROCESSABLE = 422
// module.exports.HTTP_CONFLICT = 409
// module.exports.HTTP_NOT_FOUND = 404
// module.exports.HTTP_FORBIDDEN = 403
// module.exports.HTTP_UNAUTHORIZE = 401
// module.exports.HTTP_BAD_REQUEST = 400
// module.exports.SOCIAL_PROVIDERS = {
//   GOOGLE: 'google',
//   APPLE: 'apple',
// }

// module.exports.APP_KEY = process.env.APP_KEY

// module.exports.PRIVATE_KEY = process.env.PRIVATE_KEY


export const HTTP_INTERNAL_SERVER = 500;
export const HTTP_UNPROCESSABLE = 422;
export const HTTP_CONFLICT = 409;
export const HTTP_NOT_FOUND = 404;
export const HTTP_FORBIDDEN = 403;
export const HTTP_UNAUTHORIZE = 401;
export const HTTP_BAD_REQUEST = 400;

export const SOCIAL_PROVIDERS = {
  GOOGLE: 'google',
  APPLE: 'apple',
};

export const DEVICE_TOKEN = {
  ANDROID: 'Android',
  IOS: 'IOS',
};

export const APP_KEY = process.env.APP_KEY;
export const PRIVATE_KEY = process.env.PRIVATE_KEY;

export const serverPort = process.env.PORT || 2020;

export function baseUrl(path = null) {
  const host = process.env.APP_URL_fOR_OTHER;
  const url = `${host}`;
  return url + (path ? `/${path}` : '');
}

export function apiBaseUrl(path = null) {
  const url = `${baseUrl()}/api/v1`;
  return url + (path ? `/${path}` : '');
}
