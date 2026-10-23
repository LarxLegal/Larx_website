<script setup lang="ts">
import { inBrowser } from 'vitepress'
import { useWindowScroll } from '@vueuse/core'
import { computed, provide, watchEffect, onMounted, onUnmounted, ref, nextTick, watch } from 'vue'
/* import { useData } from 'vitepress/dist/client/theme-default/composables/data.js' */
import { useNav } from 'vitepress/dist/client/theme-default/composables/nav.js'
import VPNavBar from 'vitepress/dist/client/theme-default/components/VPNavBar.vue'
import VPNavScreen from 'vitepress/dist/client/theme-default/components/VPNavScreen.vue'
import { useRouter } from 'vitepress';
import { useData } from 'vitepress'

// Destructure isDark from the shared data object


const { isDark } = useData()
const { route } = useRouter()
let allNavbarElements = [];


console.log('route', route.path)
const isHome = computed(() => {
  if (route.path === '/') {
    return true
  } else {
    return false
  }
});
console.log('isHome', isHome.value)
/* const isScrolled = computed(() => {
  if (y.value === 0) {
    return true
  } else {
    return false
  }
}) */

const isScrolled = ref(false)


const { y } = useWindowScroll()

/* watchEffect(() => {
  const groupA = document.querySelectorAll('nav a span');
  const groupB = document.querySelectorAll('p');
  const individualEl = document.querySelector('a span');
  const individualEl2 = document.querySelector('div button span');

  // 2. Combine them into a single Array, using a Set to filter out duplicates
  allNavbarElements = Array.from(new Set([...groupA, ...groupB, individualEl, individualEl2].filter(Boolean)));

  if (y.value === 0 && isHome.value === true && isDark.value === false) {
    console.log('should be white')
      allNavbarElements.forEach(el => {
          el.style.setProperty('color', 'white', 'important');
        });
  } else if (isHome.value === true && isDark.value === false) {
    allNavbarElements.forEach(el => {
          el.style.setProperty('color', 'black', 'important');
        });

        console.log('should be black')
  }
console.log('isScrolled', isScrolled.value)
console.log('isDark', isDark.value)
console.log('isHome', isHome.value)
}) */


/* watchEffect(() => {
  if (isScrolled.value === false && isHome.value === true && isDark.value === false) {
      allNavbarElements.forEach(el => {
          el.style.setProperty('color', 'white', 'important');
        });
  }
}) */

// Watch isDark and capture its state dynamically
watch(isDark, (newValue, oldValue) => {
  console.log(`Theme changed! Old: ${oldValue}, New: ${newValue}`)

  console.log('value of isDark in watch', isDark.value)
  
  if (newValue) {
        allNavbarElements.forEach(el => {
          el.style.setProperty('color', 'white', 'important');
        });
  } else {
        allNavbarElements.forEach(el => {
          el.style.setProperty('color', 'black', 'important');
        });
  }
})


const { isScreenOpen, closeScreen, toggleScreen } = useNav()
const { frontmatter } = useData()



onMounted(async () => {
  
  await nextTick();


  // Watch for class changes on <html>. Runs in onMounted because `document`
  // does not exist during the server-side build.
  

  // 1. Gather elements from both selectors
  const groupA = document.querySelectorAll('nav a span');
  const individualEl = document.querySelector('a span');
  const individualEl2 = document.querySelector('div button span');

  // 2. Combine them into a single Array, using a Set to filter out duplicates
  allNavbarElements = Array.from(new Set([...groupA, individualEl, individualEl2].filter(Boolean)));

  /* if (isDark.value === false && isHome.value === true && isScrolled.value === false) {
    allNavbarElements.forEach(el => {
      el.style.setProperty('color', 'white', 'important');
      
    });
  } */


  /* if (isDark.value && isHome.value) {
    allNavbarElements.forEach(el => {
      el.style.setProperty('color', 'white', 'important');
      
    });
  } else if (isDark.value && !isHome.value) {
      allNavbarElements.forEach(el => {
      el.style.setProperty('color', 'white', 'important');
      
    });
  } */ /* else if (isDark.value !== true && isScrolled.value === false && isHome.value === true) {
      allNavbarElements.forEach(el => {
      el.style.setProperty('color', 'white', 'important');
  });
  } */
  /* if (!isDark.value && !isScrolled.value) {
      allNavbarElements.forEach(el => {
      el.style.setProperty('color', 'white', 'important');
  });
  } */
  


  if (allNavbarElements.length === 0) {
    console.warn("Hero Component: No navbar elements found.");
    return;
  }
  
});

// checks if navbar is required based on values in the frontmatter file
const hasNavbar = computed(() => {
  return frontmatter.value.navbar !== false
})

provide('close-screen', closeScreen)

watchEffect(() => {
  if (inBrowser) {
    document.documentElement.classList.toggle('hide-nav', !hasNavbar.value)
  }
})
</script>

<template>
  <header v-if="hasNavbar" class="VPNav">
    <VPNavBar :is-screen-open="isScreenOpen" @toggle-screen="toggleScreen">
      <template #nav-bar-title-before><slot name="nav-bar-title-before" /></template>
      <template #nav-bar-title-after><slot name="nav-bar-title-after" /></template>
      <template #nav-bar-content-before><slot name="nav-bar-content-before" /></template>
      <template #nav-bar-content-after><slot name="nav-bar-content-after" /></template>
    </VPNavBar>
    <VPNavScreen :open="isScreenOpen">
      <template #nav-screen-content-before><slot name="nav-screen-content-before" /></template>
      <template #nav-screen-content-after><slot name="nav-screen-content-after" /></template>
    </VPNavScreen>
  </header>

</template>

<style scoped>
  .VPNav {
    position: relative;
    top: var(--vp-layout-top-height, 0px);
    /*rtl:ignore*/
    left: 0;
    z-index: var(--vp-z-index-nav);
    width: 100%;
    pointer-events: none;
    transition: background-color 0.5s;
  }

  @media (min-width: 960px) {
    .VPNav {
      position: fixed;
    }
  }
</style>
