// import dependencies
const mongoose = require('./connection')

// import user model for populate
const MenuItems = require('./menuItems')
const User = require('./user')
//const menuItemsSchema = require('./menuItems')
// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose
const ObjectID = Schema.Types.ObjectId
const userCartSchema = new Schema(
	{
		owner: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        toStay: Boolean,
        items: [
            {
                itemId: {
                 type: ObjectID,
                 ref: 'MenuItems',
                 required: true
              },
                name: String,
                price: Number
               }
        ],
	},
	{ timestamps: true }
)

const UserCartSchema = model('Cart', userCartSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = UserCartSchema


