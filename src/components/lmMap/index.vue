<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { LineString } from 'ol/geom';
import { Feature } from 'ol';
import { Style, Stroke, Fill } from 'ol/style';
import worldGeoJsonZh from '@surbowl/world-geo-json-zh/world.zh.json';

const mapContainer = ref(null);

onMounted(() => {
  const vectorSource = new VectorSource({
    features: new GeoJSON().readFeatures(worldGeoJsonZh, {
      featureProjection: 'EPSG:3857', // 投影坐标系
    }),
  });
  // 创建矢量图层
  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: (feature) => {
      const name = feature.get('name');
      if (name && name.includes('海南')) {
        // 海南省及其周边岛屿的样式
        return new Style({
          fill: new Fill({
            color: 'rgba(255, 0, 0, 0.5)', // 红色填充，透明度50%
          }),
          stroke: new Stroke({
            color: '#ff0000', // 红色边框
            width: 2,
          }),
        });
      } else {
        // 其他区域的默认样式
        return new Style({
          fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)', // 蓝色填充，透明度10%
          }),
          stroke: new Stroke({
            color: '#0000ff', // 蓝色边框
            width: 1,
          }),
        });
      }
    },
  });
  const map = new Map({
    target: mapContainer.value,
    layers: [
      new TileLayer({
        source: new OSM(), // 使用 OpenStreetMap 作为底图
      }),
      vectorLayer
      // new VectorLayer({
      //   // source: new VectorSource({
      //   //   url: '/china.geojson', // 你的 GeoJSON 数据
      //   //   format: new GeoJSON(),
      //   // }),
      //   source: new VectorSource({
      //     features: new GeoJSON().readFeatures(worldGeoJsonZh, {
      //       featureProjection: 'EPSG:3857', // 投影坐标系
      //     }),
      //   }),
      //   style: new Style({
      //     fill: new Fill({ color: 'rgba(0, 0, 255, 0.1)' }),
      //     stroke: new Stroke({ color: '#0000ff', width: 1 }),
      //   }),
      // }),
    ],
    view: new View({
      center: [120.5, 30.5], // 北京坐标
      zoom: 7,
      projection: 'EPSG:4326', // 使用 WGS84 坐标系
    }),
  });
  const routeCoordinates = [
    [120.2, 30.3], // 杭州
    [120.5, 30.5],
    [121.0, 30.8],
    [121.3, 31.0],
    [121.5, 31.2], // 上海
  ];
  const routeFeature = new Feature({
    geometry: new LineString(routeCoordinates),
  });
  routeFeature.setStyle(
    new Style({
      stroke: new Stroke({
        color: 'red', // 轨迹颜色
        width: 3, // 轨迹宽度
        // lineDash: [10, 5], // 轨迹虚线
      }),
    })
  );
  const routeLayer = new VectorLayer({
    source: new VectorSource({
      features: [routeFeature],
    }),
  });

  map.addLayer(routeLayer);
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 500px;
}
</style>
