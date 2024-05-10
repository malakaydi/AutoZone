
module.exports = app => {
    const router=require('express').Router();
   

    const agentController = require('../controllers/agents.controller');
    const upload = require('../middleware/uploadFile');
    const showroomController = require('../controllers/showroom.controller');
    const saleController = require('../controllers/sales.controller');

    const vehicleController = require('../controllers/vehicles.controller');
    const userController=require('../controllers/user.controller');

   

    
    


    router.post('/agent', upload.array('photos'), agentController.create);
    router.get('/agent', agentController.findAll);
    router.get('/agent/:id',agentController.findOne);
    router.delete('/agent/:id',agentController.delete);
    router.put('/agent/:id', upload.array('photos'), agentController.update);

    router.post('/showroom', showroomController.create);
    router.get('/showroom', showroomController.findAll);
    router.get('/showroom/:id', showroomController.findOne);
    router.delete('/showroom/:id', showroomController.delete);
    router.put('/showroom/:id', showroomController.update);

    

    router.post('/sale', saleController.create);
    router.get('/sale', saleController.findAll);
    router.get('/sale/:id', saleController.findOne);
    router.delete('/sale/:id', saleController.delete);
    router.put('/sale/:id', saleController.update);

    

    router.post('/vehicle', vehicleController.create);
    router.get('/vehicle', vehicleController.findAll);
    router.get('/vehicle/:id', vehicleController.findOne);
    router.delete('/vehicle/:id', vehicleController.delete);
    router.put('/vehicle/:id', vehicleController.update);

router.post('/register',userController.registerUser);
router.post('/login',userController.loginUser);


    app.use('/api/', router);
}
