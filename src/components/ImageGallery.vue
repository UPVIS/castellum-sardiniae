<template>
  <section id="gallery" class="gallery">
    <div class="container">
      <div class="section-title">
        <div class="section-title__ornament">
          <svg viewBox="0 0 100 40" class="laurel-left">
            <path d="M50 35 Q35 25 25 10 Q35 18 42 22 Q38 15 35 5 Q42 15 48 20 Q46 12 45 2 Q50 15 50 20 Q50 15 55 2 Q54 12 52 20 Q58 15 65 5 Q62 15 58 22 Q65 18 75 10 Q65 25 50 35" fill="none" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          <span class="section-title__icon">📷</span>
          <svg viewBox="0 0 100 40" class="laurel-right">
            <path d="M50 35 Q35 25 25 10 Q35 18 42 22 Q38 15 35 5 Q42 15 48 20 Q46 12 45 2 Q50 15 50 20 Q50 15 55 2 Q54 12 52 20 Q58 15 65 5 Q62 15 58 22 Q65 18 75 10 Q65 25 50 35" fill="none" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </div>
        <h2>{{ t('gallery.title') }}</h2>
        <p>{{ t('gallery.subtitle') }}</p>
      </div>

      <!-- Masonry Gallery Grid -->
      <div class="gallery__masonry">
        <div 
          v-for="(image, index) in images" 
          :key="index"
          class="gallery__item"
          :class="image.size"
          @click="openLightbox(index)"
        >
          <img :src="image.thumb" :alt="image.alt" loading="lazy" />
          <div class="gallery__overlay">
            <div class="gallery__overlay-content">
              <span class="gallery__zoom">⊕</span>
              <p class="gallery__caption">{{ image.caption }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div 
          v-if="lightboxOpen" 
          class="lightbox"
          @click.self="closeLightbox"
          @keydown.esc="closeLightbox"
        >
          <button class="lightbox__close" @click="closeLightbox" aria-label="Close">×</button>
          
          <button class="lightbox__nav lightbox__nav--prev" @click="prevImage" aria-label="Previous">
            ‹
          </button>
          
          <div class="lightbox__content">
            <img 
              :src="images[currentIndex].full" 
              :alt="images[currentIndex].alt"
              @click.stop
            />
            <p class="lightbox__caption">{{ images[currentIndex].caption }}</p>
          </div>
          
          <button class="lightbox__nav lightbox__nav--next" @click="nextImage" aria-label="Next">
            ›
          </button>

          <div class="lightbox__counter">
            {{ currentIndex + 1 }} / {{ images.length }}
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const lightboxOpen = ref(false)
const currentIndex = ref(0)

// Images with size variations for Masonry layout
const images = [
  {
    thumb: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80',
    full: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1920&q=80',
    alt: 'Roman Colosseum',
    caption: 'Antike römische Architektur',
    size: 'gallery__item--tall'
  },
  {
    thumb: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=600&q=80',
    full: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1920&q=80',
    alt: 'Ancient columns',
    caption: 'Erhaltene Säulen aus der Kaiserzeit',
    size: ''
  },
  {
    thumb: 'https://images.unsplash.com/photo-1553342385-111fd6bc6ab3?w=600&q=80',
    full: 'https://images.unsplash.com/photo-1553342385-111fd6bc6ab3?w=1920&q=80',
    alt: 'Roman ruins',
    caption: 'Überreste des Hauptgebäudes',
    size: ''
  },
  {
    thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    full: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    alt: 'Mediterranean coast',
    caption: 'Blick auf die sardische Küste',
    size: 'gallery__item--wide'
  },
  {
    thumb: 'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=600&q=80',
    full: 'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=1920&q=80',
    alt: 'Ancient mosaic',
    caption: 'Restauriertes Bodenmosaik',
    size: 'gallery__item--tall'
  },
  {
    thumb: 'https://images.unsplash.com/photo-1548097057-26c06bc2d7e0?w=600&q=80',
    full: 'https://images.unsplash.com/photo-1548097057-26c06bc2d7e0?w=1920&q=80',
    alt: 'Stone walls',
    caption: 'Die historischen Festungsmauern',
    size: ''
  },
  {
    thumb: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=600&q=80',
    full: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=1920&q=80',
    alt: 'Roman artifacts',
    caption: 'Archäologische Fundstücke',
    size: ''
  },
  {
    thumb: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80',
    full: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1920&q=80',
    alt: 'Sardinian landscape',
    caption: 'Die malerische Umgebung',
    size: 'gallery__item--wide'
  },
  {
    thumb: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?w=600&q=80',
    full: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?w=1920&q=80',
    alt: 'Ancient Roman road',
    caption: 'Historische Römerstraße',
    size: ''
  }
]

const openLightbox = (index) => {
  currentIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length
}

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length
}

