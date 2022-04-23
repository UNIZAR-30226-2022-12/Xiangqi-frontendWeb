import { createRouter, createWebHashHistory } from 'vue-router';
import Login from './pages/Login.vue';
import Validate from './components/Validate.vue';
import Game from './pages/Game.vue';
import Profile from './pages/Profile.vue';
import OtherProfile from './pages/OtherProfile.vue';
import Friends from './pages/Friends.vue';
import Ranking from './pages/Ranking.vue';
import Store from './pages/Store.vue';
import Historial from './pages/Historial.vue';
import MyBoards from './pages/MyBoards.vue';
import NotFound from './pages/NotFound.vue';
import RecPwd from './pages/RecPwd.vue';

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
        path: '/game',
        name: 'Partida',
        component: Game,
    },
    {
        path: '/profile',
        name: 'Perfil',
        component: Profile,
    },
    {
        path: '/otherProfile/:id',
        name: 'Perfil de otro usuario',
        component: OtherProfile,
    },
    {
        path: '/friends',
        name: 'friends',
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
        path: '/myBoards',
        name: 'Mis tableros',
        component: MyBoards,
    },
    {
        path: '/recPwd',
        name: 'Recuperar contraseña',
        component: RecPwd,
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
