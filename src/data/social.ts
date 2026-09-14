import type { ComponentType, SVGProps } from 'react';
import { Mail, Phone } from 'lucide-react';
import {
  GitHubIcon,
  LinkedInIcon,
  XIcon,
  MastodonIcon,
  DiscordIcon,
  TelegramIcon,
  MediumIcon,
  LemmyIcon,
} from '../components/Contact/BrandIcons';

export type SocialLink = {
  label: string;
  value: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const socialLinks: SocialLink[] = [
  {
    label: 'Email',
    value: 'jaishak.dev@gmail.com',
    href: 'mailto:jaishak.dev@gmail.com',
    icon: Mail,
  },
  {
    label: 'Phone',
    value: '+91 9345589347',
    href: 'tel:+919345589347',
    icon: Phone,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/jaishakj',
    href: 'https://www.linkedin.com/in/jaishakj',
    icon: LinkedInIcon,
  },
  {
    label: 'X / Twitter',
    value: 'x.com/jaishak_j',
    href: 'https://x.com/jaishak_j',
    icon: XIcon,
  },
  {
    label: 'Mastodon',
    value: 'mastodon.social/@jaishakj',
    href: 'https://mastodon.social/@jaishakj',
    icon: MastodonIcon,
  },
  {
    label: 'GitHub',
    value: 'github.com/jaishakj',
    href: 'https://github.com/jaishakj',
    icon: GitHubIcon,
  },
  {
    label: 'Discord',
    value: '923801110752399360',
    href: 'https://discord.com/users/923801110752399360',
    icon: DiscordIcon,
  },
  {
    label: 'Telegram',
    value: '@Jaishakj',
    href: 'https://t.me/Jaishakj',
    icon: TelegramIcon,
  },
  {
    // TODO: replace with your real Medium profile URL and @handle
    label: 'Medium',
    value: '@jaishakj (placeholder — confirm handle)',
    href: 'https://medium.com/@jaishak',
    icon: MediumIcon,
  },
  {
    // TODO: replace with your real Lemmy instance + username
    label: 'Lemmy',
    value: '@jaishakj@lemmy.world (placeholder — confirm instance)',
    href: 'https://lemmy.world/u/jaishakj',
    icon: LemmyIcon,
  },
];
