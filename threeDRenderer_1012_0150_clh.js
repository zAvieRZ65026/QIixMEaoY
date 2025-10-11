// 代码生成时间: 2025-10-12 01:50:24
const THREE = require('three');

// Module to export
export default function ({ app }, inject) {
  // Three.js scene
  const scene = new THREE.Scene();
  // Perspective camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  // WebGLRenderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Inject Three.js objects into Nuxt's app context
  inject('threeScene', scene);
  inject('threeCamera', camera);
  inject('threeRenderer', renderer);

  // Function to add an object to the scene
  function addObjectToScene(object) {
    if (object instanceof THREE.Object3D) {
      scene.add(object);
    } else {
      console.error('addObjectToScene: The provided object is not an instance of THREE.Object3D.');
    }
  }

  // Function to render the scene
  function renderScene() {
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }

  // Handle window resize
  window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });

  // Expose the functions to be used in Nuxt components
  app.provide('addObjectToScene', addObjectToScene);
  app.provide('renderScene', renderScene);

  // Initial render
  renderScene();
}

/*
 * Usage in a Nuxt component:
 *
 * export default {
 *   mounted() {
 *     const { addObjectToScene, renderScene } = this.$nuxt;
 *     const geometry = new THREE.BoxGeometry();
 *     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
 *     const cube = new THREE.Mesh(geometry, material);
 *     addObjectToScene(cube);
 *   },
 *   beforeUnmount() {
 *     this.$nuxt.$renderScene();
 *   }
 * };
 */