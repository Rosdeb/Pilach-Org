"use client"

import Image from "next/image"
import { useEffect, useRef, useState, type CSSProperties } from "react"

interface Project {
  id: string
  name: string
  year: string
  tags: string[]
  appTypes?: string[]
  layout?: "mobile" | "desktop"
  description: string
  websiteLink?: string
  playStoreLink?: string
  appStoreLink?: string
  githubLink?: string
  screenshots?: Array<{ src: string; alt: string }>
}

const shots = (items: Array<[string, string]>) => items.map(([src, alt]) => ({ src, alt }))

const filterTabs = [
  { id: "all", label: "All" },
  { id: "flutter", label: "Flutter" },
  { id: "native", label: "iOS & Android" },
  { id: "tools", label: "Tools" },
  { id: "web", label: "Web" },
]

// Newest first. The index (01, 02, ...) is generated from position, so reordering and filtering never breaks numbering.
const projects: Project[] = [
  {
    id: "tray",
    name: "Simulation Tray (Tray)",
    year: "2026",
    tags: ["Flutter Desktop", "macOS", "Windows", "scrcpy", "Developer Tool", "ADB"],
    appTypes: ["tools", "flutter"],
    layout: "desktop",
    description:
      "Simulation Tray is a lightweight, studio-free Android device & emulator workstation for Windows and macOS. It decouples the entire Android emulation and device workflow from heavy IDEs—slashing RAM consumption from 6GB+ down to ~85MB (<1s startup) with low-latency 60+ FPS scrcpy screen mirroring, real-time filtered Logcat, live CPU/RAM sparklines, wireless ADB, and system tray quick controls.",
    githubLink: "https://github.com/Rosdeb/Tray/releases/tag/v1.3.4",
    screenshots: shots([
      ["/tray_screen_1.png", "Simulation Tray device manager & emulator workstation"],
      ["/tray_screen_2.png", "Simulation Tray emulator startup & device configuration"],
      ["/tray_screen_3.png", "Simulation Tray ultra-low latency screen mirroring & controls"],
      ["/tray_screen_4.png", "Simulation Tray live logcat, telemetry sparklines & process monitor"],
    ]),
  },
  {
    id: "givano",
    name: "Givano",
    year: "Nov 2026",
    tags: ["Flutter", "GetX", "Socket.io", "Firebase", "Real-Time Chat", "Community"],
    appTypes: ["flutter", "native"],
    description:
      "Givano is a community-driven peer-to-peer item sharing and giveaway mobile application built with Flutter and GetX. Designed to reduce waste by connecting donors with local recipients via real-time socket chat, interactive discovery feeds, multi-image listing flows, and seamless pickup coordination.",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.givano.application",
    appStoreLink: "https://apps.apple.com/us/app/givano/id6816919732",
    screenshots: shots([
      ["/givano_1.webp", "Givano explore and discovery feed"],
      ["/givano_2.webp", "Givano item listing and details"],
      ["/givano_3.webp", "Givano real-time chat and pickup coordination"],
      ["/givano_4.webp", "Givano profile and management"],
    ]),
  },
  {
    id: "ayudame",
    name: "Ayudame",
    year: "July 2026",
    tags: ["Flutter", "ARCore", "Maps API"],
    appTypes: ["flutter", "native"],
    description:
      "Ayudame Service Provider helps service professionals manage bookings, connect with customers, track jobs, and grow their business efficiently. Providers can receive service requests, update job status, communicate with customers, and manage earnings from a single app.",
    appStoreLink: "https://apps.apple.com/us/app/ayudame/id6772288218",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.lavell.ayudame",
    githubLink: "https://github.com/Rosdeb/Ayudame",
  },
  {
    id: "appicon",
    name: "AppIcon Studio",
    year: "2026",
    tags: ["Web Tool", "Next.js", "App Icons", "iOS", "Android", "Design Utility"],
    appTypes: ["tools", "web"],
    layout: "desktop",
    description:
      "Free online app icon generator utility for developers and designers. Upload a single 1024x1024 master image to instantly preview, customize, and export all required icon assets and asset catalogs for iOS, Android, macOS, and Windows in one ready-to-use package.",
    websiteLink: "https://www.appicon.site/",
    screenshots: shots([["/appicon_preview.png", "AppIcon Studio generator interface and icon previewer"]]),
  },
  {
    id: "korot",
    name: "Korot",
    year: "2026",
    tags: ["Web Platform", "Next.js", "Linguistics", "Indigenous Languages", "Cultural Heritage"],
    appTypes: ["web"],
    description:
      "An open digital platform dedicated to preserving and exploring Indigenous languages. Features multi-script support, searchable vocabularies, audio pronunciations, and community-driven collections to safeguard cultural linguistic heritage.",
    websiteLink: "https://korot.site/",
    screenshots: shots([["/korot_logo.png", "Korot Indigenous Language preservation and discovery platform"]]),
  },
  {
    id: "wuffoos",
    name: "Wuffoos",
    year: "May 2026",
    tags: ["Flutter", "Android", "iOS", "Firebase", "Google Maps", "Live Tracking", "Location Sharing"],
    appTypes: ["flutter", "native"],
    description:
      "Wuffoos helps pet owners find available dog or cat sitters near them, and lets animal lovers register as sitters to earn extra income flexibly. Includes live tracking and location sharing so owners can follow along while their pet is in care.",
    websiteLink: "https://wuffoos.com/",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.wuffoos.app",
    appStoreLink: "https://apps.apple.com/us/app/wuffoos/id6761444819",
    screenshots: shots([
      ["/petcare_7.jpeg", "Wuffoos splash screen"],
      ["/petcare_2.jpeg", "Wuffoos welcome screen"],
      ["/petcare_1.jpeg", "Wuffoos sign in screen"],
      ["/petcare_4.jpeg", "Wuffoos home screen"],
      ["/petcare_5.jpeg", "Wuffoos location sharing screen"],
      ["/petcare_8.jpeg", "Wuffoos profile screen"],
      ["/petcare_6.jpeg", "Wuffoos live tracking map screen"],
    ]),
  },
  {
    id: "titra",
    name: "Titra",
    year: "March 2026",
    tags: ["Flutter", "WebRTC", "Audio/Video Call", "Real-time Communication"],
    appTypes: ["flutter"],
    description:
      "Titra is a mobile app for real-time WebRTC audio and video calls. Each user gets a unique 10-digit number, and calls connect end to end using that number.",
  },
  {
    id: "tradelmt",
    name: "TradeLMT",
    year: "2025",
    tags: ["Next.js", "Trading Platform", "Financial Tech", "Landing Page", "Dark Mode"],
    appTypes: ["web"],
    layout: "desktop",
    description:
      "High-performance trading platform web portal for futures and derivatives trading. Features zero account minimums, broker connectivity, live market telemetry previews, responsive dark-mode layouts, and interactive platform onboarding.",
    websiteLink: "https://trading-platform-landing-page-rose.vercel.app/",
    githubLink: "https://github.com/rosdeb/TradeLMT",
    screenshots: shots([["/tradelmt_hero.webp", "TradeLMT trading platform portal"]]),
  },
  {
    id: "saferadar",
    name: "SafeRadar",
    year: "2025",
    tags: ["iOS", "Real-time", "Safety"],
    appTypes: ["native"],
    description:
      "SafeRadar is a real-time safety assistance app that connects people who need help with compassionate volunteers ready to provide support, putting an immediate safety network at users' fingertips.",
    websiteLink: "https://www.saferadar.net/",
    appStoreLink: "https://apps.apple.com/us/app/saferadar/id6758638644",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.saferadar.net",
    screenshots: shots([
      ["/saferadar-splash.png", "SafeRadar splash screen"],
      ["/saferadar-welcome.png", "SafeRadar welcome screen"],
      ["/saferadar-signin.png", "SafeRadar sign in screen"],
      ["/saferadar-home.png", "SafeRadar home emergency screen"],
      ["/saferadar-location.png", "SafeRadar location sharing screen"],
      ["/saferadar-map.png", "SafeRadar live tracking map screen"],
    ]),
  },
  {
    id: "koko",
    name: "Koko App",
    year: "2025",
    tags: ["Android", "iOS", "IoT", "BLE", "Wi-Fi FTP", "Device Control"],
    appTypes: ["native"],
    description:
      "Koko App is a mobile device-control project for managing connected hardware from one place, including light control, volume adjustment, alarms, screen lock, sleep timers, Wi-Fi FTP file-system transfer, classic media playback, and BLE-based device communication.",
    websiteLink: "https://kokocreates.com/",
    appStoreLink: "https://apps.apple.com/app/koko-creates/id6759178175",
    screenshots: shots([
      ["/koko_1.jpeg", "Koko App splash screen"],
      ["/koko_login.jpeg", "Koko App login screen"],
      ["/koko_dashboard.jpeg", "Koko App dashboard screen"],
      ["/koko_settings.jpeg", "Koko App settings screen"],
      ["/koko_light_controll.jpeg", "Koko App light control screen"],
      ["/koko_story_generation.jpeg", "Koko App story generation screen"],
      ["/koko_character.jpeg", "Koko App character screen"],
      ["/koko_profile_update.jpeg", "Koko App profile update screen"],
      ["/device_connect_screen.jpeg", "Koko App device connection screen"],
    ]),
  },
  {
    id: "parkelo",
    name: "Parkelo",
    year: "2025",
    tags: ["Parking Management", "Flutter", "Real-Time", "IoT", "Location Services"],
    appTypes: ["flutter", "native"],
    description:
      "Smart parking management and booking system designed to simplify parking space discovery, real-time slot reservation, ticketless check-in, and automated parking fee management for drivers and parking operators.",
    githubLink: "https://github.com/Rosdeb/Parkelo",
  },
  {
    id: "shopreal",
    name: "Shopreal",
    year: "2025",
    tags: ["AI", "Product Validation", "E-commerce", "Dropshipping", "Developer Tool"],
    appTypes: ["tools"],
    description:
      "Shopreal helps sellers validate products from an image or product link, checking whether an item looks trustworthy, has strong market potential, and is a good fit for dropshipping before they spend time or money promoting it.",
    screenshots: shots([
      ["/home_screen.jpeg", "Shopreal home screen"],
      ["/product_details.jpeg", "Shopreal product details screen"],
      ["/card.jpeg", "Shopreal product validation card"],
      ["/profile.jpeg", "Shopreal profile screen"],
    ]),
  },
  {
    id: "koukoutsa",
    name: "Koukoutsa",
    year: "July 2025",
    tags: ["Flutter", "SMS System", "Classification"],
    appTypes: ["flutter", "native"],
    description:
      "Koukoutsa is a smart student attendance management app for schools, coaching centers, and training institutes. It simplifies tracking presence, absence, and leave, and automatically sends a message or alert to a parent or registered contact when a student is not present.",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.niki.koukoutsa",
    screenshots: shots([
      ["/Onboarding.png", "Koukoutsa onboarding screen"],
      ["/Sign Up.png", "Koukoutsa sign up screen"],
      ["/Home.png", "Koukoutsa home screen"],
      ["/All Classes.png", "Koukoutsa all classes screen"],
      ["/Class Details.png", "Koukoutsa class details screen"],
      ["/Class Details (1).png", "Koukoutsa class details screen, attendance view"],
      ["/My Profile.png", "Koukoutsa profile screen"],
    ]),
  },
  {
    id: "wellbyn",
    name: "Wellbyn",
    year: "June 2025",
    tags: ["Flutter", "WebSocket", "Node.js", "Firebase", "Real-time", "Doctor-Patient Communication"],
    appTypes: ["flutter"],
    description:
      "Healthcare management platform that enables patients to book appointments, receive medication reminders, securely store medical records, manage insurance, and automatically reschedule appointments while helping doctors streamline patient care.",
    websiteLink: "https://www.wellbyn.ai/",
  },
  {
    id: "koch-heritage",
    name: "Koch Heritage",
    year: "2025",
    tags: ["Web Development", "Next.js", "Cultural Heritage", "One-Page", "Responsive"],
    appTypes: ["web"],
    description:
      "An editorial one-page cultural website dedicated to the history, indigenous traditions, art, and heritage of the Koch people. Built with fluid animations, responsive typography, and archival storytelling.",
    websiteLink: "https://koch-people-one-page-website.vercel.app/",
    githubLink: "https://github.com/Rosdeb/Tintekiya_Koch_Website",
  },
  {
    id: "legier",
    name: "LEG!ER GLOBAL NEWS",
    year: "2024",
    tags: ["Flutter", "Live News", "Multilingual"],
    appTypes: ["flutter"],
    description:
      "LEG!ER GLOBAL NEWS brings together 115 newspapers from around the world, including 72 live online publications, with breaking headlines, video reports, multilingual content, and article listening in one global news experience.",
    websiteLink: "https://legiergroup.com/en/",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.pagedrop.lagier&hl=en",
    appStoreLink: "https://apps.apple.com/au/app/legier-global-news/id6756674261",
    screenshots: shots([
      ["/legier-home.webp", "Legier home screen"],
      ["/legier-video.webp", "Legier video and live news screen"],
      ["/legier-newspapers.png", "Legier newspapers screen"],
      ["/legier-news-details.png", "Legier news details screen"],
      ["/legier-more.png", "Legier more news screen"],
    ]),
  },
  {
    id: "riptide",
    name: "Riptide Rentals",
    year: "2024",
    tags: ["SwiftUI", "iOS", "Apple Build"],
    appTypes: ["native"],
    description:
      "Completely free SwiftUI app for Riptide Jet Ski Rentals in southwest Florida, built to guide riders with easy navigation to popular spots, landmarks, wildlife areas, islands, and sandbars right from the water.",
    websiteLink: "https://www.riptiderentals.com/",
    appStoreLink: "https://apps.apple.com/au/app/riptide-rentals/id6757623532",
    screenshots: shots([
      ["/riptide-rentals-map.webp", "Riptide Rentals navigation screen"],
      ["/riptide-rentals-points.webp", "Riptide Rentals points of interest screen"],
      ["/0x0ss.png", "Riptide Rentals additional app screen"],
    ]),
  },
  {
    id: "rentalvate",
    name: "Rentalvate",
    year: "2022",
    tags: ["Swift", "CloudKit", "iOS SDK"],
    appTypes: ["native"],
    description: "Interactive iOS learning platform with course management, guided lessons, and progress tracking.",
  },
  {
    id: "momapp",
    name: "The Mom App",
    year: "2022",
    tags: ["Kotlin", "Maps SDK", "Django"],
    appTypes: ["native"],
    description:
      "The Mom App helps busy moms reclaim time, reduce stress, and stay organized from one AI-powered hub. Whether you're juggling work, kids, calendars, meals, chores, reminders, passwords, or grocery lists, it helps you organize and share the load.",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.momapp.family",
    appStoreLink: "https://apps.apple.com/app/id6756739178",
    websiteLink: "https://themom.app/",
  },
]

