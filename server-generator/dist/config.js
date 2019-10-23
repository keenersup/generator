"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IN_PROD = exports.NODE_ENV = void 0;
const {
  NODE_ENV
} = process.env;
exports.NODE_ENV = NODE_ENV;
const IN_PROD = NODE_ENV === 'production';
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

exports.IN_PROD = IN_PROD;
//# sourceMappingURL=config.js.map