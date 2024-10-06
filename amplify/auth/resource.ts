import { defineAuth } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    email: {
      required: true,
      mutable: false,
    },
    givenName: {
      required: false,
      mutable: true,
    },
    familyName: {
      required: false,
      mutable: true,
    },
    phoneNumber: {
      required: false,
      mutable: true,
    },
    gender: {
      required: false,
      mutable: true,
    },
    "custom:age": {
      dataType: "Number",
      mutable: true,
    },
    "custom:country": {
      dataType: "String",
      mutable: true,
    },
    "custom:receiveMessages": {
      dataType: "Boolean",
      mutable: true,
    },
    "custom:role": {
      dataType: "String",
      mutable: false,
      minLen: 1,
      maxLen: 255,
    },
    "custom:createdAt": {
      dataType: "String",
      mutable: false,
      minLen: 1,
      maxLen: 255,
    },
  },
});
