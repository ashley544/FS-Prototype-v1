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
 * Normalizes a string for matching (remove special chars, lowercase)
 */
function normalizeForMatch(str) {
  if (!str) return '';
  return str.toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' ')     // Normalize whitespace
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
    const imageName = normalizeForMatch(imageFile.replace(/\.(png|jpg|jpeg)$/i, ''));
    
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
  
  // Also try direct path match - for images with same name as PDFs
  // Try PNG first (most common), then JPG
  // The browser will try to load it, and if it fails, the component's error handler will show placeholder
  const directPathPng = `/Assets/${searchString}.png`;
  const directPathJpg = `/Assets/${searchString}.jpg`;
  
  // Return PNG path first (most common format)
  // If it doesn't exist and fails to load, component will show placeholder
  return directPathPng;
}

/**
 * Main function to get asset image URL
 * @param {string} title - The asset title
 * @param {string} existingImage - Optional existing image URL that was provided
 * @param {string} filePath - Optional PDF file path to extract filename for matching
 * @returns {string|null} - The image URL to use, or null if no match found
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
  
  // No match found - return null (component should handle this gracefully)
  return null;
}
