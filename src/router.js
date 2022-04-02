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
        name: 'login',
        component: Login,
    },
    {
        path: '/itsukieslamejorquintilliza',
        name: 'validate',
        component: Validate,
    },
    {
        path: '/game',
        name: 'game',
        component: Game,
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
    },
    {
        path: '/otherProfile/:id',
        name: 'otherProfile',
        component: OtherProfile,
    },
    {
        path: '/friends',
        name: 'friends',
        component: Friends,
    },
    {
        path: '/ranking',
        name: 'ranking',
        component: Ranking,
    },
    {
        path: '/store',
        name: 'store',
        component: Store,
    },
    {
        path: '/historial',
        name: 'historial',
        component: Historial,
    },
    {
        path: '/myBoards',
        name: 'myBoards',
        component: MyBoards,
    },
    {
        path: '/recPwd',
        name: 'recPwd',
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

export default router;
