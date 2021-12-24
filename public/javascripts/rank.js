const {Router} = require('express')
const router = Router
const Dewey = require('../../models/dewey')
const Rank = require('../../models/rank')
const mongoose = require('mongoose')
const toId = mongoose.Types.ObjectId

router.get('/relate/:dewey/:rank', async (req, res) => {

    req.params.dewey = toId(req.params.dewey)
    const rank = await Rank.findById(req.params.rank)
    rank.dewey = req.params.dewey
    rank.save
})

router.get('/seed', async (req, res) => {
    
    ranks = [
        { rankName: "Dina", win: 0, loss: 0 },
        { rankName: "Rachel", win: 0, loss: 0 },
        { rankName: "grace", win: 0, loss: 0 },
        { rankName: "jasmin", win: 0, loss: 0 },
        { rankName: "Genevieve", win: 0, loss: 0 },
        { rankName: "Lucy", win: 0, loss: 0 },
        { rankName: "beni", win: 0, loss: 0 },
        { rankName: "Bianca", win: 0, loss: 0 },
        { rankName: "dani", win: 0, loss: 0 },
        { rankName: "Grace", win: 0, loss: 0 },
        { rankName: "Danielle", win: 0, loss: 0 },
        { rankName: "lilly", win: 0, loss: 0 },
        { name: "maria", win: 0, loss: 0 },
        { name: "karin", win: 0, loss: 0 },
        { name: "Vicky", win: 0, loss: 0 },
        { name: "nila", win: 0, loss: 0 },
    ]

    const newRanks = await Ranks.create(ranks)
    res.json(newRanks)
})