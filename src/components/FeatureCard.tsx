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
    <div className='space-y-4 hover:bg-gray-100 p-4 rounded-xl border border-transparent hover:border-gray-200 hover:scale-105 transition-all'>
      {icon}
      <h3 className='text-xl font-semibold'>{title}</h3>
      <p className='text-gray-600'>{description}</p>
    </div>
  );
}
