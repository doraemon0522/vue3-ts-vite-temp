<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Stroke, Style } from "ol/style";
import GeoJSON from "ol/format/GeoJSON";
import OSM from "ol/source/OSM";


const mapContainer = ref(null);

onMounted(() => {
  const tiandituKey = 'afabdb265f942ad197869a262283b08d';
  // 创建天地图矢量底图图层
const vectorLayer = new TileLayer({
  source: new XYZ({
    url: `https://t7.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${tiandituKey}`,
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
  }),
});
const annotationLayer = new TileLayer({
  source: new XYZ({
    url: `https://t7.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${tiandituKey}`,
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
  }),
});

  const map = new Map({
    target: mapContainer.value,
    layers: [vectorLayer, annotationLayer],
    view: new View({
      center: [120.5, 30.5], // 设置合适的中心点
      zoom: 8,
      projection: "EPSG:4326",
    }),
  });


});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 500px;
}
</style>
