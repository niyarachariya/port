"use client";

import { useState } from "react";
import { withBasePath } from "../lib/basePath";

interface PlaceholderImageProps {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  loading?: "lazy" | "eager";
  onClick?: () => void;
}

// Renders the real image once it exists under public/, and falls back to a
// labeled placeholder tile if it 404s — so the site looks complete before
// real photos/scans/screenshots are dropped into place, with no code change
// needed afterward.
export default function PlaceholderImage({
  src,
  alt,
  label,
  className,
  loading = "lazy",
  onClick,
}: PlaceholderImageProps) {
  const [failed, setFailed] = useState(false);
  const classes = ["media-frame", className].filter(Boolean).join(" ");

  if (failed) {
    return (
      <div
        className={`${classes} media-placeholder`}
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") onClick();
              }
            : undefined
        }
      >
        <span className="media-placeholder-icon" aria-hidden="true">
          ◇
        </span>
        <span className="media-placeholder-label">{label ?? alt}</span>
      </div>
    );
  }

  return (
    <img
      src={withBasePath(src)}
      alt={alt}
      className={classes}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
      onClick={onClick}
    />
  );
}
