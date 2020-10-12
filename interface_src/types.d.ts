import { FeatureGroup } from 'leaflet';

export interface GeoJsonGeometry {
  type: string,
  coordinates: number[],
}

export interface GeoJsonFeature {
  type: string,
  properties: object,
  geometry: GeoJsonGeometry,
}

export interface GeoJsonFeatureCollection {
  type: string,
  features: GeoJsonFeature[],
}

export interface Style {
  key: number,
  fillColor: string,
  edgeColor: string,
  fillOpacity: number,
  edgeOpacity: number,
  weight: number,
  radius: number,
}

export interface MapLayer {
  name: string,
  key: number,
  featureGroup: FeatureGroup,
  hidden: boolean,
  style: Style,
}