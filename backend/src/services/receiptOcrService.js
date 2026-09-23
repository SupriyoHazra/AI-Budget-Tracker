/**
 * Receipt OCR Service Module
 *
 * NOTE FOR AI-ML TEAM MEMBER:
 * This service parses and scans receipts.
 * You can connect your OCR pipeline (e.g., Tesseract.js, Google Cloud Vision,
 * or Gemini Multimodal Vision API) in parseReceiptImage().
 */

class ReceiptOcrService {
  /**
   * Parse a receipt from raw text, image file or metadata
   * @param {Object} input
   * @param {string} input.fileName - Uploaded image filename
   * @param {string} input.rawText - OCR text if pre-extracted
   * @returns {Promise<Object>} Extracted structured fields
   */
  async parseReceiptImage({ fileName = "receipt.jpg", rawText = "" } = {}) {
    // =========================================================================
    // TODO: [AI-ML TEAM MEMBER]
    // Replace with your Computer Vision or Multimodal OCR model here.
    // Example:
    // const extracted = await runOcrModel(imageBuffer);
    // return { merchant: extracted.vendor, amount: extracted.total, ... };
    // =========================================================================

    // Fallback parser that provides realistic parsed receipt fields
    const simulatedMerchants = [
      { merchant: "Starbucks Coffee", category: "Food & Dining", amount: 350 },
      { merchant: "Blinkit Quick Mart", category: "Food & Dining", amount: 620 },
      { merchant: "Apple Store", category: "Shopping", amount: 2499 },
      { merchant: "BookMyShow", category: "Entertainment", amount: 480 },
    ];

    const randomPick = simulatedMerchants[Math.floor(Math.random() * simulatedMerchants.length)];

    return {
      success: true,
      extracted: {
        merchant: randomPick.merchant,
        category: randomPick.category,
        amount: randomPick.amount,
        date: new Date().toISOString().split("T")[0],
        confidence: 0.96,
        detectedItems: [
          { name: "Item #1", price: randomPick.amount * 0.7 },
          { name: "Tax / Packaging", price: randomPick.amount * 0.3 },
        ],
      },
      source: "simulated-ocr-engine",
    };
  }
}

module.exports = new ReceiptOcrService();
