"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CustomSelect.module.css";

export type SelectOption = { label: string; value: string };

type Props = {
  id: string;
  placeholder: string;
  options: SelectOption[];
};

// Fully custom dropdown UI on top of a visually-hidden native select.
// The native element keeps form semantics (required, name) and lets external
// code prefill it — setting its .value and dispatching "change" syncs this UI.
export default function CustomSelect({ id, placeholder, options }: Props) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const nativeRef = useRef<HTMLSelectElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close on outside pointer / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Reflect programmatic changes to the hidden native select (TableBooking).
  useEffect(() => {
    const sel = nativeRef.current;
    if (!sel) return;
    const sync = () => setValue(sel.value);
    sel.addEventListener("change", sync);
    return () => sel.removeEventListener("change", sync);
  }, []);

  const choose = (v: string) => {
    setValue(v);
    setOpen(false);
    if (nativeRef.current) nativeRef.current.value = v;
    triggerRef.current?.focus();
  };

  const onTriggerKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={rootRef} className={styles.root}>
      <select
        ref={nativeRef}
        id={id}
        name={id}
        className={styles.native}
        required
        tabIndex={-1}
        aria-hidden="true"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      <button
        ref={triggerRef}
        type="button"
        className={`${styles.trigger} ${open ? styles.triggerOpen : ""} ${selected ? "" : styles.triggerEmpty}`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onTriggerKey}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <svg
          className={`${styles.chevron} ${open ? styles.chevronUp : ""}`}
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div className={`${styles.panel} ${open ? styles.panelOpen : ""}`} role="listbox" aria-label={placeholder}>
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            role="option"
            aria-selected={o.value === value}
            className={`${styles.option} ${o.value === value ? styles.optionSelected : ""}`}
            onClick={() => choose(o.value)}
            tabIndex={open ? 0 : -1}
          >
            {o.label}
            {o.value === value && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
