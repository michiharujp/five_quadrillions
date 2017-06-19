//threejs element
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const FALL_HEIGHT = 2000;
const AREA = 2000;
let monNum = 0;
let monStep = 25;
let scene, camera, renderer, materials, geometry;
let cube = [];
let score = 0, scoreStep = 2500;
let counter = 0;
let position = [];
let rotation = [];
let controls;

//yukichi information
let YUKICHI = {
    width : 150,
    height: 10,
    depth: Math.trunc(150 * 256 / 536),
    texture: new THREE.TextureLoader().load('img/yukichi.jpg'),
    textureSide: new THREE.TextureLoader().load('img/yukichiSide.jpg'),
};

function init() {

    let btnDom = document.getElementById("button-wrapper");
    btnDom.parentNode.removeChild(btnDom);
    document.getElementById("stage").classList.remove('hide');

    scene = new THREE.Scene();

    //set camera
    camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 1, 10000);
    camera.position.set(2000, 1000, 2000);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    //set light
    scene.add(new THREE.AmbientLight(0xbbbbbb));
    scene.add(new THREE.SpotLight(0xffffff));

    //set texture
    materials = [
        new THREE.MeshLambertMaterial({map: YUKICHI.textureSide}),
        new THREE.MeshLambertMaterial({map: YUKICHI.textureSide}),
        new THREE.MeshLambertMaterial({map: YUKICHI.texture}),
        new THREE.MeshLambertMaterial({map: YUKICHI.texture}),
        new THREE.MeshLambertMaterial({map: YUKICHI.textureSide}),
        new THREE.MeshLambertMaterial({map: YUKICHI.textureSide}),
    ];

    //set geometry
    geometry = new THREE.BoxGeometry(YUKICHI.width, YUKICHI.height, YUKICHI.depth);

    //set renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0xefefef);
    document.getElementById('stage').append(renderer.domElement);

    //set controls
    controls = new THREE.OrbitControls(camera);

    addMoney();
    loop();
}

function loop() {
    for(i=0; i < cube.length; i++) {
        if(cube[i].position.y < -AREA) {continue;}
        cube[i].rotation.y += 0.01;
        cube[i].position.y -= 50;
    }
    controls.update();
    renderer.clear();
    renderer.render( scene, camera );
    requestAnimationFrame(loop);
}

function addMoney() {
    counter++;
    score = scoreStep * counter;
    for(i = monNum; i < monNum + monStep; i++) {
        position[0] = Math.floor(Math.random() * AREA * 2) - AREA;
        position[1] = Math.floor(Math.random() * 200) + FALL_HEIGHT;
        position[2] = Math.floor(Math.random() * AREA * 2) - AREA;
        rotation[0] = Math.random() * Math.PI;
        rotation[1] = Math.random() * Math.PI;
        rotation[2] = Math.random() * Math.PI;
        cube[i] = new THREE.Mesh(geometry, materials);
        cube[i].position.set(position[0],position[1],position[2]);
        cube[i].rotation.set(rotation[0],rotation[1],rotation[2]);
        scene.add(cube[i]);
    }
    document.getElementById("score").textContent = Math.trunc(score/10000) ? score/10000 + "億円" : score + "万円";
    monNum += monStep;
}
