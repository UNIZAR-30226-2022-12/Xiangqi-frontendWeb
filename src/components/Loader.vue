<template>
<div class="surface-section section flex align-items-center justify-content-center p-6 text-center" style="height: calc(100vh - 9rem); min-height:40rem"> <!-- el alto del viewport menos la topbar y su padding -->
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%;">
        <div id="spinnerContainer" class="grid flex flex-column align-items-center">
            <ProgressSpinner style="width:20rem; height:20rem" strokeWidth="3" fill="transparent" animationDuration="2s"/>
            <h2> Cargando... </h2>
        </div>    
    </div>
</div>
</template>

<style scooped>
/* Color del spinner */

#spinnerContainer .p-progress-spinner-circle{
	-webkit-animation: p-progress-spinner-dash 1.5s ease-in-out infinite !important;
	animation: p-progress-spinner-dash 1.5s ease-in-out infinite !important;
    stroke: var(--blue-600) !important;
}

</style>