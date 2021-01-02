import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
export default {
  input: "src/index.ts",
  output: [
    {
      file: "lib/cjs/index.js",
      format: "cjs",
    },
    {
      file: "lib/es/index.js",
      format: "es",
    },
  ],
  plugins: [
    terser(),
    typescript({
      tsconfig: "./tsconfig.pkg.json",
    }),
  ],
};
