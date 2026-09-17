import { PDFDocument } from "pdf-lib";

export const ASSESSMENT_PAGE_WIDTH = 960;
export const ASSESSMENT_PAGE_HEIGHT = 540;
export const ASSESSMENT_PAGE_COUNT = 9;

export async function buildAssessmentPdf(
  slidePngDataUrls: ReadonlyArray<string>,
): Promise<Uint8Array> {
  if (slidePngDataUrls.length !== ASSESSMENT_PAGE_COUNT) {
    throw new Error(`Expected ${ASSESSMENT_PAGE_COUNT} assessment slides.`);
  }

  const document = await PDFDocument.create();
  document.setTitle("NewRevGen AI Tools Assessment");
  document.setAuthor("NewRevGen");
  document.setCreator("NewRevGen Assessment Generator");

  for (const dataUrl of slidePngDataUrls) {
    const image = await document.embedPng(dataUrl);
    const page = document.addPage([
      ASSESSMENT_PAGE_WIDTH,
      ASSESSMENT_PAGE_HEIGHT,
    ]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: ASSESSMENT_PAGE_WIDTH,
      height: ASSESSMENT_PAGE_HEIGHT,
    });
  }

  return document.save();
}

export function assessmentPdfFilename(clientName: string): string {
  const safeName = clientName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
  return `${safeName || "client"}-ai-tools-assessment.pdf`;
}
