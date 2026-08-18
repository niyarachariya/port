"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { BASE_PATH } from "../lib/basePath";
import { profile } from "../data/profile";

const TOTAL_FRAMES = 151;

// Crop source video encoding artifacts (top black strip and outer bounds)
const SOURCE_CROP_TOP = 14;
const SOURCE_CROP_BOTTOM = 8;
const SOURCE_CROP_SIDES = 8;

function getFrameUrl(index: number): string {
  const frameNumber = String(index + 1).padStart(4, "0");
  return `${BASE_PATH}/experience/frames/frame-${frameNumber}.webp`;
}

export default function Hero() {
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(Math.floor(TOTAL_FRAMES / 2));
  const rafIdRef = useRef<number | null>(null);

  // Render frame with contain scaling so the complete artwork always stays
  // fully visible within the canvas box — no cropping of the boy, mascots,
  // or Welcome sign.
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
    // (encoding artifacts only — not part of the artwork itself)
    const sx = SOURCE_CROP_SIDES;
    const sy = SOURCE_CROP_TOP;
    const sw = Math.max(1, img.naturalWidth - SOURCE_CROP_SIDES * 2);
    const sh = Math.max(1, img.naturalHeight - (SOURCE_CROP_TOP + SOURCE_CROP_BOTTOM));

    const imgAspect = sw / sh;
    const canvasAspect = displayWidth / displayHeight;

    let drawWidth: number;
    let drawHeight: number;

    // Contain-based calculation: fit the entire frame inside the box,
    // letterboxing on whichever axis has spare room.
    if (canvasAspect > imgAspect) {
      drawHeight = displayHeight;
      drawWidth = drawHeight * imgAspect;
    } else {
      drawWidth = displayWidth;
      drawHeight = drawWidth / imgAspect;
    }

    const offsetX = (displayWidth - drawWidth) / 2;
    const offsetY = (displayHeight - drawHeight) / 2;

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
      const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex));

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
    console.log(`[Hero] BASE_PATH resolved to: "${BASE_PATH}"`);
    console.log(`[Hero] first frame URL: ${getFrameUrl(0)}`);

    let settledCount = 0;
    let successCount = 0;
    const failedUrls: string[] = [];
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const onSettled = () => {
      settledCount += 1;
      const progress = Math.min(100, Math.round((settledCount / TOTAL_FRAMES) * 100));
      setLoadingProgress(progress);

      if (settledCount === TOTAL_FRAMES) {
        imagesRef.current = images;
        setIsLoaded(true);
        console.log(
          `[Hero] preload complete: ${successCount}/${TOTAL_FRAMES} frames loaded successfully`
        );
        if (failedUrls.length > 0) {
          console.warn(`[Hero] ${failedUrls.length} frame(s) failed to load:`, failedUrls);
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
        console.error(`[Hero] failed to load frame: ${url}`);
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
      const targetIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));
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
    <section id="home" className="hero-section">
      {!isLoaded && (
        <div className="loading-container">
          <span className="loading-number">{loadingProgress}%</span>
          <div className="loading-bar-track">
            <div className="loading-bar-fill" style={{ width: `${loadingProgress}%` }} />
          </div>
          <span className="loading-label">Loading Portfolio</span>
        </div>
      )}

      <div className="hero-content">
        <div className="hero-layout">
          {/* Left Text Column */}
          <div className="hero-text-col">
            <span className="eyebrow">— {profile.applicationType.toUpperCase()}</span>

            <h1 className="main-headline">
              <span className="headline-line-solid">PORTFOLIO</span>
            </h1>

            <div className="hero-name-block">
              <span className="hero-name-en">{profile.fullNameEn.toUpperCase()}</span>
              <span className="hero-name-th">{profile.fullNameTh}</span>
            </div>

            <div className="hero-description">
              <p>{profile.faculty}</p>
              <p>{profile.university}</p>
            </div>

            <div className="cta-wrapper">
              <a href="#projects" className="cta-button">
                <span>VIEW MY WORK</span>
                <span className="cta-arrow">→</span>
              </a>
              <a href="#about" className="cta-secondary">
                ABOUT ME
              </a>
            </div>
          </div>

          {/* Right Visual Area */}
          <div className="hero-canvas-col">
            <div className="canvas-soft-glow" />
            <div className="canvas-wrapper">
              <canvas ref={canvasRef} className="experience-canvas" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
