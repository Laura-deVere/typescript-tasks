import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			"/api": "http://localhost:5050",
			"/auth/google": "http://localhost:5050",
		},
	},
	plugins: [react()],
});

// app.use(
//   ['/api', '/auth/google'],
//   createProxyMiddleware({
//     target: 'http://localhost:5000',
//   })
// );
