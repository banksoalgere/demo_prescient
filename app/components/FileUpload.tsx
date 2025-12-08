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
                  group relative bg-gradient-to-br from-white to-gray-50 border-2 rounded-xl p-5 cursor-move
                  transition-all duration-300 shadow-sm hover:shadow-xl
                  ${draggedFile === file.name
                    ? 'opacity-50 scale-95 border-blue-300'
                    : 'border-gray-200 hover:border-blue-400 hover:scale-105'
                  }
                `}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                <div className="relative flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform">
                    {file.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 text-sm truncate group-hover:text-blue-600 transition-colors">
                      {file.name}
                    </div>
                    <div className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                      {file.description}
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                        {file.rows} rows
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        </svg>
                        {file.size}
                      </span>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-900">
              <strong>💡 Tip:</strong> Drag any file to the drop zone to analyze it
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
              relative border-3 border-dashed rounded-2xl p-12 text-center transition-all h-full min-h-[400px] flex items-center justify-center overflow-hidden
              ${isDragging
                ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 scale-[1.02] shadow-2xl'
                : 'border-gray-300 bg-gradient-to-br from-white to-gray-50 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50/30 hover:to-purple-50/30 shadow-sm'
              }
            `}
          >
            {/* Animated background pattern */}
            {isDragging && (
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNMjAgMGwyMCAyMC0yMCAyMEwwIDIweiIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utb3BhY2l0eT0iLjIiLz48L2c+PC9zdmc+')]"></div>
              </div>
            )}
            <div className="pointer-events-none w-full">
              <svg
                className="mx-auto h-20 w-20 text-gray-400"
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
                <div className="mt-6 animate-in zoom-in duration-500">
                  <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl mb-5 shadow-lg">
                    <svg className="w-10 h-10 text-white animate-in zoom-in duration-300 delay-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <div className="absolute inset-0 bg-green-400 rounded-2xl animate-ping opacity-20"></div>
                  </div>
                  <p className="text-base font-bold text-green-600 mb-2">File loaded successfully!</p>
                  <p className="text-xl font-bold text-gray-900 mt-3">{fileName}</p>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-150"></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Processing data...</p>
                </div>
              ) : (
                <>
                  <p className="mt-6 text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                    {isDragging ? '✨ Drop file here' : 'Drag a CSV file here'}
                  </p>
                  <p className="mt-4 text-lg text-gray-600">
                    Choose from demo files on the left
                  </p>
                  <div className="mt-8 flex items-center justify-center">
                    <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                      <svg className={`w-6 h-6 ${isDragging ? 'animate-bounce' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                      <span className="font-semibold">Drag & Drop</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
