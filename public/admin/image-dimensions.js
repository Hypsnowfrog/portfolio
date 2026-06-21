(() => {
  const getField = (name) => document.querySelector(`[data-key-path="${name}"] input`);

  const setDimensions = (width, height) => {
    const fields = [['image_width', width], ['image_height', height]].map(([name, value]) => {
      const field = getField(name);
      if (!field) throw new Error(`Missing ${name} field`);
      return [field, value];
    });

    for (const [field, value] of fields) Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(field, String(value));
    for (const [field] of fields) {
      field.dispatchEvent(new Event('input', { bubbles: true }));
      field.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  const imageUrl = (value) => {
    if (/^(?:https?:|blob:|data:)/.test(value)) return value;
    return new URL(`/${value.replace(/^\/+/, '')}`, window.location.origin).href;
  };

  const getDimensions = (src) => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve([image.naturalWidth, image.naturalHeight]);
    image.onerror = reject;
    image.src = src;
  });

  const handled = new WeakMap();
  const fillDimensions = async (input) => {
    const value = input.value?.trim();
    if (!value || handled.get(input) === value || !getField('image_width') || !getField('image_height')) return;
    handled.set(input, value);

    try {
      const [width, height] = await getDimensions(imageUrl(value));
      if (!width || !height) throw new Error('Invalid image dimensions');
      setDimensions(width, height);
    } catch {
      handled.delete(input);
      window.alert("Impossible de lire les dimensions de l’image. Renseignez la largeur et la hauteur manuellement.");
    }
  };

  const findImageInput = (target = document) => target.closest?.('[data-key-path="image"]')?.querySelector('input:not([type="file"])')
    ?? document.querySelector('[data-key-path="image"] input:not([type="file"])');

  const sync = (target) => {
    const input = findImageInput(target);
    if (input) fillDimensions(input);
  };

  document.addEventListener('input', (event) => sync(event.target), true);
  document.addEventListener('change', (event) => sync(event.target), true);
  new MutationObserver(() => sync()).observe(document.body, { childList: true, subtree: true });
})();
