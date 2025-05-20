"use client";

import { useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil, Mail, MapPin, Loader2 } from "lucide-react";

const ProfileHeader = ({
  user,
  avatarPreview,
  onEdit,
  onAvatarUpload,
  isUploading,
  setIsUploading,
}) => {
  const fileInputRef = useRef(null);
  const [localPreview, setLocalPreview] = useState(null);
  const [crop, setCrop] = useState({});
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setLocalPreview(reader.result.toString() || "");
        setCrop({
          unit: "%",
          width: 100,
          aspect: 1 / 1,
        });
      });
      reader.readAsDataURL(file);
    }
  };

  const handleImageLoad = (e) => {
    imgRef.current = e.currentTarget;
  };

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!crop || !ctx) return null;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          resolve(blob);
        },
        "image/jpeg",
        0.9
      );
    });
  };

  const handleUpload = async () => {
    if (!imgRef.current) return;

    try {
      setIsUploading(true);

      let blobToUpload;

      if (completedCrop?.width && completedCrop?.height) {
        blobToUpload = await getCroppedImg(imgRef.current, completedCrop);
      } else {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = imgRef.current.naturalWidth;
        canvas.height = imgRef.current.naturalHeight;

        ctx.drawImage(imgRef.current, 0, 0);

        blobToUpload = await new Promise((resolve, reject) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Canvas is empty"));
                return;
              }
              resolve(blob);
            },
            "image/jpeg",
            0.9
          );
        });
      }

      const file = new File([blobToUpload], "avatar.jpg", {
        type: "image/jpeg",
      });
      const formData = new FormData();
      formData.append("avatar", file);

      await onAvatarUpload(formData);

      handleCancel();
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setLocalPreview(null);
    setCrop({});
    setCompletedCrop(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const previewSrc = localPreview || avatarPreview;

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start md:items-end justify-between">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="relative group">
          <label htmlFor="avatar-upload" className="cursor-pointer">
            <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
              <AvatarImage src={previewSrc} />
              <AvatarFallback className="text-2xl font-medium bg-gradient-to-br from-primary to-primary-light text-white">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Pencil className="w-6 h-6 text-white" />
            </div>
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            ref={fileInputRef}
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-foreground/95">{user.name}</h1>
          <div className="flex items-center gap-2 mt-1 text-foreground/70">
            <Mail className="w-4 h-4" />
            <span>{user.email}</span>
          </div>
          {user.location && (
            <div className="flex items-center gap-2 mt-1 text-foreground/70">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <Button
          onClick={onEdit}
          className="gap-2 bg-gradient-to-r from-secondary/70 via-primary/70 to-primary/90 text-secondary-foreground hover:bg-secondary/80  cursor-pointer"
        >
          <Pencil className="w-4 h-4" />
          Edit Profile
        </Button>
      </div>

      {localPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-background p-6 rounded-lg max-w-md w-full relative">
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                <div className="text-white">Uploading...</div>
              </div>
            )}
            <h3 className="text-lg font-semibold mb-4">Crop Your Avatar</h3>

            <ReactCrop
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
              circularCrop
            >
              <img
                src={localPreview}
                ref={imgRef}
                onLoad={handleImageLoad}
                alt="Crop preview"
                className="max-w-full max-h-[60vh]"
              />
            </ReactCrop>

            <div className="flex justify-end gap-4 mt-6">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                className="cursor-pointer"
                onClick={handleUpload}
                disabled={isUploading}
              >
                {isUploading ? <Loader2 className="animate-spin" /> : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
