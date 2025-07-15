import { render } from "@testing-library/react";
import { clean } from "./clean";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { astroConfig } from "./config";
import DocumentRenderer from "../../src/DocumentRenderer.astro";
import { DocumentRenderer as ReactDocumentRenderer } from "@keystone-6/document-renderer";
import { a } from "vitest/dist/chunks/suite.d.FvehnV49.js";

export default async function (
  document: any,
  renderers: { react: any; astro: any } = { react: {}, astro: {} }
) {
  const react = render(
    <ReactDocumentRenderer document={document} renderers={renderers.react} />
  );
  const container = await AstroContainer.create({ astroConfig });
  const astro = await container.renderToString(DocumentRenderer, {
    props: { document, renderers: renderers.astro },
  });
  return {
    react: clean(react.container.innerHTML),
    astro: clean(astro),
  };
}
