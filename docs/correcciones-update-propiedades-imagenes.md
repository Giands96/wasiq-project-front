# Correcciones aplicadas: update de propiedades e imagenes

## Objetivo
Evitar que se borren imagenes al actualizar una propiedad cuando el usuario solo modifica inputs de texto/numero y no toca la seccion de imagenes.

## Problemas detectados

1. En el update se enviaba informacion incorrecta para conservar imagenes existentes.
- Se estaba enviando `existingImages` (URLs) en vez de `keptImageIds` (IDs), que es lo que espera el backend en `UpdatePropertyRequest`.
- Efecto: al no recibir IDs a conservar, el backend podia eliminar imagenes existentes.

2. El tipo de `property.images` no representaba la realidad del backend.
- El frontend asumia solo objetos o solo strings segun la pantalla.
- Efecto: renders inconsistentes, fallback incorrecto en cards y errores con `src` vacio.

3. En detalle de propiedad se podia renderizar `src` invalido.
- Si venia `""` o un objeto sin `url`, se disparaba:
  - `An empty string ("") was passed to the src attribute`
  - `Image is missing required "src" property`

4. Para imagenes legacy (URLs sin ID), no habia mecanismo de persistencia explicita en update.
- Si el backend solo conserva por IDs, esas imagenes se perdian salvo que se reenviaran.

## Archivos modificados

- `modules/properties/components/UpdatePropertyForm.tsx`
- `modules/properties/schemas/propertySchema.ts`
- `modules/properties/types/property.types.ts`
- `modules/properties/components/PropertyCard.tsx`
- `app/(public)/properties/[slug]/page.tsx`

## Cambios por archivo

### 1) `modules/properties/components/UpdatePropertyForm.tsx`

#### Que estaba mal
- El formulario no garantizaba persistencia de imagenes existentes en todos los formatos (`{id,url}` y `string`).

#### Como se soluciono

1. Se normalizaron imagenes existentes para manejar ambos formatos:

```ts
const normalizedExistingImages = (currentProperty?.images ?? [])
  .map((img, index) => {
    const imageId = typeof img === "string" ? undefined : img?.id;
    const imageUrl = typeof img === "string" ? img : img?.url;
    return {
      id: imageId,
      url: imageUrl,
      key: imageId ? `id-${imageId}` : `legacy-${index}-${imageUrl ?? ""}`,
    };
  })
  .filter((image) => Boolean(image.url && image.url.trim().length > 0));
```

2. Se inicializa el form con `keptImageIds` (cuando existen IDs) y `legacyImageKeys` vacio:

```ts
const keptImageIds = currentProperty.images
  .map((img) => (typeof img === "string" ? undefined : img?.id))
  .filter((id): id is number => typeof id === "number");

form.reset({
  ...,
  images: [],
  keptImageIds,
  legacyImageKeys: [],
  available: currentProperty.available ?? true
});
```

3. Para imagenes legacy (sin ID) que no se eliminaron del array, se convierten a `File` y se reenvian en el update:

```ts
const urlToFile = async (url: string, index: number): Promise<File> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`No se pudo descargar la imagen ${index + 1}`);
  }

  const blob = await response.blob();
  const contentType = blob.type || "image/jpeg";
  const extension = contentType.split("/")[1] || "jpg";
  return new File([blob], `existing-image-${index + 1}.${extension}`, { type: contentType });
};
```

4. En submit se arma un payload consistente:
- `keptImageIds` para imagenes con ID
- `images` con nuevas imagenes + legacy convertidas a `File`

```ts
const safeKeptImageIds = (data.keptImageIds ?? []).filter((id): id is number => typeof id === "number");
const removedLegacyKeys = new Set(data.legacyImageKeys ?? []);

const legacyUrlsToKeep = normalizedExistingImages
  .filter((image) => image.id === undefined && !removedLegacyKeys.has(image.key))
  .map((image) => image.url);

const legacyFiles = await Promise.all(legacyUrlsToKeep.map((url, index) => urlToFile(url, index)));
const newFiles = data.images ?? [];
const filesToSend = [...legacyFiles, ...newFiles];

await handleUpdate(currentProperty.slug, {
  ...payload,
  keptImageIds: safeKeptImageIds,
  images: filesToSend,
});
```

5. Se mantiene regla de maximo 4 imagenes en total:

```ts
const totalImages = safeKeptImageIds.length + filesToSend.length;
if (totalImages > 4) {
  toast.warning("No puedes tener mas de 4 imagenes en total");
  return;
}
```

#### Por que funciona
- Si no eliminas imagenes, todas quedan representadas en el request final:
  - Con ID: via `keptImageIds`.
  - Sin ID: reenviadas como archivos.
- Si eliminas una imagen desde el array, se excluye de `keptImageIds` o se marca en `legacyImageKeys`.

### 2) `modules/properties/schemas/propertySchema.ts`

#### Que estaba mal
- El schema no tenia campo para rastrear eliminaciones de imagenes legacy.

#### Solucion
Se agrego:

```ts
legacyImageKeys: z.array(z.string()).optional()
```

#### Por que funciona
- Permite saber exactamente que imagenes legacy (sin ID) fueron quitadas por el usuario.

### 3) `modules/properties/types/property.types.ts`

#### Que estaba mal
- `Property.images` no contemplaba respuesta mixta del backend.

#### Solucion
Se cambio de tipo estricto a tipo mixto:

```ts
images: Array<PropertyImage | string>;
```

#### Por que funciona
- El frontend deja de romper cuando la API devuelve URLs string en unas respuestas y objetos `{ id, url }` en otras.

### 4) `modules/properties/components/PropertyCard.tsx`

#### Que estaba mal
- La card asumia formato unico y podia caer en fallback incorrecto.

#### Solucion
Resolucion defensiva de `src`:

```ts
const firstImage = property.images?.[0];
const resolvedImage = typeof firstImage === "string" ? firstImage : firstImage?.url;
const imageSrc = resolvedImage && resolvedImage.trim().length > 0 ? resolvedImage : bgHome;
```

#### Por que funciona
- Evita `src` vacio y elige bien entre string, objeto o fallback.

### 5) `app/(public)/properties/[slug]/page.tsx`

#### Que estaba mal
- El render podia intentar usar `src` invalido.

#### Solucion
Se normalizan y filtran URLs antes de renderizar:

```ts
const normalizedImages = (property.images ?? [])
  .map((image) => (typeof image === 'string' ? image : image?.url))
  .filter((url): url is string => Boolean(url && url.trim().length > 0));
```

Y se renderiza solo si hay imagenes validas:

```tsx
{normalizedImages.length > 0 ? (
  // render de galeria
) : (
  // placeholder sin imagen
)}
```

#### Por que funciona
- Nunca se intenta renderizar `src=""` o `undefined`, eliminando los errores de atributo `src`.

## Resultado final esperado

- Si editas solo inputs y no tocas imagenes, las imagenes se conservan.
- Si eliminas una imagen desde el array, solo esa se elimina.
- Si agregas nuevas imagenes, se envian junto con las existentes que siguen marcadas para conservar.
- Se evita renderizar `src` vacio en cards y detalle.
