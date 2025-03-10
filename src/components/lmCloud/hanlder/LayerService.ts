import * as THREE from 'three';
import * as d3 from 'd3';

export class LayoutService {
  static createForceDirectedLayout(words: any[]) {
    // 使用D3.js计算力导向布局
    const simulation = d3
      .forceSimulation(words)
      .force(
        'link',
        d3.forceLink().id((d) => d.id),
      )
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(0, 0));

    // 将D3坐标转换为Three.js坐标系
    return simulation.nodes().map((node) => ({
      position: new THREE.Vector3(node.x, node.y, 0),
      size: Math.sqrt(node.weight) * 10 + 10,
      text: node.text,
    }));
  }
}
