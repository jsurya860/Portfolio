import { useEffect, useState } from 'react';
import { fetchPortfolioSettings, PortfolioSettings } from '../lib/supabase';

export default function FaviconAnimator() {
    const [settings, setSettings] = useState<PortfolioSettings | null>(null);

    useEffect(() => {
        const loadSettings = async () => {
            const data = await fetchPortfolioSettings();
            setSettings(data);
        };
        loadSettings();
    }, []);

    useEffect(() => {
        const link = (document.querySelector("link[rel*='icon']") || document.createElement('link')) as HTMLLinkElement;
        link.type = 'image/svg+xml';
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);

        const frames = [
            '/bug-icon-0.svg',
            '/bug-icon-1.svg',
            '/bug-icon-2.svg',
            '/bug-icon-3.svg',
            '/bug-icon-4.svg',
            '/bug-icon-3.svg',
            '/bug-icon-2.svg',
            '/bug-icon-1.svg',
        ];

        let frameIndex = 0;

        const intervalId = setInterval(() => {
            // Update Favicon
            link.href = frames[frameIndex];

            // Update Title (switch every 4 frames / 1.5s)
            const primaryTitle = settings?.site_title || "Surya's Portfolio";
            const alternateTitle = settings?.site_title_alternate || "Quality Assurance Engineer";

            document.title = frameIndex < 4 ? primaryTitle : alternateTitle;

            frameIndex = (frameIndex + 1) % frames.length;
        }, 375);

        return () => clearInterval(intervalId);
    }, [settings]);

    return null;
}
