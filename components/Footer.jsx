import Link from "next/link";
import LeafShadow from "./LeafShadow";
import FooterScene from "./FooterScene";

const columns = [
  {
    title: "فروشگاه",
    links: [
      { label: "ماگ", href: "/products?category=mug" },
      { label: "کاسه", href: "/products?category=bowl" },
      { label: "بشقاب", href: "/products?category=plate" },
      { label: "گلدان", href: "/products?category=vase" },
      { label: "شمعدان", href: "/products?category=candle" },
    ],
  },
  {
    title: "کارگاه",
    links: [
      { label: "درباره ما", href: "/about" },
      { label: "داستان ساخت", href: "/about#story" },
      { label: "همکاری با ما", href: "/#newsletter" },
    ],
  },
  {
    title: "پشتیبانی",
    links: [
      { label: "ارسال و تحویل", href: "/shipping" },
      { label: "بازگشت کالا", href: "/returns" },
      { label: "سوالات متداول", href: "/faq" },
    ],
  },
];

const SOCIAL_USERNAME = "tatrik_artsy";
const socials = [
  { key: "instagram", label: "اینستاگرام", href: `https://instagram.com/${SOCIAL_USERNAME}` },
  { key: "telegram", label: "تلگرام", href: `https://t.me/${SOCIAL_USERNAME}` },
  { key: "bale", label: "بله", href: `https://ble.ir/${SOCIAL_USERNAME}` },
  { key: "rubika", label: "روبیکا", href: `https://rubika.ir/${SOCIAL_USERNAME}` },
];

function Diamond() {
  return (
    <span
      aria-hidden="true"
      className="h-2 w-2 shrink-0 rotate-45 rounded-[1px] bg-[#BD7E56]/75"
    />
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />

      <circle cx="12" cy="12" r="4" />

      <circle cx="17.2" cy="6.9" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path
        d="M21 4L3 11.5l6 2.2m12-9.7l-3.3 15.6-8.7-6.5m12-9.1L9 13.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BaleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path
        d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RubikaIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path
        d="M12 3.5 20 8v8l-8 4.5L4 16V8z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

const socialIcons = {
  instagram: InstagramIcon,
  telegram: TelegramIcon,
  bale: BaleIcon,
  rubika: RubikaIcon,
};

const socialColors = {
  instagram: "bg-[#D9C6A3] text-[#52606A]",
  telegram: "bg-[#A7B7C3] text-[#52606A]",
  bale: "bg-[#96A184] text-white",
  rubika: "bg-sky text-white",
};

function PotIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-9 w-9"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M18 9h12" strokeLinecap="round" />

      <path
        d="M17 10c0 4-4 5-4 10v9c0 6 5 10 11 10s11-4 11-10v-9c0-5-4-6-4-10"
        strokeLinecap="round"
      />

      <path d="M15 29c3 2 5 2 9 2s6 0 9-2" strokeLinecap="round" />
    </svg>
  );
}

