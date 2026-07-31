import React, { useEffect, useRef, useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Point3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  size: number;
  alpha: number;
  pulse: number;
  isLand: boolean;
}

interface ProjectedEntry {
  point: Point3D;
  sx: number;
  sy: number;
  z: number;
  scale: number;
}

interface ArcGeometry {
  x1: number; y1: number; z1: number;
  x2: number; y2: number; z2: number;
  dot: number;
  angle: number;
  ux: number; uy: number; uz: number;
  progress: number;
  speed: number;
}

const LAT_STEPS = 70;
const LON_STEPS = 120;
const PARALLELS = [-60, -30, 0, 30, 60];
const MERIDIANS = Array.from({ length: 12 }, (_, idx) => -180 + idx * 30);
const TECH_HUBS = [
  { name: 'Dakar', lat: 14.7, lon: -17.4 },
  { name: 'Paris', lat: 48.8, lon: 2.3 },
  { name: 'New York', lat: 40.7, lon: -74.0 },
  { name: 'Tokyo', lat: 35.6, lon: 139.6 },
  { name: 'São Paulo', lat: -23.5, lon: -46.6 },
  { name: 'Sydney', lat: -33.8, lon: 151.2 },
  { name: 'Cairo', lat: 30.0, lon: 31.2 },
  { name: 'London', lat: 51.5, lon: -0.1 },
];

const isLand = (lat: number, lon: number): boolean => {
  if (lat >= -35 && lat <= 37 && lon >= -18 && lon <= 52) return true;
  if (lat >= 36 && lat <= 71 && lon >= -10 && lon <= 42) return true;
  if (lat >= 5 && lat <= 75 && lon >= 42 && lon <= 180) return true;
  if (lat >= 12 && lat <= 75 && lon >= -168 && lon <= -52) return true;
  if (lat >= -56 && lat <= 13 && lon >= -82 && lon <= -34) return true;
  if (lat >= -45 && lat <= -10 && lon >= 110 && lon <= 178) return true;
  if (lat >= 60 && lat <= 83 && lon >= -75 && lon <= -12) return true;
  if (lat <= -65) return true;
  return false;
};

