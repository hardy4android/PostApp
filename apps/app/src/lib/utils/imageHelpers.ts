/**
 * Get MIME type from file URI based on extension
 * @param uri - File URI (e.g., "file:///path/to/image.jpg")
 * @returns MIME type string (e.g., "image/jpeg")
 */
export const getMimeType = (uri: string): string => {
  const extension = uri.split('.').pop()?.toLowerCase();
  
  const mimeTypes: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'heic': 'image/heic',
    'heif': 'image/heif',
    'bmp': 'image/bmp',
    'svg': 'image/svg+xml',
  };
  
  return mimeTypes[extension || ''] || 'image/jpeg';
};

/**
 * Extract filename from URI or generate a default one
 * @param uri - File URI
 * @param index - Index for default naming
 * @returns Filename with extension
 */
export const getFilenameFromUri = (uri: string, index: number): string => {
  const parts = uri.split('/');
  const filename = parts[parts.length - 1];
  
  // If filename has extension, return it
  if (filename && filename.includes('.')) {
    return filename;
  }
  
  // Otherwise, generate default name with extension from URI
  const extension = uri.split('.').pop()?.toLowerCase();
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic', 'heif', 'bmp'];
  
  if (extension && validExtensions.includes(extension)) {
    return `image_${index + 1}.${extension}`;
  }
  
  // Default to .jpg if no valid extension found
  return `image_${index + 1}.jpg`;
};

/**
 * Create a file object for FormData from a local URI (React Native format)
 * @param uri - Local file URI
 * @param index - Index for naming
 * @returns File object compatible with React Native FormData
 */
export const createFileObject = (uri: string, index: number) => {
  return {
    uri,
    type: getMimeType(uri),
    name: getFilenameFromUri(uri, index),
  };
};
