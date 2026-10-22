import { useState, useEffect, useRef } from 'react';
import { useTheme, THEME_PRESETS, type Appearance } from '../context/ThemeContext';
import { Icon } from './Icon';

export function ThemeCustomizer() {
  const { accent, appearance, setAccent, setAppearance, resetTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [customColor, setCustomColor] = useState(accent);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // sync custom color input when accent changes externally
  useEffect(() => { setCustomColor(accent); }, [accent]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        btnRef.current && !btnRef.current.contains(e.target as Node)
      ) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  function handleCustomColor(hex: string) {
    setCustomColor(hex);
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) setAccent(hex);
  }

  function handleCopy() {
    navigator.clipboard.writeText(accent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  const appearanceOptions: { value: Appearance; label: string; icon: string }[] = [
    { value: 'light',  label: 'Light',  icon: '☀️' },
    { value: 'dark',   label: 'Dark',   icon: '🌙' },
    { value: 'system', label: 'System', icon: '💻' },
  ];

  return (
    <div style={{ position: 'relative' }}>
      <button
        ref={btnRef}
        className="theme-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open theme customizer"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <Icon name="Palette" size={16} />
      </button>

      {open && (
        <div
          ref={panelRef}
          className="theme-panel"
          role="dialog"
          aria-label="Theme customizer"
        >
          {/* Header */}
          <div className="theme-panel-header">
            <span className="theme-panel-title">Customize Theme</span>
            <button className="modal-close" onClick={() => setOpen(false)} aria-label="Close theme panel">
              <Icon name="X" size={14} />
            </button>
          </div>

          <div className="theme-panel-body">
            {/* Accent Color Presets */}
            <div>
              <div className="theme-section-label">Accent Color</div>
              <div className="color-presets">
                {THEME_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    className={`color-preset-btn${accent === preset.color ? ' selected' : ''}`}
                    onClick={() => setAccent(preset.color)}
                    aria-label={`Select ${preset.name} accent`}
                    aria-pressed={accent === preset.color}
                  >
                    <span
                      className="color-swatch"
                      style={{ background: preset.color }}
                    />
                    <span className="color-preset-name">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Color Picker */}
            <div>
              <div className="theme-section-label">Custom Color</div>
              <div className="custom-color-row">
                <input
                  type="color"
                  className="custom-color-input"
                  value={customColor}
                  onChange={(e) => handleCustomColor(e.target.value)}
                  aria-label="Pick custom accent color"
                />
                <span className="custom-hex">{accent.toUpperCase()}</span>
                <button className="copy-btn" onClick={handleCopy} aria-label="Copy hex color">
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Appearance */}
            <div>
              <div className="theme-section-label">Appearance</div>
              <div className="appearance-selector">
                {appearanceOptions.map(({ value, label, icon }) => (
                  <button
                    key={value}
                    className={`appearance-btn${appearance === value ? ' selected' : ''}`}
                    onClick={() => setAppearance(value)}
                    aria-pressed={appearance === value}
                    aria-label={`${label} mode`}
                  >
                    <span className="appearance-icon">{icon}</span>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            <button className="reset-btn" onClick={resetTheme} aria-label="Reset to default theme">
              ↺ Reset to default
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