const handleKeydown = (e) => {
  if (!lightboxOpen.value) return
  
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.gallery {
  background: var(--color-background-dark);
  padding: var(--spacing-xl) 0;
  position: relative;
}

.gallery::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    var(--color-accent) 20%, 
    var(--color-primary) 50%, 
    var(--color-accent) 80%, 
    transparent 100%
  );
}

/* Section Title with ornaments */
.section-title__ornament {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.section-title__ornament svg {
  width: 50px;
  height: 20px;
  color: var(--color-accent);
}

.section-title__ornament .laurel-right {
  transform: scaleX(-1);
}

.section-title__icon {
  font-size: 1.75rem;
}

/* Masonry Grid - Fixed for full coverage */
.gallery__masonry {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 220px);
  gap: 1rem;
  margin-top: var(--spacing-md);
}

.gallery__item {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  min-height: 100%;
}

.gallery__item--tall {
  grid-row: span 2;
}

.gallery__item--wide {
  grid-column: span 2;
}

.gallery__item img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.gallery__item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.gallery__item:hover img {
  transform: scale(1.08);
}

.gallery__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to top,
    rgba(61, 41, 20, 0.9) 0%,
    rgba(61, 41, 20, 0.4) 40%,
    rgba(61, 41, 20, 0.2) 100%
  );
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.gallery__item:hover .gallery__overlay {
  opacity: 1;
}

.gallery__overlay-content {
  text-align: center;
  transform: translateY(20px);
  transition: transform var(--transition-normal);
}

.gallery__item:hover .gallery__overlay-content {
  transform: translateY(0);
}

.gallery__zoom {
  display: block;
  font-size: 2rem;
  color: var(--color-accent);
  margin-bottom: 0.5rem;
}

.gallery__caption {
  color: var(--color-white);
  font-size: 0.95rem;
  font-style: italic;
  margin: 0;
}

/* Lightbox */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox__content {
  max-width: 90vw;
  max-height: 80vh;
  text-align: center;
}

.lightbox__content img {
  max-width: 100%;
  max-height: 75vh;
  border-radius: var(--radius-sm);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.lightbox__caption {
  color: var(--color-white);
  margin-top: 1rem;
  font-size: 1.1rem;
  font-style: italic;
}

.lightbox__close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: var(--color-white);
  font-size: 3rem;
  cursor: pointer;
  line-height: 1;
  transition: color var(--transition-fast);
  z-index: 10;
}

.lightbox__close:hover {
  color: var(--color-accent);
}

.lightbox__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(139, 69, 19, 0.5);
  border: 2px solid rgba(201, 162, 39, 0.4);
  color: var(--color-white);
  font-size: 3rem;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  border-radius: var(--radius-sm);
}

.lightbox__nav:hover {
  background: rgba(139, 69, 19, 0.8);
  border-color: var(--color-accent);
}

.lightbox__nav--prev {
  left: 1.5rem;
}

.lightbox__nav--next {
  right: 1.5rem;
}

.lightbox__counter {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  color: var(--color-white);
  font-family: var(--font-heading);
  font-size: 1rem;
  letter-spacing: 0.1em;
}

/* Lightbox Transition */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 1023px) {
  .gallery__masonry {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 180px);
  }

  .gallery__item--wide {
    grid-column: span 2;
  }
}

@media (max-width: 767px) {
  .gallery__masonry {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 160px);
    gap: 0.75rem;
  }

  .gallery__item--wide,
  .gallery__item--tall {
    grid-column: span 1;
    grid-row: span 1;
  }

  .gallery__overlay {
    padding: 1rem;
  }

  .gallery__zoom {
    font-size: 1.5rem;
  }

  .gallery__caption {
    font-size: 0.85rem;
  }

  .lightbox__nav {
    padding: 0.75rem 1rem;
    font-size: 2rem;
  }

  .lightbox__nav--prev {
    left: 0.5rem;
  }

  .lightbox__nav--next {
    right: 0.5rem;
  }

  .lightbox__close {
    top: 1rem;
    right: 1rem;
    font-size: 2.5rem;
  }

  .section-title__ornament svg {
    width: 35px;
    height: 15px;
  }

  .section-title__icon {
    font-size: 1.25rem;
  }
}
</style>
