<template>
  <div ref="containerRef" style="height: 500px; width: 500px"></div>
</template>
<script setup lang="ts">
  import * as THREE from 'three';
  import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
  import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
  const containerRef = ref<HTMLDivElement | null>(null);
  import { MeshBasicMaterial } from 'three';
  const words = [
    { text: 'Vue', size: 30 },
    { text: 'D3.js', size: 40 },
    { text: 'Three.js', size: 35 },
    { text: 'JavaScript', size: 50 },
    { text: 'HTML', size: 25 },
    { text: 'CSS', size: 30 },
    { text: 'TypeScript', size: 45 },
    { text: 'Node.js', size: 40 },
    { text: 'WebGL', size: 38 },
    { text: 'React', size: 33 },
  ];
  // 使用 Three.js 初始化 3D 场景
  onMounted(() => {
    const scene1 = new THREE.Scene();
    const camera2 = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer2 = new THREE.WebGLRenderer();
    renderer2.setSize(500, 500);
    containerRef.value?.appendChild(renderer2.domElement);
    camera2.position.set(0, 0, 395);

    // Add point light
    const light1 = new THREE.PointLight(0xffffff, 1, 100);
    light1.position.set(50, 50, 50);
    scene1.add(light1);

    // Create a loader for the font
    // const loader = new THREE.FontLoader();
    const loader = new FontLoader();

    loader.load('/helvetiker_bold.typeface.json', (font) => {
      words.forEach((word, index) => {
        const geometry = new TextGeometry(word.text, {
          font: font,
          size: word.size,
          height: 1,
        });

        const material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
        const textMesh = new THREE.Mesh(geometry, material);

        // Random positioning for each word
        textMesh.position.set(
          (Math.random() - 0.5) * 10, // X position
          (Math.random() - 0.5) * 10, // Y position
          (Math.random() - 0.5) * 10, // Z position
        );

        scene1.add(textMesh);
      });

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        // Rotate the scene slightly for a dynamic view
        scene1.rotation.y += 0.01;

        renderer2.render(scene1, camera2);
      };

      animate(); // Start the animation loop
    });
  });
</script>
