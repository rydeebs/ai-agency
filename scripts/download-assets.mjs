import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');

const assets = [
  // Favicons
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc17898/66aa94545f1fed21b3e72d73_favicon.png', 'seo/favicon.png'],
  // Flags
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc17898/66d9e1e9e351b067477e0cf7_EmojioneFlagForUnitedKingdom.svg', 'images/flag-uk.svg'],
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc17898/66d9e1f752ea58556da3342a_EmojioneFlagForFrance.svg', 'images/flag-fr.svg'],
  // Team / founder photos
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc178bf/677247b4a9f095a9c94c65b9_rob.png', 'images/team-rob.png'],
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc178bf/67056f5ca24128e2b2ce501a_Mani.png', 'images/team-mani.png'],
  // Client review avatars
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc178bf/66abdfc9d86ebf1d5cb85c3b_Glauber%20Costa.png', 'images/avatar-glauber.png'],
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc178bf/66a8c52db6b7051a32e17a48_Darren%20Webb.avif', 'images/avatar-darren.avif'],
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc178bf/66a8c6af3a3b8d2026a1a382_CJ%20van%20der%20Westhuizen.avif', 'images/avatar-cj.avif'],
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc178bf/66a8c6ba7c866a2d20f6be03_Katherine%20Galvin.avif', 'images/avatar-katherine.avif'],
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc178bf/66a8c704708f6e5c17884130_Abraham%20Micael.avif', 'images/avatar-abraham.avif'],
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc178bf/66a8c6bae7d1e9248a3ec741_Hyungsuk%20Kang.avif', 'images/avatar-hyungsuk.avif'],
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc178bf/66a8c6bae7d1e9248a3ec741_Tom%20Fitzgerald.avif', 'images/avatar-tom.avif'],
  // Testimonial avatar strip images
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc17898/66c39407cc05a300605d4af9_Rossario-final.avif', 'images/avatar-rossario.avif'],
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc17898/66d7573093eff99df71bbfdb_Maxim.avif', 'images/avatar-maxim.avif'],
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc17898/66d756cb2acf0a41ffc7c94e_Mykhailo.avif', 'images/avatar-mykhailo.avif'],
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc17898/66b1f55b7b00bdd9b6e44fc5_keshav.avif', 'images/avatar-keshav.avif'],
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc17898/66b1f55b003fe0fcdc0155a8_long.avif', 'images/avatar-long.avif'],
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc17898/66b1f55b84e758ee92e3efa5_josh.avif', 'images/avatar-josh.avif'],
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc17898/66b1f55b382349384b88d212_pruthvi.avif', 'images/avatar-pruthvi.avif'],
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc17898/66b1f55ba5e6c9d6b15153b1_samantha.avif', 'images/avatar-samantha.avif'],
  // CTA background
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc17898/66b4c5aa900d76e30fe6a6ad_cta_background1-5x%202.avif', 'images/cta-background.avif'],
  // Founder video clip
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc17898%2F67724a5757fc4ed61cf017ae_rob-small-clip-transcode.mp4', 'videos/rob-clip.mp4'],
];

// Video assets for sticky cards (referenced externally)
const videoAssets = [
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc17898%2F66bc94cd7b732415928cca50_1%20Ultra%20Fast%20Delivery-transcode.mp4', 'videos/card-1-ultra-fast.mp4'],
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc17898%2F66bc94be9d96f5aed14c9372_2%20Netflix%20for%20Design-transcode.mp4', 'videos/card-2-netflix-design.mp4'],
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc17898%2F66bc9490c9a5f44d413e3a8a_6%20Revisions-transcode.mp4', 'videos/card-6-revisions.mp4'],
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc17898%2F66bc947a7b3e433c7620a7bb_7%20Unique%20Designs-transcode.mp4', 'videos/card-7-unique-designs.mp4'],
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc17898%2F66bc9425fa3e55d327bd29e5_8%20Dedicated%20Project%20Manager-transcode.mp4', 'videos/card-8-project-manager.mp4'],
  ['https://cdn.prod.website-files.com/669ebf75d94a827d6cc17898%2F66bc949ac1ca82dcc1ace1bd_5%20Support-transcode.mp4', 'videos/card-5-support.mp4'],
];

const allAssets = [...assets, ...videoAssets];

async function downloadAsset(url, localPath) {
  const fullPath = path.join(publicDir, localPath);
  const dir = path.dirname(fullPath);
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
  if (existsSync(fullPath)) {
    console.log(`  SKIP ${localPath} (already exists)`);
    return;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = await res.arrayBuffer();
    await writeFile(fullPath, Buffer.from(buf));
    console.log(`  OK   ${localPath} (${Math.round(buf.byteLength / 1024)}kb)`);
  } catch (e) {
    console.error(`  FAIL ${localPath}: ${e.message}`);
  }
}

async function downloadBatch(assets, batchSize = 4) {
  for (let i = 0; i < assets.length; i += batchSize) {
    const batch = assets.slice(i, i + batchSize);
    await Promise.all(batch.map(([url, localPath]) => downloadAsset(url, localPath)));
  }
}

console.log(`Downloading ${allAssets.length} assets...`);
await downloadBatch(allAssets);
console.log('Done!');
