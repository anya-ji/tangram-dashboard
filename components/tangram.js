import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      baseProfile="full"
      height="100%"
      viewBox={props.viewBox}
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs />
      <polygon
        fill={props.colors[0]}
        id={1}
        points={props.points[0]}
        stroke="white"
        strokeWidth={1}
        transform={props.transform[0]}
      />
      <polygon
        fill={props.colors[1]}
        id={2}
        points={props.points[1]}
        stroke="white"
        strokeWidth={1}
        transform={props.transform[1]}
      />
      <polygon
        fill={props.colors[2]}
        id={3}
        points={props.points[2]}
        stroke="white"
        strokeWidth={1}
        transform={props.transform[2]}
      />
      <polygon
        fill={props.colors[3]}
        id={4}
        points={props.points[3]}
        stroke="white"
        strokeWidth={1}
        transform={props.transform[3]}
      />
      <polygon
        fill={props.colors[4]}
        id={5}
        points={props.points[4]}
        stroke="white"
        strokeWidth={1}
        transform={props.transform[4]}
      />
      <polygon
        fill={props.colors[5]}
        id={6}
        points={props.points[5]}
        stroke="white"
        strokeWidth={1}
        transform={props.transform[5]}
      />
      <polygon
        fill={props.colors[6]}
        id={7}
        points={props.points[6]}
        stroke="white"
        strokeWidth={1}
        transform={props.transform[6]}
      />
    </svg>
  );
}

export default SvgComponent;
