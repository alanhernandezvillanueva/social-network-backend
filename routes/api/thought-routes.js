const router = require('express').Router();
const { 
    createThought, 
    removeThought, 
    addReaction, 
    getThoughts, 
    getThoughtById, 
    updateThought, 
    deleteReaction } = require('../../controllers/thought-controller');



    //CRUD ROUTES GO HERE 
router.route('/:id').post(createThought);

router.route('/:id')
.get(getThoughtById)
.delete(removeThought)

router.route('/').get(getThoughts);

router.route('/:id').put(updateThought);

router.route('/:id/reactions').post(addReaction);

router.route('/:id/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
