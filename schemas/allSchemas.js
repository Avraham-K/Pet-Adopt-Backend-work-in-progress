const petSchema = {
    type: "object",
    properties: {
      type: {type: "string"},
      name: {type: "string"},
      adoptionStatus : {type: "string"},
      picture : {type: "string"},
      height : {type: "integer"},
      weight : {type: "integer"},
      color: {type: "string"},
      bio: {type: "string"},
      hypoallergenic : {type: "boolean"},
      dietaryRestrictions: {type: "string"},
      breed: {type: "string"},
    },
    additionalProperties: false
  }
  const signUpSchema = {
    type: "object",
    properties: {
      userName: {type: "string"},
      email: {type: "string"},
      password: {type: "string", minLength: 2},
      repassword: {type: "string", minLength: 2},
      firstLast: {type: "string", minLength: 2},
      phoneNumber: {type: "string", minLength: 2},
    },
    additionalProperties: false
  }


  module.exports = {petSchema, signUpSchema}