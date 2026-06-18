/**
 * Resolves the image URL based on whether it is stored in S3 or has a direct URL.
 * 
 * @param item - The item containing image data (url, isS3, key)
 * @param prefix - The imageUrlPrefix or thumbnailUrlPrefix from app settings
 * @returns The resolved image URL string
 */
export const resolveImageUrl = (
  item: any,
  prefix?: string
): string => {
  if (!item) return "";

  // Support both nested image map and flat structure
  const img = item.image || item;

  if (img.isS3 && prefix && img.key) {
    const baseUrl = prefix.endsWith("/") ? prefix : `${prefix}/`;
    const cleanKey = img.key.startsWith("/") ? img.key.substring(1) : img.key;
    const s3Url = baseUrl + cleanKey;
    // console.log("Resolved S3 URL:", s3Url);
    return s3Url;
  }

  // Fallback to various possible URL field names, checking both nested and top-level
  const fallbackUrl =
    img.url ||
    img.imageUrl ||
    img.photoURL ||
    img.iconImage ||
    item.url ||
    item.imageUrl ||
    item.photoURL ||
    item.iconImage ||
    "";

  // if (!fallbackUrl && img.isS3) {
  //   console.warn("resolveImageUrl: S3 item missing prefix or key", {
  //     hasPrefix: !!prefix,
  //     key: img.key,
  //     itemId: item.id
  //   });
  // }

  return fallbackUrl;
};
