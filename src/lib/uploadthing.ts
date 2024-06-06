import { generateComponents } from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/Uploadthing/core";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();
