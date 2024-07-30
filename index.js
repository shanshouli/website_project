const express = require("express") 
const app = express()
const fs = require("fs")
const dbpath = './db/user.json'

// endpoint
app.get("/",(req, res) => {
    let rawdata = fs.readFileSync(dbpath)
    let user_json = JSON.parse(rawdata)
    for (var user in user_json){
        console.log(user_json[user].name)
    if (user_json[user].name === "Sabir"){
        console.log(++user_json[user].age)
    }
    }
    let data = JSON.stringify(user_json)
    fs.writeFileSync(dbpath, data)

    res.send("welcome to the website!")
})

app.listen(8080, () => {
    console.log("website project server is now running")
})





// 1 -> 50 ms
// 2 -> after 1 completes 15ms
// 3 -> 10ms
// 4 -> 10ms

// class Express
// {
//     void Express()
//     {
//         // do whatever to init express framework 
//     }
// }

// Express app = new Express()
// Express app2 = new Express()  