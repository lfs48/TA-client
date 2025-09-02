interface TriangleProps {
  width?: number;
  color?: string;
  filled?: boolean;
  strokeWidth?: number;
  rotate?: boolean;
  [prop: string]: any;
}

const Triangle = ({ 
  width = 28, 
  color = "#dd2a25", 
  filled = true,
  strokeWidth = 6,
  rotate = false,
  ...props
}: TriangleProps) => {
  return (
    <svg 
      viewBox="28 28 144 144" 
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      style={rotate ? { transform: "rotate(180deg)" } : {}}
      {...props}
    >
      <polygon 
        points="100,30 170,170 30,170" 
        fill={filled ? color : "none"}
        stroke={filled ? "none" : color}
        strokeWidth={filled ? 0 : strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Triangle;