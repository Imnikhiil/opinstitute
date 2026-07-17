"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, RotateCw, X, ZoomIn, ZoomOut } from "lucide-react";

type Props = {
  file: File;
  onCrop: (croppedFile: File) => void;
  onCancel: () => void;
  /** Card photos use portrait — must match website faculty card (4/5) */
  aspect?: number;
};

/**
 * Easy photo adjuster: fixed preview frame, drag + zoom the image.
 * Aspect ratio matches how the photo appears on the public site.
 */
export function ImageCropper({
  file,
  onCrop,
  onCancel,
  aspect = 4 / 5,
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
  const pinchRef = useRef<{ startDist: number; startZoom: number } | null>(null);

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

  const minCover = useCallback(
    (frameW: number, frameH: number, nw: number, nh: number) => {
      if (!nw || !nh || !frameW || !frameH) return 1;
      return Math.max(frameW / nw, frameH / nh);
    },
    []
  );

  const clampOffset = useCallback(
    (
      x: number,
      y: number,
      z: number,
      frameW: number,
      frameH: number,
      nw: number,
      nh: number
    ) => {
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
      const next = {
        x: (frameW - nw * cover) / 2,
        y: (frameH - nh * cover) / 2,
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

  const cover = frame.w ? minCover(frame.w, frame.h, natural.w, natural.h) : 1;
  const scale = cover * zoom;

  const applyZoom = (nextZoom: number, centerX?: number, centerY?: number) => {
    const { w: frameW, h: frameH } = frameSizeRef.current;
    const { w: nw, h: nh } = naturalRef.current;
    if (!frameW || !nw) return;

    const coverNow = minCover(frameW, frameH, nw, nh);
    const z = Math.min(4, Math.max(1, nextZoom));
    const prevScale = coverNow * zoomRef.current;
    const nextScale = coverNow * z;
    const fx = centerX ?? frameW / 2;
    const fy = centerY ?? frameH / 2;
    const { x: ox, y: oy } = offsetRef.current;
    const nextOffset = clampOffset(
      fx - ((fx - ox) / prevScale) * nextScale,
      fy - ((fy - oy) / prevScale) * nextScale,
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
      zoomRef.current + (e.deltaY > 0 ? -0.1 : 0.1),
      e.clientX - rect.left,
      e.clientY - rect.top
    );
  };

  useEffect(() => {
    const el = frameRef.current;
    if (!el || !ready) return;

    const dist = (t: TouchList) =>
      Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);

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
        applyZoom(
          pinchRef.current.startZoom *
            (dist(e.touches) / pinchRef.current.startDist),
          (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left,
          (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setReady(false);
    setImgSrc(canvas.toDataURL("image/jpeg", 0.95));
  };

  const handleReset = () => {
    const { w: frameW, h: frameH } = frameSizeRef.current;
    const { w: nw, h: nh } = naturalRef.current;
    if (!frameW || !nw) return;
    fitToFrame(frameW, frameH, nw, nh);
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
      ctx.fillStyle = "#f3f4f6";
      ctx.fillRect(0, 0, outW, outH);

      const drawScale = minCover(frameW, frameH, nw, nh) * zoomRef.current;
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-black/55 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col max-h-[92vh]">
        <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <div>
            <h4 className="font-display font-bold text-base text-[#1d2951] dark:text-white">
              Adjust photo
            </h4>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Frame website card jaisa hai. Photo drag/zoom karke face center
              me lao — jo is frame me dikhega wahi site pe aayega.
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 flex flex-col items-center gap-4 overflow-y-auto">
          <div
            className="relative w-full max-w-[280px] rounded-xl overflow-hidden shadow-lg ring-1 ring-black/10"
            style={{ aspectRatio: `${aspect}` }}
          >
            <div
              ref={frameRef}
              className="absolute inset-0 overflow-hidden bg-gray-200 dark:bg-gray-800 touch-none cursor-grab active:cursor-grabbing select-none"
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
                  alt="Photo preview"
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

            <div className="absolute inset-0 pointer-events-none rounded-xl ring-2 ring-brand-500/80" />
            <div className="absolute inset-3 border border-dashed border-white/70 rounded-lg pointer-events-none" />
          </div>

          <div className="w-full max-w-[280px] space-y-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => applyZoom(zoomRef.current - 0.15)}
                className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <input
                type="range"
                min={1}
                max={4}
                step={0.01}
                value={zoom}
                onChange={(e) => applyZoom(Number(e.target.value))}
                className="flex-1 accent-brand-600"
                aria-label="Zoom"
              />
              <button
                type="button"
                onClick={() => applyZoom(zoomRef.current + 0.15)}
                className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleRotate}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <RotateCw className="w-3.5 h-3.5" />
                Rotate
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 px-3 py-2 rounded-xl text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-2 px-5 py-4 border-t border-gray-100 dark:border-gray-800 shrink-0">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDone}
            disabled={busy || !ready}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            {busy ? "Saving…" : "Save photo"}
          </button>
        </div>
      </div>
    </div>
  );
}
