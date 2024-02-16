// IMPORT DEPENDENCIES
const express = require('express')
const passport = require('passport')

// Model for Characters
const Character = require('../models/character.js')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// ROUTES //

// CREATE
// POST /items/:charId
router.post('/items/:charId', removeBlanks, (req, res, next) => {
    //Save Item From req.body
    const item = req.body.item
    //charId Reference
    const charId = req.params.charId

	Character.findById(charId)
        .then(handle404)
		.then((character) => {
            character.items.push(item)
			return character.save()
		})
        .then(res.status(201).json({ character: Character}))
		.catch(next)
})

// UPDATE
// PATCH /items/:charId/:itemId
router.patch('/items/:charId/:itemId', requireToken, removeBlanks, (req, res, next) => {
	//Obtain IDs from req.params
    const { charId, itemId } = req.params

	Character.findById(charId)
		.then(handle404)
		.then((character) => {
            const theItem = character.items.id(itemId)
			requireOwnership(req, character)
            theItem.set(req.body.item)
			return character.save
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DESTROY
// DELETE /items/:charId/:itemId
router.delete('/items/:charId/:itemId', requireToken, removeBlanks, (req, res, next) => {
    const { charId, itemId } = req.params
	Character.findById(charId)
		.then(handle404)
		.then((character) => {
            const theItem = character.items.id(itemId)
			requireOwnership(req, character)
            theItem.deleteOne()

			return character.save
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})


module.exports = router