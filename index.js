const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routers/authRouter')
const branchRouter = require('./routers/branchRouter')

const fileUpload = require('express-fileupload');
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use("/auth", authRouter)
app.use("/branch",branchRouter)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://admin:admin@cluster0.udurg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

