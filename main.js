    import * as THREE from 'three';

    // Escena, cámara y renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111122);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 7);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Luces
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Cubo verde central
    const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1.5, 1.5),
    new THREE.MeshStandardMaterial({ color: 0x00ff00 })
    );
    scene.add(cube);

    // Esfera que orbita
    const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0xff3366 })
    );
    scene.add(sphere);

    // Toroide
    const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.8, 0.25, 16, 60),
    new THREE.MeshStandardMaterial({ color: 0xffaa00 })
    );
    torus.position.x = -3.5;
    scene.add(torus);

    // Cono
    const cone = new THREE.Mesh(
    new THREE.ConeGeometry(0.7, 1.5, 32),
    new THREE.MeshStandardMaterial({ color: 0x3399ff })
    );
    cone.position.x = 3.5;
    scene.add(cone);

    // Piso con cuadrícula
    const grid = new THREE.GridHelper(20, 20, 0x888888, 0x444444);
    grid.position.y = -2;
    scene.add(grid);

    // Animación
    const clock = new THREE.Clock();

    function animate() {
    const t = clock.getElapsedTime();

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.02;

    sphere.position.x = Math.cos(t * 1.5) * 3;
    sphere.position.z = Math.sin(t * 1.5) * 3;

    torus.rotation.x += 0.03;
    torus.rotation.y += 0.01;

    cone.rotation.z += 0.02;
    cone.position.y = Math.sin(t * 2) * 0.8;

    renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);

    // Ajuste al cambiar tamaño de ventana
    window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    });