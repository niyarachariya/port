"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 151;

// Crop source video encoding artifacts (top black strip and outer bounds)
const SOURCE_CROP_TOP = 14;
const SOURCE_CROP_BOTTOM = 8;
const SOURCE_CROP_SIDES = 8;

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function getFrameUrl(index: number): string {
  const frameNumber = String(index + 1).padStart(4, "0");
  return `${BASE_PATH}/experience/frames/frame-${frameNumber}.webp`;
}

export default function ExperiencePage() {
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(Math.floor(TOTAL_FRAMES / 2));
  const rafIdRef = useRef<number | null>(null);

  // Render frame with cover bleed scaling so physical edges sit outside viewport
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const displayWidth = rect.width > 0 ? rect.width : canvas.clientWidth || 900;
    const displayHeight = rect.height > 0 ? rect.height : canvas.clientHeight || 900;

    const targetWidth = Math.round(displayWidth * dpr);
    const targetHeight = Math.round(displayHeight * dpr);

    // Synchronize canvas buffer resolution with DPR
    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    // Source sub-rectangle removing outer source border/top black strip
    const sx = SOURCE_CROP_SIDES;
    const sy = SOURCE_CROP_TOP;
    const sw = Math.max(1, img.naturalWidth - SOURCE_CROP_SIDES * 2);
    const sh = Math.max(1, img.naturalHeight - (SOURCE_CROP_TOP + SOURCE_CROP_BOTTOM));

    const imgAspect = sw / sh;
    const canvasAspect = displayWidth / displayHeight;

    let drawWidth: number;
    let drawHeight: number;

    // Cover-based calculation so artwork extends beyond visible edges
    if (canvasAspect > imgAspect) {
      drawWidth = displayWidth * 1.04;
      drawHeight = drawWidth / imgAspect;
    } else {
      drawHeight = displayHeight * 1.04;
      drawWidth = drawHeight * imgAspect;
    }

    // Slight offsets to keep boy's head comfortably below header and characters centered
    const offsetX = (displayWidth - drawWidth) / 2 + (displayWidth * 0.02);
    const offsetY = (displayHeight - drawHeight) / 2 + (displayHeight * 0.035);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      sx,
      sy,
      sw,
      sh,
      offsetX * dpr,
      offsetY * dpr,
      drawWidth * dpr,
      drawHeight * dpr
    );
  }, []);

  // Request smooth update with requestAnimationFrame
  const requestFrameUpdate = useCallback(
    (frameIndex: number) => {
      const clampedIndex = Math.max(
        0,
        Math.min(TOTAL_FRAMES - 1, frameIndex)
      );

      if (currentFrameRef.current === clampedIndex && isLoaded) {
        return;
      }

      currentFrameRef.current = clampedIndex;

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      rafIdRef.current = requestAnimationFrame(() => {
        renderFrame(currentFrameRef.current);
        rafIdRef.current = null;
      });
    },
    [isLoaded, renderFrame]
  );

  // Preload all 151 frames
  useEffect(() => {
    console.log(`[Experience] BASE_PATH resolved to: "${BASE_PATH}"`);
    console.log(`[Experience] first frame URL: ${getFrameUrl(0)}`);

    let settledCount = 0;
    let successCount = 0;
    const failedUrls: string[] = [];
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const onSettled = () => {
      settledCount += 1;
      const progress = Math.min(
        100,
        Math.round((settledCount / TOTAL_FRAMES) * 100)
      );
      setLoadingProgress(progress);

      if (settledCount === TOTAL_FRAMES) {
        imagesRef.current = images;
        setIsLoaded(true);
        console.log(
          `[Experience] preload complete: ${successCount}/${TOTAL_FRAMES} frames loaded successfully`
        );
        if (failedUrls.length > 0) {
          console.warn(
            `[Experience] ${failedUrls.length} frame(s) failed to load:`,
            failedUrls
          );
        }
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const url = getFrameUrl(i);
      img.src = url;
      img.onload = () => {
        successCount += 1;
        onSettled();
      };
      img.onerror = () => {
        failedUrls.push(url);
        console.error(`[Experience] failed to load frame: ${url}`);
        onSettled();
      };
      images[i] = img;
    }

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Draw initial frame once loaded
  useEffect(() => {
    if (isLoaded) {
      renderFrame(currentFrameRef.current);
    }
  }, [isLoaded, renderFrame]);

  // Handle pointer / mouse / touch position mapping across entire viewport width
  const handlePointerPosition = useCallback(
    (clientX: number) => {
      if (!isLoaded) return;
      const width = window.innerWidth;
      if (width <= 0) return;

      const progress = Math.max(0, Math.min(1, clientX / width));
      const targetIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(progress * TOTAL_FRAMES)
      );
      requestFrameUpdate(targetIndex);
    },
    [isLoaded, requestFrameUpdate]
  );

  // Global mouse & touch events
  useEffect(() => {
    if (!isLoaded) return;

    const onMouseMove = (e: MouseEvent) => {
      handlePointerPosition(e.clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerPosition(e.touches[0].clientX);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerPosition(e.touches[0].clientX);
      }
    };

    const onResize = () => {
      renderFrame(currentFrameRef.current);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("resize", onResize);
    };
  }, [isLoaded, handlePointerPosition, renderFrame]);

  return (
    <div className="page-wrapper">
      {!isLoaded && (
        <div className="loading-container">
          <span className="loading-number">{loadingProgress}%</span>
          <div className="loading-bar-track">
            <div
              className="loading-bar-fill"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <span className="loading-label">Preloading Experience</span>
        </div>
      )}

      <div className="page-overlay" />

      {/* Header */}
      <header className="site-header">
        <div className="header-left">PORTFOLIO / 2026</div>
        <div className="header-center">INTERACTIVE EXPERIENCE</div>
        <div className="header-right">
          <span className="status-dot-live" />
          <span>LIVE</span>
        </div>
      </header>

      {/* Main Hero */}
      <main className="hero-content">
        <div className="hero-layout">
          {/* Left Text Column (40-42%) */}
          <div className="hero-text-col">
            <span className="eyebrow">— MOVE YOUR CURSOR</span>

            <h1 className="main-headline">
              <span className="headline-line-solid">Ideas that</span>
              <span className="headline-line-outlined">move with you.</span>
            </h1>

            <div className="hero-description">
              <p>
                Move your cursor across the screen and watch the characters
                follow along.
              </p>
              <p>A small interactive welcome to my portfolio.</p>
            </div>

            {/* Metrics */}
            <div className="metrics-row">
              <div className="metric-item">
                <strong>151</strong>
                <span>/ FRAMES</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-item">
                <strong>3</strong>
                <span>/ CHARACTERS</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-item">
                <strong>LIVE</strong>
                <span>/ INTERACTION</span>
              </div>
            </div>

            {/* CTA */}
            <div className="cta-wrapper">
              <a href="#work" className="cta-button">
                <span>EXPLORE MY WORK</span>
                <span className="cta-arrow">→</span>
              </a>
            </div>
          </div>

          {/* Right Visual Area (Continuous Bleed, Left-Only Dark Teal Gradient Overlay) */}
          <div className="hero-canvas-col">
            <div className="canvas-soft-glow" />
            <div className="canvas-wrapper">
              <canvas ref={canvasRef} className="experience-canvas" />
              <div className="canvas-left-fade" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-left">© 2026 PORTFOLIO</div>
        <div className="footer-right">MOVE CURSOR · WATCH THEM REACT</div>
      </footer>
    </div>
  );
}
