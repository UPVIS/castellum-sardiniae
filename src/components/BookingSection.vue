<template>
  <section id="booking" class="booking">
    <div class="container">
      <div class="section-title">
        <div class="section-title__ornament">
          <svg viewBox="0 0 100 40" class="laurel-left">
            <path d="M50 35 Q35 25 25 10 Q35 18 42 22 Q38 15 35 5 Q42 15 48 20 Q46 12 45 2 Q50 15 50 20 Q50 15 55 2 Q54 12 52 20 Q58 15 65 5 Q62 15 58 22 Q65 18 75 10 Q65 25 50 35" fill="none" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          <span class="section-title__icon">🎟️</span>
          <svg viewBox="0 0 100 40" class="laurel-right">
            <path d="M50 35 Q35 25 25 10 Q35 18 42 22 Q38 15 35 5 Q42 15 48 20 Q46 12 45 2 Q50 15 50 20 Q50 15 55 2 Q54 12 52 20 Q58 15 65 5 Q62 15 58 22 Q65 18 75 10 Q65 25 50 35" fill="none" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </div>
        <h2>{{ t('booking.title') }}</h2>
        <p>{{ t('booking.subtitle') }}</p>
      </div>

      <div class="booking__card">
        <!-- Progress Bar -->
        <div class="booking__progress">
          <div 
            v-for="(step, index) in steps" 
            :key="index"
            class="booking__progress-step"
            :class="{ 
              'booking__progress-step--active': currentStep === index,
              'booking__progress-step--completed': currentStep > index
            }"
          >
            <div class="booking__progress-number">
              <span v-if="currentStep > index">✓</span>
              <span v-else>{{ index + 1 }}</span>
            </div>
            <span class="booking__progress-label">{{ t(step.labelKey) }}</span>
          </div>
          <div class="booking__progress-line">
            <div 
              class="booking__progress-line-fill" 
              :style="{ width: `${(currentStep / (steps.length - 1)) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- Step Content -->
        <div class="booking__content">
          <Transition name="fade-slide" mode="out-in">
            <!-- Step 1: Tour Type -->
            <div v-if="currentStep === 0" key="step1" class="booking__step">
              <h3>{{ t('booking.step1.title') }}</h3>
              <div class="booking__tours">
                <div 
                  v-for="tour in tourTypes" 
                  :key="tour.id"
                  class="booking__tour-card"
                  :class="{ 'booking__tour-card--selected': selectedTour === tour.id }"
                  @click="selectTour(tour.id)"
                >
                  <div class="booking__tour-icon">{{ tour.icon }}</div>
                  <h4>{{ t(tour.nameKey) }}</h4>
                  <p class="booking__tour-desc">{{ t(tour.descKey) }}</p>
                  <div class="booking__tour-details">
                    <span class="booking__tour-duration">⏱️ {{ tour.duration }}</span>
                    <span class="booking__tour-price">{{ tour.price }} €</span>
                  </div>
                  <div class="booking__tour-check" v-if="selectedTour === tour.id">✓</div>
                </div>
              </div>
            </div>

            <!-- Step 2: Date & Time -->
            <div v-else-if="currentStep === 1" key="step2" class="booking__step">
              <h3>{{ t('booking.step2.title') }}</h3>
              
              <div class="booking__datetime">
                <div class="booking__date-section">
                  <h4>{{ t('booking.step2.selectDate') }}</h4>
                  <div class="booking__calendar">
                    <div 
                      v-for="date in availableDates" 
                      :key="date.value"
                      class="booking__date"
                      :class="{ 
                        'booking__date--selected': selectedDate === date.value,
                        'booking__date--today': date.isToday
                      }"
                      @click="selectDate(date.value)"
                    >
                      <span class="booking__date-day">{{ date.dayName }}</span>
                      <span class="booking__date-num">{{ date.dayNum }}</span>
                      <span class="booking__date-month">{{ date.month }}</span>
                    </div>
                  </div>
                </div>

                <div class="booking__time-section">
                  <h4>{{ t('booking.step2.selectTime') }}</h4>
                  <div class="booking__times">
                    <button 
                      v-for="slot in timeSlots" 
                      :key="slot.time"
                      class="booking__time"
                      :class="{ 
                        'booking__time--selected': selectedTime === slot.time,
                        'booking__time--unavailable': !slot.available
                      }"
                      :disabled="!slot.available"
                      @click="selectTime(slot.time)"
                    >
                      {{ slot.time }}
                      <span v-if="!slot.available" class="booking__time-status">{{ t('booking.step2.soldOut') }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 3: Contact Details -->
            <div v-else-if="currentStep === 2" key="step3" class="booking__step">
              <h3>{{ t('booking.step3.title') }}</h3>
              
              <form class="booking__form" @submit.prevent>
                <div class="booking__form-row">
                  <div class="booking__form-group">
                    <label>{{ t('booking.step3.name') }} *</label>
                    <input 
                      type="text" 
                      v-model="contactForm.name" 
                      :placeholder="locale === 'de' ? 'Max Mustermann' : 'Mario Rossi'"
                      required
                    />
                  </div>
                  <div class="booking__form-group">
                    <label>{{ t('booking.step3.email') }} *</label>
                    <input 
                      type="email" 
                      v-model="contactForm.email" 
                      placeholder="email@beispiel.de"
                      required
                    />
                  </div>
                </div>

                <div class="booking__form-row">
                  <div class="booking__form-group">
                    <label>{{ t('booking.step3.phone') }}</label>
                    <input 
                      type="tel" 
                      v-model="contactForm.phone" 
                      placeholder="+49 123 456789"
                    />
                  </div>
                  <div class="booking__form-group">
                    <label>{{ t('booking.step3.persons') }} *</label>
                    <select v-model="contactForm.persons">
                      <option v-for="n in 10" :key="n" :value="n">{{ n }} {{ n === 1 ? (locale === 'de' ? 'Person' : 'Persona') : (locale === 'de' ? 'Personen' : 'Persone') }}</option>
                    </select>
                  </div>
                </div>

                <div class="booking__form-group">
                  <label>{{ t('booking.step3.language') }}</label>
                  <div class="booking__language-select">
                    <button 
                      type="button"
                      :class="{ active: contactForm.tourLanguage === 'de' }"
                      @click="contactForm.tourLanguage = 'de'"
                    >
                      🇩🇪 Deutsch
                    </button>
                    <button 
                      type="button"
                      :class="{ active: contactForm.tourLanguage === 'it' }"
                      @click="contactForm.tourLanguage = 'it'"
                    >
                      🇮🇹 Italiano
                    </button>
                  </div>
                </div>

                <div class="booking__form-group">
                  <label>{{ t('booking.step3.wishes') }}</label>
                  <textarea 
                    v-model="contactForm.wishes" 
                    :placeholder="t('booking.step3.wishesPlaceholder')"
                    rows="3"
                  ></textarea>
                </div>
              </form>
            </div>

            <!-- Step 4: Summary -->
            <div v-else-if="currentStep === 3" key="step4" class="booking__step">
              <h3>{{ t('booking.step4.title') }}</h3>
              
              <div class="booking__summary" v-if="!bookingComplete">
                <div class="booking__summary-section">
                  <h4>{{ t('booking.step4.yourTour') }}</h4>
                  <div class="booking__summary-item">
                    <span class="booking__summary-icon">{{ getTourById(selectedTour)?.icon }}</span>
                    <div>
                      <strong>{{ t(getTourById(selectedTour)?.nameKey || '') }}</strong>
                      <span>{{ getTourById(selectedTour)?.duration }}</span>
                    </div>
                  </div>
                </div>

                <div class="booking__summary-section">
                  <h4>{{ t('booking.step4.dateTime') }}</h4>
                  <div class="booking__summary-item">
                    <span class="booking__summary-icon">📅</span>
                    <div>
                      <strong>{{ formatSelectedDate() }}</strong>
                      <span>{{ selectedTime }} {{ locale === 'de' ? 'Uhr' : '' }}</span>
                    </div>
                  </div>
                </div>

                <div class="booking__summary-section">
                  <h4>{{ t('booking.step4.contact') }}</h4>
                  <div class="booking__summary-details">
                    <p><strong>{{ contactForm.name }}</strong></p>
                    <p>{{ contactForm.email }}</p>
                    <p v-if="contactForm.phone">{{ contactForm.phone }}</p>
                    <p>{{ contactForm.persons }} {{ contactForm.persons === 1 ? (locale === 'de' ? 'Person' : 'Persona') : (locale === 'de' ? 'Personen' : 'Persone') }}</p>
                    <p>{{ contactForm.tourLanguage === 'de' ? '🇩🇪 Deutsch' : '🇮🇹 Italiano' }}</p>
                  </div>
                </div>

                <div class="booking__summary-total">
                  <div class="booking__summary-row">
                    <span>{{ t(getTourById(selectedTour)?.nameKey || '') }}</span>
                    <span>{{ getTourById(selectedTour)?.price }} €</span>
                  </div>
                  <div class="booking__summary-row">
                    <span>× {{ contactForm.persons }} {{ locale === 'de' ? 'Personen' : 'Persone' }}</span>
                    <span></span>
                  </div>
                  <div class="booking__summary-row booking__summary-row--total">
                    <span>{{ t('booking.step4.total') }}</span>
                    <span>{{ calculateTotal() }} €</span>
                  </div>
                </div>

                <div class="booking__demo-notice">
                  <span class="booking__demo-notice-icon">ℹ️</span>
                  <span>{{ t('booking.step4.demoNotice') }}</span>
                </div>
              </div>

              <!-- Booking Complete -->
              <div v-else class="booking__complete">
                <div class="booking__complete-icon">✓</div>
                <h3>{{ t('booking.complete.title') }}</h3>
                <p>{{ t('booking.complete.message') }}</p>
                <div class="booking__complete-ref">
                  <span>{{ t('booking.complete.refNumber') }}</span>
                  <strong>DEMO-{{ Math.random().toString(36).substring(2, 8).toUpperCase() }}</strong>
                </div>
                <p class="booking__complete-demo">{{ t('booking.complete.demoReminder') }}</p>
                <button class="btn btn-primary" @click="resetBooking">
                  {{ t('booking.complete.newBooking') }}
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Navigation Buttons -->
        <div class="booking__nav" v-if="!bookingComplete">
          <button 
            class="booking__nav-btn booking__nav-btn--back"
            :disabled="currentStep === 0"
            @click="prevStep"
          >
            ← {{ t('booking.back') }}
          </button>
          <button 
            v-if="currentStep < 3"
            class="booking__nav-btn booking__nav-btn--next"
            :disabled="!canProceed"
            @click="nextStep"
          >
            {{ t('booking.next') }} →
          </button>
          <button 
            v-else
            class="booking__nav-btn booking__nav-btn--submit"
            :disabled="!canProceed"
            @click="submitBooking"
          >
            {{ t('booking.submit') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const currentStep = ref(0)
const bookingComplete = ref(false)

const steps = [
  { labelKey: 'booking.steps.tour' },
  { labelKey: 'booking.steps.datetime' },
  { labelKey: 'booking.steps.contact' },
  { labelKey: 'booking.steps.summary' }
]

const tourTypes = [
  { 
    id: 'standard', 
    icon: '🏛️', 
    nameKey: 'booking.tours.standard.name',
    descKey: 'booking.tours.standard.desc',
    duration: '90 min',
    price: 15
  },
  { 
    id: 'private', 
    icon: '👑', 
    nameKey: 'booking.tours.private.name',
    descKey: 'booking.tours.private.desc',
    duration: '2h',
    price: 89
  },
  { 
    id: 'family', 
    icon: '👨‍👩‍👧‍👦', 
    nameKey: 'booking.tours.family.name',
    descKey: 'booking.tours.family.desc',
    duration: '75 min',
    price: 39
  }
]

const selectedTour = ref(null)
const selectedDate = ref(null)
const selectedTime = ref(null)

const contactForm = ref({
  name: '',
  email: '',
  phone: '',
  persons: 2,
  tourLanguage: 'de',
  wishes: ''
})

// Generate available dates (next 14 days)
const availableDates = computed(() => {
  const dates = []
  const today = new Date()
  const dayNames = locale.value === 'de' 
    ? ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
    : ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']
  const monthNames = locale.value === 'de'
    ? ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
    : ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic']
  
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    
    // Skip Mondays (museum closed)
    if (date.getDay() === 1) continue
    
    dates.push({
      value: date.toISOString().split('T')[0],
      dayName: dayNames[date.getDay()],
      dayNum: date.getDate(),
      month: monthNames[date.getMonth()],
      isToday: false
    })
  }
  return dates.slice(0, 10)
})

// Time slots with simulated availability
const timeSlots = computed(() => {
  return [
    { time: '10:00', available: true },
    { time: '11:30', available: true },
    { time: '14:00', available: selectedDate.value !== availableDates.value[0]?.value },
    { time: '15:30', available: true },
    { time: '17:00', available: selectedDate.value !== availableDates.value[2]?.value }
  ]
})

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 0:
      return selectedTour.value !== null
    case 1:
      return selectedDate.value !== null && selectedTime.value !== null
    case 2:
      return contactForm.value.name && contactForm.value.email && contactForm.value.persons
    case 3:
      return true
    default:
      return false
  }
})

