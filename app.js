/* =========================
GLOBAL PROFILE ENGINE v10.7 (CLOUD RESTORE + SAFE)
========================= */

const STORAGE_KEYS = {
  profiles: "profiles",
  activeProfile: "activeProfile"
}

// 安全读取
function getProfiles() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.profiles)) || []
  } catch (e) {
    return []
  }
}

function getActiveProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.activeProfile)
    if (!raw || raw === "undefined" || raw === "null") return fallbackProfile()
    const p = JSON.parse(raw)
    return p?.id ? p : fallbackProfile()
  } catch (e) {
    return fallbackProfile()
  }
}

// 安全写入
function setProfiles(profiles) {
  localStorage.setItem(STORAGE_KEYS.profiles, JSON.stringify(profiles))
}

function setActiveProfile(profile) {
  localStorage.setItem(STORAGE_KEYS.activeProfile, JSON.stringify(profile))
  window.dispatchEvent(new Event("profileSyncUpdate"))
}

// 默认 profile
function fallbackProfile() {
  return {
    id: "guest",
    name: "Guest",
    height: 170,
    weight: 70
  }
}

/* =========================
 云端恢复（从 Supabase 拉取所有 profiles）
 ========================= */
async function loadProfilesFromCloud() {
  if (typeof supabaseClient === "undefined" || typeof fetchProfiles !== "function") return false
  try {
    const cloudProfiles = await fetchProfiles()
    if (cloudProfiles && cloudProfiles.length > 0) {
      // 标准化数据（防止某些字段缺失）
      const normalized = cloudProfiles.map(p => ({
        id: p.id,
        name: p.name || p.food_name || "Unnamed",
        height: Number(p.height || 170),
        weight: Number(p.weight || 70),
        email: p.email || "",
        phone: p.phone || "",
        gender: p.gender || "",
        age: Number(p.age || 0),
        country: p.country || "",
        occupation: p.occupation || "",
        target_weight: Number(p.target_weight || 70),
        body_fat_percentage: Number(p.body_fat_percentage || 0),
        muscle_mass: Number(p.muscle_mass || 0),
        primary_goal: p.primary_goal || "maintenance",
        bmi: p.bmi || null,
        created_at: p.created_at || new Date().toISOString(),
        updated_at: p.updated_at || new Date().toISOString()
      }))
      localStorage.setItem(STORAGE_KEYS.profiles, JSON.stringify(normalized))
      return true
    }
  } catch (e) {
    console.warn("Cloud profiles restore failed:", e)
  }
  return false
}

/* =========================
 初始化系统（确保至少有一个 profile）
 ========================= */
async function ensureProfileSystem() {
  let profiles = getProfiles()
  let restoredFromCloud = false

  // 如果本地没有任何 profile（或解析出错），尝试从云端恢复
  if (!profiles || profiles.length === 0) {
    restoredFromCloud = await loadProfilesFromCloud()
    profiles = getProfiles() // 重新读取
  }

  // 如果云端也没有，创建默认 guest
  if (!profiles || profiles.length === 0) {
    const defaultProfile = {
      id: "guest",
      name: "Guest",
      height: 170,
      weight: 70
    }
    profiles = [defaultProfile]
    setProfiles(profiles)
    setActiveProfile(defaultProfile)
  }

  // 确保 activeProfile 存在且有效
  const active = getActiveProfile()
  if (!active || !profiles.find(p => p.id === active.id)) {
    setActiveProfile(profiles[0])
  }
}

// 创建 profile
function createProfile(profile) {
  let profiles = getProfiles()
  const newProfile = {
    id: Date.now().toString(),
    height: 170,
    weight: 70,
    ...profile
  }
  profiles.push(newProfile)
  setProfiles(profiles)
  setActiveProfile(newProfile)
  return newProfile
}

// 删除 profile
function deleteProfile(id) {
  let profiles = getProfiles().filter(p => p.id !== id)
  setProfiles(profiles)
  let active = getActiveProfile()
  if (active && active.id === id) {
    setActiveProfile(profiles[0] || fallbackProfile())
  }
}

// 切换 profile
function switchProfile(id) {
  let profile = getProfiles().find(p => p.id === id)
  if (profile) setActiveProfile(profile)
}

// 兼容旧版 setActive
function setActive(page) {
  try {
    localStorage.setItem("activePage", page)
    window.dispatchEvent(new Event("pageChange"))
  } catch (e) {
    console.log(e)
  }
}

// ProfileEngine 兼容层
const ProfileEngine = {
  render(targetId) {
    const el = document.getElementById(targetId)
    if (!el) return
    const p = getActiveProfile()
    if (!p) {
      el.innerText = "Guest"
      return
    }
    if (targetId === "activeProfile") {
      el.innerText = "👤 Active: " + (p.name || "Guest")
    } else {
      el.innerText = p.name || "Guest"
    }
  },
  getActiveProfile,
  getProfiles,
  switchProfile,
  deleteProfile,
  createProfile
}

// 导出
window.getProfiles = getProfiles
window.getActiveProfile = getActiveProfile
window.setProfiles = setProfiles
window.setActiveProfile = setActiveProfile
window.createProfile = createProfile
window.deleteProfile = deleteProfile
window.switchProfile = switchProfile
window.ProfileEngine = ProfileEngine
window.setActive = setActive

// 启动时异步初始化（确保 cloud restore 完成）
window.addEventListener("DOMContentLoaded", async () => {
  await ensureProfileSystem()
  // 通知其他页面已经准备好
  window.dispatchEvent(new Event("profileSyncUpdate"))
})

// 立即初始化一次（以防 DOMContentLoaded 已经触发）
ensureProfileSystem().then(() => {
  window.dispatchEvent(new Event("profileSyncUpdate"))
})
