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
// POST /characters
router.post('/items/:charId', removeBlanks, (req, res, next) => {
    //Save Item From req.body
    const item = req.body.item
    //charId Reference
    const charId = req.params.charId

	Character.findById(charId)
		// Check for Character
        .then(handle404)
		.then((character) => {
            character.items.push(item)
			return character.save()
		})
        .then(res.status(201).json({ character: character}))
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
			// Make Item Singular
            const theItem = character.items.id(itemId)
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, character)
            //Update Existing Item
            theItem.set(req.body.toy)
			// pass the result of Mongoose's `.update` to the next `.then`
			return character.save
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// DELETE /items/:charId/:itemId
router.delete('/items/:charId/:itemId', requireToken, removeBlanks, (req, res, next) => {
	//Obtain IDs from req.params
    const { charId, itemId } = req.params

	Character.findById(charId)
		.then(handle404)
		.then((character) => {
			// Make Item Singular
            const theItem = character.items.id(itemId)
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, character)
            //Delete Existing Item
            theItem.set(req.body.item)
			// pass the result of Mongoose's `.update` to the next `.then`
			return character.save
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})


module.exports = router