const selectTour = (tourId) => {
  selectedTour.value = tourId
}

const selectDate = (date) => {
  selectedDate.value = date
  // Reset time if previously selected slot is now unavailable
  if (selectedTime.value) {
    const slot = timeSlots.value.find(s => s.time === selectedTime.value)
    if (slot && !slot.available) {
      selectedTime.value = null
    }
  }
}

const selectTime = (time) => {
  selectedTime.value = time
}

const getTourById = (id) => {
  return tourTypes.find(t => t.id === id)
}

const formatSelectedDate = () => {
  if (!selectedDate.value) return ''
  const date = new Date(selectedDate.value)
  return date.toLocaleDateString(locale.value === 'de' ? 'de-DE' : 'it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const calculateTotal = () => {
  const tour = getTourById(selectedTour.value)
  if (!tour) return 0
  return tour.price * contactForm.value.persons
}

const nextStep = () => {
  if (currentStep.value < 3 && canProceed.value) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const submitBooking = () => {
  // Demo: Just show success
  bookingComplete.value = true
}

const resetBooking = () => {
  currentStep.value = 0
  bookingComplete.value = false
  selectedTour.value = null
  selectedDate.value = null
  selectedTime.value = null
  contactForm.value = {
    name: '',
    email: '',
    phone: '',
    persons: 2,
    tourLanguage: 'de',
    wishes: ''
  }
}
</script>

<style scoped>
.booking {
  background: linear-gradient(to bottom, var(--color-background), #EDE4D3);
  padding: var(--spacing-xl) 0;
  position: relative;
}

.booking::before {
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

/* Section Title */
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

/* Booking Card */
.booking__card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 2.5rem;
  max-width: 900px;
  margin: var(--spacing-md) auto 0;
}

/* Progress Bar */
.booking__progress {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 2.5rem;
  padding: 0 1rem;
}

.booking__progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 1;
}

.booking__progress-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-secondary);
  color: var(--color-text-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 600;
  transition: all var(--transition-normal);
}

.booking__progress-step--active .booking__progress-number {
  background: var(--color-primary);
  color: var(--color-white);
  transform: scale(1.1);
}

.booking__progress-step--completed .booking__progress-number {
  background: var(--color-accent);
  color: var(--color-white);
}

.booking__progress-label {
  font-size: 0.8rem;
  color: var(--color-text-light);
  text-align: center;
  max-width: 80px;
}

.booking__progress-step--active .booking__progress-label {
  color: var(--color-primary);
  font-weight: 500;
}

.booking__progress-line {
  position: absolute;
  top: 20px;
  left: 60px;
  right: 60px;
  height: 3px;
  background: var(--color-secondary);
  z-index: 0;
}

.booking__progress-line-fill {
  height: 100%;
  background: var(--color-accent);
  transition: width var(--transition-normal);
}

/* Step Content */
.booking__content {
  min-height: 350px;
}

.booking__step h3 {
  text-align: center;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

/* Tour Cards */
.booking__tours {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.booking__tour-card {
  position: relative;
  background: var(--color-background);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.booking__tour-card:hover {
  border-color: var(--color-secondary);
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.booking__tour-card--selected {
  border-color: var(--color-primary);
  background: rgba(139, 69, 19, 0.05);
}

.booking__tour-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
}

.booking__tour-card h4 {
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.booking__tour-desc {
  font-size: 0.9rem;
  color: var(--color-text-light);
  margin-bottom: 1rem;
  min-height: 40px;
}

.booking__tour-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid var(--color-secondary);
}

.booking__tour-duration {
  font-size: 0.85rem;
  color: var(--color-text-light);
}

.booking__tour-price {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary);
}

.booking__tour-check {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 28px;
  height: 28px;
  background: var(--color-accent);
  color: var(--color-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

/* Date & Time Selection */
.booking__datetime {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.booking__date-section h4,
.booking__time-section h4 {
  font-size: 1rem;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.booking__calendar {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
}

.booking__date {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 0.5rem;
  border: 1px solid var(--color-secondary);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.booking__date:hover {
  border-color: var(--color-primary);
  background: rgba(139, 69, 19, 0.05);
}

.booking__date--selected {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
}

.booking__date--selected .booking__date-day,
.booking__date--selected .booking__date-month {
  color: rgba(255, 255, 255, 0.8);
}

.booking__date-day {
  font-size: 0.7rem;
  text-transform: uppercase;
  color: var(--color-text-light);
}

.booking__date-num {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
}

.booking__date-month {
  font-size: 0.7rem;
  color: var(--color-text-light);
}

.booking__times {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.booking__time {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-secondary);
  border-radius: var(--radius-sm);
  background: var(--color-white);
  font-family: var(--font-heading);
  font-size: 1rem;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.booking__time:hover:not(:disabled) {
  border-color: var(--color-primary);
  background: rgba(139, 69, 19, 0.05);
}

.booking__time--selected {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
}

.booking__time--unavailable {
  opacity: 0.5;
  cursor: not-allowed;
  text-decoration: line-through;
}

.booking__time-status {
  font-size: 0.75rem;
  color: #c0392b;
  font-family: var(--font-body);
}

.booking__time--unavailable .booking__time-status {
  text-decoration: none;
}

/* Contact Form */
.booking__form {
  max-width: 600px;
  margin: 0 auto;
}

.booking__form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.booking__form-group {
  margin-bottom: 1rem;
}

.booking__form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--color-primary);
  font-size: 0.9rem;
}

.booking__form-group input,
.booking__form-group select,
.booking__form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-secondary);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 1rem;
  transition: border-color var(--transition-fast);
}

.booking__form-group input:focus,
.booking__form-group select:focus,
.booking__form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.booking__language-select {
  display: flex;
  gap: 0.5rem;
}

.booking__language-select button {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid var(--color-secondary);
  border-radius: var(--radius-sm);
  background: var(--color-white);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: 1rem;
}

.booking__language-select button:hover {
  border-color: var(--color-primary);
}

.booking__language-select button.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
}

/* Summary */
.booking__summary {
  max-width: 500px;
  margin: 0 auto;
}

.booking__summary-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-secondary);
}

.booking__summary-section h4 {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-light);
  margin-bottom: 0.75rem;
}

.booking__summary-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.booking__summary-icon {
  font-size: 1.5rem;
}

.booking__summary-item strong {
  display: block;
  color: var(--color-primary);
}

.booking__summary-item span {
  font-size: 0.9rem;
  color: var(--color-text-light);
}

.booking__summary-details p {
  margin: 0.25rem 0;
  color: var(--color-text);
}

.booking__summary-total {
  background: var(--color-background);
  padding: 1.25rem;
  border-radius: var(--radius-md);
  margin-bottom: 1.5rem;
}

.booking__summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: var(--color-text-light);
}

