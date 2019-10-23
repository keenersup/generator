export const {
  NODE_ENV,
  MONGO_ROOT_USER,
  MONGO_ROOT_PASSWORD,
  MONGO_PORT,
  MONGO_HOST,
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_DATABASE,

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
