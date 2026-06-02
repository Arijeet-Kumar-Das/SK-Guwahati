import HeroClient from "./HeroClient";

interface HeroProps {
  siteSettings: {
    heroTitle?: string;
    heroDescription?: string;
    phone?: string;
    whatsapp?: string;
  };
}

export default function Hero({ siteSettings }: HeroProps) {
  return <HeroClient siteSettings={siteSettings} />;
}