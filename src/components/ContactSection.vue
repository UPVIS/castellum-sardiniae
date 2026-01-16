<template>
  <section id="contact" class="contact">
    <!-- Decorative Top Border -->
    <div class="contact__border">
      <svg viewBox="0 0 1200 30" preserveAspectRatio="none" class="contact__wave">
        <path d="M0 30 Q300 0 600 15 T1200 30 L1200 0 L0 0 Z" fill="currentColor"/>
      </svg>
    </div>

    <div class="container">
      <div class="section-title">
        <div class="section-title__ornament">
          <span class="ornament-shield">🛡️</span>
        </div>
        <h2>{{ t('contact.title') }}</h2>
        <p>{{ t('contact.subtitle') }}</p>
      </div>

      <div class="contact__divider">
        <span class="divider-spear">⚜</span>
      </div>

      <div class="contact__wrapper">
        <!-- Contact Info -->
        <div class="contact__info">
          <div class="contact__card">
            <div class="contact__item">
              <div class="contact__icon">📍</div>
              <div class="contact__details">
                <h4>{{ t('contact.address') }}</h4>
                <p>{{ t('contact.addressValue') }}</p>
              </div>
            </div>

            <div class="contact__item">
              <div class="contact__icon">📞</div>
              <div class="contact__details">
                <h4>{{ t('contact.phone') }}</h4>
                <p><a href="tel:+390701234567">{{ t('contact.phoneValue') }}</a></p>
              </div>
            </div>

            <div class="contact__item">
              <div class="contact__icon">✉️</div>
              <div class="contact__details">
                <h4>{{ t('contact.email') }}</h4>
                <p><a href="mailto:info@castellum-sardiniae.it">{{ t('contact.emailValue') }}</a></p>
              </div>
            </div>

            <div class="contact__item">
              <div class="contact__icon">🕐</div>
              <div class="contact__details">
                <h4>{{ t('contact.hours') }}</h4>
                <p>{{ t('contact.hoursValue') }}</p>
              </div>
            </div>
          </div>

          <!-- Map Placeholder -->
          <div class="contact__map">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750347084!2d8.889232899999999!3d39.2238411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e733c1b0f93ff7%3A0x410e0eb4f4764c0!2sCagliari%2C%20Province%20of%20Cagliari%2C%20Italy!5e0!3m2!1sen!2sde!4v1705000000000!5m2!1sen!2sde" 
              width="100%" 
              height="250" 
              style="border:0; border-radius: 8px;" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="contact__form-wrapper">
          <form @submit.prevent="handleSubmit" class="contact__form">
            <div class="form-group">
              <label for="name">{{ t('contact.form.name') }}</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name" 
                required
                :placeholder="locale === 'de' ? 'Max Mustermann' : 'Mario Rossi'"
              />
            </div>

            <div class="form-group">
              <label for="email">{{ t('contact.form.email') }}</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email" 
                required
                placeholder="email@beispiel.de"
              />
            </div>

            <div class="form-group">
              <label for="message">{{ t('contact.form.message') }}</label>
              <textarea 
                id="message" 
                v-model="form.message" 
                required
                :placeholder="locale === 'de' ? 'Ihre Nachricht an uns...' : 'Il vostro messaggio...'"
              ></textarea>
            </div>

            <button type="submit" class="btn btn-primary contact__submit" :disabled="isSubmitting">
              <span v-if="isSubmitting">{{ locale === 'de' ? 'Wird gesendet...' : 'Invio in corso...' }}</span>
              <span v-else>{{ t('contact.form.send') }}</span>
            </button>

            <!-- Success/Error Messages -->
            <Transition name="fade">
              <div v-if="submitStatus === 'success'" class="contact__message contact__message--success">
                ✓ {{ t('contact.form.success') }}
              </div>
            </Transition>

            <Transition name="fade">
              <div v-if="submitStatus === 'error'" class="contact__message contact__message--error">
                ✕ {{ t('contact.form.error') }}
              </div>
            </Transition>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref(null)

const handleSubmit = async () => {
  isSubmitting.value = true
  submitStatus.value = null

  // Simulate form submission
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In a real app, you would send the form data to your backend or a service like Formspree
    console.log('Form submitted:', form)
    
    submitStatus.value = 'success'
    
    // Reset form
    form.name = ''
    form.email = ''
    form.message = ''
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      submitStatus.value = null
    }, 5000)
  } catch (error) {
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact {
  background: var(--color-background);
  padding: var(--spacing-xl) 0;
  position: relative;
}

/* Decorative Border */
.contact__border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
  overflow: hidden;
}

.contact__wave {
  width: 100%;
  height: 100%;
  color: var(--color-background-dark);
}

/* Section Title Ornament */
.section-title__ornament {
  margin-bottom: 1rem;
}

.ornament-shield {
  font-size: 2.5rem;
  display: block;
}

/* Divider */
.contact__divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5rem 0 2rem;
}

.contact__divider::before,
.contact__divider::after {
  content: '';
  flex: 1;
  max-width: 150px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-accent), transparent);
}

.divider-spear {
  color: var(--color-accent);
  font-size: 1.5rem;
  padding: 0 1.5rem;
}

.contact__wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: var(--spacing-md);
}

/* Contact Info */
.contact__info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact__card {
  background: var(--color-white);
  padding: 2rem;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(212, 184, 150, 0.3);
  position: relative;
}

.contact__card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: 20px;
  right: 20px;
  height: 4px;
  background: linear-gradient(90deg, transparent, var(--color-accent), transparent);
  border-radius: 2px;
}

.contact__item {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-secondary);
}

.contact__item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.contact__item:first-child {
  padding-top: 0;
}

.contact__icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.contact__details h4 {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-primary);
  margin-bottom: 0.25rem;
}

.contact__details p {
  margin: 0;
  color: var(--color-text-light);
}

.contact__details a {
  color: var(--color-text-light);
}

.contact__details a:hover {
  color: var(--color-primary);
}

.contact__map {
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

/* Contact Form */
.contact__form-wrapper {
  background: var(--color-white);
  padding: 2.5rem;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(212, 184, 150, 0.3);
  position: relative;
}

.contact__form-wrapper::before {
  content: '✉';
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  background: var(--color-white);
  padding: 0 1rem;
  color: var(--color-accent);
}

.contact__form .form-group {
  margin-bottom: 1.5rem;
}

.contact__form label {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.contact__submit {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
}

.contact__submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Messages */
.contact__message {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: var(--radius-sm);
  text-align: center;
  font-weight: 500;
}

.contact__message--success {
  background: rgba(76, 175, 80, 0.1);
  color: #2e7d32;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.contact__message--error {
  background: rgba(244, 67, 54, 0.1);
  color: #c62828;
  border: 1px solid rgba(244, 67, 54, 0.3);
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 1023px) {
  .contact__wrapper {
    gap: 2rem;
  }

  .contact__form-wrapper {
    padding: 2rem;
  }
}

@media (max-width: 767px) {
  .contact__wrapper {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact__card {
    padding: 1.5rem;
  }

  .contact__form-wrapper {
    padding: 1.5rem;
  }
}
</style>
