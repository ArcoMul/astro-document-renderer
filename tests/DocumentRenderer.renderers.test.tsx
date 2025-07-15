import { expect, test, it } from "vitest";
import prettier from "prettier";
import render from "./util/render";
import BoldItalic from "./components/BoldItalic.astro";
import CustomLayout from "./components/CustomLayout.astro";

test("can render custom inline renderer", async () => {
  const result = await render(
    [
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
        ],
      },
    ],
    {
      react: {
        inline: {
          bold: ({ children }) => (
            <strong>
              <i>{children}</i>
            </strong>
          ),
        },
      },
      astro: {
        inline: {
          bold: BoldItalic,
        },
      },
    }
  );
  expect(result.astro).toEqual(result.react);
});

test("can render custom block renderer", async () => {
  const result = await render(
    [
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
    ],
    {
      react: {
        block: {
          layout: ({
            layout,
            children,
          }: {
            layout: number[];
            children: any[];
          }) => (
            <div
              className="grid"
              style={{
                gridTemplateColumns: layout.map((l) => "1fr").join(" "),
              }}
            >
              {children.map((child, i) => (
                <div key={i}>{child}</div>
              ))}
            </div>
          ),
        },
      },
      astro: {
        block: {
          layout: CustomLayout,
        },
      },
    }
  );
  const astro = await prettier.format(result.astro, { parser: "html" });
  const react = await prettier.format(result.react, { parser: "html" });

  expect(astro).toEqual(react);
});

test("can render custom block renderer containing custom inline renderer", async () => {
  const result = await render(
    [
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
                    text: "Lorem ",
                  },
                  {
                    text: "ipsum",
                    bold: true,
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
    ],
    {
      react: {
        inline: {
          bold: ({ children }) => (
            <strong>
              <i>{children}</i>
            </strong>
          ),
        },
        block: {
          layout: ({
            layout,
            children,
          }: {
            layout: number[];
            children: any[];
          }) => (
            <div
              className="grid"
              style={{
                gridTemplateColumns: layout.map((l) => "1fr").join(" "),
              }}
            >
              {children.map((child, i) => (
                <div key={i}>{child}</div>
              ))}
            </div>
          ),
        },
      },
      astro: {
        inline: {
          bold: BoldItalic,
        },
        block: {
          layout: CustomLayout,
        },
      },
    }
  );
  const astro = await prettier.format(result.astro, { parser: "html" });
  const react = await prettier.format(result.react, { parser: "html" });

  expect(astro).toEqual(react);
});