export const AnimatedBackground: React.FC = () => {
  const { darkMode } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const globePoints = useMemo<Point3D[]>(() => {
    const points: Point3D[] = [];
    for (let i = 0; i <= LAT_STEPS; i++) {
      const latDeg = -90 + (180 / LAT_STEPS) * i;
      const latRad = (latDeg * Math.PI) / 180;
      const cosLat = Math.cos(latRad);
      const sinLat = Math.sin(latRad);

      for (let j = 0; j < LON_STEPS; j++) {
        const lonDeg = -180 + (360 / LON_STEPS) * j;
        const lonRad = (lonDeg * Math.PI) / 180;
        const onLand = isLand(latDeg, lonDeg);

        if (!onLand && (i % 4 !== 0 || j % 4 !== 0)) continue;

        const x = cosLat * Math.sin(lonRad);
        const y = -sinLat;
        const z = cosLat * Math.cos(lonRad);

        points.push({
          x, y, z,
          baseX: x, baseY: y, baseZ: z,
          size: onLand ? (Math.random() * 1.6 + 1.2) : 0.8,
          alpha: onLand ? (Math.random() * 0.5 + 0.45) : 0.12,
          pulse: Math.random() * Math.PI * 2,
          isLand: onLand,
        });
      }
    }
    return points;
  }, []);

  const projectedBuffer = useMemo<ProjectedEntry[]>(
    () => globePoints.map((p) => ({ point: p, sx: 0, sy: 0, z: 0, scale: 0 })),
    [globePoints]
  );

  const arcs = useMemo<ArcGeometry[]>(() => {
    const toVec = (lat: number, lon: number) => {
      const latRad = (lat * Math.PI) / 180;
      const lonRad = (lon * Math.PI) / 180;
      const cosLat = Math.cos(latRad);
      const sinLat = Math.sin(latRad);
      return {
        x: cosLat * Math.sin(lonRad),
        y: -sinLat,
        z: cosLat * Math.cos(lonRad),
      };
    };

    const buildArc = (
      h1: { lat: number; lon: number },
      h2: { lat: number; lon: number },
      speed: number
    ): ArcGeometry => {
      const v1 = toVec(h1.lat, h1.lon);
      const v2 = toVec(h2.lat, h2.lon);
      const dot = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
      const angle = Math.acos(Math.max(-1, Math.min(1, dot)));
      const sinAngle = Math.sin(angle) || 1e-6;
      const ux = (v2.x - v1.x * dot) / sinAngle;
      const uy = (v2.y - v1.y * dot) / sinAngle;
      const uz = (v2.z - v1.z * dot) / sinAngle;

      return {
        x1: v1.x, y1: v1.y, z1: v1.z,
        x2: v2.x, y2: v2.y, z2: v2.z,
        dot, angle,
        ux, uy, uz,
        progress: Math.random(),
        speed,
      };
    };

    const arcData: ArcGeometry[] = [];
    for (let i = 0; i < TECH_HUBS.length; i++) {
      const h1 = TECH_HUBS[i];
      const h2 = TECH_HUBS[(i + 1) % TECH_HUBS.length];
      const h3 = TECH_HUBS[(i + 3) % TECH_HUBS.length];
      arcData.push(buildArc(h1, h2, 0.004 + Math.random() * 0.006));
      arcData.push(buildArc(h1, h3, 0.003 + Math.random() * 0.005));
    }
    return arcData;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      cachedGradient = null;
    };

    window.addEventListener('resize', handleResize);

    let rotationY = 0.45;
    const rotationX = 0.35;

    let cachedGradient: CanvasGradient | null = null;
    let cachedGradientRadius = -1;
    let cachedGradientDarkMode = darkMode;

    // Couleurs naturelles, terre et vegetation, sans effet plastique
    const LAND_COLOR = 'rgb(34, 120, 85)';
    const SEA_COLOR = 'rgb(45, 100, 130)';

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const globeRadius = Math.max(width, height) * 0.45;
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      rotationY += 0.0015;

      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);

      const project3D = (bx: number, by: number, bz: number, rOffset = 0) => {
        const r = globeRadius + rOffset;
        const px = bx * r;
        const py = by * r;
        const pz = bz * r;

        const x1 = px * cosY - pz * sinY;
        const z1 = px * sinY + pz * cosY;

        const y2 = py * cosX - z1 * sinX;
        const z2 = py * sinX + z1 * cosX;

        const fov = 1000;
        const scale = fov / (fov + z2 + globeRadius * 1.2);

        return {
          sx: centerX + x1 * scale,
          sy: centerY + y2 * scale,
          z: z2,
          scale,
        };
      };

      if (!cachedGradient || cachedGradientRadius !== globeRadius || cachedGradientDarkMode !== darkMode) {
        const atmosGrad = ctx.createRadialGradient(
          centerX, centerY, globeRadius * 0.85,
          centerX, centerY, globeRadius * 1.25
        );
        atmosGrad.addColorStop(0, darkMode ? 'rgba(16, 185, 129, 0.12)' : 'rgba(5, 150, 105, 0.08)');
        atmosGrad.addColorStop(0.5, darkMode ? 'rgba(5, 150, 105, 0.05)' : 'rgba(16, 185, 129, 0.03)');
        atmosGrad.addColorStop(1, 'rgba(0,0,0,0)');
        cachedGradient = atmosGrad;
        cachedGradientRadius = globeRadius;
        cachedGradientDarkMode = darkMode;
      }

      ctx.beginPath();
      ctx.arc(centerX, centerY, globeRadius * 1.25, 0, Math.PI * 2);
      ctx.fillStyle = cachedGradient;
      ctx.fill();

      ctx.lineWidth = 0.5;
      PARALLELS.forEach((latDeg) => {
        const latRad = (latDeg * Math.PI) / 180;
        const cosLat = Math.cos(latRad);
        const sinLat = Math.sin(latRad);
        const steps = 90;

        ctx.beginPath();
        let first = true;
        for (let s = 0; s <= steps; s++) {
          const lonRad = (s / steps) * Math.PI * 2;
          const bx = cosLat * Math.sin(lonRad);
          const by = -sinLat;
          const bz = cosLat * Math.cos(lonRad);

          const proj = project3D(bx, by, bz);
          if (proj.z > globeRadius * 0.1) continue;

          if (first) {
            ctx.moveTo(proj.sx, proj.sy);
            first = false;
          } else {
            ctx.lineTo(proj.sx, proj.sy);
          }
        }
        ctx.strokeStyle = darkMode ? 'rgba(120, 180, 140, 0.12)' : 'rgba(60, 130, 100, 0.1)';
        ctx.stroke();
      });

      MERIDIANS.forEach((lonDeg) => {
        const lonRad = (lonDeg * Math.PI) / 180;
        const steps = 90;

        ctx.beginPath();
        let first = true;
        for (let s = 0; s <= steps; s++) {
          const latDeg = -90 + (180 / steps) * s;
          const latRad = (latDeg * Math.PI) / 180;
          const cosLat = Math.cos(latRad);
          const sinLat = Math.sin(latRad);

          const bx = cosLat * Math.sin(lonRad);
          const by = -sinLat;
          const bz = cosLat * Math.cos(lonRad);

          const proj = project3D(bx, by, bz);
          if (proj.z > globeRadius * 0.1) continue;

          if (first) {
            ctx.moveTo(proj.sx, proj.sy);
            first = false;
          } else {
            ctx.lineTo(proj.sx, proj.sy);
          }
        }
        ctx.strokeStyle = darkMode ? 'rgba(120, 180, 140, 0.1)' : 'rgba(60, 130, 100, 0.08)';
        ctx.stroke();
      });

      for (let idx = 0; idx < globePoints.length; idx++) {
        const p = globePoints[idx];
        p.pulse += 0.035;
        const proj = project3D(p.baseX, p.baseY, p.baseZ);
        const entry = projectedBuffer[idx];
        entry.sx = proj.sx;
        entry.sy = proj.sy;
        entry.z = proj.z;
        entry.scale = proj.scale;
      }

      projectedBuffer.sort((a, b) => b.z - a.z);

      for (let idx = 0; idx < projectedBuffer.length; idx++) {
        const entry = projectedBuffer[idx];
        const point = entry.point;
        if (entry.z > globeRadius * 0.25) continue;

        const depthFade = Math.max(0.05, 1 - (entry.z + globeRadius) / (globeRadius * 1.8));
        const pulseAlpha = Math.sin(point.pulse) * 0.15 + point.alpha;
        const alpha = Math.min(1, pulseAlpha * depthFade);

        const size = point.size * entry.scale * 2;

        ctx.beginPath();
        ctx.arc(entry.sx, entry.sy, size, 0, Math.PI * 2);
        ctx.globalAlpha = point.isLand ? alpha * 0.9 : alpha * 0.4;
        ctx.fillStyle = point.isLand ? LAND_COLOR : SEA_COLOR;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      TECH_HUBS.forEach((hub) => {
        const latRad = (hub.lat * Math.PI) / 180;
        const lonRad = (hub.lon * Math.PI) / 180;
        const cosLat = Math.cos(latRad);
        const sinLat = Math.sin(latRad);

        const bx = cosLat * Math.sin(lonRad);
        const by = -sinLat;
        const bz = cosLat * Math.cos(lonRad);

        const proj = project3D(bx, by, bz);
        if (proj.z > globeRadius * 0.15) return;

        const size = 4 * proj.scale;
        ctx.beginPath();
        ctx.arc(proj.sx, proj.sy, size, 0, Math.PI * 2);
        ctx.fillStyle = darkMode ? 'rgba(100, 160, 200, 0.85)' : 'rgba(70, 130, 170, 0.7)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(proj.sx, proj.sy, size * 2, 0, Math.PI * 2);
        ctx.strokeStyle = darkMode ? 'rgba(100, 160, 200, 0.35)' : 'rgba(70, 130, 170, 0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      arcs.forEach((arc) => {
        arc.progress += arc.speed;
        if (arc.progress > 1) arc.progress = 0;

        const proj1 = project3D(arc.x1, arc.y1, arc.z1, 15);
        const proj2 = project3D(arc.x2, arc.y2, arc.z2, 15);

        if (proj1.z > globeRadius * 0.1 || proj2.z > globeRadius * 0.1) return;

        const steps = 30;
        ctx.beginPath();
        for (let s = 0; s <= steps; s++) {
          const t = (s / steps) * arc.progress;
          const theta = t * arc.angle;

          const sinTheta = Math.sin(theta);
          const cosTheta = Math.cos(theta);

          const ix = arc.x1 * cosTheta + arc.ux * sinTheta;
          const iy = arc.y1 * cosTheta + arc.uy * sinTheta;
          const iz = arc.z1 * cosTheta + arc.uz * sinTheta;

          const proj = project3D(ix, iy, iz, 15);
          if (proj.z > globeRadius * 0.1) continue;

          if (s === 0) {
            ctx.moveTo(proj.sx, proj.sy);
          } else {
            ctx.lineTo(proj.sx, proj.sy);
          }
        }
        ctx.strokeStyle = darkMode ? 'rgba(80, 140, 180, 0.3)' : 'rgba(60, 110, 150, 0.2)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode, globePoints, arcs, projectedBuffer]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: darkMode ? 0.6 : 0.4 }}
    />
  );
};