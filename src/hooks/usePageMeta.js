import { useEffect } from 'react';

const BASE_TITLE = 'NEO-KODEX';
const DEFAULT_DESCRIPTION =
  'NEO-KODEX desarrolla software a la medida, aplicaciones móviles iOS/Android, sitios web profesionales y redes empresariales en México.';

/**
 * Actualiza dinámicamente el <title> y las meta tags de descripción/OG/Twitter
 * para cada ruta. No requiere dependencias externas.
 *
 * @param {Object} opts
 * @param {string} opts.title         - Título de la página (sin el sufijo de marca)
 * @param {string} [opts.description] - Meta description
 * @param {string} [opts.url]         - URL canónica de la página
 * @param {string} [opts.image]       - URL de imagen para OG/Twitter
 */
export function usePageMeta({ title, description, url, image } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} – NEO-KODEX` : `${BASE_TITLE} – Software a la medida, apps móviles y soporte técnico en México`;
    const desc = description || DEFAULT_DESCRIPTION;
    const canonical = url || 'https://neo-kodex.com/';
    const ogImage = image || 'https://neo-kodex.com/assets/og-image.png';

    document.title = fullTitle;

    setMeta('name', 'description', desc);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:image', ogImage);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', desc);
    setMeta('name', 'twitter:image', ogImage);
    setCanonical(canonical);
  }, [title, description, url, image]);
}

function setMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}
