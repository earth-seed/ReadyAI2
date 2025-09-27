// components/UploadDocAndImage.tsx
import React, { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from "../../middleware/firebase"; // your initialized firebase app

const storage = getStorage(app);
const db = getFirestore(app);

const UploadDocAndImage: React.FC = () => {
  // create states
  const [docFile, setDocFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // form state
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const handleUpload = async () => {
    if (!docFile || !imageFile) {
      alert("Please select both a Word doc and an image before uploading.");
      return;
    }
    if (!title || !url || !metaDesc) {
      alert("Please fill in all metadata fields.");
      return;
    }

    setUploading(true);

    try {
      // references
      const docRef = ref(storage, `uploads/docs/${Date.now()}-${docFile.name}`);
      const imgRef = ref(storage, `uploads/images/${Date.now()}-${imageFile.name}`);

      // upload tasks
      const docUploadTask = uploadBytesResumable(docRef, docFile);
      const imgUploadTask = uploadBytesResumable(imgRef, imageFile);

      // promise will return storage url for created files
      const [docURL, imgURL] = await Promise.all([
        new Promise<string>((resolve, reject) => {
          docUploadTask.on(
            "state_changed",
            undefined,
            reject,
            async () => resolve(await getDownloadURL(docRef))
          );
        }),
        new Promise<string>((resolve, reject) => {
          imgUploadTask.on(
            "state_changed",
            undefined,
            reject,
            async () => resolve(await getDownloadURL(imgRef))
          );
        }),
      ]);

      // save metadata in Firestore
      await addDoc(collection(db, "articles"), {
        title,
        url,
        description: metaDesc,
        timestamp: timestamp || serverTimestamp(), // fallback to server timestamp
        docURL,
        imgURL,
      });

      alert("Upload & metadata save complete!");
      setTitle("");
      setUrl("");
      setMetaDesc("");
      setMetaKeywords("");
      setTimestamp("");
      setDocFile(null);
      setImageFile(null);

    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Upload Word Doc & Image</h2>

      <label className="font-bold block">Word Document:</label>
      <input type="file" accept=".doc,.docx" onChange={(e) => setDocFile(e.target.files?.[0] || null)} />

      <label className="font-bold block">Article Image:</label>
      <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />

      <label className="font-bold block">Title:</label>
      <input type="text" placeholder="Article Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full" />

      <label className="font-bold block">URL:</label>
      <input type="text" placeholder="article-title" value={url} onChange={(e) => setUrl(e.target.value)} className="border p-2 w-full" />

      <label className="font-bold block">Meta Description:</label>
      <input type="text" placeholder="meta description" value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)} className="border p-2 w-full" />

      <label className="font-bold block">Meta Keywords:</label>
      <input type="text" placeholder="keyword 1, keyword 2" value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} className="border p-2 w-full" />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default UploadDocAndImage;