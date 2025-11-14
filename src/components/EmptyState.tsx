import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
  action?: {
    label: string;
    href: string;
  };
}

export default function EmptyState({ title, description, icon = '📭', action }: EmptyStateProps) {
  return (
    <div className="card p-12 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      {action && (
        <Link
          to={action.href}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-all shadow-sm hover:shadow-md"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

