'use client';

import { useState, useCallback } from 'react';

interface FileUploadProps {
  onFileLoaded: () => void;
}

const DEMO_FILES = [
  {
    name: 'accounts_payable.csv',
    icon: '📄',
    description: 'Invoice processing workflow',
    rows: 17234,
    size: '1.2 MB'
  },
  {
    name: 'purchase_orders.csv',
    icon: '🛒',
    description: 'Purchase order approval flow',
    rows: 14582,
    size: '982 KB'
  },
  {
    name: 'customer_onboarding.csv',
    icon: '👥',
    description: 'New customer registration',
    rows: 21945,
    size: '1.5 MB'
  },
  {
    name: 'expense_reports.csv',
    icon: '💳',
    description: 'Employee expense approvals',
    rows: 19327,
    size: '1.3 MB'
  }
];

export default function FileUpload({ onFileLoaded }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [draggedFile, setDraggedFile] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    // Check if it's a demo file being dragged
    const demoFileName = e.dataTransfer.getData('text/plain');
    if (demoFileName) {
      setFileName(demoFileName);
      setDraggedFile(null);
      setTimeout(() => {
        onFileLoaded();
      }, 500);
      return;
    }

    // Handle real file upload
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.name.toLowerCase().endsWith('.csv')) {
        setFileName(file.name);
        setTimeout(() => {
          onFileLoaded();
        }, 500);
      }
    }
  }, [onFileLoaded]);

  const handleDemoFileDragStart = useCallback((e: React.DragEvent, fileName: string) => {
    e.dataTransfer.setData('text/plain', fileName);
    setDraggedFile(fileName);
  }, []);

  const handleDemoFileDragEnd = useCallback(() => {
    setDraggedFile(null);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left side - Demo files */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Demo Files
          </h3>
          <div className="space-y-3">
            {DEMO_FILES.map((file) => (
              <div
                key={file.name}
                draggable
                onDragStart={(e) => handleDemoFileDragStart(e, file.name)}
                onDragEnd={handleDemoFileDragEnd}
                className={`
                  bg-white border-2 rounded-xl p-4 cursor-move transition-all shadow-sm hover:shadow-md
                  ${draggedFile === file.name
                    ? 'opacity-50 scale-95 border-blue-400'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                    {file.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm truncate">
                      {file.name}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {file.description}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500">{file.rows.toLocaleString()} rows</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs text-gray-500">{file.size}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-gray-700">
              <strong>Tip:</strong> Drag any file to the drop zone to analyze it
            </p>
          </div>
        </div>

        {/* Right side - Drop zone */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Upload Area
          </h3>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-2xl p-12 text-center transition-all h-full min-h-[400px] flex items-center justify-center
              ${isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 bg-white hover:border-gray-400'
              }
            `}
          >
            <div className="w-full">
              <svg
                className="mx-auto h-16 w-16 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {fileName ? (
                <div className="mt-6">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-base font-semibold text-green-600 mb-2">File loaded successfully!</p>
                  <p className="text-lg font-medium text-gray-900 mt-2">{fileName}</p>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-150"></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Processing data...</p>
                </div>
              ) : (
                <>
                  <p className="mt-6 text-2xl font-semibold text-gray-900">
                    {isDragging ? 'Drop file here' : 'Drag a CSV file here'}
                  </p>
                  <p className="mt-3 text-base text-gray-600">
                    Choose from demo files on the left
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
