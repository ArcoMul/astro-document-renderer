# Astro Document Renderer for Keystone 6

The Astro variant of [@keystone-6/document-renderer](https://github.com/keystonejs/keystone/tree/main/packages/document-renderer). Renders Keystone 6 Document format using native Astro Components.

- Allows using native Astro features (`Astro.locals`)
- Allows using Astro library components (`<Image>`/`<Picture>`)
- Allows using async code in custom Render Blocks or custom Content Blocks
- Eliminates React requirement

## Setup

```bash
$ npm install astro-document-renderer
```

## Usage

```astro
---
import DocumentRenderer from "astro-document-renderer";
const { slug } = Astro.params;
const post = await context.query.Post.findOne({
  where: { slug },
  query: "title content { document(hydrateRelationships: true) }",
});
---
<DocumentRenderer
  document={post.content.document}
/>
```

## Test

```
$ npm run test
```
