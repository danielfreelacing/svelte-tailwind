/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        fontSize: {
            xs: ['12px', '20px'],
            sm: ['14px', '20px'],
            base: ['16px', '24px'],
            lg: ['20px', '24px'],
            xl: ['20px', '24px'],
            '2xl': ['24px', '24px']
        },

        container: {
            center: true,
        },
        fontFamily: {
            poppins: ['Poppins'],
        },
        extend: {
            colors: {
                gray: {
                    '100': '#f0ffff',
                    '200': '#E8E8E8',
                    '300': '#C8C8C8'
                },
                blue: {
                    '800': '#1B45AD'
                },
                'theme-red': '#D43D27',

                white: '#FFFFFF',
                black: '#000000',
                transparent: '#FFFFFF00',
                'on-invert': {
                    primary: '#ffffff',
                    secondary: '#ffffff4C'
                },
                'on-surface': {
                    secondary: "#84868E",
                    primary: "#1A1B1F",
                    placeholder: "#B3B5C0"
                },
                'gray-selected': '#1a1b1f12',
                // surface: {
                //   'surface-invert': '#1A1B1F',
                //   border: '#E8E8E8'
                // },
                'button-link-default': 'var(--color-secondary-secondary-3)',
                'button-link-disabled': 'var(--color-secondary-secondary-5)',
                'button-link-hover': 'var(--color-secondary-secondary-4)',
                'button-link-pressed': 'var(--color-secondary-secondary-2)',
                'button-primary-default': 'var(--color-brand-brand-3)',
                'button-primary-disabled': 'var(--color-neutrals-neutral-300)',
                'button-primary-hover': 'var(--color-brand-brand-4)',
                'button-primary-pressed': 'var(--color-brand-brand-2)',
                'button-secondary-default': 'var(--color-neutrals-neutral-0)',
                'button-secondary-disabled': 'var(--color-neutrals-neutral-100)',
                'button-secondary-hover': 'var(--color-neutrals-neutral-100)',
                'button-secondary-pressed': 'var(--color-neutrals-neutral-200)',
                'surface-border': 'var(--color-neutrals-neutral-200)',
                'surface-surface-1': 'var(--color-neutrals-neutral-100)',
                'surface-surface-2': 'var(--color-neutrals-neutral-0)',
                'surface-surface-3': 'var(--color-neutrals-neutral-100)',
                'surface-surface-4': 'var(--color-neutrals-neutral-600-20)',
                'surface-surface-accent': 'var(--color-brand-brand-5)',
                'surface-surface-accent-subtle': 'var(--color-brand-brand-tr-10)',
                'surface-surface-invert': 'var(--color-neutrals-neutral-600)',
                'surface-surface-highlighted': 'var(--color-neutrals-neutral-600)',
                'text-text-on-invert-primary': 'var(--color-neutrals-neutral-0)',
                'text-text-on-invert-secondary': 'var(--color-neutrals-neutral-0-60)',
                'text-text-on-surface-accent': 'var(--color-brand-brand-4)',
                'text-text-on-surface-link': 'var(--color-secondary-secondary-3)',
                'text-text-on-surface-placeholder': 'var(--color-neutrals-neutral-300)',
                'text-text-on-surface-primary': 'var(--color-neutrals-neutral-600)',
                'text-text-on-surface-secondary': 'var(--color-neutrals-neutral-400)',
                'text-text-on-surface-text-error': 'var(--color-system-error)',
                'text-text-on-surface-text-success': 'var(--color-system-success)',
                'text-text-on-surface-text-warning': 'var(--color-system-warning)',
                'color-system-success-subtle': 'var(--color-system-success-subtle)',
                'color-system-system-warning-subtle': 'var(--color-system-warning-subtle)',
                'color-secondary-secondary-tr-10': 'var(--color-secondary-secondary-tr-10)',
            },
            flexGrow: {
                2: '2'
            },
            borderRadius: {
                'none': '0',
                'xsm': '2px',
                'sm': '8px',
                'md': '12px',
                'full': '9999px',
            },
            spacing: {
                'corners-items': 'var(--numbers-s)',
                'corners-button': 'var(--numbers-m)',
                'corners-input': 'var(--numbers-m)',
                'corners-pop-up': 'var(--numbers-m)',
                'spacing-items-spacing-small': 'var(--numbers-xs)',
                'spacing-items-spacing-med': 'var(--numbers-s)',
                'spacing-edges': 'var(--numbers-ml)',
                'spacing-items-spacing-large': 'var(--numbers-ml)',
                'spacing-card-spacing': 'var(--numbers-l)',
                'spacing-items-spacing-extra-large': 'var(--numbers-xl)',
            },
            letterSpacing: {
                tight: '-.5px',
                normal: '0',
            },
            lineHeight: {
                tight: "20px",
                big: "24px"
            },
            boxShadow: {
                DEFAULT: '0 8px 32px 0px rgba(0, 0, 0, 0.05)',
            }
        },




    },
    plugins: []
};