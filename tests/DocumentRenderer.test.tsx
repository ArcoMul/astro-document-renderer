import { expect, test } from "vitest";
import prettier from "prettier";
import render from "./util/render";

test("can render headings", async () => {
  const result = await render([
    {
      type: "heading",
      children: [
        {
          text: "Heading 1",
        },
      ],
      level: 1,
    },
    {
      type: "heading",
      children: [
        {
          text: "Heading 2",
        },
      ],
      level: 2,
      textAlign: "end",
    },
  ]);
  const astro = await prettier.format(result.astro, { parser: "html" });
  const react = await prettier.format(result.react, { parser: "html" });

  expect(astro).toEqual(react);
});

test("can render code", async () => {
  const result = await render([
    {
      type: "code",
      children: [
        {
          text: "Code",
        },
      ],
    },
  ]);
  expect(result.astro).toEqual(result.react);
});

test("can render a link", async () => {
  const result = await render([
    {
      type: "paragraph",
      children: [
        {
          text: "Lorem ipsum ",
        },
        {
          type: "link",
          href: "mailto:example@example.com",
          children: [{ text: "example@example.com" }],
        },
        { text: " sit amet." },
      ],
    },
  ]);
  expect(result.astro).toEqual(result.react);
});
