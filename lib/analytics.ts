import { sendGAEvent } from '@next/third-parties/google';

type GTMEvent = {
    action: string;
    category: string;
    label?: string;
    value?: number;
};

export const trackEvent = ({ action, category, label, value }: GTMEvent) => {
    if (process.env.NODE_ENV !== 'production') {
        console.log('GA Event:', { action, category, label, value });
    }

    sendGAEvent(action, {
        event_category: category,
        event_label: label,
        value: value,
    });
};
