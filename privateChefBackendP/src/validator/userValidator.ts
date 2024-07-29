import joi from "joi";

export const signupRequestSchema = joi
  .object({
    userName: joi.string().required().messages({
      "any.required": "Please provide userName",
      "string.base": "The type of username must be string",
    }),
    email: joi.string().email().required().messages({
      "any.required": "Please provide email for the user",
      "string.base": "The type of username must be string",
    }),
    password: joi.string().required().messages({
      "any.required": "Please provide password for the user account",
      "string.base": "The type of username must be string",
    }),
  })
  .options({
    stripUnknown: true,
  });

export const loginRequestSchema = joi
  .object({
    userName: joi.string().required().messages({
      "any.required": "Please provide userName",
      "string.base": "The type of username must be string",
    }),
    password: joi.string().required().messages({
      "any.required": "Please provide password for the user account",
      "string.base": "The type of username must be string",
    }),
  })
  .options({
    stripUnknown: true,
  });
