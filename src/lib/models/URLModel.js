import mongoose from "mongoose";

const Schema = mongoose.Schema;

const URLSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    fullUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    enabled: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.models.URL || mongoose.model('URL', URLSchema);

export const runtime = 'edge'