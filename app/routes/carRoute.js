const express = require('express');
const multer = require('multer'); 
const { getCar, getCarById, createCar, uploadImageCar, updateCar, deleteCar } =  require('../controller/carController')

const router = express.Router();
const uploadImage = multer({ dest: 'public/images/' });

router.get('/car', getCar);
router.get('/car/:id', getCarById);
router.post('/car', createCar);
router.post('/car/image', uploadImage.single('image'), uploadImageCar)
router.put('/car/:id', updateCar);
router.delete('/car/:id', deleteCar);

module.exports = router