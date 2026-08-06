/** Ask Next.js to refresh cached public pages after admin CMS changes. */
export async function revalidatePublicSite(): Promise<void> {
  try {
    await fetch("/api/revalidate", {
      method: "POST",
      credentials: "same-origin",
    });
  } catch {
    // Non-fatal — ISR will catch up within revalidate window
  }
}
