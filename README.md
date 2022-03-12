# webapp

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Instalación
### -----------

# 1- Instalar node.js
```
https://nodejs.org/en/
```
# 2- Instalar vue (https://cli.vuejs.org/guide/installation.html)
```
sudo npm install -g @vue/cli@latest
```
```
vue --version
```
```
npm update -g @vue/cli
```
# 3- vue create webapp

# 4- Seleccionar (vue 3)

# 5- Ejecutar
```
cd webapp
```
```
npm run serve
```

# 6- En la folder del proyecto
```
ver version: https://primefaces.org/primevue/showcase/#/setup
```
```
npm install primevue@^3.12.0 --save
```
```
npm install primeicons --save
```
```
npm install --save click-outside-vue3
```
```
npm install -D sass-loader@^10 sass
```
```
npm install primeflex --save //para usar primeflex (https://www.primefaces.org/primeflex/setup)
```
```
npm install @vuelidate/core @vuelidate/validators
```
# 7- Styles: The css dependencies are as follows, note that you may change the theme with another one of your choice. If you are using a bundler such as webpack with a css loader you may import them to your main application component.

# En main.js (antes del createApp)
```
import 'primevue/resources/themes/saga-blue/theme.css'       //theme
```
```
import 'primevue/resources/primevue.min.css'                 //core css
```
import 'primeicons/primeicons.css'                           //icons
```
import '/node_modules/primeflex/primeflex.css'
```

# 8- Importar un modulo por ejemplo un botón: en main.js
```
import Button from 'primevue/button';
```
```
//Tras imports
const app = createApp(App)
app.use(Button)
app.mount('#app')
createApp(App).mount('#app')
```

# 9- APLICAR MIS ESTILOS
# Añadir el tag:

```
contentStyle="background-color:red"
```