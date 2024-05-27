const mongoose = require('mongoose');
const User = require('./user')

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost/testdb");
    console.log("Connected to the database");
  } catch (error) {
    console.log("Error connecting to the database", error);
  }
}

connectToDatabase();

run()
// async function run(){
//     const user = await User.create({name: "Lalith", age: 21}) //It will save the data in the database
//     // *** The beloiw 2 will also do the same which the above lone is doing *** //
//     // const user = new User({name: "Lalith", age: 21})
//     // await user.save()
//     user.name = "Sully"//this and the below line is used to update the data in the database
//     await user.save()
//     console.log(user)
// }

// // *** This 2 below lines will also save the user data in the database *** //
// // const user = new User({name: "Lalith", age: 21})
// // user.save().then(()=> console.log(user))

// async function run(){
//     // *** Instead of updateMany or updateOne, findById is recommanded because update will not go through the validation which may create problem *** //
//     try {
//         const user = await User.create({
//             name: "Lalith",
//             age: 21, // as age is a number, if we keep string in that age place then we will get an error and this try & catch will show if there is any error
//             hobbies: ["Weight Lifting", "Bowling"],
//             email: "TEST@test.com",// *** You may enter the data in any order. As email is above hobbies when we defined the but mongoose will accepts *** //
//             address: {
//                 street: "Main st"
//             }
//         })
//         console.log(user)
//     } catch(e){
//         console.log(e.message)
//     }
// }

// async function run(){
//     try{
//         // const user = await User.findById("665474eef48f2d91656d356d") // *** for getting unique user by using ID *** //
//         // const user = await User.find({name:"Lalith"}) // *** getting all the users with name Lalith *** and *** we will get an empty array if that name is not present *** //
//         // const user = await User.findOne({name:"Lalith"}) // *** Gives the very first one and this names are case sensitive *** //
//         // const user = await User.exists({name:"Lalith"}) // *** Returns true if atleast 1 document present *** //
//         // In this waay there are many function available and you can see them when you press "User." in some line and you can use those functions according to your needs *** //
//         // Instead of this kind of approch you can go with queries kind of approch also shown below //
//         // const user = await User.where("name").equals("Lalith") // similar to find()
//         // const user = await User.where("age").gt("12") // Gives the documents which have age greater than 12 //
//         // const user = await User.where("age").gt(12).where("name").equals("Lalith") // and condition btw age and name
//         // const user = await User.where("age").gt(12).where("name").equals("Lalith").limit(2) // Gives only first 2 users information
//         // const user = await User.where("age").gt(12).where("name").equals("Lalith").limit(1).select("age") // Only gives age info of first 2 users
//         // user[0].bestFriend = "66546796a08e7eceef223180"
//         // await user[0].save() // Updating the bestFriend section with a ID which exist in the database, if that id is not present it will through an error
//         const user = await User.where("age").gt(12).where("name").equals("Lalith").populate("bestFriend").limit(1) // Where it will shows all the data of the bestFriend also in a nested format
//         console.log(user)
//     } catch(e){
//         console.log(e.message)
//     }
// }

async function run(){
    try {
        // const user = await User.findOne({name: "Lalith"})
        // const user = await User.findByName("Lalith") // Using the functions by creating them by our own // Use of statics function
        // const user = await User.find().byName("Lalith") // Use of query function
        const user = await User.findOne({name:"Lalith", email:"test@test.com"}) // Use of Virtual function
        console.log(user)
        await user.save()
        // console.log(user.namedEmail) // consoling the virtual function
        console.log(user)
        // user.sayHi() // Use of method function
    } catch(e) {
        console.log(e.message)
    }
}