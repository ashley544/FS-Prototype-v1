/**
 * Generates an image URL for an asset based on its title or PDF filename
 * Only uses local images from the public/Assets folder
 */

/**
 * List of known image files in the Assets folder
 * Updated to match actual files in public/Assets/
 */
const knownAssetImages = [
  // Newsroom assets (JPG files)
  '$25bn in Pennsylvania Data Centers.jpg',
  'Artificial Intelligence through Private Markets.jpg',
  // Exchange assets (PNG files)
  'KKR Infrastructure - Presentation.png',
  'Coatue Innovative Strategies (CTEK).png',
  // Prototype subfolder
  'Prototype/BX Digital Infrastructure Strategy.png',
  // Root Assets folder (also check for BX Digital Infrastructure Strategy)
  'BX Digital Infrastructure Strategy.png',
  // Additional assets with spelling/spacing differences
  'BX Real Estate Partners X.jpg',
  'CrossBorder Capital Flows.jpg',
];

/**
 * List of placeholder images to use when no match is found
 * These are consistent placeholder images from the Assets folder
 */
const placeholderImages = [
  'ricardo-gomez-angel-HXBP4Nud8PQ-unsplash.jpg',
  'markus-winkler-IrRbSND5EUc-unsplash.jpg',
  'pedro-lastra-Nyvq2juw4_o-unsplash.jpg',
  'taylor-nicole-qH7nLsK_IjE-unsplash.jpg',
  'mediensturmer-aWf7mjwwJJo-unsplash.jpg',
];

/**
 * Extracts PDF filename from a file path
 * @param {string} filePath - The PDF file path (e.g., "/pdfs/Asset Name.pdf")
 * @returns {string} - The PDF filename without extension (e.g., "Asset Name")
 */
function getPdfFileName(filePath) {
  if (!filePath) return null;
  
  // Extract filename from path
  const fileName = filePath.split('/').pop() || filePath;
  
  // Remove .pdf extension
  const nameWithoutExt = fileName.replace(/\.pdf$/i, '');
  
  return nameWithoutExt;
}

/**
 * Normalizes a string for matching (remove special chars, lowercase, handle camelCase)
 */
function normalizeForMatch(str) {
  if (!str) return '';
  // Split camelCase words (e.g., "CrossBorder" -> "Cross Border")
  // Insert space before capital letters that follow lowercase letters or numbers
  const camelCaseSplit = str.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  return camelCaseSplit.toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' ')     // Normalize whitespace (handles multiple spaces)
    .trim();
}

/**
 * Finds a matching image file for the given search string
 * @param {string} searchString - The title or PDF filename to match
 * @returns {string|null} - The image path if found, null otherwise
 */
function findMatchingImage(searchString) {
  if (!searchString) return null;
  
  const normalizedSearch = normalizeForMatch(searchString);
  
  // Try to find exact match in known images first
  for (const imageFile of knownAssetImages) {
    // Remove file extension and path separators, then normalize
    // For "Prototype/BX Digital Infrastructure Strategy.png", we want to match "BX Digital Infrastructure Strategy"
    const imageNameWithoutExt = imageFile.replace(/\.(png|jpg|jpeg)$/i, '');
    // Remove "Prototype/" prefix if present before normalizing
    const imageNameForMatch = imageNameWithoutExt.replace(/^Prototype\//, '');
    const imageName = normalizeForMatch(imageNameForMatch);
    
    // Exact match (highest priority)
    if (normalizedSearch === imageName) {
      if (imageFile.startsWith('Prototype/')) {
        return `/Assets/${imageFile}`;
      }
      return `/Assets/${imageFile}`;
    }
    
    // Check if one contains the other (for partial matches)
    const shorterLength = Math.min(normalizedSearch.length, imageName.length);
    const longerLength = Math.max(normalizedSearch.length, imageName.length);
    
    if (normalizedSearch.includes(imageName) || imageName.includes(normalizedSearch)) {
      const matchScore = shorterLength / longerLength;
      if (matchScore >= 0.7) { // At least 70% match
        if (imageFile.startsWith('Prototype/')) {
          return `/Assets/${imageFile}`;
        }
        return `/Assets/${imageFile}`;
      }
    }
  }
  
  // Return null if no match found
  // This allows the main function to use placeholder images instead
  return null;
}

/**
 * Gets a consistent placeholder image based on the title
 * Uses a hash of the title to consistently assign the same placeholder to the same asset
 * @param {string} title - The asset title
 * @returns {string} - The placeholder image path
 */
function getPlaceholderImage(title) {
  if (!title || placeholderImages.length === 0) {
    return `/Assets/${placeholderImages[0]}`;
  }
  
  // Create a simple hash from the title to consistently assign placeholders
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    const char = title.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Use absolute value and modulo to select a placeholder
  const index = Math.abs(hash) % placeholderImages.length;
  return `/Assets/${placeholderImages[index]}`;
}

/**
 * Main function to get asset image URL
 * @param {string} title - The asset title
 * @param {string} existingImage - Optional existing image URL that was provided
 * @param {string} filePath - Optional PDF file path to extract filename for matching
 * @returns {string|null} - The image URL to use, or a placeholder if no match found
 */
export function getAssetImageUrl(title, existingImage = null, filePath = null) {
  // If an existing image is provided and it's a valid local path, use it
  if (existingImage && existingImage.startsWith('/Assets/')) {
    return existingImage;
  }
  
  // First, try to match based on PDF filename if file path is provided
  if (filePath) {
    const pdfFileName = getPdfFileName(filePath);
    if (pdfFileName) {
      const imagePath = findMatchingImage(pdfFileName);
      if (imagePath) {
        return imagePath;
      }
    }
  }
  
  // Try to match based on title
  if (title) {
    const imagePath = findMatchingImage(title);
    if (imagePath) {
      return imagePath;
    }
  }
  
  // No match found - return a placeholder image instead of null
  // This ensures all assets have an image, even if it's a placeholder
  return title ? getPlaceholderImage(title) : `/Assets/${placeholderImages[0]}`;
}
