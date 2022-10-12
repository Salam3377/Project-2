const mongoose = require('./connection')
const MenuItems = require('./menuItems')

//first we need our connection saved to a variable for easy reference
const db = mongoose.connection


db.on('open', () => {
    const startMenu = [
        {name: 'latte', price: 4.25, description: 'test', category: 'coffee'},
        {name: 'cappuccino', price: 4.25, description: 'test', category: 'coffee'},
        {name: 'cortado', price: 3.75, description: 'test', category: 'coffee'},
        {name: 'flat white', price: 4, description: 'test', category: 'coffee'},
        {name: 'americano', price: 3.25, description: 'test', category: 'coffee'},
        {name: 'espresso', price: 3.25, description: 'test', category: 'coffee'},
        {name: 'macchiato', price: 3.50, description: 'test', category: 'coffee'},
        {name: 'turkish coffee', price: 4.25, description: 'test', category: 'coffee'},
        {name: 'brew coffee', price: 3.50, description: 'test', category: 'coffee'},
        {name: 'ristretto', price: 3.50, description: 'test', category: 'coffee'},
    ]


    //delete all existing items
    MenuItems.deleteMany()
        .then(deletedItems => {
            console.log('this is delete many', deletedItems)
            MenuItems.create(startMenu)
                .then(data => {
                    console.log('this is new items', data)
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    db.close()
                })
        })
        .catch(error => {
            console.log(error)
            db.close()
        })
})