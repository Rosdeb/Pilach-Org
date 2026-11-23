"use client"

import type React from "react"
import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const spinnerDelays = Array.from({ length: 12 }, (_, index) => `${index * 0.083}s`)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setSubmitted(true)
        setFormData({ name: "", email: "", message: "" })
      } else {
        const err = await res.json()
        alert(`Error: ${err.error || "Failed to send message"}`)
      }
    } catch (err) {
      alert("Network error. Please try again later.")
    } finally {
      setLoading(false)
      setTimeout(() => setSubmitted(false), 5000)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "#ffffff",
    border: "1px solid var(--border)",
    borderRadius: "4px",
    color: "var(--foreground)",
    fontSize: "14px",
    fontFamily: "var(--font-inter, Inter, sans-serif)",
    fontWeight: 300,
    outline: "none",
    transition: "border-color 0.2s ease",
  }

  const submitButtonStyle: React.CSSProperties = {
    alignSelf: "flex-start",
    minWidth: "180px",
    justifyContent: "center",
    padding: "14px 22px",
    borderRadius: "999px",
    fontWeight: 600,
    letterSpacing: "-0.01em",
    cursor: loading ? "not-allowed" : "pointer",
    opacity: 1,
    background: loading
      ? "linear-gradient(180deg, #60a5fa 0%, #2563eb 100%)"
      : "linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)",
    borderColor: "rgba(37, 99, 235, 0.22)",
    boxShadow: loading
      ? "0 10px 30px rgba(37, 99, 235, 0.22), inset 0 1px 0 rgba(255,255,255,0.22)"
      : "0 12px 30px rgba(37, 99, 235, 0.24), inset 0 1px 0 rgba(255,255,255,0.18)",
    transform: loading ? "scale(0.985)" : "scale(1)",
    transition:
      "background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
  }

  return (
    <section
      id="contact"
      style={{
        padding: "120px 32px",
        borderTop: "1px solid var(--border)",
        backgroundColor: "var(--background)",
      }}
    >
      <div style={{ maxWidth: "var(--container-width)", margin: "0 auto" }}>
        {/* Section label */}
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
          06 — Contact
        </p>

        <h2
          style={{
            fontFamily: "var(--font-syne, Syne, sans-serif)",
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            color: "var(--foreground)",
            marginBottom: "64px",
          }}
        >
          Let's Work Together
        </h2>

        {/* Large email */}
        <div style={{ marginBottom: "72px" }}>
          <p
            style={{
              fontSize: "12px",
              color: "var(--muted)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "12px",
              fontFamily: "var(--font-inter, Inter, sans-serif)",
            }}
          >
            Reach out directly
          </p>
          <a
            href="mailto:rosdevkoch@gmail.com"
            style={{
              fontFamily: "var(--font-syne, Syne, sans-serif)",
              fontSize: "clamp(22px, 4vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "var(--foreground)",
              textDecoration: "none",
              transition: "color 0.2s ease",
              display: "inline-block",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--foreground)")}
          >
            rosdevkoch@gmail.com
          </a>

          {/* Social links */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "24px",
              flexWrap: "wrap",
            }}
          >
            {[
              {
                label: "GitHub",
                href: "https://github.com/Rosdeb",
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                ),
              },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/rosdev-koch-260005324/",
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.66 1.66 0 0 0-1.66 1.66c0 .92.74 1.66 1.66 1.66a1.66 1.66 0 0 0 1.66-1.66c0-.92-.74-1.66-1.66-1.66z" />
                  </svg>
                ),
              },
              {
                label: "Twitter",
                href: "https://x.com",
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ),
              },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--muted-light)",
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: "7px 14px",
                  borderRadius: "999px",
                  textDecoration: "none",
                  fontFamily: "var(--font-inter, Inter, sans-serif)",
                  letterSpacing: "0.01em",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--accent)"
                  e.currentTarget.style.borderColor = "var(--accent)"
                  e.currentTarget.style.transform = "translateY(-1px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--muted-light)"
                  e.currentTarget.style.borderColor = "var(--border)"
                  e.currentTarget.style.transform = "translateY(0)"
                }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", color: "currentColor" }}>
                  {link.icon}
                </span>
                <span>{link.label}</span>
                <span style={{ fontSize: "11px", opacity: 0.65 }}>↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: "var(--border-muted)", marginBottom: "64px" }} />

        {/* Contact form */}
        <div style={{ maxWidth: "560px" }}>
          <p
            style={{
              fontSize: "13px",
              color: "var(--muted)",
              marginBottom: "32px",
              fontFamily: "var(--font-inter, Inter, sans-serif)",
              lineHeight: "1.6",
            }}
          >
            Or use the form below — I usually respond within 48 hours.
          </p>

          {submitted && (
            <div
              style={{
                padding: "16px 20px",
                border: "1px solid rgba(16, 185, 129, 0.5)",
                borderRadius: "8px",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                animation: "fadeIn 0.3s ease",
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <p
                style={{
                  fontSize: "15px",
                  color: "#10b981",
                  fontWeight: 600,
                  fontFamily: "var(--font-inter, Inter, sans-serif)",
                  margin: 0,
                }}
              >
                Email sent successfully! I'll be in touch soon.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              />
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              />
              <textarea
                name="message"
                placeholder="Your message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                style={{ ...inputStyle, resize: "none" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                aria-busy={loading}
                style={submitButtonStyle}
              >
                {loading ? (
                  <>
                    <span className="cupertino-spinner" aria-hidden="true">
                      {spinnerDelays.map((delay, index) => (
                        <span
                          key={delay}
                          className="cupertino-spinner-blade"
                          style={{
                            transform: `rotate(${index * 30}deg)`,
                            animationDelay: delay,
                          }}
                        />
                      ))}
                    </span>
                    <span>Sending Message</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "20px",
                        height: "20px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(255, 255, 255, 0.14)",
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M2 7h10M8 3l4 4-4 4" />
                      </svg>
                    </span>
                  </>
                )}
              </button>
            </form>
        </div>
      </div>
    </section>
  )
}
