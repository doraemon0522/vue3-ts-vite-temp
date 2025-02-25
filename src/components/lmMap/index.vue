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

import L from "leaflet";
import "leaflet/dist/leaflet.css";

const mapContainer = ref(null);
const geojsonObject = {
	"type": "Feature",
	"properties": {
		"name": "十段线",
		"name_en": "Nine-dash_line"
	},
	"geometry": {
		"type": "MultiLineString",
		"coordinates": [
			[
				[109.51763678906526, 16.360467782665847],
				[109.72339159230361, 16.05587198177934],
				[109.8780414893003, 15.766823920473868],
				[109.96506402665503, 15.526031073258686],
				[109.98526818797363, 15.335615618596712]
			],
			[
				[110.48331454715199, 12.431407837351566],
				[110.48240767589328, 12.085792287259398],
				[110.45136562643113, 11.863835000833953],
				[110.25652028695671, 11.393616070326182]
			],
			[
				[108.3388949586325, 7.26656318024262],
				[108.30727608084116, 6.727803403200289],
				[108.35631901989032, 6.112648053307836]
			],
			[
				[111.94112275674237, 3.553559321848772],
				[112.40151782268552, 3.646409974664658],
				[112.92104341055976, 3.845112027649191]
			],
			[
				[115.69079809651517, 7.29016984601141],
				[116.4095482213759, 8.137962397303875]
			],
			[
				[118.63503455703679, 11.080904139262175],
				[118.85587024190139, 11.457907321145406],
				[119.10128629647166, 12.062751715859875],
				[119.12181771101825, 12.135585760471585]
			],
			[
				[119.60808384544805, 18.143451232827125],
				[119.91075760817219, 18.77194701315816],
				[120.11918953031866, 19.117669954512905]
			],
			[
				[121.40591812413318, 20.8001943859176],
				[122.12216430894797, 21.716094829922323]
			],
			[
				[122.80328441666389, 23.665545127578547],
				[123.00481138309124, 24.74934291726869]
			],
			[
				[119.16836075308866, 15.107448879733406],
				[119.16981236678279, 15.755038547478351],
				[119.17823197590195, 16.265658015720753]
			]
		]
	}
}

onMounted(() => {
  // const leafMap = L.map(mapContainer.value).setView([39.9042, 116.4074], 12);
  // L.tileLayer("https://t7.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png", {
  //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
  //   subdomains: "abcd",
  //   maxZoom: 20
  // }).addTo(leafMap);
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


  // const baseLayer = new TileLayer({
  //   source: new XYZ({
  //     url: "http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=afabdb265f942ad197869a262283b08d",
  //   }),
  // });
  // const baseLayer = new TileLayer({
  //   source: new OSM(),
  // });
  const map = new Map({
    target: mapContainer.value,
    layers: [vectorLayer, annotationLayer],
    view: new View({
      center: [120.5, 30.5], // 设置合适的中心点
      zoom: 8,
      projection: "EPSG:4326",
    }),
  });
//   const southChinaSeaLayer = new VectorLayer({
//     source: new VectorSource({
//       features: new GeoJSON().readFeatures(geojsonObject, {
//         featureProjection: map.getView().getProjection(), // 将 GeoJSON 投影到地图投影
//       }),
//     }),
//     style: new Style({
//       stroke: new Stroke({
//         color: "red",
//         width: 2,
//         lineDash: [10, 5],
//       }),
//     }),
//   });


// map.addLayer(southChinaSeaLayer);

});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 500px;
}
</style>
