(() => {
  const getField = (name) => document.querySelector(`[data-key-path="${name}"] input`);

  const setField = (name, value) => {
    const field = getField(name);
    if (!field) throw new Error(`Missing ${name} field`);
    field.value = String(value);
    field.dispatchEvent(new Event('input', { bubbles: true }));
    field.dispatchEvent(new Event('change', { bubbles: true }));
  };

  const getDimensions = (file) => new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => { URL.revokeObjectURL(url); resolve([image.naturalWidth, image.naturalHeight]); };
    image.onerror = () => { URL.revokeObjectURL(url); reject(); };
    image.src = url;
  });

  document.addEventListener('change', async (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || input.type !== 'file' || !input.files?.[0]) return;

    if (!getField('image_width') || !getField('image_height')) return;

    try {
      const [width, height] = await getDimensions(input.files[0]);
      if (!width || !height) throw new Error('Invalid image dimensions');
      setField('image_width', width);
      await new Promise(requestAnimationFrame);
      setField('image_height', height);
    } catch {
      window.alert("Impossible de lire les dimensions de l’image. Renseignez la largeur et la hauteur manuellement.");
    }
  }, true);
})();
