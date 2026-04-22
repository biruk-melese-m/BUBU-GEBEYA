/* ============================================================
   DATA STORE & CONFIG
============================================================ */
// Supabase is handled in supabase.js
const CATEGORIES = [
  { id: 'phones',      name: 'Phones',      icon: '📱', count: 0 },
  { id: 'electronics', name: 'Electronics', icon: '🖥️', count: 0 },
  { id: 'vehicles',   name: 'Vehicles',    icon: '🚗', count: 0  },
  { id: 'fashion',    name: 'Fashion',     icon: '👗', count: 0 },
  { id: 'other',      name: 'Other',       icon: '📦', count: 0  }
];

const ELECTRONICS_SUBS = [
  { id: 'computers', name: 'Computers', icon: '💻' },
  { id: 'tvs',       name: "TV's",      icon: '📺' },
  { id: 'cameras',   name: 'Cameras',   icon: '📷' },
  { id: 'audio',     name: 'Audio',     icon: '🎧' },
];

const PHONES_SUBS = [
  { id: 'mobile-phones', name: 'Mobile Phones', icon: '📱' },
  { id: 'tablets',       name: 'Tablets',       icon: '📟' },
  { id: 'smart-watches', name: 'Smart Watches', icon: '⌚' },
];

const CATEGORY_FILTERS = {
  phones: {
    brands:      ['Apple', 'Samsung', 'Huawei', 'Xiaomi', 'Infinix', 'Tecno', 'Oppo', 'Nokia'],
    priceRanges: ['Under 10k', '10k – 30k', '30k – 60k', '60k+'],
    storage:     ['64GB', '128GB', '256GB', '512GB', '1TB'],
    ram:         ['4GB', '8GB', '12GB', '16GB', '32GB'],
    conditions:  ['Brand New', 'Foreign Used', 'Local Used'],
  },
  electronics: {
    brands:     ['Apple', 'Samsung', 'Sony', 'HP', 'Dell', 'LG', 'Lenovo', 'Philips'],
    conditions: ['New', 'Used', 'Refurbished'],
  },
  vehicles: {
    brands:    ['Toyota', 'Hyundai', 'Suzuki', 'Kia', 'Lexus', 'BMW', 'Mercedes', 'Isuzu'],
    bodyTypes: ['Sedan', 'SUV', 'Hatchback', 'Pickup', 'Minivan', 'Truck', 'Coupe'],
  },
  fashion: {
    subCats:    [
      { id: 'clothing', name: 'Clothing',         icon: '👕' },
      { id: 'shoes',    name: 'Shoes',             icon: '💟' },
      { id: 'bags',     name: 'Bags & Accessories',icon: '👜' },
      { id: 'jewelry',  name: 'Jewelry',           icon: '💍' },
    ],
    brands:     ['Nike', 'Adidas', 'Zara', 'H&M', 'Gucci', 'Puma'],
    conditions: ['Brand New', 'Like New', 'Used'],
  },
};

