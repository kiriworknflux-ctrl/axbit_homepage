/**
 * update-sitemap.js
 * 
 * 배포 전 sitemap.xml의 lastmod 날짜를 오늘 날짜(KST 기준)로 자동 업데이트하는 스크립트.
 * 
 * 사용법:
 *   node update-sitemap.js
 * 
 * 또는 package.json의 scripts에 등록하면 편리합니다:
 *   "scripts": { "update-sitemap": "node update-sitemap.js" }
 */

const fs = require("fs");
const path = require("path");

// sitemap.xml 파일 경로
const SITEMAP_PATH = path.join(__dirname, "sitemap.xml");

// 오늘 날짜를 KST(한국 표준시) 기준 YYYY-MM-DD 형식으로 반환
function getTodayKST() {
  // KST = UTC+9
  const now = new Date();
  const kstOffset = 9 * 60 * 60 * 1000;
  const kstDate = new Date(now.getTime() + kstOffset);

  const year = kstDate.getUTCFullYear();
  const month = String(kstDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(kstDate.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// sitemap.xml의 모든 <lastmod> 태그를 오늘 날짜로 업데이트
function updateSitemap() {
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.error("❌ sitemap.xml 파일을 찾을 수 없습니다:", SITEMAP_PATH);
    process.exit(1);
  }

  const today = getTodayKST();
  let content = fs.readFileSync(SITEMAP_PATH, "utf-8");

  // <lastmod>...</lastmod> 패턴을 오늘 날짜로 교체
  const updated = content.replace(
    /<lastmod>[\d-]+<\/lastmod>/g,
    `<lastmod>${today}</lastmod>`
  );

  if (content === updated) {
    console.log(`ℹ️  lastmod 날짜가 이미 최신입니다: ${today}`);
    return;
  }

  fs.writeFileSync(SITEMAP_PATH, updated, "utf-8");
  console.log(`✅ sitemap.xml lastmod 날짜가 업데이트되었습니다: ${today}`);
}

updateSitemap();
