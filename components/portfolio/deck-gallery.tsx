"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type DeckItem = {
  title: string;
  description?: string;
  embedUrl?: string;
  slides?: {
    title: string;
    image: string;
  }[];
  type?: "slides" | "pdf";
};

export function DeckGallery({ items }: { items: DeckItem[] }) {
  const [activeDeckIndex, setActiveDeckIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const activeItem = items[activeDeckIndex];
  const slides = activeItem?.slides ?? [];
  const activeSlide = slides[activeSlideIndex];

  if (!activeItem?.embedUrl && !slides.length) return null;

  const slideCount = slides.length || items.length;
  const canMoveSlides = slides.length > 1;
  const canMoveDecks = !slides.length && items.length > 1;
  const canMove = canMoveSlides || canMoveDecks;

  const move = (direction: -1 | 1) => {
    if (canMoveSlides) {
      setActiveSlideIndex((index) => (index + direction + slides.length) % slides.length);
      return;
    }

    if (canMoveDecks) {
      setActiveDeckIndex((index) => (index + direction + items.length) % items.length);
      setActiveSlideIndex(0);
    }
  };

  return (
    <div className="mt-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a6757d]">Project Gallery</p>
        <div className="flex items-center gap-2 text-xs text-[#766a61]">
          <span>
            {(slides.length ? activeSlideIndex : activeDeckIndex) + 1} / {slideCount}
          </span>
          <button
            aria-label="Previous slide"
            className="flex size-8 items-center justify-center rounded-md border border-[#e3cbd0] text-[#8b4f56] transition hover:bg-[#f7dce2] disabled:cursor-not-allowed disabled:opacity-35"
            disabled={!canMove}
            onClick={() => move(-1)}
            type="button"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            aria-label="Next slide"
            className="flex size-8 items-center justify-center rounded-md border border-[#e3cbd0] text-[#8b4f56] transition hover:bg-[#f7dce2] disabled:cursor-not-allowed disabled:opacity-35"
            disabled={!canMove}
            onClick={() => move(1)}
            type="button"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-[#eadfd0] bg-[#fbf4ea] p-2">
        <div className="aspect-video overflow-hidden rounded-sm border border-[#eadfd0] bg-[#fff7ef]">
          {activeSlide ? (
            <img
              alt={`${activeItem.title}: ${activeSlide.title}`}
              className="h-full w-full object-contain"
              key={activeSlide.image}
              src={activeSlide.image}
            />
          ) : (
            <iframe
              allowFullScreen
              className="h-full w-full"
              loading="lazy"
              src={activeItem.embedUrl}
              title={activeItem.title}
            />
          )}
        </div>
        <div className="px-1 pb-1 pt-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a6757d]">
                {activeItem.type === "pdf" ? "PDF Deck" : activeSlide?.title ?? "Slide Deck"}
              </p>
              <h4 className="mt-1 text-base font-semibold text-[#332722]">{activeItem.title}</h4>
            </div>
            <p className="shrink-0 text-xs text-[#766a61]">{activeSlide ? "Click the arrows" : "Use the viewer arrows"}</p>
          </div>
          {activeItem.description ? (
            <p className="mt-2 max-w-2xl text-xs leading-5 text-[#766a61]">{activeItem.description}</p>
          ) : null}
          {slides.length > 1 ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {slides.map((slide, index) => (
                <button
                  aria-label={`Show ${slide.title}`}
                  className={`h-1.5 rounded-full transition ${index === activeSlideIndex ? "w-7 bg-[#8b4f56]" : "w-3 bg-[#e3cbd0] hover:bg-[#c8949d]"}`}
                  key={slide.image}
                  onClick={() => setActiveSlideIndex(index)}
                  type="button"
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
