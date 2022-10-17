const mongoose = require('./connection')
const MenuItems = require('./menuItems')

//first we need our connection saved to a variable for easy reference
const db = mongoose.connection


db.on('open', () => {
    const startMenu = [
        {name: 'Latte', price: 4.25, description: 'test', category: 'coffee'},
        {name: 'Cappuccino', price: 4.25, description: 'test', category: 'coffee'},
        {name: 'Cortado', price: 3.75, description: 'test', category: 'coffee'},
        {name: 'Flat White', price: 4, description: 'test', category: 'coffee'},
        {name: 'Americano', price: 3.25, description: 'test', category: 'coffee'},
        {name: 'Espresso', price: 3.25, description: 'test', category: 'coffee'},
        {name: 'Macchiato', price: 3.50, description: 'test', category: 'coffee'},
        {name: 'Turkish coffee', price: 4.25, description: 'test', category: 'coffee'},
        {name: 'Brew coffee', price: 3.50, description: 'test', category: 'coffee'},
        {name: 'Ristretto', price: 3.50, description: 'test', category: 'coffee'},
        {name: 'Affogato', price: 7.25, description: 'test', category: 'dessert'},
        {name: 'Donut IceCream', price: 8.50, description: 'test', category: 'dessert'},
        {name: 'Kunefe', price: 12.25, description: 'test', category: 'dessert'},
        {name: 'Souffle Cake', price: 10.99, description: 'test', category: 'dessert'},
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