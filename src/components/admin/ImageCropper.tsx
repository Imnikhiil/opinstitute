"use client";

import { useState, useRef, useCallback } from "react";
import ReactCrop, {
  type Crop,
  type PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Check, X, RotateCcw } from "lucide-react";

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
): Crop {
  return centerCrop(
    makeAspectCrop({ unit: "%", width: 80 }, aspect, mediaWidth, mediaHeight),
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

  const outputWidth = crop.width * scaleX;
  const outputHeight = crop.height * scaleY;

  canvas.width = outputWidth;
  canvas.height = outputHeight;

  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingQuality = "high";

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    outputWidth,
    outputHeight,
    0,
    0,
    outputWidth,
    outputHeight
  );

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(new File([blob!], fileName, { type: "image/jpeg" }));
      },
      "image/jpeg",
      0.92
    );
  });
}

interface Props {
  file: File;
  aspect?: number;
  onCrop: (croppedFile: File) => void;
  onCancel: () => void;
}

export function ImageCropper({ file, aspect = 4 / 5, onCrop, onCancel }: Props) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [imgSrc, setImgSrc] = useState("");
  const imgRef = useRef<HTMLImageElement>(null);

  useState(() => {
    const reader = new FileReader();
    reader.addEventListener("load", () => setImgSrc(reader.result as string));
    reader.readAsDataURL(file);
  });

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    },
    [aspect]
  );

  const handleConfirm = async () => {
    if (!imgRef.current || !completedCrop) return;
    const cropped = await getCroppedBlob(imgRef.current, completedCrop, file.name);
    onCrop(cropped);
  };

  const handleReset = () => {
    if (!imgRef.current) return;
    const { width, height } = imgRef.current;
    setCrop(centerAspectCrop(width, height, aspect));
  };

  if (!imgSrc) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200 dark:border-gray-800">
          <h4 className="font-semibold text-sm">Crop Image</h4>
          <button
            onClick={onCancel}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 flex items-center justify-center bg-gray-50 dark:bg-gray-950 min-h-[300px] max-h-[60vh] overflow-auto">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            className="max-w-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Crop preview"
              onLoad={onImageLoad}
              className="max-h-[55vh] w-auto"
            />
          </ReactCrop>
        </div>

        <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!completedCrop}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-brand-600 text-white hover:bg-brand-700 transition disabled:opacity-50"
            >
              <Check className="w-3.5 h-3.5" />
              Crop & Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
