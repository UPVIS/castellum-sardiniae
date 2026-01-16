<template>
  <section id="home" class="hero">
    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }"
      :pagination="{
        clickable: true
      }"
      :navigation="true"
      :loop="true"
      :effect="'fade'"
      :fadeEffect="{
        crossFade: true
      }"
      class="hero__slider"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <div class="hero__slide" :style="{ backgroundImage: `url(${slide.image})` }">
          <div class="hero__overlay"></div>
          <div class="hero__content">
            <h1 class="hero__title">{{ t('hero.title') }}</h1>
            <div class="hero__ornament">
              <span>⚔</span>
            </div>
            <p class="hero__subtitle">{{ t('hero.subtitle') }}</p>
            <a href="#about" class="btn btn-primary hero__btn">
              {{ locale === 'de' ? 'Entdecken' : 'Scopri' }}
            </a>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>

    <!-- Scroll Indicator -->
    <div class="hero__scroll">
      <span></span>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules'
import { useI18n } from 'vue-i18n'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

const { t, locale } = useI18n()

const modules = [Autoplay, Pagination, Navigation, EffectFade]

// Placeholder images - Replace with actual images
const slides = [
  {
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1920&q=80',
    alt: 'Roman ruins'
  },
  {
    image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1920&q=80',
    alt: 'Ancient columns'
  },
  {
    image: 'https://images.unsplash.com/photo-1553342385-111fd6bc6ab3?w=1920&q=80',
    alt: 'Roman architecture'
  },
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    alt: 'Mediterranean coast'
  }
]
</script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
}

.hero__slider {
  width: 100%;
  height: 100%;
}

.hero__slide {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(61, 41, 20, 0.4) 0%,
    rgba(61, 41, 20, 0.6) 50%,
    rgba(61, 41, 20, 0.8) 100%
  );
}

.hero__content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: var(--spacing-md);
  animation: fadeIn 1s ease;
}

.hero__title {
  font-size: clamp(2.5rem, 8vw, 5rem);
  color: var(--color-white);
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  margin-bottom: 1rem;
  letter-spacing: 0.1em;
}

.hero__ornament {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.hero__ornament::before,
.hero__ornament::after {
  content: '';
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-accent), transparent);
}

.hero__ornament span {
  color: var(--color-accent);
  font-size: 1.5rem;
}

.hero__subtitle {
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  color: var(--color-white);
  font-style: italic;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
  opacity: 0.95;
}

.hero__btn {
  font-size: 1rem;
  padding: 1rem 2.5rem;
}

/* Scroll Indicator */
.hero__scroll {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
}

.hero__scroll span {
  display: block;
  width: 30px;
  height: 50px;
  border: 2px solid var(--color-white);
  border-radius: 25px;
  position: relative;
}

.hero__scroll span::before {
  content: '';
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background: var(--color-white);
  border-radius: 50%;
  animation: scrollIndicator 2s infinite;
}

@keyframes scrollIndicator {
  0% {
    opacity: 1;
    top: 8px;
  }
  100% {
    opacity: 0;
    top: 32px;
  }
}

/* Swiper Customization */
:deep(.swiper-pagination) {
  bottom: 2rem !important;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

:deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background: var(--color-white);
  opacity: 0.4;
  transition: all var(--transition-normal);
  border: 2px solid transparent;
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  background: transparent;
  border-color: var(--color-accent);
  transform: scale(1.3);
}

/* Navigation Arrows - Better positioned */
:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  color: var(--color-white);
  width: 60px;
  height: 60px;
  background: rgba(139, 69, 19, 0.6);
  border: 2px solid rgba(201, 162, 39, 0.4);
  border-radius: 50%;
  transition: all var(--transition-normal);
  top: 50%;
  transform: translateY(-50%);
}

:deep(.swiper-button-prev) {
  left: 2rem;
}

:deep(.swiper-button-next) {
  right: 2rem;
}

:deep(.swiper-button-prev):hover,
:deep(.swiper-button-next):hover {
  background: rgba(139, 69, 19, 0.85);
  border-color: var(--color-accent);
  transform: translateY(-50%) scale(1.1);
}

:deep(.swiper-button-prev)::after,
:deep(.swiper-button-next)::after {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-white);
}

@media (max-width: 1023px) {
  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    width: 50px;
    height: 50px;
  }

  :deep(.swiper-button-prev) {
    left: 1rem;
  }

  :deep(.swiper-button-next) {
    right: 1rem;
  }
}

@media (max-width: 767px) {
  .hero__scroll {
    display: none;
  }

  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    width: 44px;
    height: 44px;
  }

  :deep(.swiper-button-prev) {
    left: 0.75rem;
  }

  :deep(.swiper-button-next) {
    right: 0.75rem;
  }

  :deep(.swiper-button-prev)::after,
  :deep(.swiper-button-next)::after {
    font-size: 1rem;
  }

  :deep(.swiper-pagination) {
    bottom: 1.5rem !important;
  }

  :deep(.swiper-pagination-bullet) {
    width: 8px;
    height: 8px;
  }
}
</style>
