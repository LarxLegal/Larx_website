<script setup lang="ts">


import { withBase } from 'vitepress'
import { ref } from 'vue';
import { useData } from 'vitepress'
import VPHero from 'vitepress/dist/client/theme-default/components/VPHero.vue'




const { frontmatter: fm } = useData()
</script>

<template>
  <div class="hero">
    <VPHero
      v-if="fm.hero"
      class="VPHomeHero"
      :name="fm.hero.name"
      :text="fm.hero.text"
      :tagline="fm.hero.tagline"
      :image="fm.hero.image"
      :actions="fm.hero.actions"
    >
      <template #home-hero-info-before><slot name="home-hero-info-before" /></template>
      <template #home-hero-info><slot name="home-hero-info" /></template>
      <template #home-hero-info-after><slot name="home-hero-info-after" /></template>
      <template #home-hero-actions-after><slot name="home-hero-actions-after" /></template>
      <template #home-hero-image><slot name="home-hero-image" /></template>
    </VPHero>
  </div>
</template>
  

<style scoped>
.hero {
  /* position: relative;
  display: flex;
  justify-content: center; */
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.35),
    rgba(0, 0, 0, 0.25) 50%,
    rgba(0, 0, 0, 0.45)
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1152px;
  padding: calc(var(--vp-nav-height) + 24px) 24px 48px;
  margin: 0 auto;
}

/* ===== Hero text (mirrors the native VPHero look) ===== */
.hero-main {
  margin: auto 0;
  text-align: center;
  padding: 40px 0;
}

.hero-name {
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #a8b1ff; /* light brand tint, readable on the video */
  margin: 0;
}

.hero-text {
  font-size: clamp(1.75rem, 5vw, 3rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #ffffff;
  margin: 8px 0 0;
}

.hero-tagline {
  max-width: 640px;
  margin: 20px auto 0;
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
}

/* ===== Action buttons (VitePress brand / alt themes) ===== */
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
}

.hero-action {
  display: inline-block;
  border-radius: 20px;
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.25s, color 0.25s, border-color 0.25s;
}

.hero-action--brand {
  border: 1px solid transparent;
  background-color: var(--vp-c-brand-3);
  color: #ffffff;
}

.hero-action--brand:hover {
  background-color: var(--vp-c-brand-2);
}

.hero-action--alt {
  border: 1px solid rgba(255, 255, 255, 0.6);
  background-color: rgba(255, 255, 255, 0.12);
  color: #ffffff;
}

.hero-action--alt:hover {
  background-color: rgba(255, 255, 255, 0.24);
}

/* ===== Feature cards at the bottom of the hero ===== */
.hero-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.hero-feature {
  display: block;
  padding: 24px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  text-decoration: none;
  transition: background-color 0.25s, border-color 0.25s;
}

a.hero-feature:hover {
  background-color: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.4);
}

.hero-feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  /* background-color: rgba(246, 246, 247, 0.6); */
  font-size: 18px;
  padding: 8px;
  margin-bottom: 16px;
}

.hero-feature-title {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  color: #ffffff;
  margin: 0;
  border: none;
  padding: 0;
}

.hero-feature-details {
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.75);
  margin: 8px 0 0;
}

.hero-feature-link {
  font-size: 14px;
  font-weight: 500;
  color: #a8b1ff;
  margin: 12px 0 0;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .hero-features {
    grid-template-columns: 1fr;
  }
}
</style>

<!-- Unscoped on purpose: the frontmatter features are rendered inside the hero
     above, so hide the default VPFeatures section that VitePress would
     otherwise render below the hero (it would duplicate the cards). -->
<style>
.VPHome .VPFeatures {
  display: none;
}
</style>
