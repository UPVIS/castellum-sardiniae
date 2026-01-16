<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <div class="container header__container">
      <!-- Logo -->
      <a href="#" class="header__logo">
        <span class="header__logo-icon">🏛️</span>
        <span class="header__logo-text">Castellum Sardiniae</span>
      </a>

      <!-- Navigation -->
      <nav class="header__nav" :class="{ 'header__nav--open': isMenuOpen }">
        <ul class="header__menu">
          <li><a href="#home" @click="closeMenu">{{ t('nav.home') }}</a></li>
          <li><a href="#about" @click="closeMenu">{{ t('nav.about') }}</a></li>
          <li><a href="#gallery" @click="closeMenu">{{ t('nav.gallery') }}</a></li>
          <li><a href="#contact" @click="closeMenu">{{ t('nav.contact') }}</a></li>
        </ul>

        <!-- Language Switcher -->
        <div class="header__lang">
          <button 
            :class="{ active: locale === 'de' }" 
            @click="changeLocale('de')"
          >
            DE
          </button>
          <span class="header__lang-divider">|</span>
          <button 
            :class="{ active: locale === 'it' }" 
            @click="changeLocale('it')"
          >
            IT
          </button>
        </div>
      </nav>

      <!-- Mobile Menu Button -->
      <button 
        class="header__burger" 
        :class="{ 'header__burger--open': isMenuOpen }"
        @click="toggleMenu"
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const isScrolled = ref(false)
const isMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}

const changeLocale = (lang) => {
  locale.value = lang
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.25rem 0;
  background: linear-gradient(to bottom, rgba(245, 230, 211, 0.85) 0%, rgba(245, 230, 211, 0) 100%);
  transition: all var(--transition-normal);
}

.header--scrolled {
  background: rgba(245, 230, 211, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-md);
  padding: 0.75rem 0;
}

.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary);
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
  transition: all var(--transition-fast);
}

.header--scrolled .header__logo {
  color: var(--color-primary);
  text-shadow: none;
}

.header__logo-icon {
  font-size: 1.75rem;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.header__menu {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.header__menu a {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-primary);
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
  position: relative;
  padding: 0.25rem 0;
  transition: color var(--transition-fast);
}

.header__menu a:hover {
  color: var(--color-accent);
}

.header--scrolled .header__menu a {
  color: var(--color-text);
  text-shadow: none;
}

.header__menu a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-accent);
  transition: width var(--transition-fast);
}

.header__menu a:hover::after {
  width: 100%;
}

.header__lang {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header__lang button {
  background: none;
  border: none;
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-primary);
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  transition: all var(--transition-fast);
  opacity: 0.7;
}

.header--scrolled .header__lang button {
  color: var(--color-text);
  text-shadow: none;
}

.header__lang button.active {
  opacity: 1;
  color: var(--color-accent);
}

.header__lang button:hover {
  opacity: 1;
  color: var(--color-accent);
}

.header__lang-divider {
  color: var(--color-primary);
  opacity: 0.5;
}

.header--scrolled .header__lang-divider {
  color: var(--color-text);
}

.header__burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.header__burger span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--color-primary);
  transition: all var(--transition-fast);
}

.header--scrolled .header__burger span {
  background: var(--color-primary);
}

.header__burger--open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.header__burger--open span:nth-child(2) {
  opacity: 0;
}

.header__burger--open span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

@media (max-width: 767px) {
  .header__burger {
    display: flex;
  }

  .header__nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    flex-direction: column;
    justify-content: center;
    gap: 3rem;
    background: rgba(139, 69, 19, 0.98);
    transform: translateX(100%);
    transition: transform var(--transition-normal);
  }

  .header__nav--open {
    transform: translateX(0);
  }

  .header__nav--open .header__menu a,
  .header__nav--open .header__lang button,
  .header__nav--open .header__lang-divider {
    color: var(--color-white);
    text-shadow: none;
  }

  .header__menu {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .header__menu a {
    font-size: 1.25rem;
  }

  .header__lang button {
    font-size: 1rem;
  }
}
</style>
