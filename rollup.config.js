import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
export default {
    input: "src/main.js",
    output: [
        {
            file: "dist/menue.js",
            format: "iife",
            name: "Menue",
        },
        {
            file: "dist/menue.min.js",
            format: "iife",
            name: "Menue",
            plugins: [terser()],
        },
        {
            file: "dist/menue.umd.js",
            format: "umd",
            name: "Menue",
        },
        {
            file: "dist/menue.esm.js",
            format: "esm",
        },
    ],
    plugins: [
        babel({
            exclude: "node_modules/**",
        }),
    ],
};
