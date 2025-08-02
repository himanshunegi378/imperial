import { z } from "zod";
import { ErrorDefinition } from "../../../@types/error.types";

export const AuthErrorDefinitions = {
  INVALID_CREDENTIALS: {
    code: "INVALID_CREDENTIALS",
    message: "Invalid email or password",
    httpStatus: 401,
    detailsSchema: z.object({}),
  } as ErrorDefinition,
  
  USER_ALREADY_EXISTS: {
    code: "USER_ALREADY_EXISTS",
    message: "User with this email already exists",
    httpStatus: 409,
    detailsSchema: z.object({}),
  } as ErrorDefinition,
  
  INVALID_PAYLOAD: {
    code: "INVALID_PAYLOAD",
    message: "Invalid request payload",
    httpStatus: 400,
    detailsSchema: z.object({
      fieldErrors: z.record(z.string(), z.array(z.string())).optional(),
    }),
  } as ErrorDefinition,

  UNAUTHORIZED: {
    code: "UNAUTHORIZED",
    message: "Authentication required",
    httpStatus: 401,
    detailsSchema: z.object({}),
  } as ErrorDefinition,

  INVALID_TOKEN: {
    code: "INVALID_TOKEN",
    message: "Invalid or expired token",
    httpStatus: 401,
    detailsSchema: z.object({}),
  } as ErrorDefinition,
  
  INVALID_REFRESH_TOKEN: {
    code: "INVALID_REFRESH_TOKEN",
    message: "Invalid or expired refresh token",
    httpStatus: 401,
    detailsSchema: z.object({}),
  } as ErrorDefinition,
  
  REFRESH_TOKEN_REQUIRED: {
    code: "REFRESH_TOKEN_REQUIRED",
    message: "Refresh token is required",
    httpStatus: 401,
    detailsSchema: z.object({}),
  } as ErrorDefinition,
};
