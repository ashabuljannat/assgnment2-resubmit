"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const userFullNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required']
    },
    lastName: {
        type: String,
        trim: true,
    },
});
const addressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        required: [true, 'City street Name is required'],
    },
    city: {
        type: String,
        required: [true, 'Country city Name is required'],
    },
    country: {
        type: String,
        required: [true, 'Country Name is required'],
    },
});
const orderSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        required: [true, 'Product Name is required'],
    },
    price: {
        type: Number,
        required: [true, 'CProduct price is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
    },
});
const userSchema = new mongoose_1.Schema({
    userId: { type: Number, required: [true, 'ID is required'], unique: true },
    username: {
        type: String,
        unique: true,
        required: [true, 'UserName is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false,
    },
    fullName: {
        type: userFullNameSchema,
        required: [true, 'Full Name is required'],
    },
    address: {
        type: addressSchema,
        required: [true, 'Address is required'],
    },
    orders: {
        type: [orderSchema],
    },
    hobbies: {
        type: [String],
        required: [true, 'Hobby is required'],
    },
    age: { type: Number, required: [true, 'age is required'] },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    isActive: {
        type: String,
        enum: {
            values: ['active', 'inactive'],
            message: '{VALUE} is not a valid status',
        },
        default: 'active',
    },
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
//creating a custom static method
userSchema.statics.isUserExistsById = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.Users.findOne({ userId: id });
        return existingUser;
    });
};
userSchema.statics.isUserExistsByUsername = function (name) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.Users.findOne({ username: name });
        return existingUser;
    });
};
userSchema.statics.isUserNotExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const notExistingUser = yield exports.Users.findOne({ userId: id });
        return notExistingUser;
    });
};
exports.Users = (0, mongoose_1.model)('user', userSchema);
