import {Router} from 'express';
const router = Router();

import * as contentCtrl from '../controllers/content.controllers';



/*===== Rutas de Usuarios Regulares =====*/
/*First Section && Carousel */
    router.get('/carousel', contentCtrl.getLastFivePosts);
    router.get('/component', contentCtrl.getNextEightPosts);
/* Widget */
    router.get('/widgetP', contentCtrl.getPoliticalPosts);
    router.get('/widgetE', contentCtrl.getEconomicPosts);
    router.get('/widgetS', contentCtrl.getSocialPosts);
/* Widget */
    router.get('/policiales', contentCtrl.getPolicePosts);
    router.get('/deportes', contentCtrl.getSportsPosts);
    router.get('/tecnologia', contentCtrl.getTechnologyPosts);
/* últimas noticias */
    router.get('/last', contentCtrl.getLast);
/* Get by Id */
    router.get('/:id', contentCtrl.getPostById);
/* Categorías */
    router.get('/buscar/:category', contentCtrl.getLatestPostsByCategory);

/*===== Busqueda de Publicaciones  =====*/
    router.get('/busqueda', contentCtrl.searchPosts)
    router.get('/search/:category', contentCtrl.getPostsList);
 

/*===== Publicaciones Relacionadas =====*/
 /*Same Category*/
    router.get('/:category/related-post/:postId', contentCtrl.getRelatedPost);
 /*Streaming*/
    router.get('/getStreaming', contentCtrl.getStreaming);
 /*Emprender*/
    router.get('/getEmprender', contentCtrl.getEmprender);
 /*Espectáculos*/
    router.get('/getEspectaculos', contentCtrl.getEspectaculos);

export default router;