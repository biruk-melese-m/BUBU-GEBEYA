// --- ADMIN STATE ---
const ADMIN_SECRET = "bubu2026"; // Default secret key
const adminState = {
    users: [],
    ads: [],
    reports: []
};

// --- AUTH GATE ---
function checkAdminAuth() {
    const key = document.getElementById('adminKey').value;
    if (key === ADMIN_SECRET) {
        document.getElementById('adminLogin').style.display = 'none';
        localStorage.setItem('admin_session', 'active');
        initAdmin();
    } else {
        alert("❌ Incorrect Secret Key. Access Denied.");
    }
}

window.onload = () => {
    if (localStorage.getItem('admin_session') === 'active') {
        document.getElementById('adminLogin').style.display = 'none';
        initAdmin();
    }
};

// --- CORE LOGIC ---
async function initAdmin() {
    console.log("🛠️ Admin Initializing...");
    await refreshData();
    setupNavigation();
}

async function refreshData() {
    try {
        // 1. Fetch Users (Profiles table)
        const { data: users, error: uErr } = await sb.from('profiles').select('*');
        if (uErr) throw uErr;
        adminState.users = users;

        // 2. Fetch Ads
        const { data: ads, error: aErr } = await sb.from('ads').select('*').order('created_at', { ascending: false });
        if (aErr) throw aErr;
        adminState.ads = ads;

        // 3. Fetch Reports
        const { data: reports, error: rErr } = await sb.from('reports').select('*').order('created_at', { ascending: false });
        if (rErr) throw rErr;
        adminState.reports = reports || [];

        updateStats();
        renderUsers();
        renderListings();
        renderReports();
    } catch (err) {
        console.error("Fetch Error:", err.message);
    }
}

function updateStats() {
    document.getElementById('stat-ads').textContent = adminState.ads.length;
    document.getElementById('stat-users').textContent = adminState.users.length;
    document.getElementById('stat-reports').textContent = adminState.reports.length;
}

