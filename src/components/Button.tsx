import { tv, type VariantProps } from 'tailwind-variants';

const button = tv({
  base: 'rounded-full font-semibold transition-colors',
  variants: {
    variant: {
      primary: 'bg-black text-white hover:bg-gray-800',
      secondary: 'border border-gray-200 hover:bg-gray-50',
      white: 'bg-white text-black hover:bg-gray-100',
      'outline-white':
        'border-2 border-white text-white transition-colors hover:bg-white hover:text-purple-900',
    },
    size: {
      sm: 'px-4 py-2 text-sm',
      md: 'px-8 py-4 text-base',
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
