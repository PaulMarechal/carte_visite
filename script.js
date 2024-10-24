function requestCameraAccess() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            startARScene(); 
        })
        .catch((error) => {
            if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                window.location.href = 'https://devxr.fr';
            } 
        });
}

function startARScene() {
    document.querySelector('a-scene').style.display = 'block';
}

window.onload = function() {
    document.querySelector('a-scene').style.display = 'none';
    requestCameraAccess();
};


const scanCardTitle = document.getElementById('scan_card_title');
const infoContainer = document.getElementById('info-container');
const target0 = document.getElementById('target-0')
const target1 = document.getElementById('target-1')
const contact_by_mail_ar = document.getElementById('contact_by_mail_ar')

function hideScanMessage() {
    scanCardTitle.style.display = 'none';
}

function showInfoContainer() {
    infoContainer.style.display = 'block';
}

function resetUI() {
    scanCardTitle.style.display = 'block';
    infoContainer.style.display = 'none';
}

target0.addEventListener('targetFound', hideScanMessage);
target0.addEventListener('targetLost', resetUI);

target1.addEventListener('targetFound', () => {
    hideScanMessage();
    showInfoContainer();
});

target1.addEventListener('targetLost', resetUI);


AFRAME.registerComponent('touch-raycaster', {
    init() {
        const scene = this.el.sceneEl;
        const camera = this.el.sceneEl.camera;

        document.querySelector("#touch-overlay").addEventListener('click', (event) => {
            const mouse = new THREE.Vector2();
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObjects(scene.object3D.children, true);

            if (intersects.length > 0) {
                for (const intersect of intersects) {
                    const el = intersect.object.el;
                    if (el) {
                        const name = el.getAttribute('name'); 

                        switch (name) {
                            case 'email':
                                window.location.href = 'mailto:contactme@paulmarechal.xyz';
                                break;
                            case 'website':
                                window.location.href = 'https://devxr.fr';
                                break;
                            case 'telephone':
                                window.location.href = 'tel:+33648357374';
                                break;
                            default:
                                console.log('No action defined for this element');
                        }
                    }
                }

                
            } else {
                console.log('No intersections found.');
            }
        });
    }
});
