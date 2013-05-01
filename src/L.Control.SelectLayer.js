/**
 * Created: vogdb Date: 4/30/13 Time: 6:07 PM
 */

L.Control.SelectLayers = L.Control.Layers.extend({
    _initLayout:function () {
        L.Control.Layers.prototype._initLayout.call(this)

        this.currentBaseLayer = this._findCurrentBaseLayer()

        //replace this._baseLayersList <div> on the <select>
        var savedClassName = this._baseLayersList.className
        this._form.removeChild(this._baseLayersList)
        this._baseLayersList = L.DomUtil.create('select', savedClassName)
        this._form.insertBefore(this._baseLayersList, this._form.firstChild)
        L.DomEvent.on(this._baseLayersList, 'change', this._onBaseLayerOptionChange, this)
    },

    _onBaseLayerOptionChange:function () {
        var selectedLayerIndex = this._baseLayersList.selectedIndex
        var selectedLayerOption = this._baseLayersList.options[selectedLayerIndex]
        var selectedLayer = this._layers[selectedLayerOption.layerId]

        this._changeBaseLayer(selectedLayer.layer)
    },

    _changeBaseLayer:function (layer) {
        //to be compatible with parent
        this._handlingClick = true;

        this._map.addLayer(layer)
        this._map.removeLayer(this.currentBaseLayer)
        this._map.setZoom(this._map.getZoom());
        this._map.fire('baselayerchange', {layer:layer});
        this.currentBaseLayer = layer

        //to be compatible with parent
        this._handlingClick = false;
    },

    _findCurrentBaseLayer:function () {
        var layers = this._layers
        for (var layerKey in layers) {
            if (!layers[layerKey].overlay) {
                return layers[layerKey].layer
            }
        }
        throw new Error('Control doesn\'t have any layers!')
    },

    _addItem:function (obj) {
        if (obj.overlay) {
            //overlay items is handled the same as before
            return L.Control.Layers.prototype._addItem.call(this, obj)
        } else {
            var option = this._createOptionElement(obj)
            this._baseLayersList.appendChild(option)
        }
    },

    _createOptionElement:function (obj) {
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
    return new L.Control.SelectLayers(baseLayers, overlays, options);
};
