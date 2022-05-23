const express = require('express')
const bread = require('../models/bread')
const breads = express.Router()
const Baker = require('../models/baker.js')


// INDEX
breads.get('/', (req, res) => {
  bread.find()
      .then(foundBreads => {
          res.render('index', {
              breads: foundBreads,
              title: 'Index Page'
          })
      })
})


// CREATE
breads.post('/', (req, res) => {
  if(!req.body.image) {
      req.body.image = undefined 
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  bread.create(req.body)
  res.redirect('/breads')
})


// NEW
breads.get('/new', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      res.render('new', {
        bakers: foundBakers
      })
    })
})


// SHOW
breads.get('/:id', (req, res) => {
  bread.findById(req.params.id)
      .populate('baker')
      .then(foundBread => {
          res.render('show', {
              breads: foundBread
          })
      })
      .catch(err => {
        res.send('404')
      })
})



// DELETE
breads.delete('/:indexArray', (req, res) => {
  bread.splice(req.params.indexArray, 1)
  res.status(303).redirect('/breads')
})


// // EDIT
// breads.get('/:indexArray/edit', (req, res) => {
//   res.render('edit', {
//     bread: bread[req.params.indexArray],
//     index: req.params.indexArray
//   })
// })

// EDIT
breads.get('/:id/edit', (req, res) => {
  Baker.find()
    .then(foundBakers => {
        Bread.findById(req.params.id)
          .then(foundBread => {
            res.render('edit', {
                bread: foundBread, 
                bakers: foundBakers 
            })
          })
    })
})



// UPDATE
breads.put('/:arrayIndex', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  bread[req.params.arrayIndex] = req.body
  res.redirect(`/breads/${req.params.arrayIndex}`)
})


module.exports = breads