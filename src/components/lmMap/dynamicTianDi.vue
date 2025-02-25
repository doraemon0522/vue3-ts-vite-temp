<template>
  <div ref="mapContainer" style="width: 100%; height: 500px"></div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import 'ol/ol.css';
  import Map from 'ol/Map';
  import View from 'ol/View';
  import { fromLonLat } from 'ol/proj';
  import TileLayer from 'ol/layer/Tile';
  import VectorTileLayer from 'ol/layer/VectorTile';
  import VectorTileSource from 'ol/source/VectorTile';
  import MVT from 'ol/format/MVT';
  import { applyStyle } from 'ol-mapbox-style';
  import layerJSON from './layerJson.json';
  import XYZ from 'ol/source/XYZ';
  import { Style, Fill, Stroke } from 'ol/style';
  //  import {
  //   Tile as TileLayer,
  //   Vector as VectorLayer,
  //   VectorTile as VectorTileLayer,
  // } from 'ol/layer';

  const mapContainer = ref(null);
  let map;

  onMounted(() => {
    const apiKey = '1AwoZP4BQR5W3aUd0nlI';
    console.log('sss', layerJSON);

    // Create map
    map = new Map({
      target: mapContainer.value,
      view: new View({
        center: fromLonLat([120.5, 30.5]),
        zoom: 13,
      }),
    });

    // Log to confirm map creation
    console.log('Map created:', map);

    const vectorTileSource = new VectorTileSource({
      format: new MVT(),
      url: `https://api.maptiler.com/tiles/v3/{z}/{x}/{y}.pbf?key=${apiKey}`,
      maxZoom: 14,
    });

    console.log('Vector Tile Source:', vectorTileSource);

    const vectorTileLayer = new VectorTileLayer({
      source: vectorTileSource,
    });

    vectorTileSource.on('tileloadend', (event) => {
      const tile = event.tile;
      const features = tile.getFeatures();
      features.forEach((feature) => {
        console.log('sss', feature.getProperties());
      });
    });

    map.addLayer(vectorTileLayer);
    // const backgroundLayer = new TileLayer({
    //   source: new XYZ({
    //     url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    //   }),
    //   style: new Style({
    //     fill: new Fill({
    //       color: '#222222', // Dark background color
    //     }),
    //   }),
    // });
    // map.addLayer(backgroundLayer);

    // Apply Mapbox style
    applyStyle(vectorTileLayer, {
      // Mapbox style configuration
      version: 8,
      sources: {
        osm: {
          type: 'vector',
          tiles: [`https://api.maptiler.com/tiles/v3/{z}/{x}/{y}.pbf?key=${apiKey}`],
          minzoom: 0,
          maxzoom: 14,
        },
      },
      layers: [
        // Style layers as defined
        {
          id: 'Path minor',
          type: 'line',
          source: 'osm',
          'source-layer': 'transportation',
          minzoom: 15,
          paint: {
            'line-color': '#354865',
            'line-width': 5,
          },
          filter: ['==', 'class', 'minor'],
        },
        {
          id: 'motorway',
          type: 'line',
          source: 'osm',
          'source-layer': 'transportation',
          minzoom: 6,
          filter: ['in', 'class', 'motorway', 'motorway_construction'],
          // filter: ['==', 'class', 'motorway'], // 只选择高速公路+施工高速段
          paint: {
            'line-color': [
              'case',
              ['==', ['get', 'class'], 'motorway_construction'],
              '#354889', // 高速施工段（深蓝紫）
              '#354865', // 正常高速（深蓝灰）
            ],
            // 'line-color': '#354865', // 高速公路橙色
            'line-width': [
              'interpolate',
              ['linear'],
              ['zoom'],
              6,
              2, // 缩放等级6，线宽2px
              12,
              6, // 缩放等级12，线宽6px
              16,
              12, // 缩放等级16，线宽12px
            ],
            'line-opacity': 0.9,
          },
        },
        {
          id: 'motorway-ramp',
          type: 'line',
          source: 'osm',
          'source-layer': 'transportation',
          minzoom: 10,
          filter: [
            'all',
            ['==', 'class', 'motorway'],
            ['==', 'ramp', 1], // 只选匝道
          ],
          paint: {
            'line-color': '#354865', // 匝道用黄色
            'line-width': [
              'interpolate',
              ['linear'],
              ['zoom'],
              10,
              1, // 缩放等级10，线宽1px
              12,
              3, // 缩放等级12，线宽3px
              16,
              8, // 缩放等级16，线宽8px
            ],
            'line-dasharray': [2, 2], // 匝道使用虚线
            'line-opacity': 0.8,
          },
        },
        {
          id: 'motorway-oneway-arrow',
          type: 'symbol',
          source: 'osm',
          'source-layer': 'transportation',
          minzoom: 14,
          filter: [
            'all',
            ['==', 'class', 'motorway'],
            ['==', 'oneway', 1], // 只选单行道
          ],
          layout: {
            'symbol-placement': 'line',
            'icon-image': 'oneway-arrow', // 需要 Mapbox Sprite 里有这个箭头图标
            'icon-size': 0.8,
            'icon-rotate': 0,
          },
        },
        // 主干
        {
          id: 'trunk',
          type: 'line',
          source: 'osm',
          'source-layer': 'transportation',
          minzoom: 6,
          filter: ['==', 'class', 'trunk'], // 选取主干道
          paint: {
            'line-color': '#354865', // 主干道颜色（比高速略浅）
            'line-width': [
              'interpolate',
              ['linear'],
              ['zoom'],
              6,
              1.5, // 缩放等级6，线宽1.5px
              12,
              5, // 缩放等级12，线宽5px
              16,
              10, // 缩放等级16，线宽10px
            ],
            'line-opacity': 0.9,
          },
        },
        {
          id: 'trunk-ramp',
          type: 'line',
          source: 'osm',
          'source-layer': 'transportation',
          minzoom: 10,
          filter: [
            'all',
            ['==', 'class', 'trunk'],
            ['==', 'ramp', 1], // 只选主干道匝道
          ],
          paint: {
            'line-color': '#354865', // 匝道黄色
            'line-width': [
              'interpolate',
              ['linear'],
              ['zoom'],
              10,
              1, // 缩放等级10，线宽1px
              12,
              2.5, // 缩放等级12，线宽2.5px
              16,
              6, // 缩放等级16，线宽6px
            ],
            'line-dasharray': [3, 3], // 主干匝道虚线
            'line-opacity': 0.8,
          },
        },
        {
          id: 'trunk-oneway-arrow',
          type: 'symbol',
          source: 'osm',
          'source-layer': 'transportation',
          minzoom: 14,
          filter: [
            'all',
            ['==', 'class', 'trunk'],
            ['==', 'oneway', 1], // 只选单行道
          ],
          layout: {
            'symbol-placement': 'line',
            'icon-image': 'oneway-arrow', // 需要在 Mapbox Sprite 里提供箭头图标
            'icon-size': 0.7,
            'icon-rotate': 0,
          },
        },
        // 比trunk略细的道路
        {
          id: 'primary-road',
          type: 'line',
          source: 'osm',
          'source-layer': 'transportation',
          minzoom: 6,
          filter: ['==', 'class', 'primary'], // 主要道路
          paint: {
            'line-color': '#ffcc66', // 主要道路颜色（比 trunk 更柔和）
            'line-width': [
              'interpolate',
              ['linear'],
              ['zoom'],
              6,
              1.2, // 缩放等级6，线宽1.2px
              12,
              4, // 缩放等级12，线宽4px
              16,
              8, // 缩放等级16，线宽8px
            ],
            'line-opacity': 0.85,
          },
        },
        {
          id: 'primary-oneway-arrow',
          type: 'symbol',
          source: 'osm',
          'source-layer': 'transportation',
          minzoom: 14,
          filter: [
            'all',
            ['==', 'class', 'primary'],
            ['==', 'oneway', 1], // 只选单向道路
          ],
          layout: {
            'symbol-placement': 'line',
            'icon-image': 'oneway-arrow', // 需要在 Mapbox Sprite 里提供箭头图标
            'icon-size': 0.6,
            'icon-rotate': 0,
          },
        },
        // 比primary略细的道路
        {
          id: 'secondary-road',
          type: 'line',
          source: 'osm',
          'source-layer': 'transportation',
          minzoom: 8,
          filter: ['==', 'class', 'secondary'], // 选中次要道路
          paint: {
            'line-color': 'red', // 次要道路颜色（比 primary 更浅）
            'line-width': [
              'interpolate',
              ['linear'],
              ['zoom'],
              8,
              1, // 缩放等级8，线宽1px
              12,
              2.5, // 缩放等级12，线宽2.5px
              16,
              5, // 缩放等级16，线宽5px
            ],
            'line-opacity': 0.85,
          },
        },
        {
          id: 'secondary-road-label',
          type: 'symbol',
          source: 'osm',
          'source-layer': 'transportation_name',
          minzoom: 12,
          filter: ['==', 'class', 'secondary'],
          layout: {
            'text-field': ['get', 'name'], // 获取道路名称
            'text-font': ['Noto Sans Regular'],
            'text-size': ['interpolate', ['linear'], ['zoom'], 12, 10, 16, 14],
            'symbol-placement': 'line',
          },
          paint: {
            'text-color': '#666666', // 文字颜色
            'text-halo-color': '#ffffff',
            'text-halo-width': 2,
          },
        },

        {
          id: 'roads',
          type: 'line',
          source: 'osm',
          'source-layer': 'transportation',
          paint: {
            'line-color': '#354865',
            'line-width': 2,
          },
        },

        {
          id: 'water', // 河流/湖泊
          type: 'fill',
          source: 'osm',
          'source-layer': 'water',
          paint: {
            'fill-color': '#3399ff', // 河流/湖泊颜色
            'fill-opacity': 0.7, // 水体填充透明度
          },
        },
        {
          id: 'buildings', // 建筑物
          type: 'fill',
          source: 'osm',
          'source-layer': 'building',
          paint: {
            'fill-color': '#6666ff', // 建筑物填充颜色
            'fill-opacity': 0.5, // 建筑物填充透明度
          },
        },
        // {
        //   id: 'parks', // 公园区域
        //   type: 'fill',
        //   source: 'osm',
        //   'source-layer': 'landuse',
        //   paint: {
        //     'fill-color': '#00cc66', // 公园颜色
        //     'fill-opacity': 0.6, // 公园填充透明度
        //   },
        // },
      ],
    });
  });
</script>

<style>
  .ol-viewport {
    /* 直接强制设置背景 */
    background-color: #152031 !important;
  }
</style>
