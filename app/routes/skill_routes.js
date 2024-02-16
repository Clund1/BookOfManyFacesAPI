// IMPORT DEPENDENCIES
const express = require('express')
const passport = require('passport')

const Character = require('../models/character.js')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// ROUTES //

// CREATE
// POST /skills/:id
router.post('/skills/:charId', removeBlanks, (req, res, next) => {
    const skill = req.body.skill
    const charId = req.params.charId

	Character.findById(charId)
        .then(handle404)
		.then((character) => {
            character.skills.push(skill)
			return character.save()
		})
        .then(character => res.status(201).json({ character: Character}))
		.catch(next)
})

// UPDATE
// PATCH /skills/:charId/:skillId
router.patch('/skills/:charId/:skillId', requireToken, removeBlanks, (req, res, next) => {
    const { charId, skillId } = req.params

	Character.findById(charId)
		.then(handle404)
		.then((character) => {
            const theSkill = character.skills.id(skillId)
			requireOwnership(req, character)
            theSkill.set(req.body.skill)
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
    const { charId, skillId } = req.params

	Character.findById(charId)
		.then(handle404)
		.then((character) => {
            const theSkill = character.skills.id(skillId)
			requireOwnership(req, character)
            theSkill.deleteOne()

			return character.save
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})


module.exports = router