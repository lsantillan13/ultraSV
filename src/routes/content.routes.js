import {Router} from 'express';
const router = Router();

import * as contentCtrl from '../controllers/content.controllers';



/* REGULAR USER */
/*R*/ router.get('/carousel', contentCtrl.getLastFivePosts);
/*R*/ router.get('/component', contentCtrl.getNextEightPosts);

/*R*/ router.get('/widgetP', contentCtrl.getPoliticalPosts);
/*R*/ router.get('/widgetE', contentCtrl.getEconomicPosts);
/*R*/ router.get('/widgetS', contentCtrl.getSocialPosts);

/*R*/ router.get('/policiales', contentCtrl.getPolicePosts);
/*R*/ router.get('/deportes', contentCtrl.getSportsPosts);
/*R*/ router.get('/tecnologia', contentCtrl.getTechnologyPosts);

/*R*/ router.get('/last', contentCtrl.getLast);

export default router;