export default function Projects() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [selectedTab, setSelectedTab] = useState<string>("all")
  const [lightbox, setLightbox] = useState<{ project: Project; index: number } | null>(null)
  const [mounted, setMounted] = useState(false)

  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  })
  const tabsRef = useRef<Record<string, HTMLButtonElement | null>>({})
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const filteredProjects =
    selectedTab === "all"
      ? projects
      : projects.filter((project) => project.appTypes?.includes(selectedTab))

  const getTabCount = (tabId: string) => {
    if (tabId === "all") return projects.length
    return projects.filter((p) => p.appTypes?.includes(tabId)).length
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  // Update sliding indicator position smoothly
  useEffect(() => {
    const activeEl = tabsRef.current[selectedTab]
    if (activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        opacity: 1,
      })
    }
  }, [selectedTab])

  // Keep indicator aligned on window resize
  useEffect(() => {
    const onResize = () => {
      const activeEl = tabsRef.current[selectedTab]
      if (activeEl) {
        setIndicatorStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          opacity: 1,
        })
      }
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [selectedTab])

  const handleTabClick = (tabId: string) => {
    if (tabId === selectedTab) return
    setSelectedTab(tabId)

    // Synchronously update indicator to eliminate any single-frame delay
    const activeEl = tabsRef.current[tabId]
    if (activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        opacity: 1,
      })
    }

    // Only scroll tab track if button is partially or fully off-screen (prevents tab bar jitter on clicks)
    const wrapper = wrapperRef.current
    if (wrapper && activeEl && wrapper.scrollWidth > wrapper.clientWidth) {
      const buttonLeft = activeEl.offsetLeft
      const buttonRight = buttonLeft + activeEl.offsetWidth
      const viewLeft = wrapper.scrollLeft
      const viewRight = viewLeft + wrapper.clientWidth

      if (buttonLeft < viewLeft + 12) {
        wrapper.scrollTo({ left: Math.max(0, buttonLeft - 16), behavior: "smooth" })
      } else if (buttonRight > viewRight - 12) {
        wrapper.scrollTo({
          left: buttonRight - wrapper.clientWidth + 16,
          behavior: "smooth",
        })
      }
    }

    if (activeId) {
      const exists = (
        tabId === "all"
          ? projects
          : projects.filter((p) => p.appTypes?.includes(tabId))
      ).some((p) => p.id === activeId)
      if (!exists) setActiveId(null)
    }
  }

  return (
    <section
      id="projects"
      style={{
        padding: "120px 32px",
        borderTop: "1px solid var(--border)",
        backgroundColor: "var(--background)",
      }}
    >
      <div style={{ maxWidth: "var(--container-width)", margin: "0 auto" }}>
        <p
          style={{
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: "24px",
            fontFamily: "var(--font-inter, Inter, sans-serif)",
          }}
        >
          05 — Work
        </p>

        <h2
          style={{
            fontFamily: "var(--font-syne, Syne, sans-serif)",
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            color: "var(--foreground)",
            marginBottom: "18px",
          }}
        >
          Selected Projects & Tools
        </h2>

        <p
          style={{
            maxWidth: "760px",
            fontSize: "15px",
            lineHeight: "1.8",
            color: "var(--muted-light)",
            marginBottom: "32px",
            fontFamily: "var(--font-inter, Inter, sans-serif)",
          }}
        >
          A selection of mobile applications, developer workstations, utilities, and web platforms I have architected, built, and shipped, newest first.
        </p>

        {/* ── Responsive Segmented Control with Smooth Sliding Indicator ── */}
        <div ref={wrapperRef} className="project-tabbar-wrapper">
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="project-tabbar-track"
          >
            {/* Smooth Sliding Pill Indicator with GPU Acceleration */}
            <div
              aria-hidden
              className="project-tab-indicator"
              style={{
                transform: `translateX(${indicatorStyle.left}px)`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
                transition: mounted
                  ? "transform 0.26s cubic-bezier(0.2, 0.9, 0.3, 1), width 0.26s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.18s ease"
                  : "none",
              }}
            />

            {filterTabs.map((tab) => {
              const isSelected = selectedTab === tab.id
              const count = getTabCount(tab.id)

              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabsRef.current[tab.id] = el
                  }}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => handleTabClick(tab.id)}
                  className={`project-tab-btn ${isSelected ? "tab-active" : ""}`}
                >
                  <span className="tab-btn-label">{tab.label}</span>
                  <span className={`tab-btn-badge ${isSelected ? "badge-active" : ""}`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Filtered Project Rows ── */}
        <div
          key={selectedTab}
          className="project-rows-container"
          style={{
            borderBottom: "1px solid var(--border-muted)",
            minHeight: "440px",
          }}
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, i) => (
              <ProjectRow
                key={project.id}
                index={String(i + 1).padStart(2, "0")}
                project={project}
                isActive={activeId === project.id}
                onToggle={() => setActiveId((cur) => (cur === project.id ? null : project.id))}
                onOpenShot={(shotIndex) => setLightbox({ project, index: shotIndex })}
                animDelay={Math.min(i * 18, 160)}
              />
            ))
          ) : (
            <div
              style={{
                padding: "48px 16px",
                textAlign: "center",
                color: "var(--muted)",
                fontSize: "14px",
                borderTop: "1px solid var(--border-muted)",
                fontFamily: "var(--font-inter, Inter, sans-serif)",
              }}
            >
              No projects found for this category.
            </div>
          )}
        </div>
      </div>

      {lightbox && (
        <Lightbox
          project={lightbox.project}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onIndex={(i) => setLightbox((l) => (l ? { ...l, index: i } : l))}
        />
      )}

      <style>{`
        .project-tabbar-wrapper {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 4px 0 10px;
          margin-bottom: 28px;
        }

        .project-tabbar-wrapper::-webkit-scrollbar {
          display: none;
        }

        .project-tabbar-track {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 4px;
          border-radius: 999px;
          background-color: var(--surface);
          border: 1px solid var(--border);
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
          white-space: nowrap;
        }

        .project-tab-indicator {
          position: absolute;
          top: 4px;
          bottom: 4px;
          left: 0;
          border-radius: 999px;
          background-color: var(--foreground);
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.16);
          pointer-events: none;
          will-change: transform, width;
          z-index: 1;
        }

        .project-tab-btn {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 16px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.01em;
          cursor: pointer;
          white-space: nowrap;
          border: none;
          background: transparent;
          color: var(--muted);
          transition: color 0.18s ease;
          font-family: var(--font-inter, Inter, sans-serif);
          user-select: none;
          -webkit-user-select: none;
          -webkit-tap-highlight-color: transparent;
          outline: none;
        }

        .project-tab-btn:hover {
          color: var(--foreground);
        }

        .project-tab-btn.tab-active {
          color: var(--background);
        }

        .tab-btn-label {
          pointer-events: none;
        }

        .tab-btn-badge {
          font-size: 11px;
          font-weight: 700;
          min-width: 19px;
          text-align: center;
          padding: 1px 7px;
          border-radius: 999px;
          background-color: var(--border-muted);
          color: var(--muted);
          line-height: 1.25;
          transition: background-color 0.2s ease, color 0.2s ease;
          pointer-events: none;
        }

        .tab-btn-badge.badge-active {
          background-color: rgba(255, 255, 255, 0.22);
          color: var(--background);
        }

        @keyframes projectRowFadeIn {
          0% {
            opacity: 0;
            transform: translateY(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .project-row-item {
          will-change: opacity, transform;
        }

        @media (max-width: 640px) {
          .project-tab-btn {
            padding: 7px 12px !important;
            font-size: 12px !important;
            gap: 5px !important;
          }
          .tab-btn-badge {
            font-size: 10px !important;
            padding: 1px 5px !important;
          }
        }

        @media (max-width: 600px) {
          .project-row-inner {
            grid-template-columns: 40px 1fr !important;
          }

          .project-row-meta {
            display: none !important;
          }

          .project-expanded {
            padding-left: 16px !important;
          }

          .project-links {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }

          .project-shot-grid {
            gap: 12px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .project-collapse,
          .project-tab-indicator,
          .project-row-item {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}

function ProjectRow({
  project,
  index,
  isActive,
  onToggle,
  onOpenShot,
  animDelay = 0,
}: {
  project: Project
  index: string
  isActive: boolean
  onToggle: () => void
  onOpenShot: (i: number) => void
  animDelay?: number
}) {
  const [hovered, setHovered] = useState(false)
  const panelId = `project-panel-${project.id}`
  const isDesktop = project.layout === "desktop"

  return (
    <div
      className="project-row-item"
      style={{
        borderTop: "1px solid var(--border-muted)",
        transition: "background-color 0.2s ease",
        backgroundColor: hovered || isActive ? "rgba(37, 99, 235, 0.08)" : "transparent",
        animation: "projectRowFadeIn 0.26s cubic-bezier(0.16, 1, 0.3, 1) both",
        animationDelay: `${animDelay}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isActive}
        aria-controls={panelId}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onToggle()
          }
        }}
        className="project-row-inner"
        style={{
          display: "grid",
          gridTemplateColumns: "56px 1fr auto",
          gap: "24px",
          alignItems: "center",
          padding: "24px 16px",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-syne, Syne, sans-serif)",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: isActive ? "var(--accent-warm)" : "var(--muted)",
            transition: "color 0.2s ease",
          }}
        >
          {index}
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
          <span
            style={{
              fontFamily: "var(--font-syne, Syne, sans-serif)",
              fontSize: "clamp(16px, 2.5vw, 22px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: hovered || isActive ? "var(--foreground)" : "var(--muted-light)",
              transition: "color 0.2s ease",
            }}
          >
            {project.name}
          </span>

          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "10px",
                  color: "var(--muted)",
                  border: "1px solid var(--border)",
                  borderRadius: "999px",
                  padding: "4px 10px",
                  backgroundColor: "var(--surface)",
                  fontFamily: "var(--font-inter, Inter, sans-serif)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="project-row-meta" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {project.screenshots && project.screenshots.length > 0 && (
            <div
              aria-hidden
              style={{
                display: "flex",
                gap: "4px",
                alignItems: "center",
                opacity: isActive ? 0 : hovered ? 1 : 0.6,
                transition: "opacity 0.2s ease",
              }}
            >
              {project.screenshots.slice(0, 3).map((shot, i) => (
                <div
                  key={`${shot.src}-thumb-${i}`}
                  style={{
                    position: "relative",
                    width: isDesktop ? "44px" : "22px",
                    height: isDesktop ? "25px" : "48px",
                    borderRadius: "5px",
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                  }}
                >
                  <Image
                    src={encodeURI(shot.src)}
                    alt=""
                    fill
                    sizes={isDesktop ? "44px" : "22px"}
                    style={{ objectFit: "cover", objectPosition: "top" }}
                  />
                </div>
              ))}
            </div>
          )}
          <span style={{ fontSize: "12px", color: "var(--muted)", fontFamily: "var(--font-inter, Inter, sans-serif)" }}>
            {project.year}
          </span>
          <span
            aria-hidden
            style={{
              width: "28px",
              height: "28px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "999px",
              border: "1px solid var(--border)",
              backgroundColor: isActive ? "rgba(37, 99, 235, 0.1)" : "var(--surface)",
              fontSize: "15px",
              fontWeight: 700,
              transition: "background-color 0.2s ease, color 0.2s ease",
              color: isActive ? "var(--accent)" : "var(--muted)",
              lineHeight: 1,
            }}
          >
            {isActive ? "↑" : "↓"}
          </span>
        </div>
      </div>

      {/* grid-rows animation: height follows content, so nothing gets clipped */}
      <div
        id={panelId}
        role="region"
        aria-label={`${project.name} details`}
        className="project-collapse"
        style={{
          display: "grid",
          gridTemplateRows: isActive ? "1fr" : "0fr",
          opacity: isActive ? 1 : 0,
          visibility: isActive ? "visible" : "hidden",
          transition: `grid-template-rows 0.35s ease, opacity 0.25s ease, visibility 0s linear ${isActive ? "0s" : "0.35s"}`,
        }}
      >
        <div style={{ overflow: "hidden", minHeight: 0 }}>
          <div
            className="project-expanded"
            style={{ padding: "0 16px 24px 96px", display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.7",
                color: "var(--muted-light)",
                maxWidth: "680px",
                fontFamily: "var(--font-inter, Inter, sans-serif)",
              }}
            >
              {project.description}
            </p>

            {project.screenshots && project.screenshots.length > 0 && (
              <div
                className="project-shot-grid"
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  gap: "14px",
                  alignItems: "stretch",
                  overflowX: "auto",
                  paddingBottom: "6px",
                }}
              >
                {project.screenshots.map((shot, i) => (
                  <button
                    type="button"
                    key={`${shot.src}-${i}`}
                    onClick={() => onOpenShot(i)}
                    aria-label={`Enlarge: ${shot.alt}`}
                    style={{
                      flex: isDesktop ? "0 0 280px" : "0 0 180px",
                      borderRadius: "18px",
                      padding: "8px",
                      border: "1px solid var(--border)",
                      background: "var(--surface)",
                      cursor: "zoom-in",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: isDesktop ? "16 / 9" : "9 / 19.5",
                        borderRadius: "12px",
                        overflow: "hidden",
                        background: "var(--border-muted)",
                      }}
                    >
                      <Image
                        src={encodeURI(shot.src)}
                        alt={shot.alt}
                        fill
                        sizes={isDesktop ? "280px" : "180px"}
                        style={{ objectFit: "cover", objectPosition: "top" }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}

            <div className="project-links" style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {project.playStoreLink && <ProjectLink href={project.playStoreLink} label="Play Store" />}
              {project.appStoreLink && <ProjectLink href={project.appStoreLink} label="App Store" />}
              {project.websiteLink && <ProjectLink href={project.websiteLink} label="Website" />}
              {project.githubLink && <ProjectLink href={project.githubLink} label="GitHub" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontSize: "12px",
        fontWeight: 600,
        color: "var(--accent-warm)",
        textDecoration: "none",
        letterSpacing: "0.01em",
        fontFamily: "var(--font-inter, Inter, sans-serif)",
      }}
    >
      {label} ↗
    </a>
  )
}

