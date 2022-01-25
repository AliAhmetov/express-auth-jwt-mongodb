const {Schema, model} = require('mongoose')
const {log} = require("nodemon/lib/utils");


const Branch = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        maxlength: 128,
        validate: {
            validator: v => v.length < 128,
            message: props => `${props.value} содержит символы`
        }
    },
    address: {type: String, unique: true, required: true},
    work_time: {type: String},
    reduced_img: {type: String},
    img: {type: String},
    inserter: {type: Schema.Types.ObjectId, ref: 'User'},
    is_blocked: {type: Boolean, default: false}
})

module.exports = model('Branch', Branch)
