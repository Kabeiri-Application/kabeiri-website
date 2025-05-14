export function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-4 rounded-xl border border-transparent p-4 transition-all hover:scale-105 hover:border-gray-200 hover:bg-gray-100">
      {icon}
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
