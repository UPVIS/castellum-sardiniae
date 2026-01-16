<template>
  <section class="testimonials">
    <div class="container">
      <!-- Roman Column Decorations -->
      <div class="testimonials__columns">
        <div class="testimonials__column testimonials__column--left">
          <div class="column-capital"></div>
          <div class="column-shaft"></div>
          <div class="column-base"></div>
        </div>
        
        <div class="testimonials__content">
          <!-- Main Featured Quote -->
          <div class="testimonials__featured">
            <div class="quote-marks quote-marks--open">❝</div>
            <blockquote class="testimonials__quote">
              {{ locale === 'de' 
                ? 'Ein unvergessliches Erlebnis! Die Geschichte wird hier lebendig. Man fühlt sich wie auf einer Zeitreise ins antike Rom.'
                : 'Un\'esperienza indimenticabile! La storia prende vita qui. Ci si sente come in un viaggio nel tempo nell\'antica Roma.'
              }}
            </blockquote>
            <div class="quote-marks quote-marks--close">❞</div>
            <div class="testimonials__author">
              <div class="testimonials__avatar">
                <span>MH</span>
              </div>
              <div class="testimonials__author-info">
                <strong>Maria Hoffmann</strong>
                <span>{{ locale === 'de' ? 'München, Deutschland' : 'Monaco, Germania' }}</span>
                <div class="testimonials__stars">★★★★★</div>
              </div>
            </div>
          </div>

          <!-- Section Title -->
          <div class="testimonials__title">
            <div class="ornament-line"></div>
            <h3>{{ locale === 'de' ? 'Stimmen unserer Besucher' : 'Voci dei nostri visitatori' }}</h3>
            <div class="ornament-line"></div>
          </div>

          <!-- Smaller Testimonial Cards -->
          <div class="testimonials__grid">
            <div class="testimonials__card" v-for="(testimonial, index) in testimonials" :key="index">
              <div class="testimonials__card-quote">❝</div>
              <p>{{ locale === 'de' ? testimonial.textDe : testimonial.textIt }}</p>
              <div class="testimonials__card-footer">
                <div class="testimonials__card-avatar">
                  <span>{{ testimonial.initials }}</span>
                </div>
                <div class="testimonials__card-author">
                  <strong>{{ testimonial.name }}</strong>
                  <span>{{ locale === 'de' ? testimonial.locationDe : testimonial.locationIt }}</span>
                </div>
                <div class="testimonials__card-stars">★★★★★</div>
              </div>
            </div>
          </div>
        </div>

        <div class="testimonials__column testimonials__column--right">
          <div class="column-capital"></div>
          <div class="column-shaft"></div>
          <div class="column-base"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const testimonials = [
  {
    textDe: 'Die Führung war ausgezeichnet. Unser Guide kannte jeden Stein und jede Geschichte. Absolut empfehlenswert!',
    textIt: 'La visita guidata è stata eccellente. La nostra guida conosceva ogni pietra e ogni storia. Assolutamente consigliato!',
    name: 'Giuseppe Rossi',
    initials: 'GR',
    locationDe: 'Rom, Italien',
    locationIt: 'Roma, Italia'
  },
  {
    textDe: 'Mit Kindern perfekt! Es gibt interaktive Stationen und die Landschaft ist atemberaubend schön.',
    textIt: 'Perfetto con i bambini! Ci sono stazioni interattive e il paesaggio è mozzafiato.',
    name: 'Anna Schmidt',
    initials: 'AS',
    locationDe: 'Wien, Österreich',
    locationIt: 'Vienna, Austria'
  },
  {
    textDe: 'Als Archäologie-Student war das ein Traum. Die Ausgrabungen sind hervorragend dokumentiert.',
    textIt: 'Come studente di archeologia è stato un sogno. Gli scavi sono documentati in modo eccellente.',
    name: 'Marco Bianchi',
    initials: 'MB',
    locationDe: 'Mailand, Italien',
    locationIt: 'Milano, Italia'
  }
]
</script>

<style scoped>
.testimonials {
  background: linear-gradient(135deg, var(--color-background) 0%, var(--color-background-dark) 100%);
  padding: var(--spacing-xl) 0;
  position: relative;
  overflow: hidden;
}

/* Decorative background pattern */
.testimonials::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 100px,
      rgba(201, 162, 39, 0.03) 100px,
      rgba(201, 162, 39, 0.03) 101px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 100px,
      rgba(201, 162, 39, 0.03) 100px,
      rgba(201, 162, 39, 0.03) 101px
    );
  pointer-events: none;
}

.testimonials__columns {
  display: flex;
  align-items: stretch;
  gap: 2rem;
}

