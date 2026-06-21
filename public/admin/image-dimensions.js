(() => {
  const getField = (scope, name) => scope.querySelector(`[name="${name}"]`) ?? document.querySelector(`[name="${name}"]`);

  const setField = (field, value) => {
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

    const scope = input.closest('form') ?? document;
    const widthField = getField(scope, 'image_width');
    const heightField = getField(scope, 'image_height');
    if (!widthField || !heightField) return;

    try {
      const [width, height] = await getDimensions(input.files[0]);
      if (!width || !height) throw new Error('Invalid image dimensions');
      setField(widthField, width);
      setField(heightField, height);
    } catch {
      window.alert("Impossible de lire les dimensions de l’image. Renseignez la largeur et la hauteur manuellement.");
    }
  }, true);
})();
