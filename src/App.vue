<template>
  <div id="app" class="app">
    <AppHeader />
    <main>
      <HeroSlider />
      <WelcomeSection />
      <ImageGallery />
      <TestimonialsSection />
      <ContactSection />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import HeroSlider from './components/HeroSlider.vue'
import WelcomeSection from './components/WelcomeSection.vue'
import ImageGallery from './components/ImageGallery.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import ContactSection from './components/ContactSection.vue'
import AppFooter from './components/AppFooter.vue'
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