function SocialCircle({ children, label, href, className }) {
  return (
    <a
      href={href || "#"}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1 hover:scale-105 sm:h-14 sm:w-14 md:h-16 md:w-16 ${className}`}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer
      id="contact"
      dir="rtl"
      className="relative overflow-hidden bg-[#F2ECE1] text-[#52606A]"
    >
      {/* =====================================================
          MAIN FOOTER BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Paper texture */}
        <div className="absolute inset-0 bg-[#F2ECE1]" />

        {/* Upper soft shadow */}
        <div
          className="
            absolute
            -left-20
            -top-24
            h-[430px]
            w-[520px]
            rotate-[12deg]
            rounded-[45%]
            bg-[#52606A]/[0.035]
            blur-3xl
          "
        />

        <div
          className="
            absolute
            left-[24%]
            top-0
            h-[300px]
            w-[420px]
            rounded-[50%]
            bg-white/20
            blur-3xl
          "
        />

        {/* Bottom watercolor waves */}
        <div
          className="
            absolute
            -bottom-24
            -left-24
            h-[300px]
            w-[720px]
            rotate-[7deg]
            rounded-[50%]
            bg-[#A7B7C3]/35
            blur-[1px]
          "
        />

        <div
          className="
            absolute
            -bottom-36
            left-[8%]
            h-[270px]
            w-[650px]
            rotate-[5deg]
            rounded-[50%]
            bg-[#78909C]/25
            blur-[1px]
          "
        />

        <div
          className="
            absolute
            -bottom-40
            left-[38%]
            h-[290px]
            w-[700px]
            rotate-[-7deg]
            rounded-[50%]
            bg-[#D9C6A3]/50
            blur-[1px]
          "
        />

        <div
          className="
            absolute
            -bottom-48
            right-[-8%]
            h-[350px]
            w-[720px]
            rotate-[-8deg]
            rounded-[50%]
            bg-[#BD7E56]/25
            blur-[1px]
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-[5%]
            h-[180px]
            w-[500px]
            rounded-[50%]
            bg-[#D9C6A3]/35
            blur-2xl
          "
        />
      </div>

      {/* =====================================================
          LEAF SHADOW
      ====================================================== */}

      <LeafShadow
        className="
          pointer-events-none
          absolute
          -left-6
          -top-5
          z-0
          h-56
          w-64
          opacity-60
        "
      />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        className="
    relative
    mx-auto
    max-w-7xl
    px-6
    pb-7
    pt-7
    sm:pb-9
    sm:pt-9
    md:px-10
    md:pb-14
    md:pt-14
  "
      >
        <div
          dir="ltr"
          className="
            grid
            items-center
            gap-6
            sm:gap-8
            md:grid-cols-[1.25fr_0.8fr_0.8fr_0.85fr_1.35fr]
            md:gap-6
          "
        >
          {/* =================================================
              BRAND
          ================================================= */}

          <div
            dir="rtl"
            className="
              flex
              flex-col
              items-center
              justify-self-stretch
              text-center
              md:justify-self-stretch
            "
          >
            <Link href="/" className="group">
              <span
                className="
                  block
                  font-display
                  text-[42px]
                  leading-none
                  text-[#BD7E56]
                  transition-transform
                  duration-300
                  group-hover:-translate-y-1
                  sm:text-[52px]
                  md:text-[72px]
                "
              >
                خاک
              </span>

              <span
                className="
                  mx-auto
                  mt-4
                  block
                  h-[2px]
                  w-20
                  bg-[#BD7E56]/80
                  transition-all
                  duration-300
                  group-hover:w-24
                  sm:mt-5
                  md:mt-7
                "
              />
            </Link>

            <p
              className="
                mt-5
                max-w-[270px]
                text-center
                text-[14px]
                leading-7
                text-[#52606A]/75
                sm:mt-6
                sm:text-[15px]
                md:mt-8
                md:text-[16px]
                md:leading-8
              "
            >
              کارگاه کوچک سفالگری در دل شهر؛
              <br />
              هر ظرف با دست، برای میز شما.
            </p>

            {/* SOCIAL ICONS */}

            <div
              dir="ltr"
              className="
                mt-6
                flex
                items-center
                justify-center
                gap-3
                sm:mt-7
                sm:gap-4
                md:mt-9
                md:gap-5
              "
            >
              {socials.map((social) => {
                const Icon = socialIcons[social.key];
                return (
                  <SocialCircle
                    key={social.key}
                    label={social.label}
                    href={social.href}
                    className={socialColors[social.key]}
                  >
                    <Icon />
                  </SocialCircle>
                );
              })}
            </div>
          </div>

          {/* =================================================
              STORE
          ================================================= */}

          {columns.map((column) => (
            <div
              key={column.title}
              dir="rtl"
              className="
                flex
                h-full
                w-full
                flex-col
                items-center
                justify-start
                text-center
              "
            >
              {/* TITLE */}

              <h3
                className="
                  flex
                  h-[28px]
                  items-center
                  justify-center
                  whitespace-nowrap
                  font-display
                  text-[19px]
                  font-medium
                  leading-[28px]
                  text-[#BD7E56]
                  sm:h-[31px]
                  sm:text-[21px]
                  sm:leading-[31px]
                  md:h-[35px]
                  md:text-[23px]
                  md:leading-[35px]
                "
              >
                {column.title}
              </h3>

              {/* LINE */}

              <span
                className="
                  mx-auto
                  mt-3
                  block
                  h-px
                  w-28
                  shrink-0
                  bg-[#BD7E56]/40
                  sm:mt-4
                  md:mt-5
                "
              />

              {/* LINKS */}

              <ul
                className="
                  mt-5
                  flex
                  flex-col
                  items-center
                  space-y-4
                  sm:mt-6
                  sm:space-y-5
                  md:mt-8
                  md:space-y-6
                "
              >
                {column.links.map((link) => (
                  <li key={link.label} className="w-full">
                    <Link
                      href={link.href}
                      className="
                        group
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-4
                        whitespace-nowrap
                        text-[16px]
                        text-[#52606A]
                        transition-all
                        duration-300
                        hover:text-[#BD7E56]
                      "
                    >
                      <Diamond />

                      <span
                        className="
                          transition-transform
                          duration-300
                          group-hover:-translate-x-1
                        "
                      >
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* =================================================
              RIGHT SIDE SCENE
          ================================================= */}

          <div
            dir="rtl"
            className="
              relative
              hidden
              min-h-[390px]
              items-center
              justify-center
              md:flex
            "
          >
            {/* Extra soft watercolor behind scene */}

            <div
              className="
                absolute
                bottom-0
                right-[-50px]
                h-72
                w-96
                rounded-full
                bg-[#BD7E56]/15
                blur-3xl
              "
            />

            <div
              className="
                relative
                z-10
                flex
                w-full
                max-w-[390px]
                items-center
                justify-center
              "
              style={{
                // Fades the scene's edges into the footer background
                // instead of ending in a hard rectangle, so it reads as
                // emerging from the backdrop rather than sitting on top
                // of it.
                WebkitMaskImage:
                  "radial-gradient(ellipse 80% 75% at 50% 50%, #000 58%, transparent 100%)",
                maskImage:
                  "radial-gradient(ellipse 80% 75% at 50% 50%, #000 58%, transparent 100%)",
              }}
            >
              <FooterScene className="h-[390px] w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM BAR
      ====================================================== */}

      <div
        className="
          relative
          border-t
          border-[#D9C6A3]
          bg-[#52606A]/35
        "
      >
        {/* Watercolor bottom layer */}

        <div className="absolute inset-0 overflow-hidden">
          <div
            className="
              absolute
              -bottom-28
              -left-10
              h-56
              w-[60%]
              rotate-[-7deg]
              rounded-[50%]
              bg-[#52606A]/55
            "
          />

          <div
            className="
              absolute
              -bottom-32
              left-[25%]
              h-52
              w-[50%]
              rotate-[6deg]
              rounded-[50%]
              bg-[#78909C]/30
            "
          />

          <div
            className="
              absolute
              -bottom-36
              right-[-5%]
              h-64
              w-[55%]
              rotate-[-8deg]
              rounded-[50%]
              bg-[#D9C6A3]/25
            "
          />
        </div>

        <div
          dir="ltr"
          className="
            relative
            mx-auto
            flex
            max-w-7xl
            flex-col-reverse
            items-center
            gap-4
            px-6
            py-5
            sm:gap-5
            sm:py-6
            md:flex-row
            md:items-center
            md:justify-between
            md:px-10
            md:py-7
          "
        >
          {/* =================================================
              COPYRIGHT
          ================================================= */}

          <div
            dir="rtl"
            className="
              flex
              items-center
              gap-4
              text-sm
              text-[#F2ECE1]/90
            "
          >
            <span
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[#D9C6A3]
                text-[#D9C6A3]
                sm:h-16
                sm:w-16
                md:h-[72px]
                md:w-[72px]
              "
            >
              <PotIcon />
            </span>

            <span>© ۱۴۰۴ خاک. تمامی حقوق محفوظ است.</span>
          </div>

          {/* =================================================
              SOCIAL BOTTOM
          ================================================= */}

          <div
            dir="rtl"
            className="
              flex
              items-center
              justify-center
              gap-7
              text-sm
              text-[#F2ECE1]/90
            "
          >
            <a
              href={`https://instagram.com/${SOCIAL_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                items-center
                gap-3
                transition-colors
                hover:text-white
              "
            >
              <InstagramIcon />

              <span>اینستاگرام</span>
            </a>

            <span
              className="
                h-10
                w-px
                bg-[#F2ECE1]/30
              "
            />

            <span className="text-[#D9C6A3]">•</span>

            <a
              href={`https://t.me/${SOCIAL_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                items-center
                gap-3
                transition-colors
                hover:text-white
              "
            >
              <TelegramIcon />

              <span>تلگرام</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