function renderUsers() {
    const table = document.getElementById('userTable');
    table.innerHTML = adminState.users.map(u => `
        <tr>
            <td>
                <div style="display:flex; align-items:center; gap:10px">
                    <div style="width:32px; height:32px; background:#e2e8f0; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700">
                        ${u.name ? u.name[0] : '?'}
                    </div>
                    <strong>${u.name || 'Anonymous'}</strong>
                </div>
            </td>
            <td>${u.email}</td>
            <td>${u.phone || '—'}</td>
            <td><span class="badge badge-active">Active</span></td>
            <td style="display:flex; gap:8px">
                <button class="btn-action" style="background:#e0e7ff; color:#4338ca" onclick="viewUserAds('${u.id}')">📂 Ads</button>
                <button class="btn-action btn-delete" onclick="deleteUser('${u.id}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

function viewUserAds(userId) {
    const userAds = adminState.ads.filter(ad => String(ad.user_id) === String(userId));
    if (userAds.length === 0) {
        alert("This user has no ads.");
        return;
    }
    
    // Switch to listings tab and filter them
    document.querySelector('.admin-nav-item[data-target="listings"]').click();
    renderListings(userAds);
    showToast(`Showing ${userAds.length} ads for user.`);
}

function renderListings(specificAds = null) {
    const list = specificAds || adminState.ads;
    const table = document.getElementById('listingTable');
    table.innerHTML = list.map(ad => `
        <tr>
            <td>
                <div style="display:flex; align-items:center; gap:12px">
                    <img src="${Array.isArray(ad.photos) ? ad.photos[0] : ad.photos}" style="width:40px; height:40px; border-radius:8px; object-fit:cover">
                    <div>
                        <div style="font-weight:700">${ad.title.slice(0,30)}</div>
                        <div style="font-size:11px; color:#64748b">ID: ${ad.id}</div>
                    </div>
                </div>
            </td>
            <td>${ad.seller_name || 'Seller'}</td>
            <td style="font-weight:700; color:#6366f1">ETB ${Number(ad.price).toLocaleString()}</td>
            <td>${ad.category}</td>
            <td style="display:flex; gap:8px">
                <button class="btn-action" style="background:#fef3c7; color:#92400e; border:none" onclick="openAdminEdit('${ad.id}')">✏️ Edit</button>
                <button class="btn-action btn-feature" onclick="toggleFeature('${ad.id}', ${ad.featured})">
                    ${ad.featured ? '⭐ Unfeature' : 'Feature'}
                </button>
                <button class="btn-action btn-delete" onclick="deleteAd('${ad.id}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

function renderReports() {
    const table = document.getElementById('reportTable');
    if (adminState.reports.length === 0) {
        table.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:32px; color:#94a3b8">No active reports. All good! 🚀</td></tr>';
        return;
    }
    
    table.innerHTML = adminState.reports.map(r => `
        <tr>
            <td style="font-weight:600; color:#1e293b">${r.listing_title}</td>
            <td>${r.reported_by}</td>
            <td><span style="background:#fee2e2; color:#b91c1c; padding:4px 8px; border-radius:6px; font-size:11px; font-weight:700">🚩 ${r.reason}</span></td>
            <td style="font-size:13px; color:#64748b; max-width:250px">${r.details || '—'}</td>
            <td style="display:flex; gap:8px">
                <button class="btn-action" style="background:#e0e7ff; color:#4338ca; border:none" onclick="viewUserAds('${r.listing_id}')">🔍 Check Ad</button>
                <button class="btn-action btn-feature" onclick="dismissReport('${r.id}')">✅ Dismiss</button>
            </td>
        </tr>
    `).join('');
}

let currentEditingAd = null;
function openAdminEdit(id) {
    const ad = adminState.ads.find(a => String(a.id) === String(id));
    if (!ad) return;
    currentEditingAd = ad;
    
    document.getElementById('editAdTitle').value = ad.title;
    document.getElementById('editAdPrice').value = ad.price;
    document.getElementById('editAdDesc').value = ad.description;
    
    document.getElementById('editModal').style.display = 'flex';
}

async function saveAdminEdit() {
    if (!currentEditingAd) return;
    
    const updates = {
        title: document.getElementById('editAdTitle').value,
        price: Number(document.getElementById('editAdPrice').value),
        description: document.getElementById('editAdDesc').value
    };

    const { error } = await sb.from('ads').update(updates).eq('id', currentEditingAd.id);
    
    if (error) {
        alert("Error updating ad: " + error.message);
    } else {
        alert("✅ Ad updated successfully!");
        closeAdminModal();
        refreshData();
    }
}

function closeAdminModal() {
    document.getElementById('editModal').style.display = 'none';
}

function showToast(msg) {
    alert(msg); // Simplified for admin
}

async function deleteAd(id) {
    if (!confirm("⚠️ Are you sure you want to PERMANENTLY delete this listing?")) return;
    const { error } = await sb.from('ads').delete().eq('id', id);
    if (error) alert("Error deleting ad: " + error.message);
    else {
        alert("✅ Ad deleted successfully.");
        refreshData();
    }
}

async function deleteUser(id) {
    if (!confirm("⚠️ Are you sure? This will delete the user's profile and all their ads. (Note: Auth account must be deleted in Supabase Dashboard)")) return;
    
    // Delete profile
    const { error: pErr } = await sb.from('profiles').delete().eq('id', id);
    // Delete user ads
    const { error: aErr } = await sb.from('ads').delete().eq('user_id', id);

    if (pErr) alert("Error deleting profile: " + pErr.message);
    else {
        alert("✅ User data removed from cloud.");
        refreshData();
    }
}

async function toggleFeature(id, current) {
    const { error } = await sb.from('ads').update({ featured: !current }).eq('id', id);
    if (error) alert ("Error updating: " + error.message);
    else refreshData();
}

async function dismissReport(id) {
    if (!confirm("Are you sure you want to dismiss this report?")) return;
    const { error } = await sb.from('reports').delete().eq('id', id);
    if (error) alert("Error dismissing report: " + error.message);
    else refreshData();
}

function setupNavigation() {
    const items = document.querySelectorAll('.admin-nav-item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-target');
            if (!target) return;
            
            items.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
            document.getElementById('section-' + target).classList.add('active');
        });
    });
}
