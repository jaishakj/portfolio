import { techIcons } from './TechIcons';

export function TechTag({ name }: { name: string }) {
  const Icon = techIcons[name];
  return (
    <span className="tag">
      {Icon && <Icon width={14} height={14} aria-hidden="true" />}
      {name}
    </span>
  );
}
