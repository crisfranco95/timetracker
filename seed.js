require('dotenv').config()

module.exports = {
	"undefined": process.env.DB,
	"dev": process.env.DB,
	"prod": process.env.DB
}