import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function useGLTFModel() {
    const gltfLoader = new GLTFLoader();

    // Create a load function for our composable to be used in our components
    function load(url: string){
        return new Promise((resolve, reject) =>{
            gltfLoader.load(url, resolve, undefined, reject)
        })
    }

    return {
        // Return our available functions
        load,
    }
}