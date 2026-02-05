import React, { useState, useRef } from 'react';
import { Upload, X, FileText, CheckCircle } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  onUpload?: (files: File[]) => void;
  className?: string;
}
export function FileUpload({
  accept = '*',
  multiple = false,
  maxSize = 5 * 1024 * 1024,
  // 5MB default
  onUpload,
  className = ''
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };
  const handleFiles = (newFiles: File[]) => {
    // Filter by size
    const validFiles = newFiles.filter((file) => file.size <= maxSize);
    if (validFiles.length < newFiles.length) {
      alert('Some files were too large (max 5MB)');
    }
    const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
    setFiles(updatedFiles);
    // Simulate upload
    setUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          if (onUpload) onUpload(updatedFiles);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };
  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    if (onUpload) onUpload(newFiles);
  };
  return (
    <div className={`w-full ${className}`}>
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}>

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={accept}
          onChange={handleChange} />


        <div className="flex flex-col items-center justify-center space-y-2 cursor-pointer">
          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <Upload className="h-5 w-5" />
          </div>
          <p className="text-sm font-medium text-slate-900">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-slate-500">
            {accept === '*' ? 'Any file' : accept.replace(/,/g, ', ')} (max {maxSize / 1024 / 1024}MB)
          </p>
        </div>
      </div>

      {uploading &&
      <div className="mt-4">
          <ProgressBar
          value={progress}
          label="Uploading..."
          color="blue"
          showPercentage />

        </div>
      }

      {files.length > 0 &&
      <div className="mt-4 space-y-2">
          {files.map((file, index) =>
        <div
          key={index}
          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">

              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-900 truncate max-w-[200px]">
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!uploading &&
            <CheckCircle className="h-4 w-4 text-green-500" />
            }
                <button
              onClick={(e) => {
                e.stopPropagation();
                removeFile(index);
              }}
              className="text-slate-400 hover:text-red-500">

                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
        )}
        </div>
      }
    </div>);

}