import { motion } from "framer-motion";
import { FaInstagram, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

type SocialLink = {
  name: string;
  href: string;
  ariaLabel: string;
  icon: React.ElementType;
};

const socialLinks: SocialLink[] = [
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@randgfoods",
    ariaLabel: "Visit R&G Foods TikTok",
    icon: FaTiktok,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/randgfoods",
    ariaLabel: "Visit R&G Foods Instagram",
    icon: FaInstagram,
  },
  {
    name: "Email",
    href: "mailto:randgfoods@gmail.com",
    ariaLabel: "Send email to R&G Foods",
    icon: MdEmail,
  },
  {
    name: "YouTube",
    href: "http://youtube.com/c/GiftRackRG",
    ariaLabel: "Visit R&G Foods YouTube",
    icon: FaYoutube,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/233550007554",
    ariaLabel: "Chat with R&G Foods on WhatsApp",
    icon: FaWhatsapp,
  },
];

export default function SocialLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex w-full items-center justify-center"
    >
      <div
        className="
          inline-flex
          items-center
          justify-center
          gap-2
          sm:gap-3
        "
      >
        {socialLinks.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.ariaLabel}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.06,
                duration: 0.4,
              }}
              whileHover={{
                scale: 1.08,
                y: -2,
              }}
              whileTap={{ scale: 0.96 }}
              className="
                group
                relative
                flex
                h-12
                w-12
                sm:h-14
                sm:w-14
                items-center
                justify-center
                rounded-full
                border
                border-transparent
                bg-white/[0.03]
                text-accent
                transition-all
                duration-300
                outline-none
                focus-visible:ring-2
                focus-visible:ring-accent
                focus-visible:ring-offset-2
                focus-visible:ring-offset-black
                hover:border-accent/20
                hover:bg-accent/10
              "
            >
              <span
                className="
                  absolute
                  inset-0
                  rounded-full
                  bg-accent/10
                  opacity-0
                  blur-xl
                  transition-opacity
                  duration-300
                  group-hover:opacity-100
                "
              />

              <Icon className="relative z-10 text-[1.3rem] sm:text-[1.45rem] transition-all duration-300 group-hover:brightness-125" />
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
}
