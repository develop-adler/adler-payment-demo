// next.config.ts

// @ts-expect-error - No type definitions available for anchor-pki
import autoCert from "anchor-pki/auto-cert/integrations/next";


const withAutoCert = autoCert({
  enabledEnv: "development",
});

const nextConfig = {
  // Add any Next.js config here if needed
};

export default withAutoCert(nextConfig);
