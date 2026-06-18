/**
 * Static mapping for feedback popup trigger keys.
 * These keys MUST match the 'key' field in the feedback_types collection in Firestore.
 */
export const FEEDBACK_KEYS = {
  PROMPT_COPY: "every_2nd_prompt_copy_custom_review_encourage_banner",
  IMAGE_DOWNLOAD: "every_2nd_image_download_store_review_popup",
  IMAGE_FAVOURITE: "after_favourite_every_2nd_images_from_any_category",
  FIRST_IMAGE_GENERATED: "first_image_generated_enjoying_your_creation_popup",
  CATEGORY_SELECT: "category_select_in_app_rating_every_2nd",
  APP_OPEN: "every_2nd_app_open_welcome_back_store_review_popup",
  // You can add more keys here as you implement new triggers
} as const;

export type FeedbackKey = typeof FEEDBACK_KEYS[keyof typeof FEEDBACK_KEYS];
