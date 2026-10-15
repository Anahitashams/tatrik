export const categories = [
  { slug: "mug", label: "ماگ" },
  { slug: "bowl", label: "کاسه" },
  { slug: "plate", label: "بشقاب" },
  { slug: "vase", label: "گلدان" },
  { slug: "candle", label: "شمعدان" },
];

export const products = [
  {
    slug: "mug-abgineh",
    name: "ماگ آبگینه",
    category: "mug",
    icon: "mug",
    tone: "dust",
    price: 485000,
    detail: "لعاب آبی رفته بر بدنه‌ی خاکی",
    description:
      "ماگ آبگینه با لعاب آبی‌دودی که از نیمه به پایین رنگ خاک را نمایان می‌گذارد، روی چرخ سفالگری شکل گرفته و در کوره‌ای با دمای بالای هزار درجه پخته شده است. گنجایش آن برای یک لیوان کامل چای یا قهوه مناسب است.",
  },
  {
    slug: "mug-taftan",
    name: "ماگ تفتان",
    category: "mug",
    icon: "mug",
    tone: "sand",
    price: 460000,
    detail: "بدنه‌ی شنی با لبه‌ی خام",
    description:
      "ماگ تفتان با بدنه‌ی شنی‌رنگ و لبه‌ای که عمداً بدون لعاب رها شده تا بافت خام خاک لمس شود. دسته‌ی آن برای گرفتن راحت طراحی شده و برای استفاده‌ی روزانه مناسب است.",
  },
  {
    slug: "bowl-set-sabz",
    name: "کاسه سه‌تایی سبز",
    category: "bowl",
    icon: "bowl",
    tone: "sage",
    price: 920000,
    detail: "ست سه کاسه هم‌اندازه",
    description:
      "ست سه کاسه‌ی هم‌اندازه با درجه‌های مختلف سبز مریمی، مناسب سرو سالاد، سوپ یا میوه. کاسه‌ها می‌توانند تو در تو در قفسه نگه‌داری شوند.",
  },
  {
    slug: "bowl-single-dust",
    name: "کاسه تکی دودی",
    category: "bowl",
    icon: "bowl",
    tone: "dust",
    price: 340000,
    detail: "مناسب سرو تکی",
    description:
      "کاسه‌ای با رنگ آبی‌دودی ملایم که به‌تنهایی هم در سفره جا می‌افتد. عمق مناسب آن، آن را برای غذاهای آبدار یا صبحانه مناسب می‌کند.",
  },
  {
    slug: "vase-khaki",
    name: "گلدان خاکی‌رنگ",
    category: "vase",
    icon: "vase",
    tone: "clay",
    price: 560000,
    detail: "برای شاخه‌های خشک و گل‌های ریز",
    description:
      "گلدان خاکی‌رنگ با گردنی باریک، مناسب یک یا دو شاخه گل. فرم ساده‌ی آن اجازه می‌دهد گل‌های خشک یا تازه در آن خودنمایی کنند.",
  },
  {
    slug: "vase-poost",
    name: "گلدان پوست‌پیازی",
    category: "vase",
    icon: "vase",
    tone: "sand",
    price: 610000,
    detail: "بدنه‌ی گرد با گردن کوتاه",
    description:
      "گلدانی با بدنه‌ی گرد و شکمی و گردنی کوتاه، به رنگ پوست‌پیازی. برای دسته‌گل‌های پرحجم‌تر مناسب‌تر از مدل باریک است.",
  },
  {
    slug: "candle-doghlo",
    name: "شمعدان دوقلو",
    category: "candle",
    icon: "candle",
    tone: "sand",
    price: 390000,
    detail: "با ریزش لعاب دست‌ساز",
    description:
      "دو شمعدان هم‌شکل در دو قد متفاوت، با ریزش لعاب که روی بدنه‌ی خاکی هرکدام را منحصربه‌فرد می‌کند. برای شمع‌های استوانه‌ای استاندارد مناسب است.",
  },
  {
    slug: "plate-set-rozaneh",
    name: "ست بشقاب روزانه",
    category: "plate",
    icon: "plate",
    tone: "sand",
    price: 1250000,
    detail: "شش رنگ، یک اندازه",
    description:
      "شش بشقاب هم‌اندازه در شش رنگ خاکی متفاوت، برای سفره‌ای که هر روز کمی رنگ عوض می‌کند. لبه‌ی کم‌عمق آن برای غذاهای اصلی مناسب است.",
  },
  {
    slug: "plate-single-abi",
    name: "بشقاب تکی آبی",
    category: "plate",
    icon: "plate",
    tone: "dust",
    price: 260000,
    detail: "مناسب میان‌وعده و دسر",
    description:
      "بشقابی کوچک‌تر با لعاب آبی‌دودی، مناسب میان‌وعده، دسر یا سرو نان. می‌تواند هم‌رنگ ماگ آبگینه استفاده شود.",
  },
];

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(value) {
  return `${value.toLocaleString("fa-IR")} تومان`;
}
