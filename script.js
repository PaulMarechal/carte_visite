import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';

const mindarThree = new MindARThree({
    container: document.querySelector("#container"),
    imageTargetSrc: "https://devxr.fr/carte/assets/targets.mind"
});

const { renderer, scene, camera } = mindarThree;

const anchor = mindarThree.addAnchor(0);

// Création d'un cube
const geometryCube = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.5 });
const mesh = new THREE.Mesh(geometryCube, material);

anchor.group.add(mesh);

// Fonction pour transformer la géométrie du cube en sphère
const transformToSphere = () => {
    // Transformer la géométrie en sphère
    const geometrySphere = new THREE.SphereGeometry(0.5, 32, 32);
    mesh.geometry.dispose();  // On libère l'ancienne géométrie
    mesh.geometry = geometrySphere;  // On remplace par la nouvelle géométrie
};

const start = async () => {
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });

    // Transformation en sphère après 5 secondes
    setTimeout(transformToSphere, 5000);
};

document.addEventListener("DOMContentLoaded", () => {
    start();
});