function Lightbox({
  project,
  index,
  onClose,
  onIndex,
}: {
  project: Project
  index: number
  onClose: () => void
  onIndex: (i: number) => void
}) {
  const shots = project.screenshots ?? []
  const total = shots.length

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (total > 1 && e.key === "ArrowLeft") onIndex((index - 1 + total) % total)
      if (total > 1 && e.key === "ArrowRight") onIndex((index + 1) % total)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [index, total, onClose, onIndex])

  const shot = shots[index]
  if (!shot) return null

  const navBtn: CSSProperties = {
    width: "44px",
    height: "44px",
    borderRadius: "999px",
    border: "1px solid var(--border)",
    background: "var(--surface)",
    color: "var(--foreground)",
    fontSize: "20px",
    cursor: "pointer",
    flex: "0 0 auto",
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} screenshots`}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0, 0, 0, 0.85)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        padding: "24px",
      }}
    >
      <button
        type="button"
        autoFocus
        onClick={onClose}
        aria-label="Close"
        style={{ ...navBtn, position: "absolute", top: "20px", right: "20px", fontSize: "18px" }}
      >
        ✕
      </button>

      <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {total > 1 && (
          <button type="button" aria-label="Previous screenshot" style={navBtn} onClick={() => onIndex((index - 1 + total) % total)}>
            ←
          </button>
        )}
        <div style={{ position: "relative", width: "min(92vw, 920px)", height: "min(82vh, 660px)" }}>
          <Image
            key={shot.src}
            src={encodeURI(shot.src)}
            alt={shot.alt}
            fill
            priority
            sizes="920px"
            style={{ objectFit: "contain" }}
          />
        </div>
        {total > 1 && (
          <button type="button" aria-label="Next screenshot" style={navBtn} onClick={() => onIndex((index + 1) % total)}>
            →
          </button>
        )}
      </div>

      <p
        onClick={(e) => e.stopPropagation()}
        style={{ margin: 0, fontSize: "12px", color: "var(--muted-light)", fontFamily: "var(--font-inter, Inter, sans-serif)" }}
      >
        {shot.alt} · {index + 1} / {total}
      </p>
    </div>
  )
}