const CATEGORY_SPEC_FIELDS = {
  phones: {
      'mobile-phones': [
          { name: 'Brand', type: 'select', options: ['Apple', 'Samsung', 'Huawei', 'Xiaomi', 'Infinix', 'Tecno', 'Oppo', 'Nokia', 'Google Pixel', 'Other'], required: true },
          { name: 'Model', type: 'text', placeholder: 'e.g. iPhone 15 Pro, Galaxy S23', required: true },
          { name: 'Storage Capacity', type: 'select', options: ['16GB', '32GB', '64GB', '128GB', '256GB', '512GB', '1TB'], required: true },
          { name: 'RAM', type: 'select', options: ['2GB', '3GB', '4GB', '6GB', '8GB', '12GB', '16GB', '24GB'], required: true },
          { name: 'Color', type: 'text', placeholder: 'e.g. Blue, Black, Gold', required: true },
          { name: 'Screen Size', type: 'text', placeholder: 'e.g. 6.1-inch, 6.7-inch', required: false },
          { name: 'Battery Health (%)', type: 'number', placeholder: 'e.g. 95', required: false }
      ],
      'tablets': [
          { name: 'Brand', type: 'select', options: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Huawei', 'Other'], required: true },
          { name: 'Model', type: 'text', placeholder: 'e.g. iPad Pro, Tab S9', required: true },
          { name: 'Storage Capacity', type: 'select', options: ['32GB', '64GB', '128GB', '256GB', '512GB', '1TB', '2TB'], required: true },
          { name: 'Screen Size', type: 'text', placeholder: 'e.g. 10.9-inch, 12.9-inch', required: true }
      ],
      'smart-watches': [
          { name: 'Brand', type: 'select', options: ['Apple', 'Samsung', 'Huawei', 'Xiaomi', 'Garmin', 'Fitbit', 'Other'], required: true },
          { name: 'Model', type: 'text', placeholder: 'e.g. Apple Watch S9, Galaxy Watch 6', required: true },
          { name: 'Color', type: 'text', placeholder: 'e.g. Midnight, Starlight', required: true }
      ]
  },
  electronics: {
      computers: [
          { name: 'Type', type: 'select', options: ['Laptop', 'Desktop', 'Tablet', 'Ultrabook', 'Workstation'], required: true },
          { name: 'Brand', type: 'text', placeholder: 'e.g. Apple, Dell, HP', required: true },
          { name: 'Model', type: 'text', placeholder: 'e.g. XPS 13, MacBook Air', required: true },
          { name: 'Subtype', type: 'text', placeholder: 'e.g. Gaming, Business', required: true },
          { name: 'Processor', type: 'text', placeholder: 'e.g. Intel Core i7, M2, Ryzen 5', required: true },
          { name: 'RAM', type: 'select', options: ['4GB', '8GB', '12GB', '16GB', '32GB', '64GB+'], required: true },
          { name: 'Storage Capacity', type: 'text', placeholder: 'e.g. 256GB, 1TB', required: true },
          { name: 'Storage Type', type: 'select', options: ['SSD', 'HDD', 'SSHD'], required: true },
          { name: 'Display Size', type: 'text', placeholder: 'e.g. 13-inch, 15.6-inch', required: true },
          { name: 'Operating System', type: 'select', options: ['Windows 11', 'Windows 10', 'macOS', 'Linux', 'ChromeOS'], required: true },
          { name: 'Color', type: 'text', placeholder: 'e.g. Silver, Space Gray, Black', required: true },
          // Optional
          { name: 'Number of Cores', type: 'number', required: false },
          { name: 'Graphics Card', type: 'text', required: false },
          { name: 'Graphics Card Memory', type: 'text', required: false },
          { name: 'Exchange Possible', type: 'select', options: ['Yes', 'No'], required: false }
      ],
      tvs: [
          { name: 'Brand', type: 'text', placeholder: 'e.g. Samsung, LG, Sony', required: true },
          { name: 'Model', type: 'text', placeholder: 'e.g. QN90C, C3 OLED', required: true },
          { name: 'Screen Size (inches)', type: 'text', placeholder: 'e.g. 55", 65"', required: true }
      ],
      cameras: [
          { name: 'Brand', type: 'select', options: ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Panasonic', 'GoPro', 'Other'], required: true },
          { name: 'Type', type: 'select', options: ['DSLR', 'Mirrorless', 'Point & Shoot', 'Action Camera', 'Video Camera'], required: true },
          { name: 'Model', type: 'text', placeholder: 'e.g. EOS R6, Alpha a7 IV', required: true },
          { name: 'Condition', type: 'select', options: ['New', 'Used', 'Refurbished'], required: true }
      ],
      audio: [
          { name: 'Brand', type: 'text', placeholder: 'e.g. JBL, Sony, Bose, Apple', required: true },
          { name: 'Type', type: 'select', options: ['Headphones', 'Earbuds', 'Speakers', 'Soundbar', 'Home Theater'], required: true },
          { name: 'Model', type: 'text', placeholder: 'e.g. WH-1000XM5, AirPods Pro', required: true },
          { name: 'Condition', type: 'select', options: ['New', 'Used'], required: true }
      ]
  },
  fashion: {
      clothing: [
          { name: 'Brand', type: 'text', placeholder: 'e.g. Nike, Zara, Dagu', required: true },
          { name: 'Type', type: 'text', placeholder: 'e.g. T-shirt, Jacket', required: true },
          { name: 'Gender', type: 'select', options: ['Men', 'Women', 'Unisex'], required: true },
          { name: 'Color', type: 'text', placeholder: 'e.g. Black, White', required: true },
          { name: 'Condition', type: 'select', options: ['New with tags', 'New without tags', 'Gently used'], required: true }
      ],
      shoes: [
          { name: 'Brand', type: 'text', placeholder: 'e.g. Nike, Adidas, Jordan', required: true },
          { name: 'Type', type: 'text', placeholder: 'e.g. Sneakers, Boots, Loafers', required: true },
          { name: 'Gender', type: 'select', options: ['Men', 'Women', 'Unisex'], required: true },
          { name: 'Size', type: 'text', placeholder: 'e.g. 40, 42, 45', required: true },
          { name: 'Color', type: 'text', placeholder: 'e.g. Triple Black, White/Red', required: true },
          { name: 'Condition', type: 'select', options: ['New in Box', 'New without Box', 'Gently Used'], required: true }
      ],
      bags: [
          { name: 'Brand', type: 'text', placeholder: 'e.g. Gucci, Coach, Local Craft', required: true },
          { name: 'Type', type: 'select', options: ['Handbag', 'Backpack', 'Wallet', 'Travel Bag'], required: true },
          { name: 'Material', type: 'text', placeholder: 'e.g. Leather, Canvas', required: true },
          { name: 'Condition', type: 'select', options: ['New', 'Used'], required: true }
      ],
      jewelry: [
          { name: 'Type', type: 'select', options: ['Necklace', 'Ring', 'Bracelet', 'Earrings', 'Watch'], required: true },
          { name: 'Material', type: 'select', options: ['Gold', 'Silver', 'Diamond', 'Artificial', 'Traditional'], required: true },
          { name: 'Condition', type: 'select', options: ['New', 'Used'], required: true }
      ]
  },
  vehicles: {
      cars: [
          { name: 'Make/Brand', type: 'text', placeholder: 'e.g. Toyota, Hyundai', required: true },
          { name: 'Model', type: 'text', placeholder: 'e.g. Corolla, Tucson', required: true },
          { name: 'Year of Manufacture', type: 'number', placeholder: 'e.g. 2022', required: true },
          { name: 'Color', type: 'text', placeholder: 'e.g. Silver, Black', required: true },
          { name: 'Condition', type: 'select', options: ['Brand New', 'Used Ethiopia', 'Used Foreign'], required: true },
          { name: 'Transmission', type: 'select', options: ['Automatic', 'Manual'], required: true },
          // Technical
          { name: 'Trim', type: 'text', placeholder: 'e.g. LE, XLE, SE', required: false },
          { name: 'Interior Color', type: 'text', placeholder: 'e.g. Beige, Black', required: false },
          { name: 'VIN/Chassis Number', type: 'text', placeholder: '17-character ID', required: false },
          { name: 'Body', type: 'select', options: ['Sedan', 'SUV', 'Hatchback', 'Pickup', 'Minivan', 'Truck', 'Coupe'], required: false },
          { name: 'Fuel', type: 'select', options: ['Petrol', 'Diesel', 'Hybrid', 'Electric'], required: false },
          { name: 'Drivetrain', type: 'select', options: ['FWD', 'AWD', '4WD', 'RWD'], required: false },
          { name: 'Seats', type: 'number', required: false },
          { name: 'Number of Cylinders', type: 'number', required: false },
          { name: 'Engine Size (cc)', type: 'number', required: false },
          { name: 'Horse Power (hp)', type: 'number', required: false },
          { name: 'Key Features', type: 'text', placeholder: 'e.g. Sunroof, Rear Camera', required: false }
      ],
      motors: [
          { name: 'Make/Brand', type: 'text', placeholder: 'e.g. Bajaj, TVS, Honda', required: true },
          { name: 'Model', type: 'text', placeholder: 'e.g. Boxer 150, Pulsar', required: true },
          { name: 'Year of Manufacture', type: 'number', placeholder: 'e.g. 2024', required: true },
          { name: 'Color', type: 'text', placeholder: 'e.g. Blue, Red, Black', required: true },
          { name: 'Condition', type: 'select', options: ['Brand New', 'Local Used', 'Foreign Used'], required: true },
          { name: 'Transmission', type: 'select', options: ['Manual', 'Automatic'], required: true },
          // Technical
          { name: 'Type', type: 'select', options: ['Standard', 'Sport', 'Scooter', 'Off-road', 'Three-Wheeler'], required: false },
          { name: 'Engine Size (cc)', type: 'text', placeholder: 'e.g. 150cc, 200cc', required: false },
          { name: 'Fuel', type: 'select', options: ['Petrol', 'Electric'], required: false },
          { name: 'Mileage (km)', type: 'number', required: false },
          { name: 'Engine Type', type: 'select', options: ['4-Stroke', '2-Stroke'], required: false }
      ]
  }
};

let DB = {
  listings: [],
  users: [],
  reports: [],
  wishlist: []
};

// Initialize DB from LocalStorage if available
function initDB() {
  localStorage.removeItem('bubu_listings');
  DB.listings = [];
  const savedWishlist = localStorage.getItem('bubu_wishlist');
  DB.wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
  const savedUsers = localStorage.getItem('bubu_users');
  DB.users = savedUsers ? JSON.parse(savedUsers) : [];
}

function saveWishlist() {
  localStorage.setItem('bubu_wishlist', JSON.stringify(DB.wishlist));
}


function saveListings() {
  localStorage.setItem('bubu_listings', JSON.stringify(DB.listings));
}

/* ============================================================
   APP STATE
============================================================ */
const state = {
  currentPage: 'home',
  history: [],
  currentListing: null,
  searchQuery: '',
  searchFilters: { category: '', condition: '', priceMin: '', priceMax: '', brand: '', bodyType: '', storage: '', ram: '', priceRange: '', subCategory: '' },
  sortMode: { featured: 'newest', recent: 'newest', search: 'newest' },
  currentUser: null, // Starts as null for mandatory login
  deleteTarget: null,
  typingTimeout: null,
};

/* ============================================================
   NAVIGATION
============================================================ */
function goBack() {
  if (state.history && state.history.length > 1) {
    state.history.pop(); // remove current
    const prev = state.history.pop(); // get previous
    navigate(prev.page, prev.data, true);
  } else {
    navigate('home');
  }
}

function navigate(page, data, isBack = false) {
  if (page === 'favorites') {
    if (!state.currentUser) {
      openModal('authModal');
      return;
    }
    navigate('profile');
    setTimeout(() => {
      const tabs = document.querySelectorAll('.profile-tab');
      tabs.forEach(t => {
        if (t.textContent.toLowerCase().includes('saved') || t.textContent.toLowerCase().includes('favourite')) {
          t.click();
        }
      });
    }, 100);
    return;
  }

  const protectedPages = ['post', 'profile', 'favorites'];
  if (protectedPages.includes(page) && !state.currentUser) {
    openModal('authModal');
    return;
  }

  if (!isBack) {
    if (!state.history) state.history = [];
    state.history.push({ page, data });
  }

  // Toggle Global Back Button
  const backBtn = document.getElementById('globalBackButtonContainer');
  if (backBtn) {
    if (page === 'home' || (state.history && state.history.length <= 1)) {
      backBtn.style.display = 'none';
    } else {
      backBtn.style.display = 'block';
    }
  }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('page-' + page);
  if (el) {
    el.classList.add('active');
    state.currentPage = page;
    window.scrollTo(0, 0);
  }
  if (page === 'home') renderHome();
  if (page === 'search') renderSearchPage(data);
  if (page === 'detail' && data) renderDetailPage(data);
  if (page === 'post') renderPostPage();
  if (page === 'profile') renderProfilePage();
  if (page === 'admin') renderAdminPage();
}

/* ============================================================
   RENDER: HOME
============================================================ */
async function renderHome() {
  renderCategories();
  
  // Start with local seed data
  let allListings = [...DB.listings];

  // Try to merge with cloud data if connected
  if (typeof sb !== 'undefined') {
    try {
      const data = await fetchAdsFromSupabase();
      if (data) {
        allListings = data.map(l => ({
          id: String(l.id), // CRITICAL: Stringify to prevent BIGINT precision loss
          title: l.title,
          price: l.price,
          category: l.category,
          condition: l.condition,
          description: l.description,
          seller: l.seller_name,
          phone: l.seller_phone,
          telegram: l.seller_telegram,
          photos: l.photos,
          specs: l.specs || {},
          featured: l.featured,
          time: new Date(l.created_at),
          views: l.views,
          wishlist: DB.wishlist.includes(String(l.id))
        }));
        DB.listings = allListings;
        globalUserAds = allListings; // CRITICAL: This allows the homepage to see the ads
      }
    } catch (e) {
      console.warn("Cloud connection error, using local listings only.", e);
    }
  }

  const featured = getSorted(allListings.filter(l => l.featured), state.sortMode.featured);
  const recent = getSorted(allListings, state.sortMode.recent);

  const fGrid = document.getElementById('featuredGrid');
  const rGrid = document.getElementById('recentGrid');
  const fCount = document.getElementById('featuredCount');
  const rCount = document.getElementById('recentCount');

  if (fGrid) fGrid.innerHTML = featured.map(l => renderListingCard(l)).join('');
  if (rGrid) rGrid.innerHTML = recent.slice(0, 12).map(l => renderListingCard(l)).join('');
  if (fCount) fCount.textContent = `${featured.length} featured ads`;
  if (rCount) rCount.textContent = `${recent.length} listings`;
  
  renderPagination('homePagination', recent.length);

  // Check for deep link on first load
  if (!state.initialLoadDone) {
    state.initialLoadDone = true;
    const urlParams = new URLSearchParams(window.location.search);
    const listingId = urlParams.get('listing');
    if (listingId) {
      setTimeout(() => openListing(listingId), 500);
    }
  }
}

function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map(c => `
    <div class="cat-card" onclick="filterByCategory('${c.id}')">
      <div class="cat-icon">${c.icon}</div>
      <div class="cat-name">${c.name}</div>
      <div class="cat-count">${c.count.toLocaleString()} ads</div>
    </div>
  `).join('');
}


function getSpecsHtml(listing) {
  let specsHtml = '';
  if (listing.specs) {
    let items = [];
    let sp = {};
    try { 
      sp = typeof listing.specs === 'string' ? JSON.parse(listing.specs) : listing.specs; 
    } catch(e) {
      sp = listing.specs || {};
    }
    
    // Categorized quick specs
    if (listing.category === 'phones') {
      const brand = sp['Brand'] || sp['brand'];
      const ram = sp['RAM'] || sp['ram'];
      const storage = sp['Storage Capacity'] || sp['storage'];
      
      if (brand) items.push(brand);
      if (ram) items.push(ram.toUpperCase().includes('GB') ? ram : ram + 'GB');
      if (storage) items.push(storage);
    } else if (listing.category === 'vehicles') {
      const make = sp['Make/Brand'] || sp['make'];
      const year = sp['Year of Manufacture'] || sp['year'];
      if (make) items.push(make);
      if (year) items.push(year);
    } else {
      const brand = sp['Brand'] || sp['brand'];
      if (brand) items.push(brand);
    }
    
    if (items.length > 0) {
      specsHtml = `<div style="display:flex; gap:6px; margin-bottom:12px; flex-wrap:wrap;">
        ${items.map(item => `
          <span style="background:var(--primary-light); color:var(--primary); font-size:11px; padding:4px 10px; border-radius:8px; font-weight:700; border:1px solid rgba(99,102,241,0.2); letter-spacing:0.2px;">
            ${item}
          </span>
        `).join('')}
      </div>`;
    }
  }
  return specsHtml;
}

function renderListingCard(listing) {
  const bookmarkIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;
  const bookmarkFilled = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;
  
  const photos = Array.isArray(listing.photos) ? listing.photos : [listing.photos || ''];
  const mainImage = (photos[0] && photos[0].length > 5) ? photos[0] : 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22><rect fill=%22%23f0f1f5%22 width=%22400%22 height=%22300%22/><text x=%22200%22 y=%22150%22 text-anchor=%22middle%22 fill=%22%239ca3af%22 font-size=%2240%22>📷</text></svg>';

  // Wrap ID in quotes to prevent int8 clipping in JS
  const safeId = `'${listing.id}'`;

  return `
    <div class="listing-card" onclick="openListing(${safeId})">
      <div class="card-img-wrap">
        <img class="card-img" src="${mainImage}" alt="${listing.title}" loading="lazy" onerror="this.src='/images/listing-phone.jpg'" />
        <div class="card-badges">
          ${listing.featured ? '<span class="badge-featured">⭐ Featured</span>' : ''}
          <span class="badge-condition ${listing.condition === 'new' ? 'badge-new' : 'badge-used'}">${listing.condition === 'new' ? 'New' : 'Used'}</span>
        </div>
        <button class="wishlist-btn ${listing.wishlist ? 'saved' : ''}" onclick="toggleWishlist(event, ${safeId})" title="Save">${listing.wishlist ? bookmarkFilled : bookmarkIcon}</button>
      </div>
      <div class="card-body">
        <div class="card-title" title="${listing.title}">${listing.title}</div>
        ${getSpecsHtml(listing)}
        <div class="card-footer" style="margin-top:auto; padding-top:12px; border-top:1px solid var(--border-light)">
          <div class="card-price" style="margin-bottom:0">${formatPrice(listing.price)}</div>
          <button class="btn-view-detail" onclick="event.stopPropagation(); openListing(${safeId})">Details</button>
        </div>
      </div>
    </div>
  `;
}

/* ============================================================
   RENDER: SEARCH PAGE
============================================================ */
function renderSearchPage(data) {
  if (data) {
    state.searchQuery = data.query || '';
    if (data.category) state.searchFilters.category = data.category;
  }
  renderFilterPanel();
  applyFilters();
}

/* ============================================================
   DYNAMIC FILTER PANEL
============================================================ */
function renderFilterPanel() {
  const panel = document.getElementById('filterPanelContent');
  if (!panel) return;
  const cat = state.searchFilters.category;
  const isElecSub = ELECTRONICS_SUBS.some(s => s.id === cat);
  const effectiveCat = isElecSub ? 'electronics' : cat;

  let html = `
    <div class="filter-panel-header">
      <span class="filter-panel-title">Filters</span>
      <button onclick="toggleMobileFilter()" id="filterClose" style="display:none;font-size:20px;line-height:1;color:var(--text-muted)">✕</button>
    </div>
    <div style="font-size:12px;color:var(--text-muted);margin-bottom:12px">Refine your search</div>
    <hr class="filter-divider">
  `;

  // Category chips removed as per user request

  // ── Category-specific sections ──────────────────────────────
  if (effectiveCat === 'phones') {
    const f = CATEGORY_FILTERS.phones;
    html += fcSubCat('Sub-Category', PHONES_SUBS, state.searchFilters.subCategory);
    html += fcChips('Brand', f.brands, 'brand');
    html += fcPriceRadio(f.priceRanges);
    html += fcChips('Storage', f.storage, 'storage');
    html += fcChips('RAM', f.ram, 'ram');
    html += fcCheckbox('Condition', f.conditions, 'condition');
  } else if (effectiveCat === 'electronics') {
    const f = CATEGORY_FILTERS.electronics;
    html += fcSubCat('Sub-Category', ELECTRONICS_SUBS, isElecSub ? cat : state.searchFilters.subCategory);
    html += fcChips('Brand', f.brands, 'brand');
    html += fcPriceInput();
    html += fcCheckbox('Condition', f.conditions, 'condition');
  } else if (effectiveCat === 'vehicles') {
    const f = CATEGORY_FILTERS.vehicles;
    html += fcChips('Brand', f.brands, 'brand');
    html += fcChips('Body Type', f.bodyTypes, 'bodyType');
    html += fcCheckbox('Condition', ['New', 'Used'], 'condition');
  } else if (effectiveCat === 'fashion') {
    const f = CATEGORY_FILTERS.fashion;
    html += fcSubCat('Sub-Category', f.subCats, state.searchFilters.subCategory);
    html += fcChips('Brand', f.brands, 'brand');
    html += fcCheckbox('Condition', f.conditions, 'condition');
    html += fcPriceInput();
  } else {
    // General
    html += fcCheckbox('Condition', ['New', 'Used'], 'condition');
    html += fcPriceInput();
  }

  html += `
    <button class="btn-apply-filter" onclick="applyFilters()">Apply Filters</button>
    <button class="btn-clear-filter" onclick="clearFilters()">Clear All</button>
  `;
  panel.innerHTML = html;
}

// ── Filter section helpers ──────────────────────────────────
function fcChips(label, items, key) {
  return `<div class="filter-section">
    <div class="filter-label">${label}</div>
    <div class="filter-chip-row">
      ${items.map(v => `<button class="filter-chip ${state.searchFilters[key]===v?'active':''}" onclick="toggleChipFilter('${key}','${v}')">${v}</button>`).join('')}
    </div></div><hr class="filter-divider">`;
}
function fcSubCat(label, items, activeId) {
  return `<div class="filter-section">
    <div class="filter-label">${label}</div>
    <div class="filter-sub-list">
      ${items.map(s => `<div class="filter-sub-item ${activeId===s.id?'active':''}" onclick="onSubCatFilter('${s.id}')">
        <span class="filter-sub-icon">${s.icon}</span><span>${s.name}</span></div>`).join('')}
    </div></div><hr class="filter-divider">`;
}
function fcPriceRadio(ranges) {
  return `<div class="filter-section">
    <div class="filter-label">Price Range</div>
    <div class="filter-price-list">
      ${ranges.map(r => `<label class="filter-price-opt">
        <input type="radio" name="priceRange" value="${r}" ${state.searchFilters.priceRange===r?'checked':''} onchange="state.searchFilters.priceRange=this.value;applyFilters()">${r}</label>`).join('')}
    </div></div><hr class="filter-divider">`;
}
function fcPriceInput() {
  return `<div class="filter-section">
    <div class="filter-label">Price Range (ETB)</div>
    <div class="price-inputs" style="margin-top:8px">
      <input type="number" placeholder="Min" class="form-input" style="padding:8px 10px;font-size:13px" value="${state.searchFilters.priceMin}" oninput="state.searchFilters.priceMin=this.value" />
      <input type="number" placeholder="Max" class="form-input" style="padding:8px 10px;font-size:13px" value="${state.searchFilters.priceMax}" oninput="state.searchFilters.priceMax=this.value" />
    </div></div><hr class="filter-divider">`;
}
function fcCheckbox(label, items, key) {
  return `<div class="filter-section">
    <div class="filter-label">${label}</div>
    <div class="filter-check-list">
      ${items.map(v => `<label class="filter-check-opt">
        <input type="checkbox" ${state.searchFilters[key]===v?'checked':''} onchange="state.searchFilters['${key}']=this.checked?'${v}':'';applyFilters()">${v}</label>`).join('')}
    </div></div><hr class="filter-divider">`;
}

// ── Filter navigation ───────────────────────────────────────
function onCatFilter(catId) {
  state.searchFilters = { ...state.searchFilters, category: catId, brand: '', bodyType: '', storage: '', ram: '', priceRange: '', subCategory: '', condition: '' };
  renderFilterPanel();
  applyFilters();
}
function onSubCatFilter(subId) {
  const isElecSub = ELECTRONICS_SUBS.some(s => s.id === subId);
  if (isElecSub) {
    state.searchFilters.category = state.searchFilters.category === subId ? 'electronics' : subId;
    state.searchFilters.subCategory = '';
  } else {
    state.searchFilters.subCategory = state.searchFilters.subCategory === subId ? '' : subId;
  }
  renderFilterPanel();
  applyFilters();
}
function toggleChipFilter(key, value) {
  state.searchFilters[key] = state.searchFilters[key] === value ? '' : value;
  renderFilterPanel();
  applyFilters();
}

function applyFilters() {
  let results = [...DB.listings];
  const f = state.searchFilters;
  const elecSubs = ELECTRONICS_SUBS.map(s => s.id);

  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    results = results.filter(l => l.title.toLowerCase().includes(q) || l.desc.toLowerCase().includes(q));
  }

  // Category
  if (f.category) {
    if (f.category === 'electronics') {
      results = results.filter(l => elecSubs.includes(l.category));
    } else if (elecSubs.includes(f.category)) {
      results = results.filter(l => l.category === f.category);
    } else {
      results = results.filter(l => l.category === f.category);
    }
  }

  // Sub-category (fashion)
  if (f.subCategory) results = results.filter(l => l.subCategory === f.subCategory);

  // Condition (normalize)
  if (f.condition) {
    const cLow = f.condition.toLowerCase();
    results = results.filter(l => l.condition.toLowerCase() === cLow ||
      (cLow === 'brand new' && l.condition === 'new') ||
      (cLow === 'foreign used' && l.condition === 'used') ||
      (cLow === 'local used' && l.condition === 'used') ||
      (cLow === 'like new' && l.condition === 'new'));
  }

  // Price inputs
  if (f.priceMin) results = results.filter(l => l.price >= Number(f.priceMin));
  if (f.priceMax) results = results.filter(l => l.price <= Number(f.priceMax));

  // Price range presets (phones)
  if (f.priceRange) {
    const map = { 'Under 10k': [0,10000], '10k – 30k': [10000,30000], '30k – 60k': [30000,60000], '60k+': [60000,Infinity] };
    const [mn, mx] = map[f.priceRange] || [0, Infinity];
    results = results.filter(l => l.price >= mn && l.price <= mx);
  }

  // Brand (match listing brand field or title)
  if (f.brand) {
    const b = f.brand.toLowerCase();
    results = results.filter(l => (l.brand||'').toLowerCase() === b || l.title.toLowerCase().includes(b));
  }

  // Body type (vehicles)
  if (f.bodyType) {
    const bt = f.bodyType.toLowerCase();
    results = results.filter(l => (l.bodyType||'').toLowerCase() === bt || l.desc.toLowerCase().includes(bt));
  }

  // Storage / RAM (phones — match title/desc)
  if (f.storage) results = results.filter(l => l.title.toLowerCase().includes(f.storage.toLowerCase()) || l.desc.toLowerCase().includes(f.storage.toLowerCase()));
  if (f.ram)     results = results.filter(l => l.title.toLowerCase().includes(f.ram.toLowerCase()) || l.desc.toLowerCase().includes(f.ram.toLowerCase()));

  results = getSorted(results, state.sortMode.search);

  const grid    = document.getElementById('searchGrid');
  const count   = document.getElementById('searchCount');
  const heading = document.getElementById('searchHeading');
  if (!grid) return;

  const elecSub = ELECTRONICS_SUBS.find(s => s.id === f.category);
  const catName = elecSub ? elecSub.name : (CATEGORIES.find(c => c.id === f.category)?.name || null);
  count.textContent   = `${results.length} listing${results.length !== 1 ? 's' : ''} found`;
  heading.textContent = state.searchQuery ? `Results for "${state.searchQuery}"` : (catName ? catName + ' Listings' : 'All Listings');

  grid.innerHTML = results.length === 0
    ? `<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">🔍</div><h3>No listings found</h3><p>Try different keywords or filters</p></div>`
    : results.map(l => renderListingCard(l)).join('');

  renderPagination('searchPagination', results.length);
  renderActiveFilters();
}

