"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { PropsWithChildren } from "react";
import { z } from "zod";

const shouldTrack = process.env.NODE_ENV !== "development";

if (typeof window !== "undefined" && process.env.NODE_ENV !== "development") {
  posthog.init(z.string().parse(process.env.NEXT_PUBLIC_POSTHOG_KEY), {
    api_host: z.string().parse(process.env.NEXT_PUBLIC_POSTHOG_HOST),
    autocapture: true,
  });
}

export function Providers({ children }: PropsWithChildren) {
  return shouldTrack ? (
    <PostHogProvider client={posthog}>{children}</PostHogProvider>
  ) : (
    <>{children}</>
  );
}
