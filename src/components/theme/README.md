# Theme

## Palette

The theme consists of a light and dark palette. Custom colors need to be added to both `lightPalette.ts` and `darkPalette.ts` when adding a new component.

All app colors are located in `colors.ts`.

We try to use the base theme colors as much as possible. If adding a custom component, it is important that the light and dark palettes match in shape, otherwise undefined errors occur when switching between light/dark themes. There is a unit test to enforce the shapes match. To further remove ambiguity there is a test that ensures both palettes have properties in alphabetical order.
