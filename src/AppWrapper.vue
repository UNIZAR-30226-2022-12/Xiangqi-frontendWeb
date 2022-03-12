<template>
    <!--<Landing v-if="$route.path === '/landing'" @change-theme="changeTheme" />
    <Error v-else-if="$route.path === '/error'" />
    <App v-else @change-theme="changeTheme" />-->
    <App @change-theme="changeTheme" />
</template>

<script>
import EventBus from './AppEventBus';
import App from './App';
//import Landing from './pages/LandingDemo';
//import Error from './pages/Error';

export default {
    methods: {
        changeTheme(event) {
            let themeElement = document.getElementById('theme-link');
            themeElement.setAttribute('href', themeElement.getAttribute('href').replace(this.$appState.theme, event.theme));
            this.$appState.theme = event.theme;
            this.$appState.darkTheme = event.dark;
            EventBus.emit('change-theme', event);

            if (event.theme.startsWith('md')) {
                this.$primevue.config.ripple = true;
            }
        }
    },
    components: {
        App,
        //Landing,
        //Error,
    }
}
</script>