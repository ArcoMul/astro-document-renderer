import { expect, test, it } from "vitest";
import prettier from "prettier";
import render from "./util/render";
import CustomRelationship from "./components/CustomRelationship.astro";

test("renders default relationship output", async () => {
  const result = await render([
    {
      type: "relationship",
      data: {
        id: "cmdbqjid20000h57ajje7gn3u",
        label: "mail",
        data: { id: "cmdbqjid20000h57ajje7gn3u", name: "mail" },
      },
      relationship: "icon",
      children: [{ text: "" }],
    },
  ]);
  expect(result.astro).toEqual(result.react);
});

test("renders custom relationship output", async () => {
  const result = await render(
    [
      {
        type: "relationship",
        data: {
          id: "cmdbqjid20000h57ajje7gn3u",
          label: "mail",
          data: { id: "cmdbqjid20000h57ajje7gn3u", name: "mail" },
        },
        relationship: "icon",
        children: [{ text: "" }],
      },
    ],
    {
      react: {
        inline: {
          relationship: ({ relationship, data }) => (
            <strong>
              <i>
                {relationship}: {data.label}
              </i>
            </strong>
          ),
        },
      },
      astro: {
        inline: {
          relationship: CustomRelationship,
        },
      },
    }
  );
  const astro = await prettier.format(result.astro, { parser: "html" });
  const react = await prettier.format(result.react, { parser: "html" });

  expect(astro).toEqual(react);
});
