export default function StatusBadge({ status }: { status: string }) {
  let colorStyles = "bg-gray-100 text-gray-700 border-gray-200";
  let label = status;

  switch (status) {
    case "NEW":
      colorStyles = "bg-amber-50 text-amber-800 border-amber-300";
      label = "Baru Masuk";
      break;
    case "CONTACTED":
      colorStyles = "bg-blue-50 text-blue-800 border-blue-300";
      label = "Dihubungi";
      break;
    case "IN_PROGRESS":
      colorStyles = "bg-indigo-50 text-indigo-800 border-indigo-300";
      label = "Dalam Proses";
      break;
    case "COMPLETED":
      colorStyles = "bg-emerald-50 text-emerald-800 border-emerald-300";
      label = "Selesai";
      break;
    case "CANCELLED":
      colorStyles = "bg-rose-50 text-rose-800 border-rose-300";
      label = "Dibatalkan";
      break;
    case "PUBLISHED":
      colorStyles = "bg-emerald-50 text-emerald-800 border-emerald-300";
      label = "Terbit";
      break;
    case "DRAFT":
      colorStyles = "bg-gray-100 text-gray-700 border-gray-300";
      label = "Draf";
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border ${colorStyles}`}
    >
      {label}
    </span>
  );
}
