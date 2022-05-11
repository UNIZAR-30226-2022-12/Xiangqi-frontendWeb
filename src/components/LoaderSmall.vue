<template>
<div class="surface-section flex align-items-center justify-content-center p-6 text-center h-25rem " style="border-radius: 1rem; background-color: rgba(0, 0, 0, 0.4); bornder-style: none;">
    <div class="grid justify-content-center">
        <div id="spinnerContainer">
            <ProgressSpinner style="width:30px; height:30px" strokeWidth="4" fill="transparent" animationDuration="2s"/>
            <h4 class="mb-0"> Cargando </h4>
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