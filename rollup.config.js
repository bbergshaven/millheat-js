import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

export default [
  {
    input: "src/index.ts",
    plugins: [esbuild()],
    external: ["node-fetch", "abort-controller", "https"],
    output: [
      {
        file: `dist/millheat-js.cjs`,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: `dist/millheat-js.mjs`,
        format: "esm",
        sourcemap: true,
      },
    ],
  },
  {
    input: "src/index.ts",
    plugins: [dts()],
    external: ["https"],
    output: {
      file: `dist/millheat-js.d.ts`,
      format: "esm",
    },
  },
];
