import { ImageResponse } from "next/og";
import AppIcon from "./components/AppIcon";

// App-Icons in mehreren Größen → erreichbar unter /icon/192 und /icon/512
export function generateImageMetadata() {
  return [192, 512].map((s) => ({
    id: String(s),
    size: { width: s, height: s },
    contentType: "image/png",
  }));
}

export default async function Icon({ id }: { id: Promise<string> }) {
  const size = Number(await id);
  return new ImageResponse(<AppIcon size={size} />, { width: size, height: size });
}
