/* =========================
GLOBAL PROFILE ENGINE v10.8 (CLOUD MERGE + SYNC)
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
 云端合并（拉取远端 profiles，与本地合并）
 ========================= */
async function syncProfilesFromCloud() {
  if (typeof supabaseClient === "undefined" || typeof fetchProfiles !== "function") return false
  try {
    const cloudProfiles = await fetchProfiles()
    if (!cloudProfiles || cloudProfiles.length === 0) return false

    // 标准化云端数据
    const normalizedCloud = cloudProfiles.map(p => ({
      id: p.id,
      name: p.name || "Unnamed",
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

    // 获取本地 profiles
    let localProfiles = getProfiles()

    // 构建云端 id 映射
    const cloudMap = Object.fromEntries(normalizedCloud.map(p => [p.id, p]))

    // 1. 更新本地：用云端版本覆盖同 id 的 profile
    localProfiles = localProfiles.map(lp => cloudMap[lp.id] || lp)

    // 2. 添加云端有而本地没有的 profile
    const localIds = new Set(localProfiles.map(p => p.id))
    normalizedCloud.forEach(cp => {
      if (!localIds.has(cp.id)) {
        localProfiles.push(cp)
      }
    })

    // 3. 确保存在 guest（如果全都删光了）
    if (!localProfiles.find(p => p.id === "guest")) {
      localProfiles.unshift(fallbackProfile())
    }

    // 存储合并后的列表
    setProfiles(localProfiles)

    // 确保 active 有效
    const active = getActiveProfile()
    if (!active || !localProfiles.find(p => p.id === active.id)) {
      setActiveProfile(localProfiles[0])
    }

    window.dispatchEvent(new Event("profileSyncUpdate"))
    return true
  } catch (e) {
    console.warn("Profile cloud merge failed:", e)
    return false
  }
}

/* =========================
 初始化系统（本地 + 云端合并）
 ========================= */
async function ensureProfileSystem() {
  // 先尝试云端合并（如果可用）
  await syncProfilesFromCloud()

  // 如果合并后仍无数据（极端情况），创建 guest
  let profiles = getProfiles()
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

// 启动时异步初始化
window.addEventListener("DOMContentLoaded", async () => {
  await ensureProfileSystem()
  window.dispatchEvent(new Event("profileSyncUpdate"))
})

// 立刻初始化（以防 DOMContentLoaded 已过）
ensureProfileSystem().then(() => {
  window.dispatchEvent(new Event("profileSyncUpdate"))
})
