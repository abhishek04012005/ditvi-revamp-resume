import { StaticImageData } from "next/image";
import Resume1111Img from "../assets/biodata/resume-1111.png";
import Resume1112Img from "../assets/biodata/resume-1112.png";
import Resume1113Img from "../assets/biodata/resume-1113.png";
import Resume1114Img from "../assets/biodata/resume-1114.png";
import BiodataHindi1111 from "../assets/biodata/hindi/biodata-hindi-1111.png";
import BiodataStudent1111 from "../assets/biodata/student/biodata-student-1111.png";
import BiodataStudentHindi1111 from "../assets/biodata/studentHindi/biodata-hindi-student-1111.png";

// import Languages from "../json/Languages";
// import ModelTypes from "../json/ModelTypes";
import ModelTypes from "./ModelTypes";

// interface Language {
//   Name: string;
// }

interface ResumeItem {
  id: number;
  modelNumber: string;
  image: StaticImageData;
  hindiImage: StaticImageData;
  studentImage: StaticImageData;
  hindiStudentImage: StaticImageData;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  title: string;
  modelName: string;
  description: string;
  //   language: string;
  type: string;
}

const resumeList: ResumeItem[] = [
  {
    id: 1,
    modelNumber: "1111",
    image: Resume1111Img,
    hindiImage: BiodataHindi1111,
    studentImage: BiodataStudent1111,
    hindiStudentImage: BiodataStudentHindi1111,
    originalPrice: 201,
    discountedPrice: 101,
    discount: 50,
    title: "Madhubani Painting",
    modelName: "online-biodata-design-madhubani-painting",
    description:
      "Madhubani painting is a traditional Indian art form that originated in the Mithila region of Bihar. It is characterized by intricate patterns, vibrant colors, and themes from mythology, nature, and daily life. The paintings are typically done on handmade paper or cloth using natural dyes and pigments. Madhubani artists often use fine brushes made from twigs or fingers to create detailed designs. This art form has gained recognition worldwide for its unique style and cultural significance.",
    // language: Languages.English.Name,
    type: ModelTypes.Professional.Name,
  },
  {
    id: 2,
    modelNumber: "1112",
    image: Resume1112Img,
    hindiImage: BiodataHindi1111,
    studentImage: BiodataStudent1111,
    hindiStudentImage: BiodataStudentHindi1111,
    originalPrice: 201,
    discountedPrice: 101,
    discount: 50,
    title: "Madhubani Painting",
    modelName: "online-biodata-design-madhubani-painting",
    description:
      "Madhubani painting is a traditional Indian art form that originated in the Mithila region of Bihar. It is characterized by intricate patterns, vibrant colors, and themes from mythology, nature, and daily life. The paintings are typically done on handmade paper or cloth using natural dyes and pigments. Madhubani artists often use fine brushes made from twigs or fingers to create detailed designs. This art form has gained recognition worldwide for its unique style and cultural significance.",
    // language: Languages.English.Name,
    type: ModelTypes.Professional.Name,
  },
    {
    id: 3,
    modelNumber: "1113",
    image: Resume1113Img,
    hindiImage: BiodataHindi1111,
    studentImage: BiodataStudent1111,
    hindiStudentImage: BiodataStudentHindi1111,
    originalPrice: 201,
    discountedPrice: 101,
    discount: 50,
    title: "Madhubani Painting",
    modelName: "online-biodata-design-madhubani-painting",
    description:
      "Madhubani painting is a traditional Indian art form that originated in the Mithila region of Bihar. It is characterized by intricate patterns, vibrant colors, and themes from mythology, nature, and daily life. The paintings are typically done on handmade paper or cloth using natural dyes and pigments. Madhubani artists often use fine brushes made from twigs or fingers to create detailed designs. This art form has gained recognition worldwide for its unique style and cultural significance.",
    // language: Languages.English.Name,
    type: ModelTypes.Professional.Name,
  },
    {
    id: 4,
    modelNumber: "1114",
    image: Resume1114Img,
    hindiImage: BiodataHindi1111,
    studentImage: BiodataStudent1111,
    hindiStudentImage: BiodataStudentHindi1111,
    originalPrice: 201,
    discountedPrice: 101,
    discount: 50,
    title: "Madhubani Painting",
    modelName: "online-biodata-design-madhubani-painting",
    description:
      "Madhubani painting is a traditional Indian art form that originated in the Mithila region of Bihar. It is characterized by intricate patterns, vibrant colors, and themes from mythology, nature, and daily life. The paintings are typically done on handmade paper or cloth using natural dyes and pigments. Madhubani artists often use fine brushes made from twigs or fingers to create detailed designs. This art form has gained recognition worldwide for its unique style and cultural significance.",
    // language: Languages.English.Name,
    type: ModelTypes.Professional.Name,
  },
];

export default resumeList;
