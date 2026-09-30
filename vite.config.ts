import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

function resolveOrigin(url: string | undefined) {
  if (!url) {
    return undefined;
  }

  try {
    return new URL(url).origin;
  } catch {
    return undefined;
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const keycloakOrigin = resolveOrigin(env.VITE_KEYCLOAK_AUTHORITY);

  return {
    plugins: [
      babel({
        // React Compiler must not run on dependency pre-bundles (.mjs in node_modules).
        include: /\/src\/.*\.[jt]sx?$/,
        presets: [reactCompilerPreset()],
      }),
      react(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: keycloakOrigin
        ? {
            // Anchored on `^/auth/` so the SPA route `/authcallback` is not proxied.
            "^/auth/": {
              target: keycloakOrigin,
              changeOrigin: true,
            },
          }
        : undefined,
    },
  };
});
