import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import terser from "@rollup/plugin-terser";

/**
 * Treat react, react-dom and Atlaskit DnD packages as externals.
 * We ship Atlaskit as runtime deps (in package.json "dependencies"),
 * but we do NOT bundle them into dist — Node will resolve them from
 * this package's own node_modules at runtime.
 */
const externalPkgs = [
  "react",
  "react-dom",
  "@atlaskit/pragmatic-drag-and-drop",
  "@atlaskit/pragmatic-drag-and-drop-hitbox",
];

/**
 * Also externalize any subpath imports, e.g.
 *   @atlaskit/pragmatic-drag-and-drop/some/sub/module
 */
const external = (id) =>
  externalPkgs.includes(id) ||
  externalPkgs.some((pkg) => id === pkg || id.startsWith(pkg + "/"));

export default [
  {
    input: "src/index.tsx",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
      {
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    external,
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: [".mjs", ".js", ".json", ".ts", ".tsx"],
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "dist",
        exclude: ["**/*.test.ts", "**/*.test.tsx"],
      }),
      terser(),
    ],
    treeshake: {
      moduleSideEffects: false,
    },
  },
  {
    input: "src/kanban/index.ts",
    output: [
      {
        file: "dist/kanban.js",
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
      {
        file: "dist/kanban.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    external,
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: [".mjs", ".js", ".json", ".ts", ".tsx"],
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "dist",
        exclude: ["**/*.test.ts", "**/*.test.tsx"],
      }),
      terser(),
    ],
    treeshake: {
      moduleSideEffects: false,
    },
  },
];
