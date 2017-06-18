//threejs element


const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
let scene, camera, renderer, materials, geometry;
let mouse, raycaster, isShiftDown = false;
let cube = [];
let colNum = 20;
let rowNum = 40;
let layer = 0;
let score = 0, scoreStep = 2500;
let controls;

//yukichi information
let yukichiAspect = 256 / 536;
const YUKICHI = {
    width: 150,
    height: 10,
    depth: Math.trunc(150 * yukichiAspect)-10,
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
    camera.lookAt(new THREE.Vector3());

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
    //addGrid();
}

function loop() {
    requestAnimationFrame( loop );
    controls.update();
    renderer.clear();
    renderer.render( scene, camera );
}

function addMoney() {
    layer += YUKICHI.height;
    score += scoreStep;
    for(i=0; i<rowNum; i++) {
        for(j=0; j<colNum; j++) {
            cube[i] = [];
            cube[i][j] = new THREE.Mesh(geometry, materials);
            cube[i][j].position.set(-(colNum-1)*150/2 + j*150, layer, -(rowNum-1)*60/2 + i*60);
            scene.add(cube[i][j]);
        }
    }
    document.getElementById("score").textContent = Math.trunc(score/10000) ? score/10000 + "億円" : score + "万円";
}

//故障中
function addGrid() {
    let sizeW = YUKICHI.width * colNum;
    let sizeH = YUKICHI.depth * rowNum;
    let widthStep = YUKICHI.width;
    let depthStep = YUKICHI.depth;

    let gridGeo = new THREE.Geometry();
    for ( var i = - sizeW, j = -sizeH; i <= sizeW && j <= sizeH; i += widthStep, j += depthStep ) {
        gridGeo.vertices.push( new THREE.Vector3( - sizeW, 0, i ) );
        gridGeo.vertices.push( new THREE.Vector3(   sizeW, 0, i ) );
        gridGeo.vertices.push( new THREE.Vector3( j, 0, - sizeH ) );
        gridGeo.vertices.push( new THREE.Vector3( j, 0,   sizeH ) );
    }
    let gridMat = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2, transparent: true } );
    let line = new THREE.LineSegments( gridGeo, gridMat );
    scene.add(line);
}
