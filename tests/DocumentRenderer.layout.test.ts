import { expect, test } from "vitest";
import render from "./util/render";
import prettier from "prettier";

test("can render a two column layout", async () => {
  const result = await render([
    {
      type: "layout",
      layout: [1, 1],
      children: [
        {
          type: "layout-area",
          children: [
            {
              type: "paragraph",
              children: [
                {
                  text: "Column 1",
                },
              ],
            },
          ],
        },
        {
          type: "layout-area",
          children: [
            {
              type: "paragraph",
              children: [
                {
                  text: "Column 2",
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
  const astro = await prettier.format(result.astro, { parser: "html" });
  const react = await prettier.format(result.react, { parser: "html" });
  expect(astro).toEqual(react);
});
