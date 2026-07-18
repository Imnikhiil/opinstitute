"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { resolveCampuses, resolveBrandChannels } from "@/data/site";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";
import { useSiteBrand } from "@/components/providers/SiteBrandProvider";
import { BrandSocialLinks } from "@/components/ui/BrandSocialLinks";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

export function Footer() {
  const siteConfig = useSiteConfig();
  const { navLinks, isKids, isInstitute, exitToMainSite } = useSiteBrand();
  const campuses = resolveCampuses(siteConfig);
  const channels = resolveBrandChannels(siteConfig);
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="container-custom section-padding pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href={isKids ? "/op-kids" : isInstitute ? "/institute" : "/"}
              className="flex items-center gap-3"
            >
              <Image
                src={
                  isKids
                    ? "/logos/op-kids-logo.png"
                    : "/logos/op-institute-logo.png"
                }
                alt={
                  isKids
                    ? "OP Kids Pre School logo"
                    : "OP Institute of Studies logo"
                }
                width={isKids ? 140 : 64}
                height={isKids ? 75 : 64}
                className={
                  isKids ? "h-12 w-auto object-contain" : "h-14 w-14 object-contain"
                }
              />
              {!isKids && (
                <div>
                  <p className="font-display font-bold text-white text-base leading-tight">
                    OP Institute of Studies
                  </p>
                  <p className="text-gray-400 text-xs">Since 2003</p>
                </div>
              )}
            </Link>
            {!isKids && !isInstitute && (
              <div className="inline-flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2">
                <Image
                  src="/logos/op-kids-logo.png"
                  alt="OP Kids Pre School logo"
                  width={140}
                  height={75}
                  className="h-9 w-auto object-contain"
                />
              </div>
            )}
            <p className="text-sm leading-relaxed text-gray-400">
              {isKids
                ? "Nurturing young minds with joyful, safe and playful early childhood education at OP Kids Pre School."
                : isInstitute
                  ? "Excellence in CMA, B.Com and school tuition since 2003 at OP Institute of Studies."
                  : "Empowering students and nurturing young minds with excellence in education since 2003 — from joyful learning at OP Kids Pre School to CMA, B.Com and school tuition success."}
            </p>
            {(isKids || isInstitute) && (
              <Link
                href="/"
                onClick={() => exitToMainSite()}
                className="inline-block text-sm font-medium text-brand-400 hover:text-brand-300"
              >
                ← Back to main website
              </Link>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-white text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={`${link.href}-${link.label}`}>
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
              {!isInstitute && (
                <li>
                  <Link
                    href="/op-kids"
                    className="hover:text-kids-400 transition-colors"
                  >
                    OP Kids Pre School
                  </Link>
                </li>
              )}
              {!isKids && (
                <>
                  {!isInstitute && (
                    <li>
                      <Link
                        href="/institute"
                        className="hover:text-brand-400 transition-colors"
                      >
                        OP Institute of Studies
                      </Link>
                    </li>
                  )}
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
                </>
              )}
              {isKids && (
                <li>
                  <Link
                    href="/op-kids"
                    className="hover:text-kids-400 transition-colors"
                  >
                    Play Group – UKG Programs
                  </Link>
                </li>
              )}
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
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800 grid sm:grid-cols-2 gap-4 sm:gap-6">
          {channels.map((brand) => (
            <div
              key={brand.id}
              className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
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
                      : "Hi, I would like to enquire about admissions at OP Institute of Studies."
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
