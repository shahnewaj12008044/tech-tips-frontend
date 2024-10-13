/* eslint-disable @next/next/no-img-element */
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ThumbnailProps {
  url: string | null | undefined;
  className?: string;
}

export const Thumbnail = ({ url, className = "" }: ThumbnailProps) => {
  if (!url) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`relative overflow-hidden bg-gray-200 w-full h-56 md:h-96 flex justify-center items-center border border-gray-300 rounded-lg my-4 shadow-md transition-all duration-300 hover:shadow-lg ${className}`}
        >
          <img
            src={url}
            alt="Thumbnail image"
            className="object-cover rounded-lg transition-transform duration-300 hover:scale-110 hover:opacity-90"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-lg font-semibold">
            Click to Zoom
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 m-0 bg-black bg-opacity-80 flex justify-center items-center">
        <img
          src={url}
          alt="Full size image"
          className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
        />
      </DialogContent>
    </Dialog>
  );
};
