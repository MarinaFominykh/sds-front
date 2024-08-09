import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3041,
  },
  resolve: {
    alias: {
      "@": path.resolve("src/*"),
      "@components/*": path.resolve("src/components/*"),
      "@assets/*": path.resolve("src/assets/*"),
      "@services/*": path.resolve("src/services/*"),
      "@utils/*": path.resolve("src/utility/*"),
      "@hooks/*": path.resolve("src/hooks/*"),
      "@store/*": path.resolve("src/store/*"),
      "@data/*": path.resolve("src/data/*"),
      "@api/*": path.resolve("src/api/*"),
      "@src/*": path.resolve("src/*"),
    },
  },
  plugins: [tsconfigPaths()],
});
