'use client';

import { useEffect, useState } from 'react';
import { PicsumImage } from '../types/picsum';
import { ImageCarousel } from './components/ImageCarousel';
import styles from './page.module.css';

export default function HomePage() {
  const [images, setImages] = useState<PicsumImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);

  useEffect(() => {
    async function loadImages() {
      try {
        const res = await fetch(
          'https://picsum.photos/v2/list'
        );
        const data: PicsumImage[] = await res.json();
        setImages(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, []);

  const handleToggleSelect = (url: string) => {
    setSelectedUrls((prev) =>
      prev.includes(url)
        ? prev.filter((u) => u !== url)
        : [...prev, url]
    );
  };

  if (loading) {
    return <div className={styles.center}>Loading...</div>;
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Image Carousel</h1>

      <ImageCarousel
        images={images}
        selectedUrls={selectedUrls}
        onToggleSelect={handleToggleSelect}
      />

     
    </main>
  );
}