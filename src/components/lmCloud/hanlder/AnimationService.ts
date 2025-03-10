import { Tween } from '@tweenjs/tween.js';
import * as THREE from 'three';

export class AnimationService {
  static animate(
    nodes: any[],
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    onUpdate: () => void,
  ) {
    // 动画循环
    function animate() {
      requestAnimationFrame(() => {
        // 弹簧动画：向中心聚集+轻微扰动
        nodes.forEach((node) => {
          const center = new THREE.Vector3(0, 0, 0);
          const direction = center.sub(node.position).normalize();
          const velocity = node.position.clone().multiplyScalar(-0.05);

          node.position.add(velocity);

          // 添加随机扰动保持动态效果
          node.position.add(
            new THREE.Vector3()
              .random()
              .multiplyScalar(node.size / 20)
              .multiplyScalar(0.5),
          );
        });

        // 更新Three.js对象
        // scene.traverse((obj) => {
        //   if (obj.isText) {
        //     obj.position.copy(node.position);
        //   }
        // });

        onUpdate();
        animate();
      });
    }

    animate();
  }
}
