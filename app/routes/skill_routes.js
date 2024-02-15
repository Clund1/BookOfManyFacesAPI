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
router.post('/skills/:charId', removeBlanks, (req, res, next) => {
    //Save Skill From req.body
    const skill = req.body.skill
    //charId Reference
    const charId = req.params.charId

	Character.findById(charId)
		// Check for Character
        .then(handle404)
		.then((character) => {
            character.skills.push(skill)
			return character.save()
		})
        .then(res.status(201).json({ character: character}))
		.catch(next)
})

// UPDATE
// PATCH /skills/:charId/:skillId
router.patch('/skills/:charId/:skillId', requireToken, removeBlanks, (req, res, next) => {
	//Obtain IDs from req.params
    const { charId, skillId } = req.params

	Character.findById(charId)
		.then(handle404)
		.then((character) => {
			// Make Skill Singular
            const theSkill = character.skills.id(skillId)
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, character)
            //Update Existing Skill
            theSkill.set(req.body.toy)
			// pass the result of Mongoose's `.update` to the next `.then`
			return character.save
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// DELETE /skills/:charId/:skillId
router.delete('/skills/:charId/:skillId', requireToken, removeBlanks, (req, res, next) => {
	//Obtain IDs from req.params
    const { charId, skillId } = req.params

	Character.findById(charId)
		.then(handle404)
		.then((character) => {
			// Make Skill Singular
            const theSkill = character.skills.id(skillId)
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, character)
            //Delete Existing Skill
            theSkill.set(req.body.skill)
			// pass the result of Mongoose's `.update` to the next `.then`
			return character.save
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})


module.exports = router