.booking__summary-row--total {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 2px solid var(--color-secondary);
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 0;
}

.booking__demo-notice {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(201, 162, 39, 0.15);
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  color: var(--color-text);
}

.booking__demo-notice-icon {
  font-size: 1.25rem;
}

/* Booking Complete */
.booking__complete {
  text-align: center;
  padding: 2rem 0;
}

.booking__complete-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--color-accent), #D4AF37);
  color: var(--color-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin: 0 auto 1.5rem;
  animation: successPop 0.5s ease;
}

@keyframes successPop {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.booking__complete h3 {
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.booking__complete p {
  color: var(--color-text-light);
  margin-bottom: 1.5rem;
}

.booking__complete-ref {
  display: inline-flex;
  flex-direction: column;
  background: var(--color-background);
  padding: 1rem 2rem;
  border-radius: var(--radius-sm);
  margin-bottom: 1rem;
}

.booking__complete-ref span {
  font-size: 0.8rem;
  color: var(--color-text-light);
}

.booking__complete-ref strong {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  color: var(--color-primary);
  letter-spacing: 0.1em;
}

.booking__complete-demo {
  font-style: italic;
  color: var(--color-accent);
  margin-bottom: 1.5rem;
}

/* Navigation Buttons */
.booking__nav {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-secondary);
}

.booking__nav-btn {
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.booking__nav-btn--back {
  background: transparent;
  border: 1px solid var(--color-secondary);
  color: var(--color-text-light);
}

.booking__nav-btn--back:hover:not(:disabled) {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.booking__nav-btn--back:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.booking__nav-btn--next,
.booking__nav-btn--submit {
  background: var(--color-primary);
  border: none;
  color: var(--color-white);
}

.booking__nav-btn--next:hover:not(:disabled),
.booking__nav-btn--submit:hover:not(:disabled) {
  background: var(--color-accent);
}

.booking__nav-btn--next:disabled,
.booking__nav-btn--submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Responsive */
@media (max-width: 767px) {
  .booking__card {
    padding: 1.5rem;
  }

  .booking__progress {
    padding: 0;
  }

  .booking__progress-label {
    display: none;
  }

  .booking__progress-number {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }

  .booking__progress-line {
    left: 30px;
    right: 30px;
    top: 16px;
  }

  .booking__tours {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .booking__datetime {
    grid-template-columns: 1fr;
  }

  .booking__calendar {
    grid-template-columns: repeat(5, 1fr);
  }

  .booking__form-row {
    grid-template-columns: 1fr;
  }

  .booking__nav {
    flex-direction: column-reverse;
    gap: 1rem;
  }

  .booking__nav-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
