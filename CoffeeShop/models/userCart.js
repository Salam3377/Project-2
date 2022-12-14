// import dependencies
const mongoose = require('./connection')

// import user model for populate
const MenuItems = require('./menuItems')
const User = require('./user')
//const menuItemsSchema = require('./menuItems')
// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const userCartSchema = new Schema(
	{
		owner: {
            type: Schema.Types.ObjectId, 
            ref: 'User'
        },
        toStay: Boolean,
        items: [
            { 
                type: Schema.Types.ObjectId,
                ref: 'MenuItem',
               }
        ]
	},
	{ timestamps: true }
)

const UserCartSchema = model('Cart', userCartSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = UserCartSchema


