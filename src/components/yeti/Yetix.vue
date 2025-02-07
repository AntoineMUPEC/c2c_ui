<script>
/**
 * Yetix
 * State management component for Yeti (VueX inspired)
 *
 * - Read-only state
 * - State mutations can only occur here
 * - Actions call API
 */

import axios from 'axios';
import Vue from 'vue';

let defaultState = {
  API_URL: 'https://api.ensg.eu/',
  DANGER_MAX_WHEN_MRD: 3,
  VALID_MINIMUM_MAP_ZOOM: 13,

  activeTab: 0,

  bra: {
    high: null,
    low: null,
    altiThreshold: null,
    isDifferent: false,
  },

  method: {
    type: null,
    orientation: [],
    potentialDanger: null,
    wetSnow: false,
    groupSize: 1,
  },

  areas: [],
  areaOk: true,
  showAreas: false,

  features: [],
  featuresTitle: 'New route',
  featuresLength: 0,

  mountains: {
    all: [],
    visible: [],
  },
  bulletinsLoaded: false,
  showAvalancheBulletins: false,

  mapZoom: 0,
  drawingMode: false,

  validSimplifyTolerance: false,
};

/**
 * Read-only reactive state
 *
 * A copy of `defaultState` without reference (to be able to reset default state)
 */
let state = Vue.observable(JSON.parse(JSON.stringify(defaultState)));

/**
 * Exported state
 *
 * Computed act as getters for read-only state properties
 * Methods act as mutations (to mutate state) or actions (api calls)
 */
export default new Vue({
  computed: {
    DANGER_MAX_WHEN_MRD() {
      return state.DANGER_MAX_WHEN_MRD;
    },
    VALID_MINIMUM_MAP_ZOOM() {
      return state.VALID_MINIMUM_MAP_ZOOM;
    },
    activeTab() {
      return state.activeTab;
    },
    bra() {
      return state.bra;
    },
    method() {
      return state.method;
    },
    areas() {
      return state.areas;
    },
    areaOk() {
      return state.areaOk;
    },
    showAreas() {
      return state.showAreas;
    },
    features() {
      return state.features;
    },
    hasFeatures() {
      return !!state.features.length;
    },
    featuresTitle() {
      return state.featuresTitle;
    },
    featuresLength() {
      return state.featuresLength;
    },
    mountains() {
      return state.mountains;
    },
    bulletinsLoaded() {
      return state.bulletinsLoaded;
    },
    showAvalancheBulletins() {
      return state.showAvalancheBulletins;
    },
    mapZoom() {
      return state.mapZoom;
    },
    drawingMode() {
      return state.drawingMode;
    },
    validSimplifyTolerance() {
      return state.validSimplifyTolerance;
    },
  },
  methods: {
    // mutations
    setActiveTab(index) {
      state.activeTab = index;
    },
    setBra(prop, value) {
      state.bra[prop] = value;
    },
    setMethod(prop, value) {
      state.method[prop] = value;
    },
    setAreas(areas) {
      state.areas = areas;
    },
    setAreaOk(areaOk) {
      state.areaOk = areaOk;
    },
    setShowAreas(showAreas) {
      state.showAreas = showAreas;
    },
    setFeatures(features) {
      state.features = features;
    },
    setFeaturesTitle(featuresTitle) {
      state.featuresTitle = featuresTitle;
    },
    setFeaturesLength(featuresLength) {
      state.featuresLength = featuresLength;
    },
    setAllMountains(mountains) {
      state.mountains.all = mountains;
    },
    setVisibleMountains(mountains) {
      state.mountains.visible = mountains;
    },
    setShowAvalancheBulletins(showAvalancheBulletins) {
      state.showAvalancheBulletins = showAvalancheBulletins;
    },
    setBulletinsLoaded(bool) {
      state.bulletinsLoaded = bool;
    },
    setMapZoom(mapZoom) {
      state.mapZoom = mapZoom;
    },
    setDrawingMode(drawingMode) {
      state.drawingMode = drawingMode;
    },
    setValidSimplifyTolerance(validSimplifyTolerance) {
      state.validSimplifyTolerance = validSimplifyTolerance;
      // when validSimplifyTolerance is OK
      // check state for drawingMode:
      // if it's on, store it (tmp), and retrieve state later
      if (validSimplifyTolerance) {
        if (state.drawingMode) {
          state.tmpDrawingMode = true;
          this.setDrawingMode(false);
        }
      } else {
        if (state.tmpDrawingMode) {
          this.setDrawingMode(true);
          delete state.tmpDrawingMode;
        }
      }
    },
    setDefault() {
      // revert all state properties to default
      for (let i in state) {
        if (typeof state[i] === 'object' && !Array.isArray(state[i])) {
          for (let j in state[i]) {
            state[i][j] = defaultState[i][j];
          }
        } else {
          state[i] = defaultState[i];
        }
      }
    },
    // actions
    fetchApi(url) {
      return axios.get(state.API_URL + url);
    },
    fetchAreas() {
      return this.fetchApi('yeti-extent');
    },
    fetchMountains() {
      return this.fetchApi('zonesbra');
    },
    fetchBulletins() {
      return this.fetchApi('bra');
    },
  },
});
</script>
