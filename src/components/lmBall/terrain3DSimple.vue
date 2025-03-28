<template>
  <div id="cesiumContainer" ref="containerRef" style="height: 500px; width: 500px"></div>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import * as Cesium from 'cesium';
  import * as THREE from 'three';
  /**
   * @description: 3D球体 调试成功版
   */

  const containerRef = ref(null);
  const viewer = ref(null);
  const addThreeJSModel = (viewer) => {
    const scene = viewer.scene;
    const threeScene = new THREE.Scene();

    const geometry = new THREE.SphereGeometry(500, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const sphere = new THREE.Mesh(geometry, material);
    threeScene.add(sphere);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    threeScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    threeScene.add(directionalLight);
  };

  onMounted(async () => {
    if (!containerRef.value) return;
    Cesium.Ion.defaultAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMDM0MzE0ZS0xODkxLTRiYTYtODg0ZC1hZGEwNDJhMmE4ZTIiLCJpZCI6MjgyMTUyLCJpYXQiOjE3NDEzMzY3Nzd9.Tc5b_Aq7-wo_oOskCKgTmQqXzu4Qtg5fYxzQdesiG4Q';

    const viewer = new Cesium.Viewer('cesiumContainer', {
      shouldAnimate: true,
      animation: false, // 关闭动画控件
      baseLayerPicker: false, // 关闭底图选择器
      fullscreenButton: false, // 关闭全屏按钮
      vrButton: false, // 关闭VR模式
      geocoder: false, // 关闭地理编码搜索框
      homeButton: false, // 关闭主页按钮
      infoBox: false, // 关闭信息框
      sceneModePicker: false, // 关闭视角模式选择器
      selectionIndicator: false, // 关闭选中指示器
      timeline: false, // 关闭时间轴
      navigationHelpButton: false, // 关闭导航帮助按钮
      navigationInstructionsInitiallyVisible: false, // 关闭导航说明
    });
    viewer.cesiumWidget.creditContainer.style.display = 'none';
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(120.1551, 30.2741, 3000), // 杭州坐标
      orientation: {
        heading: Cesium.Math.toRadians(0), // 朝北
        pitch: Cesium.Math.toRadians(-30), // 俯视角度
        roll: 0,
      },
      duration: 1, // 飞行时间 3 秒
    });
  });
</script>
