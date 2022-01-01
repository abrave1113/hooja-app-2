const mongoose = require('mongoose')
const path = require('path')

const deweySchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
	age: {
		type: Number
	},
	hobby: {
		type: String
	},
	city: {
		type: String,
		required: true
	},
	state: {
		type: String
	},
    pictureImage: {
		type: Buffer, 
		required: true
	},
	pictureImageType: {
		type: String,
		required: true
	},
	win: {
		type: Number,
		required: true
	},
	loss: {
		type: Number,
		required: true
	},		
	winRate: {
		type: Number
	},
	rank: {
		type: Number
	}
})
deweySchema.virtual('pictureImagePath').get(function () {
	if (this.pictureImage != null && this.pictureImageType != null) {
		return `data:${this.pictureImageType};charset=utf-8;base64,${this.pictureImage.toString('base64')}`
	}
});

const model = mongoose.model('Dewey', deweySchema); 

module.exports = model