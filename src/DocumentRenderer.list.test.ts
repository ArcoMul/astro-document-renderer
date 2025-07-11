import { expect, test } from "vitest";
import render from "./util/render";

test("can render list items", async () => {
  const result = await render(
    ["unordered-list", "ordered-list"].map((type) => ({
      type,
      children: [
        {
          type: "list-item",
          children: [
            {
              type: "list-item-content",
              children: [
                {
                  text: "Item 1",
                },
              ],
            },
          ],
        },
        {
          type: "list-item",
          children: [
            {
              type: "list-item-content",
              children: [
                {
                  text: "Item 2",
                },
              ],
            },
          ],
        },
      ],
    }))
  );

  expect(result.astro).toEqual(result.react);
});

test("can render nested list items", async () => {
  const result = await render([
    {
      type: "unordered-list",
      children: [
        {
          type: "list-item",
          children: [
            {
              type: "list-item-content",
              children: [
                {
                  text: "Item 1",
                },
              ],
            },
            {
              type: "unordered-list",
              children: [
                {
                  type: "list-item",
                  children: [
                    {
                      type: "list-item-content",
                      children: [
                        {
                          text: "Sub item 1\n",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  expect(result.astro).toEqual(result.react);
});
