/**
 * Created: vogdb Date: 4/30/13 Time: 6:07 PM
 */

L.Control.SelectLayers = L.Control.ActiveLayers.extend({

  _initLayout: function () {
    var className = 'leaflet-control-layers'
    var container = this._container = L.DomUtil.create('div', className)

    L.DomEvent.disableClickPropagation(container)
    if (!L.Browser.touch) {
      L.DomEvent.on(container, 'mousewheel', L.DomEvent.stopPropagation)
    } else {
      L.DomEvent.on(container, 'click', L.DomEvent.stopPropagation)
    }

    var section = this._section = L.DomUtil.create('section', className + '-list')

    if (this.options.collapsed) {
      var link = this._layersLink = L.DomUtil.create('a', className + '-toggle', container)
      link.href = '#'
      link.title = 'Layers'

      if (L.Browser.touch) {
        L.DomEvent
          .on(link, 'click', L.DomEvent.stopPropagation)
          .on(link, 'click', L.DomEvent.preventDefault)
          .on(link, 'click', this.expand, this)
      } else {
        L.DomEvent
          .on(container, 'mouseover', this.expand, this)
          .on(container, 'mouseout', this.collapse, this)
        L.DomEvent.on(link, 'focus', this.expand, this)
      }

      this._map.on('movestart', this.collapse, this)
    } else {
      this.expand()
    }

    this._baseLayersList = L.DomUtil.create('select', className + '-base', section)
    L.DomEvent.on(this._baseLayersList, 'change', this._onBaseLayerOptionChange, this)

    this._separator = L.DomUtil.create('div', className + '-separator', section)

    this._overlaysList = L.DomUtil.create('select', className + '-overlays', section)
    this._overlaysList.setAttribute('multiple', true)
    //extend across the width of the container
    this._overlaysList.style.width = '100%'
    L.DomEvent.on(this._overlaysList, 'change', this._onOverlayLayerOptionChange, this)

    container.appendChild(section)
  }

  ,_onBaseLayerOptionChange: function () {
    var selectedLayerIndex = this._baseLayersList.selectedIndex
    var selectedLayerOption = this._baseLayersList.options[selectedLayerIndex]
    var selectedLayer = this._getLayer(selectedLayerOption.layerId)

    this._changeBaseLayer(selectedLayer)
  }

  ,_changeBaseLayer: function (layerObj) {
    this._handlingClick = true

    this._map.addLayer(layerObj.layer)
    this._map.removeLayer(this._activeBaseLayer.layer)
    this._map.setZoom(this._map.getZoom())
    this._map.fire('baselayerchange', {layer: layerObj.layer})
    this._activeBaseLayer = layerObj

    this._handlingClick = false
  }

  ,_onOverlayLayerOptionChange: function (e) {
    //Note. Don't try to implement this function through .selectedIndex
    //or delegation of click event. These methods have bunch of issues on Android devices.
    this._handlingClick = true

    var options = this._overlaysList.options
    for (var i = 0; i < options.length; i++) {
      var option = options[i]
      var layer = this._getLayer(option.layerId).layer
      if (option.selected) {
        if (!this._map.hasLayer(layer)) {
          this._map.addLayer(layer)
        }
      } else {
        if (this._map.hasLayer(layer)) {
          this._map.removeLayer(layer)
        }
      }
    }

    this._handlingClick = false
  }

  ,_addItem: function (obj) {
    var option = this._createOptionElement(obj)
    if (obj.overlay) {
      this._overlaysList.appendChild(option)
    } else {
      this._baseLayersList.appendChild(option)
    }
  }

  ,_createOptionElement: function (obj) {
    var option = document.createElement('option')
    option.layerId = L.stamp(obj.layer)
    option.innerHTML = obj.name
    if (this._map.hasLayer(obj.layer)) {
      option.setAttribute('selected', true)
    }
    return option
  }

})

L.control.selectLayers = function (baseLayers, overlays, options) {
  return new L.Control.SelectLayers(baseLayers, overlays, options)
}
