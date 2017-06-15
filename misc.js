//キューブのジオメトリ（物体）の生成
 var cube = new THREE.Mesh(
            //キューブの大きさ
            new THREE.CubeGeometry(200,500,100),
            //キューブにテクスチャを貼りつける
            new THREE.MeshPhongMaterial({
                map: THREE.ImageUtils.loadTexture('img/yukichi.jpg')
             }));

 //cubeをsceneに追加
 scene.add(cube);
