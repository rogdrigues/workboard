const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const userMasterSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        displayName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: mongoose.Schema.Types.ObjectId, ref: 'PermissionSet', required: true },
        profile: {
            fullName: { type: String, required: true },
            dateOfBirth: { type: Date },
            gender: { type: String, enum: ['Male', 'Female', 'Other'] },
            phoneNumber: { type: String },
            location: { type: String },
            avatar: { type: String },
        },
        status: { type: String, enum: ['Active', 'Inactive'], default: 'Inactive' },
        refreshToken: { type: String },
        lastLogin: { type: Date },
    },
    {
        timestamps: true,
    }
);

userMasterSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

const UserMaster =
    mongoose.models.UserMaster || mongoose.model('UserMaster', userMasterSchema);

module.exports = UserMaster;