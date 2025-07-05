import React from 'react';

export default function BallTriangle(props) {
    const speed = Number(String(props.speed ?? 1));
    const fill = props.fill;
    const stroke = props.stroke ?? '#fff';
    const fillOpacity = props.fillOpacity;
    const strokeOpacity = props.strokeOpacity;

    // Helper to get triangle points centered at (cx, cy) with radius r
    function trianglePoints(cx, cy, r, rotation = 0) {
        const angle = Math.PI * 2 / 3;
        const points = [];
        for (let i = 0; i < 3; i++) {
            const theta = rotation + i * angle - Math.PI / 2;
            const x = cx + r * Math.cos(theta);
            const y = cy + r * Math.sin(theta);
            points.push(x + "," + y);
        }
        return points.join(" ");
    }

    return (
        React.createElement("svg", {
            ...props,
            className: props.className
                ? "icon-loading " + props.className
                : 'icon-loading',
            fill: undefined,
            fillOpacity: undefined,
            height: props.height ?? 57,
            speed: undefined,
            stroke: undefined,
            strokeOpacity: undefined,
            strokeWidth: undefined,
            width: props.width ?? 57,
            viewBox: "0 0 57 57"
        },
            React.createElement("g", { transform: "translate(1 1)", strokeWidth: 2, fill: "none", fillRule: "evenodd" },
                // Triangle 1
                React.createElement("polygon", {
                    points: trianglePoints(5, 50, 5),
                    fill: fill,
                    stroke: stroke,
                    fillOpacity: fillOpacity,
                    strokeOpacity: strokeOpacity,
                    children: [
                        React.createElement("animate", {
                            attributeName: "points",
                            begin: "0s",
                            dur: `${2.2 / speed}s`,
                            values: [
                                trianglePoints(5, 50, 5),
                                trianglePoints(27, 5, 5),
                                trianglePoints(49, 50, 5),
                                trianglePoints(5, 50, 5)
                            ].join(";"),
                            calcMode: "linear",
                            repeatCount: "indefinite",
                            key: "points1"
                        }),
                    ]
                }),
                // Triangle 2
                React.createElement("polygon", {
                    points: trianglePoints(27, 5, 5),
                    fill: fill,
                    stroke: stroke,
                    fillOpacity: fillOpacity,
                    strokeOpacity: strokeOpacity,
                    children: [
                        React.createElement("animate", {
                            attributeName: "points",
                            begin: "0s",
                            dur: `${2.2 / speed}s`,
                            values: [
                                trianglePoints(27, 5, 5),
                                trianglePoints(49, 50, 5),
                                trianglePoints(5, 50, 5),
                                trianglePoints(27, 5, 5)
                            ].join(";"),
                            calcMode: "linear",
                            repeatCount: "indefinite",
                            key: "points2"
                        }),
                    ]
                }),
                // Triangle 3
                React.createElement("polygon", {
                    points: trianglePoints(49, 50, 5),
                    fill: fill,
                    stroke: stroke,
                    fillOpacity: fillOpacity,
                    strokeOpacity: strokeOpacity,
                    children: [
                        React.createElement("animate", {
                            attributeName: "points",
                            begin: "0s",
                            dur: `${2.2 / speed}s`,
                            values: [
                                trianglePoints(49, 50, 5),
                                trianglePoints(5, 50, 5),
                                trianglePoints(27, 5, 5),
                                trianglePoints(49, 50, 5)
                            ].join(";"),
                            calcMode: "linear",
                            repeatCount: "indefinite",
                            key: "points3"
                        }),
                    ]
                })
            )
        )
    );
}