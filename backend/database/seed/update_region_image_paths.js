const fs = require('fs');
const path = require('path');

const backendFilePath = path.resolve(__dirname, 'indiaRegionsData.js');
const frontendFilePath = path.resolve(__dirname, '../../../frontend/src/data/regionsData.js');

const STATES = [
  'andhra-pradesh', 'arunachal-pradesh', 'assam', 'bihar', 'chhattisgarh',
  'goa', 'gujarat', 'haryana', 'himachal-pradesh', 'jharkhand',
  'karnataka', 'kerala', 'madhya-pradesh', 'maharashtra', 'manipur',
  'meghalaya', 'mizoram', 'nagaland', 'odisha', 'punjab',
  'rajasthan', 'sikkim', 'tamil-nadu', 'telangana', 'tripura',
  'uttar-pradesh', 'uttarakhand', 'west-bengal'
];

const UTS = [
  'andaman-and-nicobar-islands', 'chandigarh', 'dadra-and-nagar-haveli-and-daman-and-diu',
  'delhi', 'jammu-and-kashmir', 'ladakh', 'lakshadweep', 'puducherry'
];

function getCategory(slug) {
  if (STATES.includes(slug)) return 'states';
  if (UTS.includes(slug)) return 'union-territories';
  return 'states';
}

// 1. Process backend indiaRegionsData.js
console.log('Updating backend indiaRegionsData.js...');
let backendContent = fs.readFileSync(backendFilePath, 'utf8');

// First, fix the corrupted facebook URL at line 870 directly
backendContent = backendContent.replace(
  /heroImage:\s*['"]https:\/\/images\.unsphttps:\/\/www\.facebook\.com[^'"]+['"]/g,
  "heroImage: '/images/regions/states/uttar-pradesh/hero.jpg'"
);

// Regex replace for each region's heroImage
backendContent = backendContent.replace(
  /slug:\s*['"]([^'"]+)['"][\s\S]*?heroImage:\s*['"][^'"]+['"]/g,
  (match, slug) => {
    const category = getCategory(slug);
    const heroPath = `/images/regions/${category}/${slug}/hero.jpg`;
    const imagePath = `/images/regions/${category}/${slug}/highlight.jpg`;
    return match.replace(
      /heroImage:\s*['"][^'"]+['"]/,
      `heroImage: '${heroPath}',\n    image: '${imagePath}'`
    );
  }
);

fs.writeFileSync(backendFilePath, backendContent, 'utf8');
console.log('✅ Backend indiaRegionsData.js updated with local paths!');

// 2. Process frontend regionsData.js
console.log('Updating frontend regionsData.js...');
let frontendContent = fs.readFileSync(frontendFilePath, 'utf8');

frontendContent = frontendContent.replace(
  /slug:\s*['"]([^'"]+)[''][\s\S]*?image:\s*['"][^'"]+['"],\s*heroImage:\s*['"][^'"]+['"]/g,
  (match, slug) => {
    const category = getCategory(slug);
    const heroPath = `/images/regions/${category}/${slug}/hero.jpg`;
    const imagePath = `/images/regions/${category}/${slug}/highlight.jpg`;
    return match
      .replace(/image:\s*['"][^'"]+['"]/, `image: '${imagePath}'`)
      .replace(/heroImage:\s*['"][^'"]+['"]/, `heroImage: '${heroPath}'`);
  }
);

fs.writeFileSync(frontendFilePath, frontendContent, 'utf8');
console.log('✅ Frontend regionsData.js updated with local paths!');
