const { error } = require("console")
const express = require("express") 
const app = express()
const fs = require("fs")
const dbpath = './db/user.json'
const PORT = 3000

app.use(express.json())

// endpoint
app.get("/",(req, res) => {

    res.send("welcome to the website!")
})

app.get("/addSabir", (req, res) => {
    fs.readFile(dbpath, 'utf-8', (err, data) => {
        if (err){
            console.error(err)
            return res.status(500).json({error: "Fail to read user data."})
        }

        try{
            let user_json = JSON.parse(data)

            for (let user in user_json){
                console.log(user_json[user].name)
            if (user_json[user].name === "Sabir"){
                console.log(++user_json[user].age)
                break
            }}

            // write the updated data into the file
            const updatedData = JSON.stringify(user_json)
            fs.writeFile(dbpath, updatedData, 'utf-8', (writeErr) => {
                if (writeErr){
                    console.error(writeErr)
                    return res.status(500).json({error: "Fail to update user data."})
                }
                res.send("We add Sabir's age by 1.")
            })

        }catch(parseError){
            console.error(parseError)
            res.status(500).json({error: "Invalid data format."})
        }
    })
})



app.get("/getAllUsers", (req, res) => {
    fs.readFile(dbpath, "utf-8", (err, data) => {
        if (err){
            console.error(err)
            return res.status(500).json({err: "Fail to read data."})
        }

        try{
            let user_json = JSON.parse(data)

            let user_name = []
            for (let user in user_json){
                user_name.push(user_json[user].name)
            }
            res.send(user_name)
        }
        catch (parseError){
            console.error(parseError)
            res.status(500).json({error: "Invalid data format."})
        }
    })
})


app.post("/getUserDetails", (req, res) => {
    const requestedName = req.body.name

    fs.readFile(dbpath, 'utf-8', (err, data) => {
        if (err){
            console.error(err)
            return res.status(500).json({error: 'Fail to read data.'})
        }

        try {
            let user_json = JSON.parse(data)
            const user = user_json.find(u => u.name === requestedName)
            if (user){
                res.json({age: user.age, height: user.height})
            }
            else {
                res.status(404).json({error: "User not found."})
            }
    
        } catch (parseError){
            console.error(parseError)
            res.status(500).json({error: 'Invalid data format.'})
        }
    })
})

app.listen(PORT, () => {
    console.log(`website project server is now running on ${PORT}`)
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