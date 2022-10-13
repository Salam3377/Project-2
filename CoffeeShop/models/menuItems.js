// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const menuItemsSchema = new Schema(
	{
		name: String,
        price: Number,
        description: String,
        category: {
            type: String,
            enum: ['coffee','food','dessert']
        },

		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		}
	},
	{ timestamps: true }
)

const MenuItems = model('Menu', menuItemsSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = MenuItems
