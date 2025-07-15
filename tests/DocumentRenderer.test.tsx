import { expect, test } from "vitest";
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
    },
  ]);
  expect(result.astro).toEqual(result.react);
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