function renderActiveFilters() {
  const container = document.getElementById('activeFilters');
  if (!container) return;
  const chips = [];
  if (state.searchQuery) chips.push({ label: `"${state.searchQuery}"`, key: 'query' });
  if (state.searchFilters.category) chips.push({ label: CATEGORIES.find(c => c.id === state.searchFilters.category)?.name, key: 'category' });
  if (state.searchFilters.condition) chips.push({ label: state.searchFilters.condition === 'new' ? 'New' : 'Used', key: 'condition' });
  if (state.searchFilters.priceMin) chips.push({ label: `Min ${formatPrice(state.searchFilters.priceMin)}`, key: 'priceMin' });
  if (state.searchFilters.priceMax) chips.push({ label: `Max ${formatPrice(state.searchFilters.priceMax)}`, key: 'priceMax' });

  container.innerHTML = chips.map(c => `
    <span class="chip">${c.label} <span class="chip-remove" onclick="removeFilter('${c.key}')">×</span></span>
  `).join('');
}

function removeFilter(key) {
  if (key === 'query') state.searchQuery = '';
  else state.searchFilters[key] = '';
  applyFilters();
}

function clearFilters() {
  state.searchQuery = '';
  state.searchFilters = { category: '', condition: '', priceMin: '', priceMax: '', brand: '', bodyType: '', storage: '', ram: '', priceRange: '', subCategory: '' };
  renderFilterPanel();
  applyFilters();
}

