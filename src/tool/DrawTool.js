import { jsPlumb, toolkit } from "jsplumb"

let connectorPaintStyle = {
    strokeWidth: 1,
    stroke: "#61B7CF",
    joinstyle: "round",
    outlineStroke: "white",
    outlineWidth: 1,
}

let peddingPaintStyle = {
    strokeWidth: 1,
    stroke: "red",
    joinstyle: "round",
    outlineStroke: "white",
    outlineWidth: 1,
}

let failedPaintStyle = {
    strokeWidth: 1,
    stroke: "red",
    joinstyle: "round",
    outlineStroke: "white",
    outlineWidth: 1,
}

let connectorHoverStyle = {
    strokeWidth: 2,
    stroke: "#216477",
    outlineWidth: 2,
    outlineStroke: "white",
    zIndex: 9999
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
    connector: [ "Flowchart", {  gap: 0, cornerRadius: 3} ],
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

    addEndpoints(target, uuid, type) {
        let style = type === "target" ? targetEndpoint : sourceEndpoint
        // let anchors = type === "target" ? ["Left","Right","Top","Bottom"] : ["Right","Left","Top","Bottom"]
        this.instance.addEndpoint(target, style, { anchor: ["Right","Left","Top","Bottom"], uuid: uuid});

        this.instance.makeSource(target + "-anchor", style);
        this.instance.makeTarget(target + "-anchor", style);

        this.instance.bind("connection", function (connInfo, originalEvent) {
            let connection = connInfo.connection

            connection.getOverlay("label").setLabel(connection.sourceId  + "-" + connection.targetId + '  <i class="fa fa-trash-o fa-lg"></i>');

            connection.getOverlay("label").bind("click", (c)=>{
                jsPlumb.deleteConnection(connection)
            })
        });
    }

    addConnects(source, target) {
        this.instance.batch(()=>{
            for(let i = 0; i < target.length; i++) {
                let connection = this.instance.connect({
                    source:source,
                    target:target[i].name,
                    // uuids: [source, target[i]]
                })
                if (target[i].color) {
                    let style = JSON.parse(JSON.stringify(connection.getPaintStyle()))
                    console.log(style)
                    console.log(new Date(),target[i].color)
                    style.stroke = target[i].color
                    connection.setPaintStyle(style)
                }
            }
        });
    }
}

export default DrawTool;