import { createRouter, createWebHashHistory } from 'vue-router';
import Login from './pages/Login.vue';
import Game from './pages/Game.vue';
import Profile from './pages/Profile.vue';
import Friends from './pages/Friends.vue';
import Ranking from './pages/Ranking.vue';
import Store from './pages/Store.vue';
import Historial from './pages/Historial.vue';
import MyBoards from './pages/MyBoards.vue';
import Error from './pages/Error.vue';
import RecPwd from './pages/RecPwd.vue';

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login,
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
        path: '/error',
        name: 'error',
        component: Error,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
