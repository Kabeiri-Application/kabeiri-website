import { tv, type VariantProps } from 'tailwind-variants';

const button = tv({
  base: 'flex flex-row items-center justify-center rounded-full font-semibold transition-all',
  variants: {
    variant: {
      primary: 'bg-black text-white enabled:hover:bg-gray-800',
      secondary:
        'border-2 border-gray-200 text-gray-700 enabled:hover:bg-gray-50',
      tertiary: 'text-gray-700 enabled:hover:bg-gray-50',
      'primary-white': 'bg-white text-black enabled:hover:bg-gray-100',
      'secondary-white':
        'border-2 border-white text-white enabled:hover:bg-white enabled:hover:text-black',
      'primary-gradient':
        'bg-linear-to-r from-purple-600 to-pink-600 text-white enabled:hover:opacity-90',
    },
    size: {
      sm: 'px-4 py-2 text-sm',
      md: 'px-8 py-4 text-base',
      lg: 'px-8 py-4 text-lg',
    },
    disabled: {
      true: 'cursor-not-allowed opacity-50',
      false: 'opacity-100',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
});

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button>;

export function Button({ ...props }: ButtonProps) {
  return <button {...props} className={button({ ...props })} />;
}
