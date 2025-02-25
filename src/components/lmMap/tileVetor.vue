<template>
  <div id="map" class="map"></div>
</template>

<script setup>
  import { onMounted } from 'vue';
  import 'ol/ol.css';
  import { Map, View } from 'ol';
  import {
    Tile as TileLayer,
    Vector as VectorLayer,
    VectorTile as VectorTileLayer,
  } from 'ol/layer';
  import { OSM, Vector as VectorSource, VectorTile as VectorTileSource } from 'ol/source';
  import GeoJSON from 'ol/format/GeoJSON';
  import { Style, Fill, Stroke } from 'ol/style';
  import { fromLonLat } from 'ol/proj';
  import MVT from 'ol/format/MVT';

  // 初始化地图
  onMounted(() => {
    // 矢量图层样式函数
    const styleFunction = (feature) => {
      const type = feature.get('type'); // 获取要素类型
      console.log('要素类型：', type, feature);
      let fillColor;
      switch (type) {
        case 'road':
          fillColor = 'rgba(73, 90, 118, 1)'; //
          break;
        case 'building':
          fillColor = 'rgba(31, 43, 62, 1)'; //
          break;
        case 'street':
          fillColor = 'rgba(0, 0, 255, 0.6)'; // 蓝色
          break;
        default:
          fillColor = 'rgba(31, 43, 62, 1)'; // 白色
      }
      return new Style({
        fill: new Fill({
          color: fillColor,
        }),
        stroke: new Stroke({
          color: '#333',
          width: 1,
        }),
      });
    };
    const tileStyleFn = (feature) => {
      const layerType = feature.get('layer');
      const properties = feature.getProperties();
      let fillColor = 'rgba(0, 0, 0, 0)'; // 默认透明
      let strokeColor = '#ffffff'; // 默认白色边界
      const classType = feature.get('class'); // 获取道路类型
      let strokeWidth = 1;

      console.log('要素类型：', layerType, properties);

      switch (layerType) {
        case 'boundary':
          strokeColor = 'rgba(255, 255, 255, 0.4)'; // 边界线
          break;
        case 'water':
          fillColor = 'rgba(25, 75, 125, 0.8)'; // 深蓝色水域
          break;
        case 'waterway':
          strokeColor = 'rgba(50, 130, 190, 0.7)'; // 亮蓝色河流
          break;
        case 'transportation': // 道路
          strokeColor = 'rgba(73, 90, 118, 1)'; // 浅灰色
          switch (classType) {
            case 'motorway': // 高速公路
              strokeColor = 'rgba(73, 90, 118, 1)'; // 橙色
              strokeWidth = 3;
              break;
            case 'motorway_link': // 高架高速
              strokeColor = 'rgba(73, 90, 118, 1)'; // 亮黄色
              strokeWidth = 2.5;
              break;
            case 'primary': // 主要道路
              strokeColor = 'rgba(255, 215, 0, 0.8)'; // 金黄色
              strokeWidth = 2;
              break;
            case 'secondary': // 次级道路
              strokeColor = 'rgba(200, 200, 200, 0.6)'; // 灰色
              strokeWidth = 1.5;
              break;
            case 'tertiary': // 三级道路
              strokeColor = 'rgba(73, 90, 118, 1)'; // 浅灰色
              strokeWidth = 1.8;
              break;
            case 'bridge': // 高架桥
              strokeColor = 'rgba(73, 90, 118, 1)'; //
              strokeWidth = 3;
              break;
            case 'bridge_motorway': // 高架高速
              strokeColor = 'rgba(73, 90, 118, 1)'; //
              strokeWidth = 3.5;
              break;
            case 'path': // 步行道
              strokeColor = 'rgba(100, 100, 100, 0.5)'; // 深灰色
              strokeWidth = 1;
              break;
            default:
              strokeColor = 'rgba(180, 180, 180, 0.6)'; // 默认道路颜色
              strokeWidth = 1;
          }
          break;
        case 'transportation_name':
          strokeColor = 'rgba(255, 255, 255, 0.8)'; // 道路名称（白色）
          break;
        case 'motorway':
          strokeColor = 'rgba(255, 140, 0, 0.8)'; // 橙色高速公路
          break;
        case 'primary':
          strokeColor = 'rgba(255, 215, 0, 0.8)'; // 金黄色主干道
          break;
        case 'secondary':
          strokeColor = 'rgba(200, 200, 200, 0.6)'; // 灰色次级道路
          break;
        case 'path':
          strokeColor = 'rgba(100, 100, 100, 0.5)'; // 深灰色步行道
          break;
        case 'building': // 建筑
          fillColor = 'rgba(31, 43, 62, 1)'; // 深灰色建筑体
          break;
        case 'park': // 公园
          fillColor = 'rgba(60, 100, 60, 0.7)'; // 暗绿色
          break;
        case 'aeroway': // 航空设施
          fillColor = 'rgba(100, 100, 120, 0.7)'; // 灰蓝色
          break;
        case 'landuse': // 土地利用
          fillColor = 'rgba(31, 43, 62, 1)'; //
          break;

        default:
          // console.log('未知的图层类型:', layerType);
          fillColor = 'rgba(255, 255, 255, 0.6)'; // 默认填充颜色
          break;
      }
      return new Style({
        fill: new Fill({ color: fillColor }),
        stroke: new Stroke({ color: strokeColor, width: strokeWidth }),
      });
    };

    // 矢量图层
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        url: '/path/to/your/data.geojson', // 替换为您的 GeoJSON 数据路径
        format: new GeoJSON(),
      }),
      style: styleFunction,
    });

    const tiandituKey = '1AwoZP4BQR5W3aUd0nlI';
    const styleJsonUrl =
      'https://api.maptiler.com/maps/basic-v2/tiles.json?key=1AwoZP4BQR5W3aUd0nlI';

    const vectorTileLayer = new VectorTileLayer({
      source: new VectorTileSource({
        format: new MVT(),
        url: `https://api.maptiler.com/tiles/v3/{z}/{x}/{y}.pbf?key=${tiandituKey}`,
      }),
      style: tileStyleFn,
    });
    // 底图图层
    const rasterLayer = new TileLayer({
      source: new OSM(),
    });

    // 创建地图
    const map = new Map({
      target: 'map',
      layers: [rasterLayer, vectorTileLayer],
      view: new View({
        center: fromLonLat([120.5, 30.5]), // 替换为您的中心坐标
        zoom: 12,
      }),
      background: 'rgba(31, 43, 62, 1)',
    });
    map.getViewport().style.background = 'rgba(31, 43, 62, 1)';

    // 添加点击事件
    map.on('singleclick', (event) => {
      map.forEachFeatureAtPixel(event.pixel, (feature) => {
        // 获取当前样式
        const currentStyle = feature.getStyle();
        // 设置新的填充颜色
        const newStyle = new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 0, 0.6)', // 黄色
          }),
          stroke: currentStyle.getStroke(),
        });
        feature.setStyle(newStyle);
      });
    });
  });
</script>

<style>
  .map {
    width: 100%;
    height: 500px;
  }
</style>
