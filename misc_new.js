//threejs element
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
let scene, camera, renderer, raycaster, materials, geometry;
let cube = [];
let colNum = 20;
let rowNum = 40;
let controls;

//yukichi information
let yukichiAspect = 256 / 536;
const YUKICHI = {
    width: 150,
    height: Math.trunc(150 * yukichiAspect),
    depth: 60,
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
    camera.lookAt(scene.position);

    //set caster
    raycaster = new THREE.Raycaster();

    //set light
    scene.add(new THREE.AmbientLight(0xbbbbbb));
    scene.add(new THREE.DirectionalLight(0xaaaaaa, 0.01));

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
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('stage').append(renderer.domElement);

    //set controls
    controls = new THREE.OrbitControls(camera);

    loop();
    addMoney();
}

function loop() {
    requestAnimationFrame( loop );
    controls.update();
    renderer.clear();
    renderer.render( scene, camera );
}

function addMoney() {
    let money;
    for(i=0; i<rowNum; i++) {
        for(j=0; j<colNum; j++) {
            cube[i] = [];
            cube[i][j] = new THREE.Mesh(geometry, materials);
            cube[i][j].position.set(-(colNum-1)*150/2 + j*150, 0, -(rowNum-1)*60/2 + i*60);
            scene.add(cube[i][j]);
        }
    }
};
