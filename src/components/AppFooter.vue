<template>
  <footer class="footer">
    <div class="container">
      <!-- Footer Top -->
      <div class="footer__top">
        <!-- Logo & Description -->
        <div class="footer__brand">
          <a href="#" class="footer__logo">
            <span class="footer__logo-icon">🏛️</span>
            <span class="footer__logo-text">Castellum Sardiniae</span>
          </a>
          <p class="footer__tagline">
            {{ locale === 'de' 
              ? 'Eine Reise in die römische Vergangenheit Sardiniens' 
              : 'Un viaggio nel passato romano della Sardegna' 
            }}
          </p>
        </div>

        <!-- Social Links -->
        <div class="footer__social">
          <h4>{{ t('footer.followUs') }}</h4>
          <div class="footer__social-links">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              class="footer__social-link"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              class="footer__social-link"
              aria-label="YouTube"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer__links">
          <h4>{{ locale === 'de' ? 'Navigation' : 'Navigazione' }}</h4>
          <nav>
            <a href="#home">{{ t('nav.home') }}</a>
            <a href="#about">{{ t('nav.about') }}</a>
            <a href="#gallery">{{ t('nav.gallery') }}</a>
            <a href="#booking">{{ t('nav.booking') }}</a>
            <a href="#contact">{{ t('nav.contact') }}</a>
          </nav>
        </div>
      </div>

      <!-- Footer Divider -->
      <div class="footer__divider">
        <span>⚜</span>
      </div>

      <!-- Footer Bottom -->
      <div class="footer__bottom">
        <p class="footer__copyright">{{ t('footer.copyright') }}</p>
        <div class="footer__legal">
          <a href="https://upvis.de/datenschutz" target="_blank" rel="noopener noreferrer">{{ t('footer.privacy') }}</a>
          <span>|</span>
          <a href="https://upvis.de/impressum" target="_blank" rel="noopener noreferrer">{{ t('footer.imprint') }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
</script>

<style scoped>
.footer {
  background: linear-gradient(to bottom, var(--color-primary-dark), #3D2914);
  color: var(--color-white);
  padding: var(--spacing-lg) 0 var(--spacing-md);
}

.footer__top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: var(--spacing-md);
}

/* Brand */
.footer__brand {
  max-width: 350px;
}

.footer__logo {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-white);
  margin-bottom: 1rem;
}

.footer__logo-icon {
  font-size: 2rem;
}

.footer__logo-text {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.footer__tagline {
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

/* Social */
.footer__social h4,
.footer__links h4 {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-accent);
  margin-bottom: 1.25rem;
}

.footer__social-links {
  display: flex;
  gap: 1rem;
}

.footer__social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: var(--color-white);
  transition: all var(--transition-normal);
}

.footer__social-link:hover {
  background: var(--color-accent);
  transform: translateY(-3px);
}

.footer__social-link svg {
  width: 22px;
  height: 22px;
}

/* Links */
.footer__links nav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer__links a {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  transition: color var(--transition-fast);
}

.footer__links a:hover {
  color: var(--color-accent);
}

/* Divider */
.footer__divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: var(--spacing-md) 0;
}

.footer__divider::before,
.footer__divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
}

.footer__divider span {
  padding: 0 1.5rem;
  color: var(--color-accent);
  font-size: 1.25rem;
}

/* Bottom */
.footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer__copyright {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  margin: 0;
}

.footer__legal {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.footer__legal a {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  transition: color var(--transition-fast);
}

.footer__legal a:hover {
  color: var(--color-white);
}

.footer__legal span {
  color: rgba(255, 255, 255, 0.3);
}

/* Responsive */
@media (max-width: 1023px) {
  .footer__top {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .footer__brand {
    grid-column: 1 / -1;
    max-width: 100%;
    text-align: center;
  }

  .footer__logo {
    justify-content: center;
  }
}

@media (max-width: 767px) {
  .footer__top {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }

  .footer__social-links {
    justify-content: center;
  }

  .footer__links nav {
    align-items: center;
  }

  .footer__bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>
