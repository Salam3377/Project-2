// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const userCartSchema = new Schema(
	{
		owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        items: {
            type: Schema.Types.ObjectId,
            ref: "menuItems",
            required: true
        },
        toStay: Boolean
	},
	{ timestamps: true }
)

const UserCartSchema = model('Cart', userCartSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = UserCartSchema
