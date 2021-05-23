
//IMPORTACIONES
const { Router} = require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');

const router = Router();


// llamando a los metodos del CRUD almacenados en los controllers
router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);




//EXPORTACIONES
module.exports = router;