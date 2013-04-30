/**
 * Created: vogdb Date: 4/30/13 Time: 6:07 PM
 */

L.Control.SelectLayers = L.Control.Layers.extend({

})

L.control.selectLayers = function (baseLayers, overlays, options) {
	return new L.Control.SelectLayers(baseLayers, overlays, options);
};
