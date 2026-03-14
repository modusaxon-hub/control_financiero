import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    appIsrStatus: false, // Desactiva el indicador de estado ISR
    buildActivity: true,
    buildActivityPosition: "bottom-right", // Lo movemos a la derecha
  },
};

export default nextConfig;
