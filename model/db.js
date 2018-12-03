const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const path = require('path')
const config = require('../config')

const adapter = new fileSync(path.join(__dirname, config.db.file))
const db = low(adapter)

module.exports = db
