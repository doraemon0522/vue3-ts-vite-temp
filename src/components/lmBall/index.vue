<template>
  <div ref="containerRef" style="height: 500px; width: 500px"></div>
</template>

<script setup lang="ts">
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

  const containerRef = ref<HTMLDivElement | null>(null);

  onMounted(() => {
    if (!containerRef.value) return;

    const width = 500;
    const height = 500;

    // 创建场景
    const scene = new THREE.Scene();

    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 3);

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    containerRef.value.appendChild(renderer.domElement);

    // 载入地球纹理
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
      '/earthTexture.jpg',
      (texture) => {
        // 创建地球
        const geometry = new THREE.SphereGeometry(1, 64, 64);
        const material = new THREE.MeshStandardMaterial({ map: texture });
        const earth = new THREE.Mesh(geometry, material);
        scene.add(earth);

        // 动画循环
        function animate() {
          requestAnimationFrame(animate);
          earth.rotation.y += 0.005; // 自转效果
          controls.update();
          renderer.render(scene, camera);
        }
        animate();
      },
      undefined,
      (error) => console.error('Texture load error:', error),
    );

    // 创建地球
    // const geometry = new THREE.SphereGeometry(1, 64, 64);
    // const material = new THREE.MeshStandardMaterial({ map: earthTexture });
    // const earth = new THREE.Mesh(geometry, material);
    // scene.add(earth);
    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);
    // const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    // pointLight.position.set(5, 3, 5);
    // scene.add(pointLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // 方向光增强亮度
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // 轨道控制
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
  });
</script>
