import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, FileVideo, File, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MediaUploadProps {
  onUpload: (files: File[]) => void;
  onClose: () => void;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ACCEPTED_IMAGE_TYPES = {
  'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
};
const ACCEPTED_VIDEO_TYPES = {
  'video/*': ['.mp4', '.webm', '.ogg'],
};
const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    '.docx',
  ],
  'text/plain': ['.txt'],
};

export default function MediaUpload({ onUpload, onClose }: MediaUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      ...ACCEPTED_IMAGE_TYPES,
      ...ACCEPTED_VIDEO_TYPES,
      ...ACCEPTED_FILE_TYPES,
    },
    maxSize: MAX_FILE_SIZE,
    onDrop: (acceptedFiles) => {
      setFiles((prev) => [...prev, ...acceptedFiles]);
    },
  });

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== name));
    const newProgress = { ...uploadProgress };
    delete newProgress[name];
    setUploadProgress(newProgress);
  };

  const handleUpload = async () => {
    // Simulate upload progress
    for (const file of files) {
      for (let progress = 0; progress <= 100; progress += 10) {
        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: progress,
        }));
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    onUpload(files);
    onClose();
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return Image;
    if (file.type.startsWith('video/')) return FileVideo;
    return File;
  };

  const getFilePreview = (file: File) => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  return (
    <div className="p-4 space-y-4">
      <div
        {...getRootProps()}
        className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
      >
        <input {...getInputProps()} />
        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-muted-foreground">
          Drag & drop files here, or click to select
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Max file size: 50MB
          <br />
          Supported formats: Images, Videos, PDF, DOC, DOCX, TXT
        </p>
      </div>

      {files.length > 0 && (
        <ScrollArea className="h-[300px] rounded-md border">
          <div className="p-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {files.map((file) => {
                const FileIcon = getFileIcon(file);
                const preview = getFilePreview(file);
                const progress = uploadProgress[file.name] || 0;

                return (
                  <motion.div
                    key={file.name}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-start space-x-4 bg-muted/50 rounded-lg p-3"
                  >
                    <div className="w-16 h-16 rounded-md border overflow-hidden flex items-center justify-center bg-background">
                      {preview ? (
                        <img
                          src={preview}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FileIcon className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium truncate">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeFile(file.name)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      {progress > 0 && (
                        <div className="mt-2 space-y-1">
                          <Progress value={progress} />
                          <p className="text-xs text-muted-foreground text-right">
                            {progress}%
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </ScrollArea>
      )}

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleUpload} disabled={files.length === 0}>
          Upload {files.length > 0 && `(${files.length})`}
        </Button>
      </div>
    </div>
  );
}