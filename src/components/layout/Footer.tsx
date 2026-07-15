"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { navLinks, resolveCampuses, resolveBrandChannels } from "@/data/site";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";
import { BrandSocialLinks } from "@/components/ui/BrandSocialLinks";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

export function Footer() {
  const siteConfig = useSiteConfig();
  const campuses = resolveCampuses(siteConfig);
  const channels = resolveBrandChannels(siteConfig);
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="container-custom section-padding pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logos/op-institute-logo.png"
                alt="O.P. Institute of Studies logo"
                width={52}
                height={52}
                className="h-12 w-12 object-contain"
              />
              <div>
                <p className="font-display font-bold text-white text-base leading-tight">
                  O.P. Institute of Studies
                </p>
                <p className="text-gray-400 text-xs">Since 2003</p>
              </div>
            </Link>
            <div className="inline-flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2">
              <Image
                src="/logos/op-kids-logo.png"
                alt="OP Kids Pre School logo"
                width={140}
                height={75}
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Empowering students and nurturing young minds with excellence in
              education since 2003 — from joyful preschool at OP Kids to CMA,
              B.Com and school tuition success.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-white text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-display font-semibold text-white text-lg mb-4">
              Our Programs
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/op-kids"
                  className="hover:text-kids-400 transition-colors"
                >
                  OP Kids Pre School
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="hover:text-brand-400 transition-colors"
                >
                  CMA Coaching
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="hover:text-brand-400 transition-colors"
                >
                  B.Com (Pass / Honours)
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="hover:text-brand-400 transition-colors"
                >
                  School Tuition (I–XII)
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-white text-lg mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              {campuses.map((campus) => (
                <li key={campus.id} className="flex items-start gap-3">
                  <MapPin
                    className={`w-4 h-4 mt-0.5 shrink-0 ${
                      campus.accent === "kids"
                        ? "text-kids-400"
                        : "text-brand-400"
                    }`}
                  />
                  <span>
                    <span className="block text-white/90 font-medium mb-0.5">
                      {campus.shortName}
                    </span>
                    {campus.address}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dual brand channels — clear, not messy */}
        <div className="mt-12 pt-8 border-t border-gray-800 grid sm:grid-cols-2 gap-6">
          {channels.map((brand) => (
            <div
              key={brand.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <p
                className={`text-xs font-semibold uppercase tracking-[0.14em] mb-1 ${
                  brand.accent === "kids" ? "text-kids-400" : "text-brand-400"
                }`}
              >
                {brand.shortName}
              </p>
              <p className="font-display font-semibold text-white text-sm mb-4">
                {brand.name}
              </p>

              <div className="space-y-2.5 text-sm mb-4">
                <a
                  href={`tel:${brand.phone}`}
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Phone
                    className={`w-3.5 h-3.5 shrink-0 ${
                      brand.accent === "kids"
                        ? "text-kids-400"
                        : "text-brand-400"
                    }`}
                  />
                  {brand.phone}
                </a>
                <a
                  href={`mailto:${brand.email}`}
                  className="flex items-center gap-2.5 hover:text-white transition-colors break-all"
                >
                  <Mail
                    className={`w-3.5 h-3.5 shrink-0 ${
                      brand.accent === "kids"
                        ? "text-kids-400"
                        : "text-brand-400"
                    }`}
                  />
                  {brand.email}
                </a>
                <a
                  href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
                    brand.id === "kids"
                      ? "Hi, I would like to enquire about OP Kids Pre School."
                      : "Hi, I would like to enquire about admissions at OP Institute."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 shrink-0 text-[#25D366]" />
                  WhatsApp
                </a>
              </div>

              <BrandSocialLinks
                social={brand.social}
                accent={brand.accent}
                size="sm"
              />
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <p>Crafted with excellence for education</p>
        </div>
      </div>
    </footer>
  );
}
