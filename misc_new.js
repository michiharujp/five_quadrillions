    var scene;
    var sphereEarth;
    var camera;
    var light;
    var ambient;
    var gridHelper;
    var axisHelper;
    var lightHelper;
    var renderer;
    var loader;
    var width = 1000;
    var height = 700;
    var theta=0;
    var cube = [];
    var colNum = 20;
    var rowNum = 40;
    var controls;

    // ステージを作る
    scene = new THREE.Scene();

    var loader = new THREE.TextureLoader();
    yukichi=loader.load('img/yukichi.jpg');
    // 金テクスチャーを準備
    var materials = [
      new THREE.MeshBasicMaterial({color: 0xe9efc7}),
      new THREE.MeshBasicMaterial({color: 0xe9efc7}),
      new THREE.MeshBasicMaterial({map: yukichi}),
      new THREE.MeshBasicMaterial({map: yukichi}),
      new THREE.MeshBasicMaterial({color: 0xe9efc7}),
      new THREE.MeshBasicMaterial({color: 0xe9efc7})
    ];
    var material = new THREE.MeshFaceMaterial(materials);
    var geometry = new THREE.CubeGeometry(150, 120, 60);

    // 金を作る
    function createEarth() {
      for(var i=0; i<rowNum; i++) {
        for(var j=0; j<colNum; j++) {
          cube[i] = [];
          cube[i][j] = new THREE.Mesh(geometry, material);
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

    createEarth();
    render();
