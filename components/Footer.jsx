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
      { label: "ارسال و تحویل", href: "#" },
      { label: "بازگشت کالا", href: "#" },
      { label: "سوالات متداول", href: "#" },
    ],
  },
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

function SocialCircle({ children, label, className }) {
  return (
    <a
      href="#"
      aria-label={label}
      className={`flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1 hover:scale-105 ${className}`}
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
    pb-10
    pt-10
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
            gap-10
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
                  text-[62px]
                  leading-none
                  text-[#BD7E56]
                  transition-transform
                  duration-300
                  group-hover:-translate-y-1
                  md:text-[72px]
                "
              >
                خاک
              </span>

              <span
                className="
                  mx-auto
                  mt-7
                  block
                  h-[2px]
                  w-20
                  bg-[#BD7E56]/80
                  transition-all
                  duration-300
                  group-hover:w-24
                "
              />
            </Link>

            <p
              className="
                mt-8
                max-w-[270px]
                text-center
                text-[16px]
                leading-8
                text-[#52606A]/75
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
                mt-9
                flex
                items-center
                justify-center
                gap-5
              "
            >
              <SocialCircle
                label="اینستاگرام"
                className="bg-[#D9C6A3] text-[#52606A]"
              >
                <InstagramIcon />
              </SocialCircle>

              <SocialCircle
                label="تلگرام"
                className="bg-[#A7B7C3] text-[#52606A]"
              >
                <TelegramIcon />
              </SocialCircle>

              <SocialCircle
                label="شبکه اجتماعی خاک"
                className="bg-[#96A184] text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M12 21c0-6-4-8-4-13a4 4 0 0 1 8 0c0 5-4 7-4 13Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path d="M12 21v-7" strokeLinecap="round" />
                </svg>
              </SocialCircle>
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
                  h-[35px]
                  items-center
                  justify-center
                  whitespace-nowrap
                  font-display
                  text-[23px]
                  font-medium
                  leading-[35px]
                  text-[#BD7E56]
                "
              >
                {column.title}
              </h3>

              {/* LINE */}

              <span
                className="
                  mx-auto
                  mt-5
                  block
                  h-px
                  w-28
                  shrink-0
                  bg-[#BD7E56]/40
                "
              />

              {/* LINKS */}

              <ul
                className="
                  mt-8
                  flex
                  flex-col
                  items-center
                  space-y-6
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
            gap-6
            px-6
            py-7
            md:flex-row
            md:items-center
            md:justify-between
            md:px-10
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
                h-[72px]
                w-[72px]
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[#D9C6A3]
                text-[#D9C6A3]
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
              href="#"
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
              href="#"
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
