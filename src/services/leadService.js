const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

async function supabaseFetch(path, options = {}) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.warn('Supabase no está configurado. Revisa el README para completar la integración.');
    return { error: 'Supabase no configurado' };
  }

  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  });

  if (!response.ok) {
    const details = await response.json().catch(() => ({}));
    const message = details.message ?? 'Error inesperado al contactar al CRM';
    return { error: message };
  }

  const data = await response.json().catch(() => null);
  return { data };
}

export async function submitLead(payload) {
  // Inserta el lead y activa automatizaciones desde Supabase.
  return supabaseFetch('/rest/v1/leads', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Prefer: 'return=representation'
    }
  });
}

export async function logCtaInteraction(payload) {
  return supabaseFetch('/rest/v1/cta_interactions', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Prefer: 'return=minimal'
    }
  });
}

export async function subscribeToNewsletter(payload) {
  return supabaseFetch('/rest/v1/newsletter_subscribers', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Prefer: 'return=representation'
    }
  });
}

export default {
  submitLead,
  subscribeToNewsletter,
  logCtaInteraction
};
