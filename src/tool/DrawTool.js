import { jsPlumb, toolkit } from "jsplumb"

let connectorPaintStyle = {
    strokeWidth: 1,
    stroke: "#61B7CF",
    joinstyle: "round",
    outlineStroke: "white",
    outlineWidth: 1,
}

let connectorHoverStyle = {
    strokeWidth: 2,
    stroke: "#216477",
    outlineWidth: 2,
    outlineStroke: "white",
}
let endpointHoverStyle = {
    fill: "#216477",
    stroke: "#216477"
}
let targetEndpoint = {
    endpoint: "Dot",
    paintStyle: { fill: "#7AB02C", radius: 7 },
    hoverPaintStyle: endpointHoverStyle,
    maxConnections: -1,
    dropOptions: { hoverClass: "hover", activeClass: "active" },
    isTarget: true,
    uniqueEndpoint: false,
    overlays: [
        [ "Label", { location: [0.5, -0.5], label: "Drop", cssClass: "endpointTargetLabel", visible:false } ]
    ]
}
let sourceEndpoint = {
    endpoint: "Dot",
    paintStyle: {
        stroke: "#7AB02C",
        fill: "#FFF",
        radius: 6,
        strokeWidth: 1,
    },
    isSource: true,
    uniqueEndpoint: false,
    maxConnections: -1,
    connector: [ "Flowchart", {  gap: 5, cornerRadius: 5, alwaysRespectStubs: true } ],
    connectorStyle: connectorPaintStyle,
    hoverPaintStyle: endpointHoverStyle,
    connectorHoverStyle: connectorHoverStyle,
    dragOptions: {},
    overlays: [
        [ "Label", {
            location: [0.5, 1.5],
            label: "Drag",
            cssClass: "endpointSourceLabel",
            visible:false
        } ]
    ]
}


let initConfig = {
    DragOptions: { cursor: 'pointer', zIndex: 2000 },
    ConnectionsDetachable: false,
    ConnectionOverlays: [
        [ "Arrow", {
            location: 1,
            visible:true,
            width:11,
            length:11,
            id:"ARROW",
        } ],
        [ "Label", {
            location: 0.5,
            id: "label",
            cssClass: "aLabel",
        }]
    ]
}

class DrawTool {
    constructor(container) {
        this.instance = jsPlumb.getInstance(initConfig)
        this.instance.setContainer(container)
    }

    addDraggable(target) {
        this.instance.draggable(jsPlumb.getSelector(target));
    }

    addEndpoints(target, type) {
        let style = type === "target" ? targetEndpoint : sourceEndpoint
        // let anchors = type === "target" ? ["Left","Right","Top","Bottom"] : ["Right","Left","Top","Bottom"]
        this.instance.addEndpoint(target, style, { anchor: [0, 0, 0, -1] });

        this.instance.makeSource(target + "-anchor", style);
        this.instance.makeTarget(target + "-anchor", style);
    }

    delConnects() {
        this.instance.deleteEveryConnection()
    }

    addConnects(source, target, config) {
        let connection = this.instance.connect({
            source:source,
            target:target,
        })

        if (config.color) {
            let style = JSON.parse(JSON.stringify(connection.getPaintStyle()))
            style.stroke = config.color
            connection.setPaintStyle(style)
        }

        if(config.label) {
            connection.getOverlay("label").setLabel(config.label + ' <i class="fa fa-trash-o fa-lg"></i>');

            if(config.callback && typeof(config.callback) === "function") {
                connection.getOverlay("label").bind("click", (c)=>{
                    config.callback(c);
                })
            }
        }
    }
}

export default DrawTool;