interface WorkStep {
  number: number;
  title: string;
  steps: string[];
  icon: string;
}

const weWork: WorkStep[] = [
  {
    number: 1,
    title: "Select & Submit",
    steps: [
      "Select a design which you like, click on 'Get Now' button.",
      "Fill your Name, WhatsApp Number and submit it.",
      "Choose your preferred method: Share via WhatsApp, Upload Existing Resume, or Create new Resume.",
    ],
    icon: "🎨",
  },
  {
    number: 2,
    title: "Review & Approve",
    steps: [
      "You will receive customized traditional resume with watermark.",
      "Review the resume carefully, If you want to make any changes, reply with your feedback.",
      "Ensure you are satisfied with resume.",
    ],
    icon: "✨",
  },
  {
    number: 3,
    title: "Pay & Download",
    steps: [
      `Text us, "I am satisfied".`,
      "We will send you a payment link.",
      "After successful payment, you will receive your resume without watermark.",
    ],
    icon: "🚀",
  },
];

export default weWork;
