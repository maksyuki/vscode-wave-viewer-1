export function parserDataFromJSON(_signalData) {
    if (_signalData.constructor !== Object) {
        throw new Error('Data in invalid format (should be dictionary and is ' + _signalData + ')');
    }
    this.allData = _signalData;
    var maxT = 0;
    var rowRenderers = this.rowRenderers;
    function findRendererAndDiscoverMaxT(d) {
        var dData = d.signal;
        for(let i = 0; i < dData.length; ++i) {
            
        }
        if (dData && dData.length) {
            var lastTimeInData = dData[dData.length - 1][0];
            maxT = Math.max(maxT, lastTimeInData);
        }
        var signalType = d.type;
        console.log(signalType);
        for (var i = 0; i < rowRenderers.length; i++) {
            var renderer = rowRenderers[i];
            if (renderer.select(signalType)) {
                var formatter = signalType.formatter;
                console.log(formatter);
                if (!formatter) {
                    formatter = renderer.DEFAULT_FORMAT;
                } else if (typeof formatter === 'string') {
                    formatter = renderer.FORMATTERS[formatter];
                    if (!formatter) {
                        throw new Error("Formatter value invalid " + signalType.formatter + "(" + d.name + ")");
                    }
                }
                signalType.formatter = formatter;
                signalType.renderer = renderer;
                break;
            }
        }
        if (!signalType.renderer) {
            throw new Error('None of installed renderers supports signalType:' + signalType);
        }

        (d.children || d._children || []).forEach(findRendererAndDiscoverMaxT);
    }
    findRendererAndDiscoverMaxT(this.allData);

    var sizes = this.sizes;
    this.xRange[1] = sizes.row.range[1] = maxT;
    this.setZoom();
    var ROW_Y = sizes.row.height + sizes.row.ypadding;
    var graph = this;
    if (!this.treelist) {
        this.treelist = new TreeList(ROW_Y, this.labelContextMenu)
            .onChange(function(selection) {
                graph.data = selection.map((d) => { return d.data; }); // very important!!!
                graph.draw();
            });
    }
    this.setSizes();
    this.treelist.data(this.allData);
}