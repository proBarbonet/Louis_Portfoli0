<script setup lang="ts">
import { Scene, PerspectiveCamera, Mesh, SphereGeometry, MeshBasicMaterial, WebGLRenderer, Color, Fog } from 'three';
import { useWindowSize } from '@vueuse/core'

// We need to wait for the template ref to get the HTML element from the template tag
let renderer: WebGLRenderer

// Let's create reference to the HTML Canvas in our template, it will be used when setting the renderer
const canvasContainer: Ref<HTMLCanvasElement | null> = ref(null);

// Here we get the dynamic window size using @vueuse/core, this is in case our window is resized
const { width, height } = useWindowSize();

// Using our window size we can then create an aspect ration using multiplier to set the proportional size desired
const aspectRatio = computed(() => width.value / height.value);

const bgColor = new Color('#E1F0C2');

// Create a Scene
const scene = new Scene();
// Add a fog effect to the scene
scene.fog = new Fog(bgColor, 0.1, 75);

scene.background = bgColor;

// Create a Camera for our Scene
const camera = new PerspectiveCamera(75, aspectRatio.value, 0.1, 1000);

// Change the camera position to not be in the center like the rest of our 3D objects
camera.position.set(0, 0, 4);

scene.add(camera);

// A Mesh is an object containing Geometry and Material to apply to it
const sphere = new Mesh (
    new SphereGeometry(1, 32, 32),
    new MeshBasicMaterial({ color: 0x008080 })
);

scene.add(sphere)

function updateCamera () {
    // Update the aspect ratio of the camera
    camera.aspect = aspectRatio.value;
    // Update the projection of the camera, the way it resizes, otherwise our scene will be wrongly resized and deformed
    camera.updateProjectionMatrix();
}

function updateRenderer() {
    // Set the size of the Renderer to be the same as our Camera
    renderer.setSize(width.value, height.value);

    // Render the scene using a Scene and a Camera
    renderer.render(scene, camera);
}

function setRenderer() {
    // If our HTML canvas tag has been loaded
    if(canvasContainer.value) {
        // Initialize our Renderer, pass it a canvas using template ref using  vue to render the scene
        renderer = new WebGLRenderer({
            canvas: canvasContainer.value,
            alpha: true
        })
        // Initial update of the renderer since we need to do it the first time
        updateRenderer();
    }
}

watch(aspectRatio ,()=> {
    // When the aspect ratio is changed we update the camera and the renderer
    updateCamera();
    updateRenderer();
})

/*
    Let's use lifcyle hooks from Vue to set our Renderer when our template is loaded
    and we can fetch the value of Canvas container
*/
onMounted(() => {
    // Initial renderer set up
    setRenderer();

    // Initiall loop call
    loop();
})


const loop = () => {
    if (sphere.position.x >= 10){
        sphere.position.x = -10
    }
    sphere.position.x += 0.01;
    // We don't need to call updateRenderer since we only want to render
    renderer.render(scene, camera);

    // Callback so that the function loops indefinitely
    requestAnimationFrame(loop)
}
</script>

<template>
    <div class="ContainerFrame">
        <!--Here we need to reference our canvas tag-->
        <canvas ref="canvasContainer"/>
    </div>
</template>

<style scoped>
    div {
        width: 500px;
        height: 400px;
    }
    canvas {
        margin: 0;
    }
</style>