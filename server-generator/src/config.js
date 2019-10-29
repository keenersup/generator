export const {
  NODE_ENV,
  MONGO_HOST,
  MONGO_PORT,
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_DATABASE,

  SECRET_KEY,
  ACCESSTOKEN_EXPIRED,
  REFRESH_SECRET_KEY,
  REFRESHTOKEN_EXPIRED,

  CLIENT_ADDR,
  CLIENT_PORT
} = process.env

export const IN_PROD = NODE_ENV === 'production'

/*
const {
  NODE_ENV
} = process.env

const IN_PROD = NODE_ENV === 'production'

module.exports = {
  NODE_ENV,
  IN_PROD,
}
*/
