# Astro Document Renderer for Keystone 6

The Astro variant of
[@keystone-6/document-renderer](https://github.com/keystonejs/keystone/tree/main/packages/document-renderer).
Renders Keystone 6 Document format using native Astro Components.

- Allows using native Astro features (`Astro.locals`)
- Allows using Astro library components (`<Image>`/`<Picture>`)
- Allows using async code in custom Render Blocks or custom Content Blocks
- Eliminates React requirement
- Full feature compatibility with
  [@keystone-6/document-renderer](https://github.com/keystonejs/keystone/tree/main/packages/document-renderer)

## Setup

```bash
$ npm install astro-document-renderer
```

## Usage

```astro
---
import { DocumentRenderer } from "astro-document-renderer";
import CustomColumns from "./components/CustomColumns.astro";
import Header from "./components/Header.astro";

const { slug } = Astro.params;
const post = await context.query.Post.findOne({
  where: { slug },
  query: "title content { document(hydrateRelationships: true) }",
});
---
<DocumentRenderer
  document={page.content.document}
  renderers={{ block: { layout: CustomColumns } }}
  componentBlocks={{ header: Header }}
/>
```

### Custom Inline Renderers

See [_src/components_](./src/components/) for some of the default block and
inline renderers.

### Component Blocks

Below an example of a custom 'Header' component block. Import to note are the
props 'documentRendererProps' and 'getDocument'. These are passed to every
component block, in case the component block itself needs to render a child
document. In the example below there is a child document defined under the field
'content'.

```astro
---
import { Picture } from "astro:assets";
import { DocumentRenderer } from "astro-document-renderer";

const { image, documentRendererProps, getDocument } = Astro.props;
---

<section
  class="grid md:grid-cols-2 gap-12 items-center"
>
  <Picture
    src={image?.data?.image?.url}
    width={image?.data?.image?.width}
    height={image?.data?.image?.height}
    layout="constrained"
    formats={["avif", "webp"]}
    alt={image?.data?.altText || ""}
    class="w-full ml-6"
  />
  <div>
    <DocumentRenderer document={getDocument("content")} {...documentRendererProps}  />
  </div>
</section>
```

## Test

```
$ npm run test
```
