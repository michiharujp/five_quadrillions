//定数
const width = 1000;
const height = 700;

//yukichi information
var yukichiAspect = 256 / 536;
const yukichi = {
    width: 150,
    height: Math.trunc(150 * yukichiAspect),
    depth: 60,
    texture: new THREE.TextureLoader().load('img/yukichi.jpg'),
    textureSide: new THREE.TextureLoader().load('img/yukichiSide.jpg'),
};

const colNum = 20;
const rowNum = 40;
var a = [150,71,60];

//変数
const scene = new THREE.Scene();
var camera;
var light;
var ambient;
var renderer;
var cube = [];
var controls;


// テクスチャーの貼り付け
var materials = [
    new THREE.MeshLambertMaterial({map: yukichi.textureSide}),
    new THREE.MeshLambertMaterial({map: yukichi.textureSide}),
    new THREE.MeshLambertMaterial({map: yukichi.texture}),
    new THREE.MeshLambertMaterial({map: yukichi.texture}),
    new THREE.MeshLambertMaterial({map: yukichi.textureSide}),
    new THREE.MeshLambertMaterial({map: yukichi.textureSide}),
];
var geometry = new THREE.BoxGeometry(yukichi.width, yukichi.height, yukichi.depth);

// 金を作る
function createMoney() {
    for(i=0; i<rowNum; i++) {
        for(j=0; j<colNum; j++) {
            cube[i] = [];
            cube[i][j] = new THREE.Mesh(geometry, materials);
            cube[i][j].position.set(-(colNum-1)*150/2 + j*150, 0, -(rowNum-1)*60/2 + i*60);
            scene.add(cube[i][j]);
        }
    }
};

// 平方光源を作る
light = new THREE.DirectionalLight(0xaaaaaa, 0.01);
light.position.set(100, 130, 80);
scene.add(light);

// 環境光源を作る
ambient = new THREE.AmbientLight(0xbbbbbb);
scene.add(ambient);

// カメラを作る
camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
camera.position.set(100, 600, 600);
camera.lookAt(scene.position);

controls = new THREE.OrbitControls(camera);

// renderer
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setClearColor(0xefefef);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('stage').append(renderer.domElement);

function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
}

createMoney();
render();
