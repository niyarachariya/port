"use client";

import { useEffect, useRef } from "react";
import PlaceholderImage from "./PlaceholderImage";

interface LightboxProps {
  src: string;
  alt: string;
  label?: string;
  onClose: () => void;
}

export default function Lightbox({ src, alt, label, onClose }: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={label ?? alt}
    >
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button
          ref={closeButtonRef}
          type="button"
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close image viewer"
        >
          <span aria-hidden="true">×</span>
        </button>
        <PlaceholderImage
          src={src}
          alt={alt}
          label={label}
          className="lightbox-image"
          loading="eager"
        />
        {label && <p className="lightbox-caption">{label}</p>}
      </div>
    </div>
  );
}
