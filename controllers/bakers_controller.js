// dependencies
const express = require('express')
const baker = express.Router()
const Baker = require('../models/baker.js')
const bakerSeedData = require('../models/baker_seed.js')

baker.get('/data/seed', (req, res) => {
  Baker.insertMany(bakerSeedData)
    .then(res.redirect('/breads'))
})


// delete
// baker.delete('/:id', (req, res) => {
//   Baker.findByIdAndDelete(req.params.id)
//     .then(deletedBaker => {
//       res.status(303).redirect('/breads')
//     })
// })

// export
module.exports = baker                    