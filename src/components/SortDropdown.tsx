"use client";

import { useRouter } from "next/navigation";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "rate_low", label: "Hourly Rate: Low to High" },
  { value: "rate_high", label: "Hourly Rate: High to Low" },
];

export default function SortDropdown({
  sort,
  search,
  type,
  category,
}: {
  sort: string;
  search?: string;
  type?: string;
  category?: string;
}) {
  const router = useRouter();

  const handleChange = (value: string) => {
    const p = new URLSearchParams();
    if (search) p.set("search", search);
    if (type) p.set("type", type);
    if (category) p.set("category", category);
    if (value !== "newest") p.set("sort", value);
    router.push(`/posts${p.toString() ? `?${p.toString()}` : ""}`);
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <label className="text-slate-400">Sort by:</label>
      <select
        value={sort}
        onChange={(e) => handleChange(e.target.value)}
        className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
