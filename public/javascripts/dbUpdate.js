const express = require('express')
const app = express()
const mongoose = require('mongoose')
var db = mongoose.connection;
const Dewey = require('../../models/dewey.js')
const path = require('path')

// mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

    const dbUpdate = async function(arr) {
    // const deweys = Dewey.find({})
    // console.log(typeof deweys !== undefined)
    for (var i = 0; i < arr.length; i++) {
        const inGameWin = `${arr[i].inGameWin}`
        const inGameLoss = `${arr[i].inGameLoss}`

        var query = ({"name":arr[i].name})
        var data = ({ $inc:{"win":`${arr[i].inGameWin}`, "loss":`${arr[i].inGameLoss}`}} )
        
        await Dewey.findOneAndUpdate(query, data, async (err, dd) => {
            if (err) {
                throw(err)
        } 
        else {
            // dd = await Dewey.findOneAndUpdate(query, data, function(err, doc) {
            //     if (err) return console.log("error: "+err);
                return console.log(dd.name+" "+dd.win+" - "+dd.loss);
            }
            // dewey = await Dewey.find({_id: doneDew.id})
        })
            // await Dewey.findOneAndUpdate({_id:doneDew.id}, { $set: { $inc: {"win": inGameWin}, $inc: {"loss": inGameLoss}} }, (err, docs) => err ? err : "success")
            // .then(console.log(doneDew.name+" was updated."))
                    
        }
    }



module.exports = dbUpdate