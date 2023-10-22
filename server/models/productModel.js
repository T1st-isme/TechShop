const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên sản phẩm không được để trống'],
        trim: true,
        maxLength: [100, 'Tên sản phẩm không được vượt quá 100 ký tự']
    },
    price: {
        type: Number,
        required: [true, 'Giá không được để trống'],
        maxLength: [10, 'Giá không được vượt quá 10 ký tự'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Mô tả không được để trống'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],

})

module.exports = mongoose.model('Product', productSchema);