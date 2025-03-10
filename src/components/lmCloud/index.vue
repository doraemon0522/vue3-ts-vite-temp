<template>
  <div ref="containerRef" style="height: 500px; width: 500px"></div>
</template>

<script setup lang="ts">
  import * as THREE from 'three';

  const containerRef = ref<HTMLDivElement | null>(null);

  const words = [
    { text: 'Vue', size: 30 },
    { text: 'D3.js', size: 40 },
    { text: 'Three.js', size: 35 },
    { text: 'JavaScript', size: 150 },
    { text: 'HTML', size: 25 },
    { text: 'CSS', size: 30 },
    { text: 'TypeScript', size: 45 },
    { text: 'Node.js', size: 40 },
    { text: 'WebGL', size: 38 },
    { text: 'React', size: 33 },
  ];

  // Store positions and movement variables
  const wordPositions = words.map(() => ({
    radius: Math.random() * 1 + 5.5, // Random initial radius from the center (smaller range)
    angle: Math.random() * Math.PI * 2, // Random initial angle on the circle
    direction: 1, // Direction of movement, 1 for towards center, -1 for away
  }));

  // Speed factor: Adjust the movement speed by changing this value
  const speedFactor = 0.02; // Slower movement speed

  // Maximum size for words to prevent overflow
  const maxWordSize = 100;

  onMounted(() => {
    const scene1 = new THREE.Scene();
    const camera2 = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer2 = new THREE.WebGLRenderer();
    renderer2.setSize(500, 500);
    containerRef.value?.appendChild(renderer2.domElement);

    camera2.position.set(0, 0, 15); // Set the camera farther from the center

    // Add ambient light to brighten the scene
    const ambientLight = new THREE.AmbientLight(0x404040, 1); // Soft white light
    scene1.add(ambientLight);

    // Increase the intensity of the point light for better visibility
    const light1 = new THREE.PointLight(0xffffff, 2, 100); // Increased intensity
    light1.position.set(50, 50, 50);
    scene1.add(light1);

    // Function to create 2D text sprite
    const createTextSprite = (text: string, size: number) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const finalSize = Math.min(size, maxWordSize); // Limit the size to maxWordSize
      if (context) {
        context.font = `${finalSize}px Arial`;
        context.fillStyle = 'white';
        context.fillText(text, 0, finalSize);
      }

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);

      return sprite;
    };

    const wordSprites = words.map((word, index) => {
      const sprite = createTextSprite(word.text, word.size);
      scene1.add(sprite);

      // Initial position for each word
      const position = wordPositions[index];
      sprite.position.set(
        position.radius * Math.cos(position.angle), // X
        position.radius * Math.sin(position.angle), // Y
        0, // Z is fixed at 0 for 2D plane
      );

      return sprite;
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      wordSprites.forEach((sprite, index) => {
        const position = wordPositions[index];

        // Update radius (move towards or away from the center)
        position.radius += position.direction * speedFactor;

        // Change direction when the word reaches a certain distance from the center
        if (position.radius > 6.5 || position.radius < 5.5) {
          position.direction *= -1;
        }

        // Update the position based on the new radius
        sprite.position.set(
          position.radius * Math.cos(position.angle),
          position.radius * Math.sin(position.angle),
          0,
        );
      });

      renderer2.render(scene1, camera2);
    };

    animate();
  });
</script>
