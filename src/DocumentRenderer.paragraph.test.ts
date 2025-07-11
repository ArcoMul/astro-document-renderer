import { expect, test } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import DocumentRenderer from "./DocumentRenderer.astro";
import { astroConfig } from "./util/config";
import { clean } from "./util/clean";
import render from "./util/render";

test("can render a paragraph", async () => {
  const result = await render([
    {
      type: "paragraph",
      children: [
        {
          text: "Lorem ipsum dolor sit amet",
        },
      ],
    },
  ]);
  expect(result.astro).toEqual(result.react);
});

test("can render a paragraph with marking", async () => {
  const result = await render([
    {
      type: "paragraph",
      children: [
        {
          text: "Lorem ",
        },
        {
          text: "ipsum",
          bold: true,
        },
        {
          text: " ",
        },
        {
          text: "dolor",
          italic: true,
        },
        {
          text: " ",
        },
        {
          text: "sit",
          strikethrough: true,
        },
        {
          text: " ",
        },
        {
          text: "amet",
          code: true,
        },
        {
          text: ".",
        },
      ],
    },
  ]);

  expect(result.astro).toEqual(result.react);
});
