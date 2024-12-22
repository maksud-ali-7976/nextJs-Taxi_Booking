import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn", // Change error to warning or turn it off
      "@typescript-eslint/no-unused-vars": "off", // Turn off unused variable rule
      "react-hooks/exhaustive-deps": "warn", // Warn about missing dependencies in useEffect
      "@next/next/no-img-element": "warn", // Warn but allow using <img> if necessary
      "jsx-a11y/alt-text": "warn", // Warn about missing alt props for images
    },
  },
];

export default eslintConfig;
