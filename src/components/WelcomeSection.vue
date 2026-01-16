<template>
  <section id="about" class="welcome">
    <!-- Decorative Top Border -->
    <div class="welcome__border welcome__border--top">
      <div class="meander-pattern"></div>
    </div>

    <div class="container">
      <div class="welcome__content">
        <!-- Decorative Element with enhanced laurels -->
        <div class="welcome__decoration">
          <svg viewBox="0 0 120 80" class="welcome__laurel welcome__laurel--left">
            <g fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M60 70 Q40 50 25 25 Q38 35 48 38 Q42 28 38 15 Q48 28 55 35 Q52 22 50 8 Q58 25 60 35"/>
              <path d="M55 65 Q42 52 32 35 Q42 42 50 44 Q46 36 44 25 Q52 36 56 42"/>
              <path d="M50 60 Q40 50 35 40 Q42 45 48 46"/>
            </g>
          </svg>
          <div class="welcome__icon-wrapper">
            <span class="welcome__icon">🏛️</span>
            <div class="welcome__icon-ring"></div>
          </div>
          <svg viewBox="0 0 120 80" class="welcome__laurel welcome__laurel--right">
            <g fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M60 70 Q40 50 25 25 Q38 35 48 38 Q42 28 38 15 Q48 28 55 35 Q52 22 50 8 Q58 25 60 35"/>
              <path d="M55 65 Q42 52 32 35 Q42 42 50 44 Q46 36 44 25 Q52 36 56 42"/>
              <path d="M50 60 Q40 50 35 40 Q42 45 48 46"/>
            </g>
          </svg>
        </div>

        <h2 class="welcome__title">{{ t('welcome.title') }}</h2>
        
        <!-- Enhanced Ornament Divider -->
        <div class="welcome__divider">
          <div class="divider-line"></div>
          <div class="divider-ornament">
            <span class="divider-dot"></span>
            <span class="divider-diamond">◆</span>
            <span class="divider-dot"></span>
          </div>
          <div class="divider-line"></div>
        </div>

        <div class="welcome__text">
          <p>{{ t('welcome.text1') }}</p>
          <p>{{ t('welcome.text2') }}</p>
          <p>{{ t('welcome.text3') }}</p>
        </div>

        <!-- Feature Highlights with Roman styling -->
        <div class="welcome__features">
          <div class="welcome__feature" v-for="(feature, index) in features" :key="index">
            <div class="welcome__feature-column"></div>
            <div class="welcome__feature-content">
              <div class="welcome__feature-icon">{{ feature.icon }}</div>
              <h3>{{ locale === 'de' ? feature.titleDe : feature.titleIt }}</h3>
              <p>{{ locale === 'de' ? feature.textDe : feature.textIt }}</p>
            </div>
            <div class="welcome__feature-base"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Decorative Bottom Border -->
    <div class="welcome__border welcome__border--bottom">
      <div class="meander-pattern"></div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const features = [
  {
    icon: '⚔️',
    titleDe: 'Militärgeschichte',
    titleIt: 'Storia militare',
    textDe: 'Erkunden Sie die strategische Bedeutung des Kastells.',
    textIt: 'Esplorate l\'importanza strategica del castello.'
  },
  {
    icon: '🏺',
    titleDe: 'Archäologie',
    titleIt: 'Archeologia',
    textDe: 'Entdecken Sie die Funde aus zwei Jahrtausenden.',
    textIt: 'Scoprite i reperti di due millenni.'
  },
  {
    icon: '🌊',
    titleDe: 'Küstenlage',
    titleIt: 'Posizione costiera',
    textDe: 'Genießen Sie die atemberaubende Aussicht.',
    textIt: 'Godetevi la vista mozzafiato.'
  }
]
</script>

<style scoped>
.welcome {
  background: var(--color-background);
  padding: var(--spacing-xl) 0;
  overflow: hidden;
  position: relative;
}

/* Meander Pattern Border (Greek Key) */
.welcome__border {
  position: absolute;
  left: 0;
  right: 0;
  height: 20px;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.welcome__border--top {
  top: 0;
}

.welcome__border--bottom {
  bottom: 0;
}

.meander-pattern {
  width: 100%;
  max-width: 1200px;
  height: 100%;
  background: 
    repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent 10px,
      var(--color-accent) 10px,
      var(--color-accent) 12px,
      transparent 12px,
      transparent 22px
    ),
    repeating-linear-gradient(
      0deg,
      transparent 0px,
      transparent 6px,
      var(--color-accent) 6px,
      var(--color-accent) 8px
    );
  opacity: 0.3;
}

.welcome__content {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

/* Enhanced Decoration */
.welcome__decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.welcome__laurel {
  width: 80px;
  height: 55px;
  color: var(--color-accent);
}

.welcome__laurel--right {
  transform: scaleX(-1);
}

.welcome__icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.welcome__icon {
  font-size: 3.5rem;
  position: relative;
  z-index: 2;
}

.welcome__icon-ring {
  position: absolute;
  width: 80px;
  height: 80px;
  border: 2px solid var(--color-accent);
  border-radius: 50%;
  opacity: 0.4;
}

.welcome__title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  margin-bottom: 0;
}

/* Enhanced Divider */
.welcome__divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0 2rem;
}

.divider-line {
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-accent), transparent);
}

.divider-ornament {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.divider-dot {
  width: 6px;
  height: 6px;
  background: var(--color-accent);
  border-radius: 50%;
}

.divider-diamond {
  color: var(--color-accent);
  font-size: 0.8rem;
}

.welcome__text {
  font-size: 1.2rem;
  line-height: 1.9;
  color: var(--color-text-light);
  max-width: 750px;
  margin: 0 auto var(--spacing-lg);
}

.welcome__text p {
  margin-bottom: 1.25rem;
}

.welcome__text p:last-child {
  margin-bottom: 0;
}

/* Feature Highlights with Roman Column Styling */
.welcome__features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
}

.welcome__feature {
  position: relative;
  padding: 2rem 1.5rem;
  background: var(--color-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  border: 1px solid rgba(212, 184, 150, 0.3);
}

.welcome__feature:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-accent);
}

/* Mini column decoration */
.welcome__feature-column {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 10px;
  background: linear-gradient(to bottom, var(--color-accent), var(--color-secondary));
  border-radius: 2px 2px 0 0;
}

.welcome__feature-base {
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 5px;
  background: linear-gradient(to top, var(--color-secondary), transparent);
  border-radius: 0 0 4px 4px;
}

.welcome__feature-content {
  position: relative;
}

.welcome__feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.welcome__feature h3 {
  font-size: 1.125rem;
  margin-bottom: 0.75rem;
  color: var(--color-primary);
}

.welcome__feature p {
  font-size: 1rem;
  color: var(--color-text-light);
  margin: 0;
}

@media (max-width: 1023px) {
  .welcome__features {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 767px) {
  .welcome__features {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .welcome__feature {
    padding: 1.5rem;
  }

  .welcome__laurel {
    width: 50px;
    height: 35px;
  }

  .welcome__icon {
    font-size: 2.5rem;
  }

  .welcome__icon-ring {
    width: 60px;
    height: 60px;
  }

  .meander-pattern {
    display: none;
  }
}
</style>
