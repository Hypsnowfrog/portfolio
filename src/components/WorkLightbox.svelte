<script lang="ts">
  import { onMount, tick } from 'svelte';
  export let works: { slug: string; title: string; year: number; medium: string; dimensions: string; image: string; alt: string; description?: string; status?: string }[] = [];
  let active = -1;
  let closeButton: HTMLButtonElement;
  let opener: HTMLElement | null = null;
  $: work = active >= 0 ? works[active] : null;

  function indexForUrl() { return works.findIndex((item) => item.slug === new URLSearchParams(location.search).get('work')); }
  async function open(index: number, push = false, source: HTMLElement | undefined = undefined) {
    if (index < 0) return;
    if (active < 0) opener = source ?? document.activeElement as HTMLElement;
    active = index;
    document.body.style.overflow = 'hidden';
    if (push) { const url = new URL(location.href); url.searchParams.set('work', works[index].slug); history.pushState({}, '', url); }
    await tick(); closeButton?.focus();
  }
  function close(push = true) {
    if (active < 0) return;
    active = -1; document.body.style.overflow = '';
    if (push) { const url = new URL(location.href); url.searchParams.delete('work'); history.pushState({}, '', url); }
    opener?.focus(); opener = null;
  }
  function move(delta: number) { open((active + delta + works.length) % works.length, true); }
  function keydown(event: KeyboardEvent) {
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') move(-1);
    if (event.key === 'ArrowRight') move(1);
    if (event.key === 'Tab') {
      const focusable = Array.from(document.querySelectorAll<HTMLElement>('[data-lightbox] button'));
      const position = focusable.indexOf(document.activeElement as HTMLElement);
      if (position < 0 || (event.shiftKey && position === 0) || (!event.shiftKey && position === focusable.length - 1)) { event.preventDefault(); focusable[event.shiftKey ? focusable.length - 1 : 0]?.focus(); }
    }
  }
  onMount(() => {
    const click = (event: MouseEvent) => { const link = (event.target as Element).closest<HTMLElement>('[data-work]'); if (!link) return; const index = works.findIndex((item) => item.slug === link.dataset.work); if (index >= 0) { event.preventDefault(); open(index, true, link); } };
    const pop = () => { const index = indexForUrl(); if (index >= 0) open(index); else close(false); };
    document.addEventListener('click', click); window.addEventListener('popstate', pop); const initial = indexForUrl(); if (initial >= 0) open(initial);
    return () => { document.removeEventListener('click', click); window.removeEventListener('popstate', pop); document.body.style.overflow = ''; };
  });
</script>

{#if work}
  <div class="backdrop" role="presentation">
    <section class="dialog" role="dialog" aria-modal="true" aria-label={`${work.title}, ${work.year}`} data-lightbox on:keydown={keydown}>
      <div class="controls"><button bind:this={closeButton} on:click={() => close()} aria-label="Fermer l’œuvre">×</button></div>
      <div class="image"><img src={work.image} alt={work.alt} /></div>
      <div class="details"><p class="title">{work.title}, {work.year}</p><p>{work.medium}<br />{work.dimensions}</p>{#if work.description}<p>{work.description}</p>{/if}{#if work.status}<p>{work.status}</p>{/if}</div>
      {#if works.length > 1}<button class="previous" on:click={() => move(-1)} aria-label="Œuvre précédente">←</button><button class="next" on:click={() => move(1)} aria-label="Œuvre suivante">→</button>{/if}
    </section>
  </div>
{/if}

<style>
  .backdrop { position: fixed; inset: 0; z-index: 20; padding: 1rem; overflow: auto; background: rgb(17 17 17 / .94); color: #f6f5f1; }
  .dialog { display: grid; grid-template-rows: auto minmax(0, 1fr) auto; min-height: calc(100dvh - 2rem); position: relative; }
  .controls { display: flex; justify-content: flex-end; } button { border: 0; background: transparent; color: inherit; font-size: 1.75rem; } .image { display: grid; place-items: center; min-height: 0; } img { display: block; max-width: 100%; max-height: min(65dvh, 52rem); object-fit: contain; } .details { max-width: 36rem; padding: 1rem 2rem 0 0; color: #d6d2ca; font-size: .875rem; line-height: 1.45; } .details p { margin: 0 0 .45rem; } .title { color: #fff; font-style: italic; } .previous, .next { position: fixed; top: 50%; padding: .5rem; transform: translateY(-50%); } .previous { left: .25rem; } .next { right: .25rem; }
  @media (min-width: 56rem) { .dialog { grid-template-columns: minmax(0, 1fr) minmax(16rem, 24rem); grid-template-rows: 1fr; gap: 2rem; } .controls { position: absolute; right: 0; top: 0; z-index: 1; } .image { grid-column: 1; } img { max-height: calc(100dvh - 4rem); } .details { grid-column: 2; align-self: end; padding: 2rem 3rem 2rem 0; } }
</style>
