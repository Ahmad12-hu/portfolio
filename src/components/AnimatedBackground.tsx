import React, { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  darkMode: boolean;
}

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

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ darkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
    };

    window.addEventListener('resize', handleResize);

    // Initial 3D Earth Globe Angles
    let rotationY = 0.5;
    const rotationX = 0.38; // Tilt ~22 degrees

    // Simplified Earth continent detection
    const isLand = (lat: number, lon: number): boolean => {
      if (lat >= -35 && lat <= 37 && lon >= -18 && lon <= 52) return true; // Africa
      if (lat >= 36 && lat <= 71 && lon >= -10 && lon <= 42) return true; // Europe
      if (lat >= 5 && lat <= 75 && lon >= 42 && lon <= 180) return true; // Asia
      if (lat >= 12 && lat <= 75 && lon >= -168 && lon <= -52) return true; // N. America
      if (lat >= -56 && lat <= 13 && lon >= -82 && lon <= -34) return true; // S. America
      if (lat >= -45 && lat <= -10 && lon >= 110 && lon <= 178) return true; // Australia
      if (lat >= 60 && lat <= 83 && lon >= -75 && lon <= -12) return true; // Greenland
      if (lat <= -65) return true; // Antarctica
      return false;
    };

    const globePoints: Point3D[] = [];
    const latSteps = 70;
    const lonSteps = 120;

    for (let i = 0; i <= latSteps; i++) {
      const latDeg = -90 + (180 / latSteps) * i;
      const latRad = (latDeg * Math.PI) / 180;
      const cosLat = Math.cos(latRad);
      const sinLat = Math.sin(latRad);

      for (let j = 0; j < lonSteps; j++) {
        const lonDeg = -180 + (360 / lonSteps) * j;
        const lonRad = (lonDeg * Math.PI) / 180;
        const onLand = isLand(latDeg, lonDeg);

        if (!onLand && (i % 4 !== 0 || j % 4 !== 0)) continue;

        const x = cosLat * Math.sin(lonRad);
        const y = -sinLat;
        const z = cosLat * Math.cos(lonRad);

        globePoints.push({
          x, y, z,
          baseX: x, baseY: y, baseZ: z,
          size: onLand ? (Math.random() * 1.6 + 1.2) : 0.8,
          alpha: onLand ? (Math.random() * 0.5 + 0.45) : 0.12,
          pulse: Math.random() * Math.PI * 2,
          isLand: onLand,
        });
      }
    }

    const parallels = [-60, -30, 0, 30, 60];
    const meridians = Array.from({ length: 12 }, (_, idx) => -180 + idx * 30);

    const techHubs = [
      { name: 'Dakar', lat: 14.7, lon: -17.4 },
      { name: 'Paris', lat: 48.8, lon: 2.3 },
      { name: 'New York', lat: 40.7, lon: -74.0 },
      { name: 'Tokyo', lat: 35.6, lon: 139.6 },
      { name: 'São Paulo', lat: -23.5, lon: -46.6 },
      { name: 'Sydney', lat: -33.8, lon: 151.2 },
      { name: 'Cairo', lat: 30.0, lon: 31.2 },
      { name: 'London', lat: 51.5, lon: -0.1 },
    ];

    const arcs: { lat1: number; lon1: number; lat2: number; lon2: number; progress: number; speed: number }[] = [];
    for (let i = 0; i < techHubs.length; i++) {
      const h1 = techHubs[i];
      const h2 = techHubs[(i + 1) % techHubs.length];
      const h3 = techHubs[(i + 3) % techHubs.length];
      arcs.push({
        lat1: h1.lat, lon1: h1.lon,
        lat2: h2.lat, lon2: h2.lon,
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.006,
      });
      arcs.push({
        lat1: h1.lat, lon1: h1.lon,
        lat2: h3.lat, lon2: h3.lon,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.005,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const globeRadius = Math.max(width, height) * 0.45;
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      rotationY += 0.0025;

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

      // Earth Outer Glow
      const atmosGrad = ctx.createRadialGradient(
        centerX, centerY, globeRadius * 0.85,
        centerX, centerY, globeRadius * 1.25
      );
      atmosGrad.addColorStop(0, darkMode ? 'rgba(16, 185, 129, 0.12)' : 'rgba(5, 150, 105, 0.08)');
      atmosGrad.addColorStop(0.5, darkMode ? 'rgba(5, 150, 105, 0.05)' : 'rgba(16, 185, 129, 0.03)');
      atmosGrad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, globeRadius * 1.25, 0, Math.PI * 2);
      ctx.fillStyle = atmosGrad;
      ctx.fill();

      // Latitude Circles
      ctx.lineWidth = 0.5;
      parallels.forEach((latDeg) => {
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
        ctx.strokeStyle = darkMode ? 'rgba(52, 211, 153, 0.07)' : 'rgba(5, 150, 105, 0.08)';
        ctx.stroke();
      });

      // Longitude Meridians
      meridians.forEach((lonDeg) => {
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
        ctx.strokeStyle = darkMode ? 'rgba(52, 211, 153, 0.06)' : 'rgba(5, 150, 105, 0.07)';
        ctx.stroke();
      });

      // Project & Draw Globe Dots
      const projectedPoints = globePoints.map((p) => {
        p.pulse += 0.035;
        const proj = project3D(p.baseX, p.baseY, p.baseZ);
        return { point: p, proj };
      });

      projectedPoints.sort((a, b) => b.proj.z - a.proj.z);

      projectedPoints.forEach(({ point, proj }) => {
        if (proj.z > globeRadius * 0.25) return;

        const depthFade = Math.max(0.05, 1 - (proj.z + globeRadius) / (globeRadius * 1.8));
        const pulseAlpha = Math.sin(point.pulse) * 0.15 + point.alpha;
        const alpha = Math.min(1, pulseAlpha * depthFade);

        ctx.beginPath();
        ctx.arc(proj.sx, proj.sy, point.size * proj.scale, 0, Math.PI * 2);

        if (point.isLand) {
          ctx.fillStyle = darkMode
            ? `rgba(52, 211, 153, ${alpha * 0.95})`
            : `rgba(16, 185, 129, ${alpha * 0.85})`;
        } else {
          ctx.fillStyle = darkMode
            ? `rgba(20, 184, 166, ${alpha * 0.3})`
            : `rgba(13, 148, 136, ${alpha * 0.25})`;
        }
        ctx.fill();
      });

      // Network Arcs
      arcs.forEach((arc) => {
        const lat1R = (arc.lat1 * Math.PI) / 180;
        const lon1R = (arc.lon1 * Math.PI) / 180;
        const lat2R = (arc.lat2 * Math.PI) / 180;
        const lon2R = (arc.lon2 * Math.PI) / 180;

        const bx1 = Math.cos(lat1R) * Math.sin(lon1R);
        const by1 = -Math.sin(lat1R);
        const bz1 = Math.cos(lat1R) * Math.cos(lon1R);

        const bx2 = Math.cos(lat2R) * Math.sin(lon2R);
        const by2 = -Math.sin(lat2R);
        const bz2 = Math.cos(lat2R) * Math.cos(lon2R);

        const p1 = project3D(bx1, by1, bz1);
        const p2 = project3D(bx2, by2, bz2);

        if (p1.z < globeRadius * 0.1 || p2.z < globeRadius * 0.1) {
          ctx.beginPath();
          ctx.moveTo(p1.sx, p1.sy);

          const midLat = (arc.lat1 + arc.lat2) / 2;
          const midLon = (arc.lon1 + arc.lon2) / 2;
          const midLatR = (midLat * Math.PI) / 180;
          const midLonR = (midLon * Math.PI) / 180;
          const bxM = Math.cos(midLatR) * Math.sin(midLonR);
          const byM = -Math.sin(midLatR);
          const bzM = Math.cos(midLatR) * Math.cos(midLonR);

          const midProj = project3D(bxM, byM, bzM, globeRadius * 0.15);

          ctx.quadraticCurveTo(midProj.sx, midProj.sy, p2.sx, p2.sy);
          ctx.strokeStyle = darkMode ? 'rgba(52, 211, 153, 0.25)' : 'rgba(16, 185, 129, 0.25)';
          ctx.lineWidth = 1.2;
          ctx.stroke();

          arc.progress += arc.speed;
          if (arc.progress > 1) arc.progress = 0;

          const t = arc.progress;
          const pulseX = (1 - t) * (1 - t) * p1.sx + 2 * (1 - t) * t * midProj.sx + t * t * p2.sx;
          const pulseY = (1 - t) * (1 - t) * p1.sy + 2 * (1 - t) * t * midProj.sy + t * t * p2.sy;

          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
          ctx.fillStyle = darkMode ? 'rgba(110, 231, 183, 0.95)' : 'rgba(5, 150, 105, 0.95)';
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Atmosphere Glow Gradients */}
      <div
        className={`absolute top-[-10%] right-[10%] w-[700px] h-[700px] rounded-full blur-[160px] transition-colors duration-1000 ${
          darkMode ? 'bg-emerald-950/45' : 'bg-emerald-200/40'
        }`}
      />
      <div
        className={`absolute top-[30%] left-[-15%] w-[650px] h-[650px] rounded-full blur-[170px] transition-colors duration-1000 ${
          darkMode ? 'bg-teal-950/35' : 'bg-teal-100/35'
        }`}
      />
      <div
        className={`absolute bottom-[-10%] right-[15%] w-[600px] h-[600px] rounded-full blur-[150px] transition-colors duration-1000 ${
          darkMode ? 'bg-green-950/40' : 'bg-green-100/30'
        }`}
      />

      {/* Grid Pattern Overlay */}
      <div
        className={`absolute inset-0 opacity-[0.03] ${
          darkMode
            ? 'bg-[radial-gradient(#34d399_1px,transparent_1px)]'
            : 'bg-[radial-gradient(#059669_1px,transparent_1px)]'
        } [background-size:32px_32px]`}
      />

      {/* 3D Rotating Earth Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />
    </div>
  );
};
