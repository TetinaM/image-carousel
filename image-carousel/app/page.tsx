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
        const res = await fetch('https://picsum.photos/v2/list');
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
      <div className={styles.pageGlow}></div>

      <section className={styles.wrapper}>
        <div className={styles.card}>
          <p className={styles.eyebrow}>UI Task</p>
          <h1 className={styles.title}>Image Carousel</h1>
          <p className={styles.subtitle}>
            Infinite scrolling carousel with image selection and responsive layout.
          </p>

          <div className={styles.carouselShell}>
            <ImageCarousel
              images={images}
              selectedUrls={selectedUrls}
              onToggleSelect={handleToggleSelect}
            />
          </div>

          <section className={styles.selectedSection}>
            <div className={styles.selectedHeader}>
              <h2>Selected image URLs</h2>
              <span className={styles.counter}>{selectedUrls.length}</span>
            </div>

            {selectedUrls.length === 0 ? (
              <div className={styles.emptyState}>
                Click any image to add its URL here.
              </div>
            ) : (
              <ul className={styles.selectedList}>
                {selectedUrls.map((url) => (
                  <li key={url} className={styles.selectedItem}>
                    {url}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}