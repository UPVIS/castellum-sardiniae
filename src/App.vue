<template>
  <div id="app" class="app">
    <!-- Demo Banner -->
    <Transition name="slide-down">
      <div v-if="showDemoBanner" class="demo-banner">
        <div class="demo-banner__content">
          <span class="demo-banner__icon">⚠️</span>
          <span class="demo-banner__text">
            {{ locale === 'de' 
              ? 'Dies ist eine Testseite – kein echtes Produkt' 
              : 'Questa è una pagina di test – nessun prodotto reale' 
            }}
          </span>
        </div>
        <button class="demo-banner__close" @click="closeDemoBanner" aria-label="Schließen">×</button>
      </div>
    </Transition>

    <AppHeader :class="{ 'header--with-banner': showDemoBanner }" />
    <main>
      <HeroSlider />
      <WelcomeSection />
      <ImageGallery />
      <TestimonialsSection />
      <BookingSection />
      <ContactSection />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppHeader from './components/AppHeader.vue'
import HeroSlider from './components/HeroSlider.vue'
import WelcomeSection from './components/WelcomeSection.vue'
import ImageGallery from './components/ImageGallery.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import BookingSection from './components/BookingSection.vue'
import ContactSection from './components/ContactSection.vue'
import AppFooter from './components/AppFooter.vue'

const { locale } = useI18n()
const showDemoBanner = ref(true)

const closeDemoBanner = () => {
  showDemoBanner.value = false
}
</script>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

/* Demo Banner */
.demo-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1100;
  background: var(--color-primary);
  color: var(--color-white);
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.demo-banner__content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.demo-banner__icon {
  font-size: 1rem;
}

.demo-banner__text {
  font-weight: 500;
  letter-spacing: 0.02em;
}

.demo-banner__close {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: var(--color-white);
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
  opacity: 0.7;
  transition: opacity var(--transition-fast);
  padding: 0.25rem;
}

.demo-banner__close:hover {
  opacity: 1;
}

/* Slide-down transition */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* Adjust header when banner is visible */
.header--with-banner {
  top: 38px !important;
}

/* Smooth scroll for all browsers */
html {
  scroll-behavior: smooth;
}

/* Selection color */
::selection {
  background: var(--color-primary);
  color: var(--color-white);
}

::-moz-selection {
  background: var(--color-primary);
  color: var(--color-white);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--color-background);
}

::-webkit-scrollbar-thumb {
  background: var(--color-secondary);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-primary);
}
</style>