function filterByCategory(catId) {
  state.searchFilters.category = catId;
  navigate('search', { category: catId });
}

async function openListing(id) {
  showToast('🔍 Opening product...', 'info');
  let listing = DB.listings.find(l => String(l.id) === String(id));

  if (listing) {
    if (typeof listing.views === 'number') listing.views++;
    navigate('detail', listing);
  } else {
    showToast('Listing not found', 'error');
  }
}


/* ============================================================
   RENDER: DETAIL PAGE
============================================================ */


function renderDetailPage(listing) {
  state.currentListing = listing;
  state.currentPhotoIndex = 0;
  
  const photos = Array.isArray(listing.photos) ? listing.photos : [listing.photos || ''];
  const mainPhoto = (photos[0] && photos[0].length > 5) ? photos[0] : 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22><rect fill=%22%23f0f1f5%22 width=%22400%22 height=%22300%22/><text x=%22200%22 y=%22150%22 text-anchor=%22middle%22 fill=%22%239ca3af%22 font-size=%2240%22>📷</text></svg>';

  const cat = CATEGORIES.find(c => c.id === listing.category) || { name: listing.category, icon: '📦' };

  document.getElementById('detailBreadcrumb').innerHTML = `
    <a href="#" onclick="navigate('home');return false">Home</a>
    <span>›</span>
    <a href="#" onclick="navigate('search',{category:'${listing.category}'});return false">${cat.name}</a>
    <span>›</span>
    <span style="color:var(--text-primary)">${listing.title.slice(0, 30)}…</span>
  `;

  document.getElementById('galleryMainImg').src = mainPhoto;
  document.getElementById('galleryCounter').textContent = `1 / ${photos.length}`;
  
  // Thumbnails
  document.getElementById('galleryThumbs').innerHTML = photos.map((img, i) => `
    <div class="gallery-thumb ${i === 0 ? 'active' : ''}" data-index="${i}" onclick="switchGalleryImg('${img}', this, ${i})">
      <img src="${img}" alt="" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22><rect fill=%22%23f0f1f5%22 width=%22400%22 height=%22300%22/><text x=%22200%22 y=%22150%22 text-anchor=%22middle%22 fill=%22%239ca3af%22 font-size=%2240%22>📷</text></svg>'" />
    </div>
  `).join('');

  document.getElementById('detailTitle').textContent = listing.title;
  document.getElementById('detailPrice').textContent = formatPrice(listing.price);
  document.getElementById('detailTags').innerHTML = `
    <span class="tag">${cat.icon} ${cat.name}</span>
    <span class="tag" style="background:${listing.condition === 'new' ? '#d1fae5' : '#fef3c7'}; color:${listing.condition === 'new' ? '#065f46' : '#92400e'}">${listing.condition === 'new' ? '✨ Brand New' : '🔄 Used'}</span>
  `;

  // Specs Cards
  const specs = listing.specs || {};
  let specsHtml = `
    <div class="specs-container">
      <div class="specs-section">
        <div class="specs-section-title">General Information</div>
        <div class="specs-grid">
          <div class="spec-item">
            <div class="spec-label">Posted</div>
            <div class="spec-value">${getTimeAgo(listing.time)}</div>
          </div>
          <div class="spec-item">
            <div class="spec-label">Views</div>
            <div class="spec-value">${(listing.views || 0).toLocaleString()}</div>
          </div>
          <div class="spec-item">
            <div class="spec-label">Condition</div>
            <div class="spec-value" style="text-transform:capitalize">${listing.condition}</div>
          </div>
        </div>
      </div>
  `;

  if (Object.keys(specs).length > 0) {
    specsHtml += `
      <div class="specs-section" style="margin-top:8px">
        <div class="specs-section-title">Details & Specifications</div>
        <div class="specs-grid">
    `;
    for (const [key, val] of Object.entries(specs)) {
      specsHtml += `
        <div class="spec-item">
          <div class="spec-label">${key}</div>
          <div class="spec-value">${val}</div>
        </div>
      `;
    }
    specsHtml += '</div></div>';
  }
  specsHtml += '</div>';
  
  document.getElementById('detailSpecsContainer').innerHTML = specsHtml;
  document.getElementById('detailDesc').textContent = listing.description || 'No description provided.';
  document.getElementById('sellerCard').innerHTML = `
    <div class="seller-header">
      <div class="seller-avatar">${listing.seller.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
      <div>
        <div class="seller-name">${listing.seller}</div>
        <div class="seller-joined">Member since 2023</div>
        <div class="seller-rating"><span class="stars">★★★★★</span> <span style="color:var(--text-secondary)">4.8 · 24 reviews</span></div>
      </div>
    </div>
    </div>
    <a href="tel:${listing.phone}" class="btn-call">
      📞 Call Seller — ${listing.phone}
    </a>
    ${listing.telegram ? `
    <a href="https://t.me/${listing.telegram.startsWith('@') ? listing.telegram.substring(1) : listing.telegram}" target="_blank" class="btn-call" style="background:#0088cc; border-color:#0088cc; margin-top:8px">
      ✈️ Chat on Telegram — ${listing.telegram}
    </a>` : ''}
    
    <div style="display:flex; gap:8px; margin-top:16px;">
      <button onclick="shareListing('${listing.id}')" style="flex:1; padding:10px; background:var(--bg); border:1.5px solid var(--border); border-radius:var(--radius-sm); font-weight:600; color:var(--text-primary); cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; transition:border 0.2s;" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='var(--border)'">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
        Share
      </button>
      <button onclick="downloadListingInfo('${listing.id}')" style="flex:1; padding:10px; background:var(--bg); border:1.5px solid var(--border); border-radius:var(--radius-sm); font-weight:600; color:var(--text-primary); cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; transition:border 0.2s;" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='var(--border)'">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        Download
      </button>
    </div>

    <button class="btn-report" onclick="openModal('reportModal')" style="margin-top:8px">
      🚩 Report this listing
    </button>
  `;

  const similar = DB.listings.filter(l => l.id !== listing.id && l.category === listing.category).slice(0, 4);
  const simGrid = document.getElementById('similarGrid');
  simGrid.innerHTML = similar.length > 0 ? similar.map(l => renderListingCard(l)).join('') : '<p class="text-muted" style="grid-column:1/-1;padding:16px">No similar listings found.</p>';
}

function shareListing(id) {
  const url = new URL(window.location.href);
  url.searchParams.set('listing', id);
  navigator.clipboard.writeText(url.toString()).then(() => {
    showToast('🔗 Link copied to clipboard!', 'success');
  }).catch(err => {
    console.error("Copy failed", err);
    showToast('Failed to copy link', 'error');
  });
}

