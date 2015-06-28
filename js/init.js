$(init);

function init() {
  $.getJSON('assets/phoenix/character_data.json', function(data) {
    render(data, new THREE.ImageUtils.loadTexture('assets/phoenix/character_img.png'));
  });

  function render(data, texture) {
    var creatureRenderer,
      scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
      renderer = new THREE.WebGLRenderer(),
      material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
      }),
      creature = new Creature(data),
      manager = new CreatureManager(creature);

    initScene();
    animationLoop();

    $(window).resize(resize);

    function initScene() {
      var animation1 = new CreatureAnimation(data, 'default', creature),
        animation2 = new CreatureAnimation(data, 'flight', creature);

      manager.AddAnimation(animation1);
      manager.AddAnimation(animation2);

      manager.SetActiveAnimationName('flight', false);
      manager.SetShouldLoop(true);
      manager.SetIsPlaying(true);
      manager.RunAtTime(0);

      creatureRenderer = new CreatureRenderer('canvas', scene, manager, material);

      camera.position.z = -20;
      camera.lookAt(scene.position);

      scene.add(camera);

      renderer.setSize(window.innerWidth, window.innerHeight);

      document.body.appendChild(renderer.domElement);

    }

    function animationLoop() {
      manager.Update(0.05);
      creatureRenderer.UpdateData();
      renderer.render(scene, camera);

      requestAnimationFrame(animationLoop);
    }

    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

  }

}
