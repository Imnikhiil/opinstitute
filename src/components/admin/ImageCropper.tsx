"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, RotateCw, ZoomIn, ZoomOut } from "lucide-react";

type Props = {
  file: File;
  onCrop: (croppedFile: File) => void;
  onCancel: () => void;
  /** width / height — faculty cards use portrait 3/4 */
  aspect?: number;
};

/**
 * WhatsApp-style cropper: fixed frame, drag/zoom the photo underneath.
 */
export function ImageCropper({
  file,
  onCrop,
  onCancel,
  aspect = 3 / 4,
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const zoomRef = useRef(1);
  const offsetRef = useRef({ x: 0, y: 0 });
  const naturalRef = useRef({ w: 0, h: 0 });
  const frameSizeRef = useRef({ w: 0, h: 0 });
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);
  const pinchRef = useRef<{ startDist: number; startZoom: number } | null>(
    null
  );

  const [imgSrc, setImgSrc] = useState("");
  const [natural, setNatural] = useState({ w: 0, h: 0 });
  const [frame, setFrame] = useState({ w: 0, h: 0 });
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);
  useEffect(() => {
    offsetRef.current = offset;
  }, [offset]);
  useEffect(() => {
    naturalRef.current = natural;
  }, [natural]);
  useEffect(() => {
    frameSizeRef.current = frame;
  }, [frame]);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => setImgSrc(String(reader.result || ""));
    reader.readAsDataURL(file);
  }, [file]);

  const minCover = useCallback((frameW: number, frameH: number, nw: number, nh: number) => {
    if (!nw || !nh || !frameW || !frameH) return 1;
    return Math.max(frameW / nw, frameH / nh);
  }, []);

  const clampOffset = useCallback(
    (x: number, y: number, z: number, frameW: number, frameH: number, nw: number, nh: number) => {
      const scale = minCover(frameW, frameH, nw, nh) * z;
      const drawW = nw * scale;
      const drawH = nh * scale;
      return {
        x: Math.min(0, Math.max(frameW - drawW, x)),
        y: Math.min(0, Math.max(frameH - drawH, y)),
      };
    },
    [minCover]
  );

  const fitToFrame = useCallback(
    (frameW: number, frameH: number, nw: number, nh: number) => {
      const cover = minCover(frameW, frameH, nw, nh);
      const drawW = nw * cover;
      const drawH = nh * cover;
      const next = {
        x: (frameW - drawW) / 2,
        y: (frameH - drawH) / 2,
      };
      setZoom(1);
      setOffset(next);
      zoomRef.current = 1;
      offsetRef.current = next;
    },
    [minCover]
  );

  const syncFrame = useCallback(() => {
    const el = frameRef.current;
    const nw = naturalRef.current.w;
    const nh = naturalRef.current.h;
    if (!el || !nw) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    setFrame({ w, h });
    frameSizeRef.current = { w, h };
    fitToFrame(w, h, nw, nh);
    setReady(true);
  }, [fitToFrame]);

  useEffect(() => {
    if (!natural.w) return;
    syncFrame();
    const onResize = () => syncFrame();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [natural.w, natural.h, syncFrame]);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const next = { w: img.naturalWidth, h: img.naturalHeight };
    naturalRef.current = next;
    setNatural(next);
  };

  const cover = frame.w
    ? minCover(frame.w, frame.h, natural.w, natural.h)
    : 1;
  const scale = cover * zoom;

  const applyZoom = (nextZoom: number, centerX?: number, centerY?: number) => {
    const { w: frameW, h: frameH } = frameSizeRef.current;
    const { w: nw, h: nh } = naturalRef.current;
    if (!frameW || !nw) return;

    const coverNow = minCover(frameW, frameH, nw, nh);
    const z = Math.min(4, Math.max(1, nextZoom));
    const prevZ = zoomRef.current;
    const prevScale = coverNow * prevZ;
    const nextScale = coverNow * z;
    const fx = centerX ?? frameW / 2;
    const fy = centerY ?? frameH / 2;
    const { x: ox, y: oy } = offsetRef.current;
    const imgX = (fx - ox) / prevScale;
    const imgY = (fy - oy) / prevScale;
    const nextOffset = clampOffset(
      fx - imgX * nextScale,
      fy - imgY * nextScale,
      z,
      frameW,
      frameH,
      nw,
      nh
    );
    zoomRef.current = z;
    offsetRef.current = nextOffset;
    setZoom(z);
    setOffset(nextOffset);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      origX: offsetRef.current.x,
      origY: offsetRef.current.y,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    const { w: frameW, h: frameH } = frameSizeRef.current;
    const { w: nw, h: nh } = naturalRef.current;
    if (!drag || drag.pointerId !== e.pointerId || !frameW) return;
    const next = clampOffset(
      drag.origX + (e.clientX - drag.startX),
      drag.origY + (e.clientY - drag.startY),
      zoomRef.current,
      frameW,
      frameH,
      nw,
      nh
    );
    offsetRef.current = next;
    setOffset(next);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (dragRef.current?.pointerId === e.pointerId) dragRef.current = null;
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    applyZoom(
      zoomRef.current + (e.deltaY > 0 ? -0.12 : 0.12),
      e.clientX - rect.left,
      e.clientY - rect.top
    );
  };

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    const dist = (t: TouchList) =>
      Math.hypot(
        t[0].clientX - t[1].clientX,
        t[0].clientY - t[1].clientY
      );

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        pinchRef.current = {
          startDist: dist(e.touches),
          startZoom: zoomRef.current,
        };
        dragRef.current = null;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && pinchRef.current && frameRef.current) {
        e.preventDefault();
        const rect = frameRef.current.getBoundingClientRect();
        const cx =
          (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
        const cy =
          (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;
        applyZoom(
          pinchRef.current.startZoom *
            (dist(e.touches) / pinchRef.current.startDist),
          cx,
          cy
        );
      }
    };
    const onTouchEnd = () => {
      pinchRef.current = null;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- listeners use refs
  }, [ready]);

  const handleRotate = () => {
    const img = imgRef.current;
    if (!img || !natural.w) return;
    const canvas = document.createElement("canvas");
    canvas.width = natural.h;
    canvas.height = natural.w;
    const ctx = canvas.getContext("2d")!;
    ctx.translate(canvas.width, 0);
    ctx.rotate(Math.PI / 2);
    ctx.drawImage(img, 0, 0);
    const data = canvas.toDataURL("image/jpeg", 0.95);
    setReady(false);
    setImgSrc(data);
    // natural size updates on next image load
  };

  const handleDone = async () => {
    const img = imgRef.current;
    const { w: frameW, h: frameH } = frameSizeRef.current;
    const { w: nw, h: nh } = naturalRef.current;
    if (!img || !frameW || !nw) return;
    setBusy(true);
    try {
      const outW = 900;
      const outH = Math.round(outW / aspect);
      const canvas = document.createElement("canvas");
      canvas.width = outW;
      canvas.height = outH;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, outW, outH);

      const coverNow = minCover(frameW, frameH, nw, nh);
      const drawScale = coverNow * zoomRef.current;
      const fx = outW / frameW;
      const fy = outH / frameH;
      const { x, y } = offsetRef.current;

      ctx.drawImage(
        img,
        x * fx,
        y * fy,
        nw * drawScale * fx,
        nh * drawScale * fy
      );

      const baseName = file.name.replace(/\.[^.]+$/, "") || "photo";
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("Export failed"))),
          "image/jpeg",
          0.95
        );
      });
      onCrop(new File([blob], `${baseName}.jpg`, { type: "image/jpeg" }));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-black">
      <div className="flex items-center justify-between px-4 py-3 shrink-0">
        <button
          type="button"
          onClick={onCancel}
          className="text-green-400 font-semibold text-sm px-1 py-1"
        >
          Cancel
        </button>
        <p className="text-white/70 text-xs sm:text-sm text-center px-2">
          Photo ko move / zoom karo — WhatsApp jaisa
        </p>
        <button
          type="button"
          onClick={handleDone}
          disabled={busy || !ready}
          className="text-green-400 font-semibold text-sm px-1 py-1 disabled:opacity-40"
        >
          {busy ? "…" : "Done"}
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 min-h-0">
        <div
          className="relative w-full max-w-[340px] sm:max-w-[380px]"
          style={{ aspectRatio: `${aspect}` }}
        >
          <div className="absolute -inset-10 bg-black pointer-events-none" />

          <div
            ref={frameRef}
            className="absolute inset-0 overflow-hidden bg-neutral-900 touch-none cursor-grab active:cursor-grabbing select-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onWheel={onWheel}
          >
            {imgSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                ref={imgRef}
                src={imgSrc}
                alt="Crop"
                draggable={false}
                onLoad={onImageLoad}
                className="absolute top-0 left-0 max-w-none pointer-events-none will-change-transform"
                style={{
                  width: natural.w || undefined,
                  height: natural.h || undefined,
                  transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                  transformOrigin: "top left",
                }}
              />
            )}
          </div>

          {/* WhatsApp frame: white border, grid, L-corners */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="border border-white/30" />
              ))}
            </div>
            <div className="absolute inset-0 border border-white/90" />
            <span className="absolute top-0 left-0 w-7 h-7 border-t-[3px] border-l-[3px] border-white" />
            <span className="absolute top-0 right-0 w-7 h-7 border-t-[3px] border-r-[3px] border-white" />
            <span className="absolute bottom-0 left-0 w-7 h-7 border-b-[3px] border-l-[3px] border-white" />
            <span className="absolute bottom-0 right-0 w-7 h-7 border-b-[3px] border-r-[3px] border-white" />
          </div>
        </div>
      </div>

      <div className="shrink-0 px-4 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-center gap-8 mb-5">
          <button
            type="button"
            onClick={() => applyZoom(zoomRef.current - 0.2)}
            className="w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleRotate}
            className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center"
            aria-label="Rotate"
          >
            <RotateCw className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => applyZoom(zoomRef.current + 0.2)}
            className="w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between max-w-sm mx-auto">
          <button
            type="button"
            onClick={onCancel}
            className="text-green-400 font-semibold text-base px-2 py-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDone}
            disabled={busy || !ready}
            className="inline-flex items-center gap-1.5 text-green-400 font-semibold text-base px-2 py-2 disabled:opacity-40"
          >
            <Check className="w-5 h-5" />
            {busy ? "Saving…" : "Done"}
          </button>
        </div>
      </div>
    </div>
  );
}
