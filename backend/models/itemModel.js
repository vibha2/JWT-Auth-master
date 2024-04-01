const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
        itemName: {
            type: String,
            required: true,
            trim: true
        },
        itemPrice: {
            type: Number,
            required: true
        },
        itemType: {
            type: String,
            enum: ['bottle', 'tee', 'cap', 'diary', 'pen', 'speaker'],
            required: true
        },
        imageFile: {
            type: String,
            required: true,
        },
        itemMode: {
            type: String,
            enum: ['Online-Mode', 'Offline-Mode'],
            required: true,
        }

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Item', itemSchema);