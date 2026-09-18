"use client";

import { useState } from "react";
import Image from "next/image";

export function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const gallery = images.length ? images : [];

  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-border bg-muted">
        {gallery[active] && (
          <Image
            src={gallery[active]}
            alt={name}
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            priority
            className="object-cover"
          />
        )}
      </div>
      {gallery.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {gallery.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden rounded-md border ${
                i === active ? "border-accent" : "border-border"
              }`}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
