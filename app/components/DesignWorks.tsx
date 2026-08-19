"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import PlaceholderImage from "./PlaceholderImage";
import Lightbox from "./Lightbox";
import { designWorks } from "../data/designWorks";
import { withBasePath } from "../lib/basePath";

interface VideoTileProps {
  src: string;
  title: string;
  poster?: string;
}

function VideoTile({ src, title, poster }: VideoTileProps) {
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // A <video> can start fetching and fail before React finishes hydrating,
  // so the native error may occur before the onError prop's listener is
  // attached. Check the element's error state directly on mount as well as
  // listening for later failures.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.error || video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
      setFailed(true);
      return;
    }

    const onNativeError = () => setFailed(true);
    video.addEventListener("error", onNativeError);
    return () => video.removeEventListener("error", onNativeError);
  }, [src]);

  if (failed) {
    return (
      <div className="design-card-image media-placeholder">
        <span className="media-placeholder-icon" aria-hidden="true">
          ▶
        </span>
        <span className="media-placeholder-label">{title}</span>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      className="design-card-image design-card-video-el"
      src={withBasePath(src)}
      poster={poster ? withBasePath(poster) : undefined}
      controls
      playsInline
      preload="metadata"
      onError={() => setFailed(true)}
    >
      Your browser does not support embedded video.
    </video>
  );
}

interface YoutubeEmbedProps {
  youtubeId: string;
  title: string;
}

function YoutubeEmbed({ youtubeId, title }: YoutubeEmbedProps) {
  return (
    <div className="design-card-youtube">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
        title={title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default function DesignWorks() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openItem =
    designWorks.find((d) => d.id === openId && d.type === "image") ?? null;

  return (
    <section id="design" className="section design-section">
      <div className="section-inner">
        <SectionHeading number="08" title="Design Works" />

        <div className="design-grid">
          {designWorks.map((item) => {
            if (item.type === "youtube" && item.youtubeId) {
              return (
                <div className="design-card design-card-video" key={item.id}>
                  <YoutubeEmbed youtubeId={item.youtubeId} title={item.title} />
                  <div className="design-card-caption">
                    <span className="design-card-category">{item.category}</span>
                    <span className="design-card-title">{item.title}</span>
                  </div>
                </div>
              );
            }

            if (item.type === "video" && item.video) {
              return (
                <div className="design-card design-card-video" key={item.id}>
                  <VideoTile src={item.video} title={item.title} poster={item.image} />
                  <div className="design-card-caption">
                    <span className="design-card-category">{item.category}</span>
                    <span className="design-card-title">{item.title}</span>
                  </div>
                </div>
              );
            }

            return (
              <button
                type="button"
                className="design-card"
                key={item.id}
                onClick={() => setOpenId(item.id)}
                aria-label={`View ${item.title}`}
              >
                <PlaceholderImage
                  src={item.image ?? ""}
                  alt={item.title}
                  label={item.title}
                  className="design-card-image"
                />
                <div className="design-card-caption">
                  <span className="design-card-category">{item.category}</span>
                  <span className="design-card-title">{item.title}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {openItem && openItem.image && (
        <Lightbox
          src={openItem.image}
          alt={openItem.title}
          label={`${openItem.title} — ${openItem.category}`}
          onClose={() => setOpenId(null)}
        />
      )}
    </section>
  );
}