function downloadListingInfo(id) {
  const listing = DB.listings.find(l => String(l.id) === String(id));
  if (!listing) return;

  // 1. Create text content
  let text = `BUBU GEBEYA - Product Details\n`;
  text += `==============================\n\n`;
  text += `Title: ${listing.title}\n`;
  text += `Price: ${formatPrice(listing.price)}\n`;
  text += `Condition: ${listing.condition}\n`;
  text += `Category: ${listing.category}\n\n`;
  
  if (listing.specs && Object.keys(listing.specs).length > 0) {
    text += `Specifications:\n`;
    for (const [k, v] of Object.entries(listing.specs)) {
      text += `- ${k}: ${v}\n`;
    }
    text += `\n`;
  }
  
  text += `Description:\n${listing.description}\n\n`;
  text += `Seller Contact:\n`;
  text += `Name: ${listing.seller}\n`;
  text += `Phone: ${listing.phone}\n`;
  if (listing.telegram) text += `Telegram: ${listing.telegram}\n`;
  
  text += `\nDirect Link:\n`;
  const url = new URL(window.location.href);
  url.searchParams.set('listing', id);
  text += url.toString() + `\n`;

  // 2. Download text file
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `Product_${listing.id}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // 3. Download main photo (open in new tab for cross-origin reasons)
  const photoUrl = Array.isArray(listing.photos) ? listing.photos[0] : listing.photos;
  if (photoUrl && photoUrl.startsWith('http')) {
    setTimeout(() => {
      const imgA = document.createElement('a');
      imgA.href = photoUrl;
      imgA.download = `Product_${listing.id}_Image.jpg`;
      imgA.target = '_blank';
      document.body.appendChild(imgA);
      imgA.click();
      document.body.removeChild(imgA);
    }, 500);
  }

  showToast('📥 Downloading product info...', 'info');
}

function switchGalleryImg(src, el, index) {
  state.currentPhotoIndex = index;
  const mainImg = document.getElementById('galleryMainImg');
  if (mainImg) {
    mainImg.style.opacity = '0.3';
    setTimeout(() => {
      mainImg.src = src;
      mainImg.style.opacity = '1';
    }, 150);
  }

  const photos = Array.isArray(state.currentListing.photos) ? state.currentListing.photos : [state.currentListing.photos];
  const counter = document.getElementById('galleryCounter');
  if (counter) counter.textContent = `${index + 1} / ${photos.length}`;

  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
}

function nextGalleryPhoto(e) {
  if (e) e.stopPropagation();
  if (!state.currentListing) return;
  const photos = Array.isArray(state.currentListing.photos) ? state.currentListing.photos : [state.currentListing.photos];
  if (photos.length <= 1) return;

  const nextIdx = (state.currentPhotoIndex + 1) % photos.length;
  const thumbs = document.querySelectorAll('.gallery-thumb');
  switchGalleryImg(photos[nextIdx], thumbs[nextIdx], nextIdx);
}

function prevGalleryPhoto(e) {
  if (e) e.stopPropagation();
  if (!state.currentListing) return;
  const photos = Array.isArray(state.currentListing.photos) ? state.currentListing.photos : [state.currentListing.photos];
  if (photos.length <= 1) return;

  const prevIdx = (state.currentPhotoIndex - 1 + photos.length) % photos.length;
  const thumbs = document.querySelectorAll('.gallery-thumb');
  switchGalleryImg(photos[prevIdx], thumbs[prevIdx], prevIdx);
}


/* ============================================================
   RENDER: POST AD
=========================================================== */
function renderPostPage() {
  state.editingId = null; // Clear edit mode when opening fresh
  const submitBtn = document.querySelector('#postStep4 .btn-submit-ad');
  if (submitBtn) submitBtn.textContent = '🚀 Post My Ad';
  
  const catSel = document.getElementById('postCategory');
  if (catSel && catSel.options.length === 1) {
    CATEGORIES.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = `${c.icon} ${c.name}`;
      catSel.appendChild(opt);
    });
  }

  // Pre-fill from profile
  if (state.currentUser) {
    const u = state.currentUser;
    if (document.getElementById('postSellerName')) document.getElementById('postSellerName').value = u.name || '';
    if (document.getElementById('postPhone')) document.getElementById('postPhone').value = u.phone || '';
    if (document.getElementById('postTelegram')) document.getElementById('postTelegram').value = u.telegram || '';
  }

  goToStep(1);
}

function handleCategoryChange() {
  const cat = document.getElementById('postCategory').value;
  const subGroup = document.getElementById('subCategoryGroup');
  const subSel = document.getElementById('postSubCategory');
  
  // Show/Hide subcategories
  let subs = [];
  if (cat === 'electronics') subs = ELECTRONICS_SUBS;
  if (cat === 'phones') subs = PHONES_SUBS;
  if (cat === 'fashion') subs = CATEGORY_FILTERS.fashion.subCats;
  if (cat === 'vehicles') subs = [ {id:'cars', name:'Cars', icon:'🚗'}, {id:'motors', name:'Motors/Motorcycles', icon:'🏍️'} ];

  if (subs.length > 0) {
    subGroup.style.display = 'block';
    subSel.innerHTML = '<option value="">Select sub-category</option>' + 
      subs.map(s => `<option value="${s.id}">${s.icon} ${s.name}</option>`).join('');
    subSel.onchange = renderSpecFields; // Update specs if sub-cat changes
  } else {
    subGroup.style.display = 'none';
    subSel.innerHTML = '';
    subSel.onchange = null;
  }
  
  // Call renderSpecFields immediately to show category-level specs (if any)
  renderSpecFields();
}

function renderSpecFields() {
  const cat = document.getElementById('postCategory').value;
  const sub = document.getElementById('postSubCategory').value;
  const container = document.getElementById('specsContainer');
  
  const fields = (CATEGORY_SPEC_FIELDS[cat] && CATEGORY_SPEC_FIELDS[cat][sub]) 
    ? CATEGORY_SPEC_FIELDS[cat][sub] 
    : null;

  if (!fields) {
    const subGroup = document.getElementById('subCategoryGroup');
    if (subGroup && subGroup.style.display !== 'none' && !sub) {
        container.innerHTML = `
          <div style="text-align:center; padding:20px; background:var(--bg); border-radius:12px; border:1.5px dashed var(--border)">
            <p style="font-size:14px; color:var(--text-secondary); margin-bottom:12px">⚠️ No sub-category selected.</p>
            <button type="button" onclick="goToStep(1)" style="padding:8px 16px; background:var(--primary); color:white; border:none; border-radius:8px; cursor:pointer; font-weight:600">Go Back & Select</button>
          </div>
        `;
    } else {
        container.innerHTML = '<p class="text-muted" style="font-size:13px">No extra details required for this category. Click continue.</p>';
    }
    return;
  }

  container.innerHTML = `<div class="specs-grid-post">${fields.map(f => `
    <div class="form-group">
      <label class="form-label">${f.name} ${f.required ? '<span>*</span>' : '(Optional)'}</label>
      ${f.type === 'select' 
        ? `<select class="form-select spec-input" data-name="${f.name}" ${f.required ? 'required' : ''}>
             <option value="">Select ${f.name}</option>
             ${f.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
           </select>`
        : `<input type="${f.type}" class="form-input spec-input" data-name="${f.name}" placeholder="${f.placeholder || ''}" ${f.required ? 'required' : ''} />`
      }
    </div>
  `).join('')}</div>`;
}

let currentStep = 1;
function goToStep(step) {
  // Step 2 was merged into Step 1, so indices are 1, 3, 4
  if (step === 3) {
    // Validate Step 1 (Info + Specs)
    const title = document.getElementById('postTitle').value.trim();
    const cat = document.getElementById('postCategory').value;
    const cond = document.getElementById('postCondition').value;
    const price = document.getElementById('postPrice').value;
    const desc = document.getElementById('postDesc').value.trim();

    const subGroup = document.getElementById('subCategoryGroup');
    const subSel = document.getElementById('postSubCategory');
    if (subGroup && subGroup.style.display !== 'none' && !subSel.value) {
       showToast('Please select a sub-category first', 'error');
       return;
    }

    if (!title || !cat || !cond || !price || !desc) {
       showToast('Please fill all required fields in Step 1', 'error');
       return;
    }

    // Check dynamic specs
    const specInputs = document.querySelectorAll('.spec-input');
    for (let input of specInputs) {
      if (input.hasAttribute('required') && !input.value) {
        showToast(`Please fill the required field: ${input.getAttribute('data-name')}`, 'error');
        return;
      }
    }
  }
  
  currentStep = step;
  [1,3,4].forEach(s => {
    const stepPage = document.getElementById(`postStep${s}`);
    if (stepPage) stepPage.classList.toggle('hidden', s !== step);
    
    // UI indicator mapping: 1->1, 3->2, 4->3
    let indicatorId = s;
    const stepIndicator = document.getElementById(`step${indicatorId}`);
    if (stepIndicator) {
      stepIndicator.classList.remove('active', 'done');
      if (s < step) stepIndicator.classList.add('done');
      if (s === step) stepIndicator.classList.add('active');
    }
  });
}

let postImages = []; // Stores the preview URLs
let postImageFiles = []; // Stores the actual File objects

async function handlePhotoUpload(event) {
  const files = Array.from(event.target.files);
  const sellerName = document.getElementById('postSellerName')?.value || state.currentUser?.name || 'BUBU GEBEYA';
  
  showToast('🛡️ Protecting photos with watermark...', 'info');

  for (const file of files) {
    if (postImageFiles.length >= 8) {
      showToast('Maximum 8 photos allowed', 'error');
      break;
    }
    
    try {
      // Apply watermark before storing
      const protectedFile = await applyWatermark(file, sellerName);
      postImageFiles.push(protectedFile);
      
      const previewUrl = URL.createObjectURL(protectedFile);
      postImages.push(previewUrl);
    } catch (err) {
      console.error("Watermark error:", err);
      // Fallback to original file if watermark fails
      postImageFiles.push(file);
      postImages.push(URL.createObjectURL(file));
    }
  }
  renderPhotoPreview();
}

/**
 * Client-side watermarking using Canvas
 */
async function applyWatermark(file, text) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // High-res processing
        let w = img.width;
        let h = img.height;
        const max = 2000;
        if (w > max || h > max) {
          if (w > h) { h *= max/w; w = max; }
          else { w *= max/h; h = max; }
        }

        canvas.width = w;
        canvas.height = h;
        
        // 1. Draw Image
        ctx.drawImage(img, 0, 0, w, h);
        
        // 2. Giant Diagonal Watermark (with bounds checking)
        const diag = Math.sqrt(w*w + h*h);
        const maxTextWidth = diag * 0.85; // 85% of diagonal
        let fontSize = Math.floor(diag / 8); 
        
        ctx.font = `900 ${fontSize}px 'Inter', sans-serif`;
        let metrics = ctx.measureText(text.toUpperCase());
        
        // Shrink font size if text is too long for the diagonal
        if (metrics.width > maxTextWidth) {
          fontSize = Math.floor(fontSize * (maxTextWidth / metrics.width));
          ctx.font = `900 ${fontSize}px 'Inter', sans-serif`;
        }

        ctx.save();
        ctx.translate(w / 2, h / 2);
        const angle = Math.atan2(h, w);
        ctx.rotate(-angle); 
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Slight dark stroke for visibility
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.lineWidth = Math.max(1, fontSize / 25);
        ctx.strokeText(text.toUpperCase(), 0, 0);
        ctx.fillText(text.toUpperCase(), 0, 0);
        
        ctx.restore();

        // 3. Branding
        ctx.font = `bold ${Math.floor(w / 40)}px 'Inter', sans-serif`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.textAlign = 'right';
        ctx.fillText('BUBU GEBEYA', w - 30, h - 30);

        canvas.toBlob((blob) => {
          resolve(new File([blob], file.name, { type: 'image/jpeg' }));
        }, 'image/jpeg', 0.9);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

async function uploadImages(files) {
  try {
    // This calls the improved function in supabase.js
    return await uploadPhotosToStorage(files);
  } catch (e) {
    console.error("❌ UPLOAD WRAPPER ERROR:", e);
    showToast("Photo upload failed. Check bucket name.", "error");
    return [];
  }
}

function renderPhotoPreview() {
  const grid = document.getElementById('photoPreviewGrid');
  grid.innerHTML = postImages.map((src, i) => `
    <div class="preview-item">
      <img src="${src}" alt="" />
      <div class="preview-remove" onclick="removePhoto(${i})">×</div>
    </div>
  `).join('');
}

function removePhoto(index) {
  postImages.splice(index, 1);
  postImageFiles.splice(index, 1);
  renderPhotoPreview();
}

async function submitListing(event) {
  if (event) event.preventDefault();
  
  const submitBtn = event.target.querySelector('button[type="submit"]') || document.querySelector('.btn-submit-ad');
  const originalText = submitBtn.innerHTML;

  // 1. Validation
  const title = document.getElementById('postTitle').value.trim();
  const cat = document.getElementById('postCategory').value;
  const cond = document.getElementById('postCondition').value;
  const description = document.getElementById('postDesc').value.trim();
  const price = document.getElementById('postPrice').value;
  const name = document.getElementById('postSellerName').value.trim();
  const phone = document.getElementById('postPhone').value.trim();
  const telegram = document.getElementById('postTelegram').value.trim();

  if (!title || !cat || !cond || !description || !price || !name || !phone) {
    showToast('Please fill in all required fields', 'error');
    if (!title || !cat || !description || !cond || !price) goToStep(1);
    else if (postImageFiles.length === 0) goToStep(3);
    else goToStep(4); // If user info is missing
    return;
  }

  // 2. UI Loading State
  submitBtn.disabled = true;
  submitBtn.innerHTML = '🚀 Uploading Photos...';

  try {
    let finalPhotoUrls = [];
    if (postImageFiles.length > 0) {
      console.log(`📸 Preparing to upload ${postImageFiles.length} photos...`);
      finalPhotoUrls = await uploadImages(postImageFiles);
    }

    const specs = {};
    document.querySelectorAll('.spec-input').forEach(el => {
      if (el.value) specs[el.getAttribute('data-name')] = el.value;
    });

    const listingData = {
      title,
      price: Number(price),
      category: cat,
      sub_category: document.getElementById('postSubCategory').value || null,
      condition: cond,
      description, 
      seller_name: name, 
      seller_phone: phone, 
      seller_telegram: telegram,
      user_id: state.currentUser ? state.currentUser.id : null,
      photos: finalPhotoUrls,
      specs,
      featured: document.getElementById('postFeatured') ? document.getElementById('postFeatured').checked : false,
      views: 0
    };
    if (state.editingId) listingData.id = state.editingId;

    if (typeof sb !== 'undefined') {
      const result = await saveAdToSupabase(listingData);
      console.log("🚀 Ad saved successfully!", result);
      showToast(state.editingId ? '✅ Ad updated successfully!' : '🎉 Your ad is now live!', 'success');
    } else {
      saveLocalListing(listingData);
      showToast('Ad saved locally (Cloud not connected)', 'info');
    }
    
    // Cleanup
    postImages = [];
    postImageFiles = [];
    document.getElementById('postForm').reset();
    const previewGrid = document.getElementById('photoPreviewGrid');
    if (previewGrid) previewGrid.innerHTML = '';
    
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      navigate('home');
    }, 1500);

  } catch (err) {
    console.error("Submission Error:", err);
    showToast('Error posting ad. Using local fallback.', 'warning');
    saveLocalListing({ title, price: Number(price), category: cat, condition: cond, description, seller_name: name, seller_phone: phone, photos: [] });
    navigate('home');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
}

async function editListing(id) {
  const listing = DB.listings.find(l => String(l.id) === String(id));
  if (!listing) return;

  state.editingId = id;
  navigate('post');
  
  // Wait a bit for the page to render
  setTimeout(() => {
    document.getElementById('postTitle').value = listing.title;
    document.getElementById('postCategory').value = listing.category;
    handleCategoryChange(); // Trigger sub-cat and spec logic
    
    setTimeout(() => {
        if(listing.sub_category) document.getElementById('postSubCategory').value = listing.sub_category;
        document.getElementById('postCondition').value = listing.condition;
        document.getElementById('postPrice').value = listing.price;
        document.getElementById('postDesc').value = listing.description;
        document.getElementById('postSellerName').value = listing.seller_name || listing.seller || '';
        document.getElementById('postPhone').value = listing.seller_phone || listing.phone || '';
        document.getElementById('postTelegram').value = listing.seller_telegram || listing.telegram || '';
        
        postImageFiles = [];
        postImages = listing.photos || [];
        renderPhotoPreview();

        // Populate Specs
        if (listing.specs) {
            Object.entries(listing.specs).forEach(([key, val]) => {
                const specInput = document.querySelector(`.spec-input[data-name="${key}"]`);
                if (specInput) specInput.value = val;
            });
        }

        // Update Button Text
        const submitBtn = document.querySelector('#postStep4 .btn-submit-ad');
        if (submitBtn) submitBtn.textContent = '💾 Update My Ad';
        
        showToast('Form populated. You can now edit your ad.', 'info');
    }, 200);
  }, 100);
}

function saveLocalListing(data) {
  const newListing = { 
    ...data, 
    id: Date.now(), 
    time: new Date(), 
    views: 0, 
    wishlist: false
  };
  DB.listings.unshift(newListing);
  saveListings();
}


/* ============================================================
   RENDER: PROFILE
============================================================ */
function renderProfilePage() {
  try {
    const user = state.currentUser;
    if (!user) {
      console.warn("renderProfilePage: No user logged in");
      return;
    }

    const imgEl = document.getElementById('profileAvatarDisplay');
    const initEl = document.getElementById('profileInitialsDisplay');
    
    if (user.picture) {
      if(imgEl) {
          imgEl.src = user.picture;
          imgEl.style.display = 'block';
      }
      if(initEl) initEl.style.display = 'none';
    } else {
      if(imgEl) imgEl.style.display = 'none';
      if(initEl) {
          initEl.textContent = user.initials || '??';
          initEl.style.display = 'flex';
      }
    }

    const nameEl = document.getElementById('profileNameDisplay');
    if (nameEl) nameEl.textContent = user.name || 'Anonymous';
    
    const phoneEl = document.getElementById('profilePhoneDisplay');
    if (phoneEl) phoneEl.textContent = user.phone || 'No phone set';
    
    const emailEl = document.getElementById('profileEmailDisplay');
    if (emailEl) emailEl.textContent = user.email || 'No email set';
    
    const tgDisplay = document.getElementById('profileTelegramDisplay');
    if (tgDisplay) {
      const tgValue = user.telegram || '';
      if (tgValue) {
        const cleanTg = tgValue.startsWith('@') ? tgValue.substring(1) : tgValue;
        tgDisplay.innerHTML = `<a href="https://t.me/${cleanTg}" target="_blank" style="color:var(--primary); font-weight:600; text-decoration:none;">${tgValue}</a>`;
      } else {
        tgDisplay.textContent = 'No Telegram set';
      }
    }

    const bioEl = document.getElementById('profileBioDisplay');
    if (bioEl) bioEl.textContent = user.bio || 'No bio set yet. Tell others a bit about yourself!';
    
    // Render listings
    renderUserListings('active');
  } catch (err) {
    console.error("CRITICAL ERROR in renderProfilePage:", err);
    showToast("Error loading profile content. Please refresh.", "error");
  }
}

function switchProfileTab(tab, el) {
  document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  renderUserListings(tab);
}

function renderUserListings(tab) {
  try {
    const grid = document.getElementById('profileListingsGrid');
    if (!grid) return;
    
    const user = state.currentUser;
    if (!user) return;

    let listings = [];
    const all = Array.isArray(DB.listings) ? DB.listings : [];

    if (tab === 'active') {
      listings = all.filter(l => 
        String(l.user_id) === String(user.id) || 
        (!l.user_id && l.seller === user.name)
      );
    } else if (tab === 'favourites') {
      const wishlist = Array.isArray(DB.wishlist) ? DB.wishlist : [];
      listings = all.filter(l => wishlist.includes(String(l.id)));
    }

    if (listings.length === 0) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
        <div class="empty-state-icon">${tab === 'active' ? '📦' : '🔖'}</div>
        <h3>${tab === 'active' ? 'No active ads' : 'No saved items'}</h3>
        <p>${tab === 'active' ? 'Post your first ad for free!' : 'Save listings you like.'}</p>
        ${tab === 'active' ? '<button onclick="navigate(\'post\')" class="btn-submit-ad" style="margin-top:12px;padding:10px 24px;font-size:14px;width:auto">Post Ad</button>' : ''}
      </div>`;
      return;
    }

    const bookmarkFilled = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;

    grid.innerHTML = listings.map(l => {
      if (!l) return '';
      const photo = (Array.isArray(l.photos) ? l.photos[0] : l.photos) || '';
      return `
        <div class="listing-card">
          <div class="card-img-wrap" onclick="openListing('${l.id}')" style="cursor:pointer">
            <img class="card-img" src="${photo}" alt="" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22><rect fill=%22%23f0f1f5%22 width=%22400%22 height=%22300%22/></svg>'" />
            <div class="card-badges">
              ${l.featured ? '<span class="badge-featured">⭐ Featured</span>' : ''}
              <span class="badge-condition ${l.condition === 'new' ? 'badge-new' : 'badge-used'}">${l.condition === 'new' ? 'New' : 'Used'}</span>
            </div>
            ${tab === 'favourites' ? `<button class="wishlist-btn saved" onclick="removeFromFavourites(event, '${l.id}')" title="Remove from saved">${bookmarkFilled}</button>` : ''}
          </div>
          <div class="card-body" style="cursor:pointer" onclick="openListing('${l.id}')">
            <div class="card-title">${l.title || 'Untitled'}</div>
            ${typeof getSpecsHtml === 'function' ? getSpecsHtml(l) : ''}
            <div class="card-price">${typeof formatPrice === 'function' ? formatPrice(l.price) : l.price}</div>
          </div>
          ${tab === 'active' ? `
          <div class="user-listing-actions">
            <button class="btn-edit-listing" onclick="editListing('${l.id}')">✏️ Edit</button>
            <button class="btn-del-listing" onclick="promptDelete('${l.id}')">🗑️ Delete</button>
          </div>` : ''}
          ${tab === 'favourites' ? `
          <div class="user-listing-actions">
            <button class="btn-del-listing" onclick="removeFromFavourites(event, '${l.id}')" style="width:100%">🔖 Remove</button>
          </div>` : ''}
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error("ERROR in renderUserListings:", err);
  }
}

function promptDelete(id) {
  state.deleteTarget = id;
  openModal('deleteModal');
}

async function confirmDelete() {
  if (!state.deleteTarget) return;
  const targetId = state.deleteTarget;
  showToast('🕒 Deleting from cloud...', 'info');

  // 1. Delete from Cloud
  if (typeof sb !== 'undefined') {
    try {
      const idToMatch = String(targetId);
      console.log(`📡 Sending delete request for ID: ${idToMatch}`);
      
      const { error, count } = await sb
        .from('ads')
        .delete({ count: 'exact' })
        .eq('id', idToMatch);

      if (error) {
        console.error("❌ Cloud error:", error.message);
        showToast(`Cloud Error: ${error.message}`, 'error');
      } else {
        console.log(`✅ Success! Server says: ${count} rows removed.`);
        showToast(`Server: ${count} item(s) deleted permanently.`, count > 0 ? 'success' : 'warning');
      }
    } catch (err) {
      console.error("❌ System failure during delete:", err.message);
    }
  }

  // 2. Force Local Refresh
  DB.listings = DB.listings.filter(l => String(l.id) !== String(targetId));
  saveListings();
  
  state.deleteTarget = null;
  closeModal('deleteModal');
  
  // 3. CRITICAL: Re-render home to ensure it's gone from the main feed
  await renderHome(); 
  
  renderProfilePage();
  showToast('✅ Ad permanently deleted.', 'success');
}

/* Admin functions moved to admin-script.js */

/* ============================================================
   SEARCH
============================================================ */
function doSearch() {
  const q = document.getElementById('heroSearch')?.value || document.getElementById('navSearch')?.value || '';
  state.searchQuery = q;
  navigate('search', { query: q });
}

/* ============================================================
   SORT
============================================================ */
function sortListings(mode, context) {
  state.sortMode[context] = mode;
  if (context === 'featured') renderFeaturedListings();
  else if (context === 'recent') renderRecentListings();
  else if (context === 'search') applyFilters();
}

function getSorted(arr, mode) {
  const copy = [...arr];
  if (mode === 'newest') return copy.sort((a, b) => new Date(b.time) - new Date(a.time));
  if (mode === 'price-asc') return copy.sort((a, b) => a.price - b.price);
  if (mode === 'price-desc') return copy.sort((a, b) => b.price - a.price);
  return copy;
}

/* ============================================================
   WISHLIST
============================================================ */
function toggleWishlist(e, id) {
  e.stopPropagation();
  const idStr = String(id);
  const l = DB.listings.find(item => String(item.id) === idStr);
  
  if (DB.wishlist.includes(idStr)) {
    DB.wishlist = DB.wishlist.filter(i => i !== idStr);
    if (l) l.wishlist = false;
  } else {
    DB.wishlist.push(idStr);
    if (l) l.wishlist = true;
  }
  saveWishlist();

  // Sync to Cloud
  if (sb && state.currentUser) {
    state.currentUser.wishlist = DB.wishlist;
    sb.from('profiles').upsert([{
      email: state.currentUser.email,
      wishlist: DB.wishlist
    }], { onConflict: 'email' }).then(({error}) => {
      if (error) console.error("Wishlist cloud sync error:", error);
    });
  }

  if (state.currentPage === 'profile') renderProfilePage();
  showToast(isSaved ? '🔖 Saved to favourites' : 'Removed from favourites', 'info');
}

function removeFromFavourites(e, id) {
  e.stopPropagation();
  const idStr = String(id);
  DB.wishlist = DB.wishlist.filter(i => i !== idStr);
  const l = DB.listings.find(item => String(item.id) === idStr);
  if (l) l.wishlist = false;
  saveWishlist();
  renderUserListings('favourites');
  showToast('Removed from saved', 'info');
}

/* ============================================================
   MODALS
============================================================ */
function openModal(id) { 
  document.getElementById(id)?.classList.add('open'); 
  document.body.style.overflow = 'hidden';
  
  if (id === 'authModal') {
    // Render button only when modal is open to ensure visibility
    setTimeout(renderGoogleButton, 10);
  }
  if (id === 'editProfileModal' && state.currentUser) {
    const u = state.currentUser;
    state.newProfilePicture = null; // Reset any previous selection
    
    const imgPreview = document.getElementById('editProfilePhotoPreview');
    const initPreview = document.getElementById('editProfileInitialsPreview');
    if (u.picture) {
      if(imgPreview) { imgPreview.src = u.picture; imgPreview.style.display = 'block'; }
      if(initPreview) initPreview.style.display = 'none';
    } else {
      if(imgPreview) imgPreview.style.display = 'none';
      if(initPreview) { initPreview.textContent = u.initials || '??'; initPreview.style.display = 'flex'; }
    }

    if (document.getElementById('editName')) document.getElementById('editName').value = u.name || '';
    if (document.getElementById('editPhone')) document.getElementById('editPhone').value = u.phone || '';
    if (document.getElementById('editEmail')) document.getElementById('editEmail').value = u.email || '';
    if (document.getElementById('editTelegram')) document.getElementById('editTelegram').value = u.telegram || '';
    if (document.getElementById('editBio')) document.getElementById('editBio').value = u.bio || '';
    if (document.getElementById('editCity')) document.getElementById('editCity').value = u.city || 'Addis Ababa';
  }
}
function closeModal(id) { 
  document.getElementById(id)?.classList.remove('open'); 
  document.body.style.overflow = '';
}
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) closeModal(e.target.id);
});



async function submitReport() {
  const reason = document.getElementById('reportReason').value;
  const details = document.getElementById('reportDetails').value;
  
  if (!state.currentListing) return;

  showToast('Sending report to admin...', 'info');

  if (typeof sb !== 'undefined') {
    try {
      const payload = {
        listing_id: state.currentListing.id,
        listing_title: state.currentListing.title,
        reported_by: state.currentUser ? state.currentUser.name : 'Anonymous',
        reason: reason,
        details: details
      };
      
      const { error } = await sb.from('reports').insert([payload]);
      if (error) throw error;
      
      console.log('✅ Report saved to cloud.');
    } catch (e) {
      console.error('Report submission error:', e);
    }
  }

  closeModal('reportModal');
  showToast('🚩 Report submitted. Thank you for keeping the marketplace safe!', 'success');
}

function activatePromotion() {
  closeModal('promoteModal');
  showToast('⭐ Your listing is now featured!', 'success');
}

function selectPlan(el) {
  document.querySelectorAll('#promoteModal .modal-body > div > div').forEach(d => {
    d.style.borderColor = 'var(--border)';
    d.style.background = '';
  });
  el.style.borderColor = 'var(--primary)';
  el.style.background = 'var(--primary-light)';
}

function handleProfilePhotoChange(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  if (file.size > 5 * 1024 * 1024) {
    showToast('Photo must be less than 5MB', 'error');
    return;
  }
  
  state.newProfilePicture = file;
  const url = URL.createObjectURL(file);
  const imgPreview = document.getElementById('editProfilePhotoPreview');
  const initPreview = document.getElementById('editProfileInitialsPreview');
  
  if(imgPreview) { 
    imgPreview.src = url; 
    imgPreview.style.display = 'block'; 
  }
  if(initPreview) {
    initPreview.style.display = 'none';
  }
}

async function saveProfile() {
  const name = document.getElementById('editName').value.trim();
  const phone = document.getElementById('editPhone').value.trim();
  const email = document.getElementById('editEmail').value.trim();
  const telegram = document.getElementById('editTelegram').value.trim();
  const bio = document.getElementById('editBio').value.trim();
  const city = document.getElementById('editCity').value;

  if (!name) {
    showToast('Name is required', 'error');
    return;
  }

  const oldName = state.currentUser.name;
  
  if (state.newProfilePicture) {
    showToast('Uploading profile photo...', 'info');
    try {
      const urls = await uploadPhotosToStorage([state.newProfilePicture]);
      if (urls && urls.length > 0) {
        state.currentUser.picture = urls[0];
      }
    } catch (e) {
      console.error("Profile photo upload failed:", e);
      showToast("Photo upload failed, but saving profile...", "warning");
    }
  }

  // Update State
  state.currentUser.name = name;
  state.currentUser.phone = phone;
  state.currentUser.email = email;
  state.currentUser.telegram = telegram;
  state.currentUser.bio = bio;
  state.currentUser.city = city;
  state.currentUser.initials = name.split(' ').filter(n=>n).map(n=>n[0]).join('').toUpperCase().slice(0,2);
  
  // Sync to Cloud
  if (typeof sb !== 'undefined') {
    try {
      await syncProfileToSupabase({
        id: state.currentUser.id,
        email: state.currentUser.email,
        name: state.currentUser.name,
        phone: state.currentUser.phone,
        telegram: state.currentUser.telegram,
        bio: state.currentUser.bio,
        city: state.currentUser.city,
        picture: state.currentUser.picture,
        wishlist: state.currentUser.wishlist || []
      });
      showToast('✅ Profile saved to cloud!', 'success');
    } catch (e) {
      console.error("Cloud sync error:", e);
      showToast("Cloud sync failed, session updated locally.", "warning");
    }
  }

  // Persistence - Session (Keep as cache)
  localStorage.setItem('bubu_active_session', JSON.stringify(state.currentUser));

  // Sync listings name if changed
  if (name !== oldName) {
    DB.listings.forEach(l => {
      if (l.seller === oldName) l.seller = name;
    });
  }

  updateAuthUI();
  closeModal('editProfileModal');
  renderProfilePage();
  showToast('✅ Profile updated and synced!', 'success');
}

function toggleMobileFilter() {
  const panel = document.getElementById('filtersPanel');
  const closeBtn = document.getElementById('filterClose');
  const isOpen = panel.classList.contains('open');
  panel.classList.toggle('open', !isOpen);
  if (closeBtn) closeBtn.style.display = !isOpen ? 'block' : 'none';
}

/* ============================================================
   PAGINATION
============================================================ */
function renderPagination(containerId, total) {
  const container = document.getElementById(containerId);
  if (!container || total <= 12) { if(container) container.innerHTML=''; return; }
  const pages = Math.ceil(total / 12);
  container.innerHTML = Array.from({length: Math.min(pages, 5)}, (_, i) => `
    <button class="page-btn ${i === 0 ? 'active' : ''}" onclick="this.parentElement.querySelectorAll('.page-btn').forEach(b=>b.classList.remove('active')); this.classList.add('active')">${i + 1}</button>
  `).join('') + (pages > 5 ? `<button class="page-btn">…</button><button class="page-btn">${pages}</button>` : '');
}

/* ============================================================
   TOAST
============================================================ */
function showToast(msg, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastOut .3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ============================================================
   HELPERS
============================================================ */
function formatPrice(price) {
  const n = Number(price);
  if (n >= 1000000) return 'ETB ' + (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return 'ETB ' + n.toLocaleString();
  return 'ETB ' + n;
}

function getTimeAgo(date) {
  const d = new Date(date);
  const diff = (Date.now() - d) / 1000;
  if (diff < 60) return 'Just now';
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
  if (diff < 604800) return Math.floor(diff / 86400) + 'd ago';
  return d.toLocaleDateString();
}

/* ============================================================
   GOOGLE AUTHENTICATION
============================================================ */
function initGoogleAuth() {
  // Check if running via file:// protocol
  if (window.location.protocol === 'file:') {
    console.warn("Google Auth will not work on file:// protocol. Use a local server (e.g., Live Server).");
    showToast("⚠️ Google Login requires a local server (Live Server).", "warning");
  }
  
  if (typeof google === 'undefined') {
    setTimeout(initGoogleAuth, 500);
    return;
  }
  try {
    google.accounts.id.initialize({
      client_id: "527376856278-is7kgmdekhlom6rsrtvvuhc0qqf5pefv.apps.googleusercontent.com",
      callback: handleGoogleResponse,
      auto_select: false,
      cancel_on_tap_outside: false
    });
    // Render once in case it's already visible
    renderGoogleButton();
  } catch (err) {
    console.error("Google Auth Init Error:", err);
  }
}

function renderGoogleButton() {
  if (typeof google === 'undefined') return;
  const btnContainer = document.getElementById("googleBtnContainer");
  if (btnContainer) {
    try {
      google.accounts.id.renderButton(
        btnContainer,
        { theme: "outline", size: "large", width: "100%", text: "continue_with" }
      );
    } catch (e) {
      console.warn("Google Button Render Error:", e.message);
    }
  }
}

function openAuthModal(isSignup = false) {
    state.authIsSignup = isSignup;
    const title = document.getElementById('authModalTitle');
    const desc = document.getElementById('authModalDesc');
    const toggleText = document.getElementById('authToggleContainer');

    if (isSignup) {
        title.textContent = "Create Account";
        desc.textContent = "Join BUBU Gebeya today to start selling.";
        toggleText.innerHTML = `<p style="font-size:13px;">Already have an account? <a href="#" onclick="toggleAuthMode(false)" style="color:var(--primary); font-weight:700;">Sign In</a></p>`;
    } else {
        title.textContent = "Welcome Back";
        desc.textContent = "Sign in to manage your ads and bookmarks.";
        toggleText.innerHTML = `<p style="font-size:13px;">Don't have an account? <a href="#" onclick="toggleAuthMode(true)" style="color:var(--primary); font-weight:700;">Sign Up</a></p>`;
    }
    openModal('authModal');
}

function toggleAuthMode(isSignup) {
    openAuthModal(isSignup);
}

async function handleGoogleResponse(response) {
  const payload = decodeJwt(response.credential);
  if (payload) {
    const email = payload.email;
    const googleId = payload.sub;
    
    showToast("Checking cloud account...", "info");
    
    let profile = null;
    if (typeof sb !== 'undefined') {
      try {
        let { data, error } = await sb.from('profiles').select('*').eq('id', googleId).single();
        if (!data || error) {
            const { data: byEmail } = await sb.from('profiles').select('*').eq('email', email).single();
            data = byEmail;
        }
        profile = data;
      } catch (e) { console.warn("Profile fetch error:", e); }
    }

    // --- ENFORCE SIGN-IN VS SIGN-UP ---
    if (!state.authIsSignup && !profile) {
        // User clicked "Sign In" but we found NO account
        showToast("⚠️ No account found. Please Sign Up first.", "warning");
        setTimeout(() => toggleAuthMode(true), 500);
        return;
    }

    state.currentUser = {
      id: profile?.id || googleId, 
      name: profile?.name || payload.name,
      email: email,
      picture: payload.picture,
      initials: (payload.given_name ? payload.given_name[0] : payload.name[0]),
      phone: profile?.phone || '',
      telegram: profile?.telegram || '',
      bio: profile?.bio || '',
      city: profile?.city || '',
      wishlist: profile?.wishlist || []
    };

    DB.wishlist = state.currentUser.wishlist || [];
    localStorage.setItem('bubu_active_session', JSON.stringify(state.currentUser));
    closeModal('authModal');

    if (!state.currentUser.phone || !state.currentUser.city) {
      if (document.getElementById('completeName')) document.getElementById('completeName').value = state.currentUser.name;
      openModal('completeProfileModal');
    } else {
      finalizeLogin();
    }
  }
}

async function finishCompleteProfile() {
  const name = document.getElementById('completeName').value.trim();
  const phone = document.getElementById('completePhone').value.trim();
  const city = document.getElementById('completeCity').value;

  if (!name) { showToast('Please enter your name', 'error'); return; }
  if (!phone || phone.length < 9) { showToast('Please enter a valid phone number', 'error'); return; }

  state.currentUser.name = name;
  state.currentUser.phone = phone;
  state.currentUser.city = city;
  state.currentUser.initials = name[0].toUpperCase();

  // Sync to Cloud
  if (typeof sb !== 'undefined') {
    try {
      await syncProfileToSupabase({
        id: state.currentUser.id,
        email: state.currentUser.email,
        name: state.currentUser.name,
        phone: state.currentUser.phone,
        city: state.currentUser.city,
        telegram: state.currentUser.telegram || '',
        bio: state.currentUser.bio || '',
        wishlist: state.currentUser.wishlist || []
      });
    } catch (e) {
      console.error("Cloud profile sync error:", e);
      showToast("Error saving to cloud, saved locally.", "warning");
    }
  }
  
  closeModal('completeProfileModal');
  finalizeLogin();
}

function guestLogin() {
  console.log("DEBUG: guestLogin triggered");
  const guestUser = {
    id: 'guest_' + Date.now(),
    email: 'guest@example.com',
    user_metadata: {
      full_name: 'Guest User',
      avatar_url: 'https://i.pravatar.cc/150?u=guest'
    }
  };
  
  persistUser(guestUser);
  updateAuthUI();
  closeModal('authModal');
  showToast("Welcome! You are now in Demo Mode.", "success");
}

function finalizeLogin() {
  updateAuthUI();
  localStorage.setItem('bubu_active_session', JSON.stringify(state.currentUser));
  showToast(`Welcome to BUBU Gebeya, ${state.currentUser.name}!`, 'success');

  if (state.currentPage === 'home') renderHome();
}

function persistUser(user) {
  const users = JSON.parse(localStorage.getItem('bubu_users') || '[]');
  const idx = users.findIndex(u => u.email === user.email);
  if (idx >= 0) users[idx] = user;
  else users.push(user);
  localStorage.setItem('bubu_users', JSON.stringify(users));
}

function loadStoredUser(email) {
  const users = JSON.parse(localStorage.getItem('bubu_users') || '[]');
  return users.find(u => u.email === email);
}

function checkActiveSession() {
  const saved = localStorage.getItem('bubu_active_session');
  if (saved) {
    state.currentUser = JSON.parse(saved);
  }
}

function decodeJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("JWT Decode Error", e);
    return null;
  }
}

