import FaceDetection from "@react-native-ml-kit/face-detection";
import * as ImageManipulator from "expo-image-manipulator";

/**
 * Detects if at least one human face is present in the given image URI.
 * To prevent OutOfMemory (OOM) errors on high-resolution images,
 * the image is temporarily downscaled before detection.
 * @param imageUri Local URI of the image to check.
 * @returns Promise<boolean> True if at least one face is detected.
 */
export const detectFacesInImage = async (
  imageUri: string,
): Promise<boolean> => {
  try {
    if (!imageUri) {
      console.warn("[FaceDetection] No image URI provided");
      return false;
    }

    console.log("[FaceDetection] Analyzing image:", imageUri);

    // Downscale the image strictly for face detection to prevent OOM
    // 1024x1024 is plenty of detail for face detection but keeps memory footprint small
    const resizedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: 1024 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );

    console.log("[FaceDetection] Downscaled for detection:", resizedImage.uri);
    const faces = await FaceDetection.detect(resizedImage.uri);

    console.log("[FaceDetection] Result count:", faces.length);
    const hasFace = faces.length > 0;

    if (!hasFace) {
      console.warn("[FaceDetection] NO FACE DETECTED in image:", imageUri);
    }

    return hasFace;
  } catch (error: any) {
    console.error("[FaceDetection] Error detecting faces:", error);
    // If the native module is not available (e.g. before rebuilt),
    // we return true to avoid blocking the user during development.
    // In a production environment, you might want to return false here.
    return true;
  }
};
