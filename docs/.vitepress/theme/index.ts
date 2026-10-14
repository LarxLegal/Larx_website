// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import Home from './components/Pages/Home.vue'
import FileSharingPortal from './components/Pages/FileSharingPortal.vue'
import DocumentManagementSystem from './components/Pages/DocumentManagementSystem.vue'
import ClientManagementPage from './components/Pages/ClientManagementPage.vue'
import CollaborationPage from './components/Pages/CollaborationPage.vue'
import DefaultTheme from 'vitepress/theme'
import FeaturesMenu from './components/FeaturesMenu.vue'
import Features from './components/Hero/Features.vue'
import { createPinia } from 'pinia';
import VPFooter from 'vitepress/dist/client/theme-default/components/VPFooter.vue';
// Client Nav Items
import ClientPortal from './components/Nav/Client/ClientPortal.vue'
import RealTime from './components/Nav/Client/RealTime.vue'
import Collaboration from './components/Nav/Client/Collaboration.vue'
import Security from './components/Nav/Client/Security.vue'
// Firm Nav Items
import NoDisruption from './components/Nav/Firm/NoDisruption.vue'
import ClientManagement from './components/Nav/Firm/ClientManagement.vue'
import DossierManagement from './components/Nav/Firm/DossierManagement.vue'
import Marketing from './components/Nav/Firm/Marketing.vue'

import './style.css'




export default {
  
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Home', Home)
    app.component('DocumentManagementSystem', DocumentManagementSystem)
    app.component('ClientManagementPage', ClientManagementPage)
    app.component('FeaturesMenu', FeaturesMenu)
    app.component('CollaborationPage', CollaborationPage)
    app.component('Collaboration', Collaboration)
    app.component('ClientManagement', ClientManagement)
    app.component('DossierManagement', DossierManagement)
    app.component('Marketing', Marketing)
    app.component('FileSharingPortal', FileSharingPortal)
    app.component('Features', Features)
    app.component('Security', Security)
    app.component('VPFooter', VPFooter)
    app.component('ClientPortal', ClientPortal)
    app.component('RealTime', RealTime)
    app.component('NoDisruption', NoDisruption)

  

    // Swap the favicon when the theme toggles. Guarded because this file
    // also runs in Node during the SSR build, where `document` doesn't exist.
    if (typeof document !== 'undefined') {
      const updateFavicon = () => {
        const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
        if (!favicon) return
        const href = document.documentElement.classList.contains('dark')
          ? '/Favicon/larx_logo_night.png'
          : '/Favicon/larx_logo.png'
        if (favicon.getAttribute('href') !== href) favicon.href = href
      }
      // Fires when the user toggles light/dark mode.
      new MutationObserver(updateFavicon).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      })
      // VitePress re-creates config-defined head tags on every client-side
      // route change, replacing our mutated favicon with the default one.
      // Watching <head> lets us re-apply the correct href right away.
      new MutationObserver(updateFavicon).observe(document.head, {
        childList: true,
      });
      updateFavicon();
      const pinia = createPinia();
      app.use(pinia);
    }
  },
  
  

  
} satisfies Theme
