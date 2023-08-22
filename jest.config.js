/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch:["**/**/*.test.ts"],
  verbose:true, // each indivisual test should be reported or not , if true it  will be reported
  forceExit:true,
  // clearmocks :true

};