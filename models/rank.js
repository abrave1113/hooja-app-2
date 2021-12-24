const mongoose = require('mongoose')
const path = require('path')

const rankSchema = new mongoose.Schema({
    win: {
        type: Number,
        required: true
    },
    loss: {
        type: Number,
        required: true
    },
    rankName: {
		type: String, 
		required: true,
	},
    dewey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dewey'
    }
})
rankSchema.virtual('winRate').get(function () {
    if (this.win == null || this.win + this.loss == 0) {
        return 0
    }
        return (this.win / (this.win + this.loss))
})

// rankSchema.set('toJSON', { getters: true, virtuals: true });


const Rank = mongoose.model('Rank', rankSchema);

// module.exports = Rank;