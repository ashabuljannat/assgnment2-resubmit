"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userJoiValidationSchema = void 0;
const zod_1 = require("zod");
const userFullNameSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
});
const addressSchema = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string(),
});
exports.userJoiValidationSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string(),
    fullName: userFullNameSchema,
    password: zod_1.z.string(),
    address: addressSchema,
    email: zod_1.z.string().email(),
    age: zod_1.z.number(),
    orders: zod_1.z.any(),
    hobbies: zod_1.z.any(),
    isActive: zod_1.z.boolean(),
});
exports.default = exports.userJoiValidationSchema;
