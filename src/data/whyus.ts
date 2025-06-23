interface WhyUsItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  hoverBg: string;
  animationDelay: string;
}

const whyUsData: WhyUsItem[] = [
  {
    id: 1,
    title: "Professional Design",
    description:
      "Expertly crafted traditional resume designs that leave a lasting impression",
    icon: "🎨",
    hoverBg: "#0062ff2a",
    animationDelay: "0s",
  },
  {
    id: 2,
    title: "Cultural Touch",
    description:
      "Preserving traditional values with modern presentation styles",
    icon: "🏛️",
    hoverBg: "#0062ff2a",
    animationDelay: "0.2s",
  },
  {
    id: 3,
    title: "Quick Delivery",
    description: "Fast turnaround time without compromising on quality",
    icon: "⚡",
    hoverBg: "#0062ff2a",
    animationDelay: "0.4s",
  },
  {
    id: 4,
    title: "100% Satisfaction",
    description: "Pay only when you're completely satisfied with the result",
    icon: "✨",
    hoverBg: "#0062ff2a",
    animationDelay: "0.6s",
  },
];

export type { WhyUsItem };
export default whyUsData;
