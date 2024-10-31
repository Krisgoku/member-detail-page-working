import { createUploadthing, type FileRouter } from 'uploadthing/next';
 
const f = createUploadthing();
 
export const ourFileRouter = {
  memberImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(async () => {
      return { userId: '1' };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId);
      console.log('File URL:', file.url);
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;