/* Roman Column Styling */
.testimonials__column {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  flex-shrink: 0;
}

.column-capital {
  width: 50px;
  height: 30px;
  background: linear-gradient(to bottom, var(--color-secondary), var(--color-primary-light));
  clip-path: polygon(10% 100%, 90% 100%, 100% 0%, 0% 0%);
  position: relative;
}

.column-capital::before {
  content: '';
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 8px;
  background: var(--color-accent);
  border-radius: 50%;
}

.column-shaft {
  flex: 1;
  width: 35px;
  background: linear-gradient(90deg, 
    var(--color-secondary) 0%, 
    var(--color-background) 30%, 
    var(--color-secondary) 70%, 
    var(--color-primary-light) 100%
  );
  position: relative;
}

.column-shaft::before,
.column-shaft::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--color-accent);
  opacity: 0.5;
}

.column-shaft::before {
  top: 20%;
}

.column-shaft::after {
  top: 80%;
}

.column-base {
  width: 50px;
  height: 20px;
  background: linear-gradient(to top, var(--color-primary-light), var(--color-secondary));
  clip-path: polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%);
}

.testimonials__content {
  flex: 1;
  position: relative;
  z-index: 1;
}

/* Featured Quote */
.testimonials__featured {
  text-align: center;
  padding: 3rem 2rem;
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  position: relative;
  margin-bottom: 3rem;
  border: 1px solid rgba(201, 162, 39, 0.2);
}

.quote-marks {
  font-size: 4rem;
  color: var(--color-accent);
  line-height: 1;
  opacity: 0.6;
}

.quote-marks--open {
  position: absolute;
  top: 1rem;
  left: 2rem;
}

.quote-marks--close {
  position: absolute;
  bottom: 4rem;
  right: 2rem;
}

.testimonials__quote {
  font-family: var(--font-body);
  font-size: 1.5rem;
  font-style: italic;
  color: var(--color-text);
  line-height: 1.8;
  max-width: 700px;
  margin: 0 auto 2rem;
  padding: 0 2rem;
}

.testimonials__author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.testimonials__avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
}

.testimonials__author-info {
  text-align: left;
}

.testimonials__author-info strong {
  display: block;
  font-family: var(--font-heading);
  font-size: 1.1rem;
  color: var(--color-primary);
}

.testimonials__author-info span {
  font-size: 0.9rem;
  color: var(--color-text-light);
}

.testimonials__stars {
  color: var(--color-accent);
  font-size: 1rem;
  letter-spacing: 2px;
}

/* Section Title */
.testimonials__title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.testimonials__title h3 {
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-primary);
  white-space: nowrap;
}

.ornament-line {
  flex: 1;
  max-width: 150px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-accent), transparent);
}

/* Testimonial Cards Grid */
.testimonials__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.testimonials__card {
  background: var(--color-white);
  padding: 1.5rem;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(212, 184, 150, 0.3);
  position: relative;
  transition: all var(--transition-normal);
}

.testimonials__card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-accent);
}

.testimonials__card-quote {
  position: absolute;
  top: 0.5rem;
  left: 1rem;
  font-size: 2rem;
  color: var(--color-accent);
  opacity: 0.4;
  line-height: 1;
}

.testimonials__card p {
  font-size: 0.95rem;
  color: var(--color-text-light);
  line-height: 1.7;
  margin: 0 0 1rem 0;
  padding-top: 1rem;
}

.testimonials__card-footer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-secondary);
}

.testimonials__card-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 600;
  flex-shrink: 0;
}

.testimonials__card-author {
  flex: 1;
}

.testimonials__card-author strong {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.9rem;
  color: var(--color-primary);
}

.testimonials__card-author span {
  font-size: 0.8rem;
  color: var(--color-text-light);
}

.testimonials__card-stars {
  color: var(--color-accent);
  font-size: 0.75rem;
  letter-spacing: 1px;
}

/* Responsive */
@media (max-width: 1023px) {
  .testimonials__column {
    display: none;
  }

  .testimonials__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .testimonials__featured {
    padding: 2rem 1.5rem;
  }

  .testimonials__quote {
    font-size: 1.2rem;
    padding: 0;
  }

  .quote-marks {
    font-size: 3rem;
  }

  .quote-marks--open {
    top: 0.5rem;
    left: 1rem;
  }

  .quote-marks--close {
    bottom: 3rem;
    right: 1rem;
  }

  .testimonials__grid {
    grid-template-columns: 1fr;
  }

  .testimonials__title {
    flex-direction: column;
    gap: 0.75rem;
  }

  .ornament-line {
    width: 80px;
  }
}
</style>
