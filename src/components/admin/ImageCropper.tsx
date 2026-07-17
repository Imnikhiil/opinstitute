"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import ReactCrop, {
  type Crop,
  type PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Check, X, RotateCcw, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

type AspectMode = "free" | "portrait" | "square";

const ASPECT_OPTIONS: { id: AspectMode; label: string; value?: number }[] = [
  { id: "free", label: "Free (full pic)" },
  { id: "portrait", label: "Portrait", value: 3 / 4 },
  { id: "square", label: "Square", value: 1 },
];

function nearlyFullCrop(): Crop {
  return { unit: "%", x: 2, y: 2, width: 96, height: 96 };
}

function centeredAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
): Crop {
  return centerCrop(
    makeAspectCrop({ unit: "%", width: 92 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  );
}

async function getCroppedBlob(
  image: HTMLImageElement,
  crop: PixelCrop,
  fileName: string
): Promise<File> {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  let outputWidth = Math.round(crop.width * scaleX);
  let outputHeight = Math.round(crop.height * scaleY);

  const MAX_OUTPUT = 1600;
  const longest = Math.max(outputWidth, outputHeight);
  if (longest > MAX_OUTPUT) {
    const factor = MAX_OUTPUT / longest;
    outputWidth = Math.round(outputWidth * factor);
    outputHeight = Math.round(outputHeight * factor);
  }

  canvas.width = Math.max(1, outputWidth);
  canvas.height = Math.max(1, outputHeight);

  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    outputWidth,
    outputHeight
  );

  const baseName = fileName.replace(/\.[^.]+$/, "") || "photo";

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Could not export cropped image"));
          return;
        }
        resolve(new File([blob], `${baseName}.jpg`, { type: "image/jpeg" }));
      },
      "image/jpeg",
      0.95
    );
  });
}

interface Props {
  file: File;
  onCrop: (croppedFile: File) => void;
  onCancel: () => void;
}

export function ImageCropper({ file, onCrop, onCancel }: Props) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [imgSrc, setImgSrc] = useState("");
  const [aspectMode, setAspectMode] = useState<AspectMode>("free");
  const [busy, setBusy] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const aspectValue = ASPECT_OPTIONS.find((o) => o.id === aspectMode)?.value;

  useEffect(() => {
    const reader = new FileReader();
    reader.addEventListener("load", () => setImgSrc(String(reader.result || "")));
    reader.readAsDataURL(file);
  }, [file]);

  const applyDefaultCrop = useCallback(
    (width: number, height: number, mode: AspectMode) => {
      const option = ASPECT_OPTIONS.find((o) => o.id === mode);
      if (option?.value) {
        setCrop(centeredAspectCrop(width, height, option.value));
      } else {
        setCrop(nearlyFullCrop());
      }
    },
    []
  );

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      applyDefaultCrop(width, height, aspectMode);
    },
    [applyDefaultCrop, aspectMode]
  );

  const changeAspectMode = (mode: AspectMode) => {
    setAspectMode(mode);
    if (!imgRef.current) return;
    const { width, height } = imgRef.current;
    applyDefaultCrop(width, height, mode);
  };

  const handleConfirm = async () => {
    if (!imgRef.current || !completedCrop?.width || !completedCrop?.height) return;
    setBusy(true);
    try {
      const cropped = await getCroppedBlob(
        imgRef.current,
        completedCrop,
        file.name
      );
      onCrop(cropped);
    } finally {
      setBusy(false);
    }
  };

  const handleUploadOriginal = () => {
    onCrop(file);
  };

  const handleReset = () => {
    if (!imgRef.current) return;
    const { width, height } = imgRef.current;
    applyDefaultCrop(width, height, aspectMode);
  };

  if (!imgSrc) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col max-h-[92vh]">
        <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-gray-200 dark:border-gray-800 shrink-0">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Adjust Photo</h4>
            <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
              Poori photo dikhegi — box ko drag / corners se bada-chhota karo
            </p>
          </div>
          <button
            onClick={onCancel}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-4 sm:px-5 py-2.5 border-b border-gray-100 dark:border-gray-800 flex flex-wrap gap-1.5 shrink-0">
          {ASPECT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => changeAspectMode(opt.id)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition",
                aspectMode === opt.id
                  ? "bg-brand-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="p-3 sm:p-5 flex items-center justify-center bg-gray-100 dark:bg-gray-950 overflow-auto min-h-[280px] flex-1">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspectValue}
            keepSelection
            ruleOfThirds
            className="max-w-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Crop preview — full photo"
              onLoad={onImageLoad}
              className="max-h-[58vh] sm:max-h-[62vh] w-auto max-w-full object-contain"
            />
          </ReactCrop>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-3.5 border-t border-gray-200 dark:border-gray-800 shrink-0">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button
              type="button"
              onClick={handleUploadOriginal}
              disabled={busy}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Upload full photo
            </button>
          </div>
          <div className="flex gap-2 sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={busy || !completedCrop?.width}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-brand-600 text-white hover:bg-brand-700 transition disabled:opacity-50"
            >
              <Check className="w-3.5 h-3.5" />
              {busy ? "Uploading…" : "Crop & Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
