import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X, File, Image, FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  category: string;
  patientId?: string;
  status: 'uploading' | 'completed' | 'failed';
  progress: number;
  uploadedAt: string;
}

export const ImageUpload: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploads, setUploads] = useState<UploadedFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('imaging');

  const fileCategories = [
    { id: 'imaging', name: 'Medical Imaging', accept: '.dcm,.jpg,.jpeg,.png', icon: Image },
    { id: 'documents', name: 'Documents', accept: '.pdf,.doc,.docx', icon: FileText },
    { id: 'lab', name: 'Lab Results', accept: '.pdf,.jpg,.png', icon: File },
    { id: 'reports', name: 'Reports', accept: '.pdf,.doc,.docx', icon: FileText }
  ];

  const mockPatients = [
    { id: '1', name: 'John Doe', mrn: 'MRN-001' },
    { id: '2', name: 'Jane Smith', mrn: 'MRN-002' },
    { id: '3', name: 'Bob Johnson', mrn: 'MRN-003' }
  ];

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
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, [selectedCategory]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  }, [selectedCategory]);

  const handleFiles = (files: File[]) => {
    files.forEach((file) => {
      const uploadId = Math.random().toString(36).substr(2, 9);
      const newUpload: UploadedFile = {
        id: uploadId,
        name: file.name,
        size: file.size,
        type: file.type,
        category: selectedCategory,
        status: 'uploading',
        progress: 0,
        uploadedAt: new Date().toISOString()
      };

      setUploads(prev => [...prev, newUpload]);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploads(prev => prev.map(upload => {
          if (upload.id === uploadId) {
            const newProgress = upload.progress + Math.random() * 20;
            if (newProgress >= 100) {
              clearInterval(interval);
              return { ...upload, progress: 100, status: 'completed' };
            }
            return { ...upload, progress: newProgress };
          }
          return upload;
        }));
      }, 500);
    });
  };

  const removeUpload = (id: string) => {
    setUploads(prev => prev.filter(upload => upload.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return Image;
    return File;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploading': return Clock;
      case 'completed': return CheckCircle;
      case 'failed': return AlertCircle;
      default: return File;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploading': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const selectedCategoryData = fileCategories.find(cat => cat.id === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Upload Medical Files</h1>
          <p className="text-muted-foreground">Upload images, documents, and reports securely</p>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Upload className="mr-1 h-3 w-3" />
          HIPAA Compliant
        </Badge>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upload">Upload Files</TabsTrigger>
          <TabsTrigger value="recent">Recent Uploads</TabsTrigger>
          <TabsTrigger value="settings">Upload Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Select File Category</CardTitle>
              <CardDescription>Choose the type of medical file you're uploading</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                {fileCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Card 
                      key={category.id}
                      className={`cursor-pointer transition-all ${
                        selectedCategory === category.id 
                          ? 'ring-2 ring-primary bg-primary/5' 
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <CardContent className="p-4 text-center">
                        <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <h3 className="font-medium text-sm">{category.name}</h3>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upload {selectedCategoryData?.name}</CardTitle>
              <CardDescription>
                Drag and drop files or click to browse. 
                Accepted formats: {selectedCategoryData?.accept}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging 
                    ? 'border-primary bg-primary/5' 
                    : 'border-muted-foreground/25 hover:border-primary/50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">
                  {isDragging ? 'Drop files here' : 'Upload medical files'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop your files here, or click to browse
                </p>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  multiple
                  accept={selectedCategoryData?.accept}
                  onChange={handleFileSelect}
                />
                <Button asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Choose Files
                  </label>
                </Button>
              </div>

              {uploads.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="font-medium">Upload Progress</h4>
                  {uploads.map((upload) => {
                    const FileIcon = getFileIcon(upload.type);
                    const StatusIcon = getStatusIcon(upload.status);
                    
                    return (
                      <div key={upload.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <FileIcon className="h-5 w-5 text-muted-foreground" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium truncate">{upload.name}</p>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(upload.status)}>
                                <StatusIcon className="mr-1 h-3 w-3" />
                                {upload.status}
                              </Badge>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeUpload(upload.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{formatFileSize(upload.size)}</span>
                            <span>•</span>
                            <span>{upload.category}</span>
                          </div>
                          {upload.status === 'uploading' && (
                            <Progress value={upload.progress} className="h-1 mt-2" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Uploads</CardTitle>
              <CardDescription>Files uploaded in the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {uploads.filter(u => u.status === 'completed').map((upload) => {
                  const FileIcon = getFileIcon(upload.type);
                  
                  return (
                    <div key={upload.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <FileIcon className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium">{upload.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{formatFileSize(upload.size)}</span>
                          <span>•</span>
                          <span>{new Date(upload.uploadedAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span className="capitalize">{upload.category}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="outline">Download</Button>
                      </div>
                    </div>
                  );
                })}
                
                {uploads.filter(u => u.status === 'completed').length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <File className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No uploaded files yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Settings</CardTitle>
              <CardDescription>Configure upload preferences and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="patient">Default Patient Assignment</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select default patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPatients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name} ({patient.mrn})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="auto-process">Auto-process Images</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Automatically run AI analysis on uploaded medical images
                </p>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="auto-process" />
                  <Label htmlFor="auto-process">Enable automatic processing</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};