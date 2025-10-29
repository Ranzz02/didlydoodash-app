import React from "react";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Optional label text displayed above or beside the select */
  label?: string;

  /** Unique id (used to link label and select for accessibility) */
  id?: string;

  /** Select options (array of { value, label }) */
  options?: { value: string; label: string }[];

  /** Optional className for container */
  className?: string;
}

export function Select({
  label,
  id,
  options = [],
  className,
  ...props
}: SelectProps) {
  const selectId = id ?? React.useId(); // ensure a stable id if not provided

  return (
    <div className={className}>
      {label && <label htmlFor={selectId}>{label}</label>}
      <select id={selectId} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
