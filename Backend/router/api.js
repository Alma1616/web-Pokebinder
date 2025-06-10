const express = require('express');
const router = express.Router();
const loginController = require('../MC/controlador/loginController.js');
const signupController = require('../MC/controlador/signupController.js');
const predefinedModel = require('../MC/modelo/predefinedModel.js');
const cardInfoModel = require('../MC/modelo/cardInfoModel.js');
const ownCollectionModel = require('../MC/modelo/ownCollectionModel.js')
const searchModel = require('../MC/modelo/searchModel.js')
const noticeModel = require('../MC/modelo/noticesModel.js')
const userController = require('../MC/controlador/accountSettingsController.js');
const { getCollectionById } = require('../MC/modelo/searchExistCollModel.js');


router.post('/login',loginController.login );
router.post('/signup', signupController.signup);

router.get('/perfil', (req, res) => {
  if (!req.session.comprovacion) {
    return res.status(401).json({ error: 'Not Authhorized' });
  }
  res.json({ usuario: req.session.usuario }); 
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Error closing session' });
    }
    res.clearCookie('connect.sid'); 
    res.json({ mensaje: 'Logout correct!!' });
  });
});

router.get('/predefined/:type', async (req, res) => {
  const { type } = req.params;
  try {
    const queryParam = type.toLowerCase().includes('type')
    ? type 
    : `${type.toLowerCase()} Type`; 
    const cards = await predefinedModel.getCardsByType(queryParam);
       res.json({
        name: type,
        cards: cards.map(card => ({
        card_id: card.card_id,
        name: card.name,
        imageUrl: card.image_url 
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching cards by type' });
  }
});

//Aquí llegarán todas las colecciones predeterminadas de la web
router.get('/predefined', async(req,res)=> {
  try{
    const result = await predefinedModel.getTypes(); 
    res.json(result.recordset); //Recordset hace que las consultas devuelvan únicamente los datos deseados --> quitar metadatos y datos basura
  }catch(err){
    console.error('Error en /predefined:', err);
    res.status(500).json({ error: 'Failed to fetch predefined collections' });
  }
})

//Exsisting collections
router.get('/predefined/collection/:id', async (req, res) => {
  try {
    const data = await getCollectionById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch collection by ID' });
  }
});


 //Ayuda a devolver las cartas de las colecciones para ver la info de cada una --> /cardInfo.vue
router.get('/cards/:id', async (req, res) => {
  try {
    const card = await cardInfoModel.getCardById(req.params.id);

    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    res.json(card);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch card' });
  }
});

//se trabaja Todo en el modelo --> En las funciones llamadas en ownCollectionModel
// Obtener colecciones del usuario autenticado
router.get('/me/collections', ownCollectionModel.getMyCollections);

// Crear nueva colección
router.post('/collections', ownCollectionModel.createCollection);

// Añadir carta a una colección del usuario
router.post('/collections/:collectionId/cards', ownCollectionModel.addCardToCollection);

// Eliminar carta de una colección del usuario
router.delete('/collections/:collectionId/cards/:cardId', ownCollectionModel.removeCardFromCollection);

//obtener cartas de las colecciones --> Colecciones del user 
router.get('/me/collections/:collectionId', ownCollectionModel.getCardsFromMyCollection);



//Buscar cartas en la BD cuando el user busca en SearchBar
router.get('/cards/search/:id', async (req, res) => {
  const q = req.params.id;//cojer valor que se pasa por la URL.

  if (!q) return res.status(400).json({ error: 'Missing query parameter' });

  try {
    const cards = await searchModel.searchCardsByName(q);
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to search cards' });
  }
});

//Búsqueda de noticias en la BD --> Se puede ir añadiendo y gestionando.
router.get('/notices', async (req, res) => {
  try {
    const notices = await noticeModel.getAllNotices();
    res.json(notices);
  } catch (err) {
    console.error('Error fetching notices:', err);
    res.status(500).json({ error: 'Failed to fetch notices' });
  }
});

router.post('/newData', userController.updateAccount)


module.exports = router; 
