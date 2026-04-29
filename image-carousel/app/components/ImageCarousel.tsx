'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { PicsumImage } from '../../types/picsum';
import styles from './ImageCarousel.module.css';

interface ImageCarouselProps {
  images: PicsumImage[];
  selectedUrls: string[];
  onToggleSelect: (url: string) => void;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  selectedUrls,
  onToggleSelect,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    function updateVisibleCount() {
      const width = window.innerWidth;

      if (width < 640) {
        setVisibleCount(1);
      } else if (width < 1024) {
        setVisibleCount(3);
      } else {
        setVisibleCount(5);
      }
    }

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  if (!images.length) {
    return null;
  }

  const total = images.length;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const visibleImages = Array.from({ length: visibleCount }, (_, i) => {
    const index = (currentIndex + i) % total;
    return images[index];
  });

  return (
    <div className={styles.carousel}>
      <button
        type="button"
        className={styles.navButton}
        onClick={handlePrev}
        aria-label="Previous image"
      >
        ‹
      </button>

      <div className={styles.viewport}>
        <div className={styles.track}>
          {visibleImages.map((img, index) => {
            const isSelected = selectedUrls.includes(img.download_url);

            return (
              <div
                key={`${img.id}-${index}`}
                className={`${styles.slide} ${isSelected ? styles.selected : ''}`}
                onClick={() => onToggleSelect(img.download_url)}
              >
                <Image
                  src={img.download_url}
                  alt={img.author}
                  width={240}
                  height={160}
                  className={styles.image}
                  loading="eager"
                  sizes="(max-width: 639px) 82vw, (max-width: 1023px) 220px, 240px"

                />
                <div className={styles.overlay}></div>
             
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className={styles.navButton}
        onClick={handleNext}
        aria-label="Next image"
      >
        ›
      </button>
    </div>
  );
};