function updateAuthUI() {
  const signInBtn = document.getElementById('signInBtn');
  const registerBtn = document.getElementById('registerBtn');
  const avatar = document.getElementById('authAvatar');

  if (state.currentUser) {
    // Hidden Login buttons
    if (signInBtn) signInBtn.classList.add('hidden');
    if (registerBtn) registerBtn.classList.add('hidden');
    
    // Show Avatar
    if (avatar) {
        avatar.classList.remove('hidden');
        if (state.currentUser.picture) {
          avatar.innerHTML = `<img src="${state.currentUser.picture}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" />`;
        } else {
          avatar.textContent = state.currentUser.initials;
        }
    }
  } else {
    // Show Login buttons
    if (signInBtn) signInBtn.classList.remove('hidden');
    if (registerBtn) registerBtn.classList.remove('hidden');
    
    // Hide Avatar
    if (avatar) avatar.classList.add('hidden');
  }
}

function handleProfileClick() {
  if (state.currentUser) {
    navigate('profile');
  } else {
    openModal('authModal');
  }
}

function logout() {
  state.currentUser = null;
  localStorage.removeItem('bubu_active_session');
  updateAuthUI();
  navigate('home');
  showToast('Logged out successfully', 'info');
}

/* ============================================================
   INIT
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initDB();
  checkActiveSession();
  renderHome();
  initGoogleAuth();
  updateAuthUI();

  if (state.currentUser) {
  }
});

