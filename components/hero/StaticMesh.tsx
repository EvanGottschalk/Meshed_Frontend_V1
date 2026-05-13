import { cn } from "@/lib/utils";

interface StaticMeshProps {
  className?: string;
}

const NODE_POSITIONS: Array<{ x: number; y: number; r: number; hue: number }> = [
  { x: 50, y: 220, r: 5, hue: 195 },
  { x: 90, y: 170, r: 6, hue: 210 },
  { x: 70, y: 280, r: 4, hue: 200 },
  { x: 130, y: 130, r: 5, hue: 230 },
  { x: 150, y: 200, r: 7, hue: 245 },
  { x: 180, y: 100, r: 4, hue: 250 },
  { x: 210, y: 165, r: 6, hue: 260 },
  { x: 200, y: 240, r: 5, hue: 270 },
  { x: 245, y: 130, r: 5, hue: 280 },
  { x: 270, y: 195, r: 7, hue: 290 },
  { x: 290, y: 100, r: 5, hue: 295 },
  { x: 305, y: 245, r: 5, hue: 305 },
  { x: 335, y: 165, r: 6, hue: 315 },
  { x: 350, y: 110, r: 5, hue: 320 },
  { x: 370, y: 220, r: 5, hue: 330 },
  { x: 395, y: 145, r: 7, hue: 340 },
  { x: 415, y: 195, r: 5, hue: 350 },
  { x: 440, y: 115, r: 5, hue: 358 },
  { x: 455, y: 250, r: 5, hue: 10 },
  { x: 480, y: 175, r: 6, hue: 20 },
  { x: 510, y: 130, r: 5, hue: 30 },
  { x: 525, y: 220, r: 5, hue: 35 },
  { x: 555, y: 165, r: 7, hue: 40 },
  { x: 580, y: 110, r: 4, hue: 45 },
  { x: 595, y: 240, r: 5, hue: 48 },
  { x: 620, y: 185, r: 5, hue: 50 },
  { x: 645, y: 145, r: 5, hue: 52 },
];

const EDGES: Array<[number, number]> = [
  [0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [3, 4], [3, 5],
  [4, 6], [4, 7], [5, 6], [6, 8], [6, 7], [7, 9], [8, 9],
  [8, 10], [9, 11], [9, 12], [10, 12], [11, 14], [12, 13],
  [12, 14], [13, 15], [14, 16], [15, 16], [15, 17], [16, 18],
  [17, 19], [18, 19], [18, 20], [19, 21], [20, 22], [21, 22],
  [21, 24], [22, 23], [22, 25], [23, 25], [24, 25], [25, 26],
  [25, 24], [23, 26],
];

const HUE_TO_HEX = (h: number, sat = 70, light = 60) => {
  const s = sat / 100;
  const l = light / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export function StaticMesh({ className }: StaticMeshProps) {
  return (
    <svg
      viewBox="0 0 700 360"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="A network of interconnected verified-human nodes, colored across a full spectrum."
    >
      <defs>
        <radialGradient id="meshGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="rgba(122,91,255,0.18)" />
          <stop offset="60%" stopColor="rgba(228,91,201,0.05)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <linearGradient id="edgeStroke" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#3DC7E0" stopOpacity="0.85" />
          <stop offset="28%" stopColor="#7A5BFF" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#E45BC9" stopOpacity="0.85" />
          <stop offset="80%" stopColor="#F58A3C" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#F5C84A" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      <rect width="700" height="360" fill="url(#meshGlow)" />

      <g strokeWidth="1.4" stroke="url(#edgeStroke)" fill="none">
        {EDGES.map(([a, b], i) => {
          const na = NODE_POSITIONS[a];
          const nb = NODE_POSITIONS[b];
          if (!na || !nb) return null;
          return (
            <line
              key={i}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              opacity={0.7}
            />
          );
        })}
      </g>

      <g>
        {NODE_POSITIONS.map((n, i) => {
          const color = HUE_TO_HEX(n.hue, 70, 55);
          return (
            <g key={i}>
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r + 5}
                fill={color}
                opacity={0.22}
              />
              <circle cx={n.x} cy={n.y} r={n.r} fill={color} />
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r * 0.35}
                fill="#ffffff"
                opacity={0.9}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
