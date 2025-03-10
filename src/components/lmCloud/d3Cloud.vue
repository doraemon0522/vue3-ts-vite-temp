<template>
  <div ref="svgRef" style="height: 500px; width: 500px"></div>
</template>
<script lang="ts" setup>
  import * as d3 from 'd3';
  import { onMounted, ref } from 'vue';
  const svgRef = ref<SVGSVGElement | null>(null);
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

  onMounted(() => {
    const width = 500; // SVG宽度
    const height = 500; // SVG高度
    const svg = d3
      .select(svgRef.value)
      .append('svg')
      .attr('class', 'cloud-svg')
      .attr('width', width)
      .attr('height', height);

    // 为词云设置一个力学模拟
    const force = d3
      .forceSimulation(words)
      .force('x', d3.forceX(width / 2).strength(0.05)) // 吸引到中心
      .force('y', d3.forceY(height / 2).strength(0.05)) // 吸引到中心
      .force(
        'collide',
        d3.forceCollide((d) => d.size + 15),
      ) // 碰撞力，保证词云之间的间隙
      .alpha(1) // 激活alpha，使得模拟从开始时就有动力
      .alphaDecay(0.009) // 控制衰减速度，确保模拟在一段时间内继续进行
      .on('tick', ticked) // 每次力学模拟更新时执行 ticked 函数
      .restart(); // 启动模拟

    // 渲染单词文本
    const wordElements = svg
      .selectAll('text')
      .data(words)
      .enter()
      .append('text')
      .attr('class', 'word')
      .attr('font-size', (d) => d.size)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('fill', 'white')
      .text((d) => d.text)
      // 随机初始化位置，避免词云初始时都在同一位置
      .attr('x', () => Math.random() * width)
      .attr('y', () => Math.random() * height);

    // 动画和位移更新
    function ticked() {
      wordElements
        .attr('x', (d) => d.x)
        .attr('y', (d) => d.y)
        .transition()
        .ease(d3.easeExpIn) // d3.easeExpIn前缓后快，所有类型参考： https://d3js.org/d3-ease#d3-ease
        .duration(50) // 每次更新动画持续1秒
        .on('end', () => {
          force.alpha(1); // 保证模拟不会停止
          force.restart(); // 重启模拟以保证循环进行
        });
    }
  });
</script>
