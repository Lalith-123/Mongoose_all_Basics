const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    street: String,
    city: String
})

const userSchema = new mongoose.Schema({
    name: String,
    age: { // Throughs error if we cross the min and max limit
        type: Number,
        min: 1,
        max: 100,
        validate: { // *** Checks if the below condition is valid or not and this is the structure to use validation thing *** //
            validator: v => v%2 === 1,
            message: props => '${prop, Value} is not a odd number'
        }
    },
    // email: String, // *** This is a simple representation, but we are gone use a object for more better options to be available for us and it is as shown below *** //
    email: { // Throughs error if we cross the min and max length limit
        type: String,
        minLength: 10,
        maxLength: 50,
        required: true, // *** while entering the data if there is email then it throughs an error. It is similar to null and not null in SQL *** //
        lowercase: true, // *** this will make all the upper case letters to lower case in that string *** //
    },
    createAt: {
        type: Date,
        immutable: true,// *** Even though if you try to change the date it won't change if we keep this else it will change if you try to change it *** //
        default: ()=> Date.now() // You again need not to entry date. It will take current date as default
    }, // (Q) what is the difference between "new Date()" and "()=> Date.now()"
    updateAt: {
        type: Date,
        default: ()=> Date.now() // You again need not to entry date. It will take current date as default
    },
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    }, //Means represent that this data type indicates another user
    hobbies: [String], //Represnts an array of strings
    // address: {
    //     street: String,
    //     city: String
    // } // It is a nested datatype
    // *** this kind of nested datatype can also be represend as saparete schema and use it as shown below *** //
    address: addressSchema // Now as address is also a sapare schema, so address will also have an ID. There wasn't an ID in the before case
})

userSchema.methods.sayHi = function () { // methods are nothing but console.log kind of things // In mongoose arrow function is not allowed because we are going to use this. for actual individual instance we are working with
    console.log(`Hi. My name is ${this.name}`)
}

userSchema.statics.findByName = function (name) { // statics ar enothing by find, etc things
    return this.find({name: new RegExp(name, "i")}) // (Q) Try to find out what each of them actually mean?
}

userSchema.query.byName = function (name) { // query are nothing but where related things
    return this.where({name: new RegExp(name, "i")})
}

userSchema.virtual('namedEmail').get(function() { // this virtual will not save in our database and we can use this all over our code
    return `${this.name} <${this.email}>`
})

// From here middle things comes // (Q) There many new thing like next, doc, etc are there try to find out what they are?
userSchema.pre('save', function(next) { // It means whenever we use save() function then the updateAt will change to current date and time
    this.updateAt = Date.now()
    next() // If this next is not there we will not go out of this function. So don't forget to add next
})

userSchema.post('save', function(doc, next) { // It means whenever we use save() function then the updateAt will change to current date and time
    doc.sayHi()
    next() // If this next is not there we will not go out of this function. So don't forget to add next
})


module.exports = mongoose.model("User", userSchema)