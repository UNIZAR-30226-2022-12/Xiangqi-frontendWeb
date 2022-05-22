import { createRouter, createWebHashHistory } from 'vue-router';
import Login from './pages/Login.vue';
import Validate from './components/Validate.vue';
import Game from './pages/Game.vue';
import GameDebug from './pages/GameDebug.vue';
import Profile from './pages/Profile.vue';
import OtherProfile from './pages/OtherProfile.vue';
import Friends from './pages/Friends.vue';
import Ranking from './pages/Ranking.vue';
import Store from './pages/Store.vue';
import Historial from './pages/Historial.vue';
import NotFound from './pages/NotFound.vue';
import RecPwd from './pages/RecPwd.vue';
import FriendRequest from './pages/FriendRequest.vue';
import Expired from './pages/Expired.vue';

const routes = [
    {
        path: '/',
        name: 'Xiangqi Online',
        component: Login,
    },
    {
        path: '/itsukieslamejorquintilliza',
        name: 'Validacion de correo',
        component: Validate,
    },
    {
        path: '/game/:idOponent/:idSala/:color',
        name: 'Partida',
        component: Game,
    },
    {
        path: '/gamedebug/',
        name: 'PartidaDEBUG',
        component: GameDebug,
    },
    {
        path: '/profile',
        name: 'Perfil',
        component: Profile,
    },
    {
        path: '/otherProfile/:id',
        name: 'OtherProfile',
        component: OtherProfile,
    },
    {
        path: '/friendRequest',
        name: 'Solicitudes',
        component: FriendRequest,
    },
    {
        path: '/friends',
        name: 'Amigos',
        component: Friends,
    },
    {
        path: '/ranking',
        name: 'Ranking',
        component: Ranking,
    },
    {
        path: '/store',
        name: 'Tienda',
        component: Store,
    },
    {
        path: '/historial',
        name: 'Historial',
        component: Historial,
    },
    {
        path: '/recPwd',
        name: 'Recuperar contraseña',
        component: RecPwd,
    },
    {
        path: '/expired',
        name: 'Sesion caducada',
        component: Expired,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.resolve({
    name: 'not-found',
    params: { pathMatch: ['not', 'found'] },
}).href; // '/not/found'

router.beforeEach((to, from, next) => {
    document.title = to.name;
    next();
});

export default router;
