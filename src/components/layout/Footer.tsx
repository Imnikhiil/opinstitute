"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  LinkedinIcon,
} from "@/components/ui/SocialIcons";
import { navLinks } from "@/data/site";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";

const socialIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  linkedin: LinkedinIcon,
};

export function Footer() {
  const siteConfig = useSiteConfig();

  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="container-custom section-padding pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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
              education since 2003 — from joyful preschool at OP Kids to CA, CS,
              CMA, B.Com and school tuition success.
            </p>
            <div className="flex gap-3">
              {Object.entries(siteConfig.social).map(([key, url]) => {
                const Icon = socialIcons[key as keyof typeof socialIcons];
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-brand-600 flex items-center justify-center transition-colors"
                    aria-label={key}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
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
                <Link href="/op-kids" className="hover:text-kids-400 transition-colors">
                  OP Kids Pre School
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-brand-400 transition-colors">
                  CA / CS / CMA Coaching
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-brand-400 transition-colors">
                  B.Com (Pass / Honours)
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-brand-400 transition-colors">
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
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-brand-400 shrink-0" />
                <span>{siteConfig.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-3 hover:text-brand-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-400" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone2}`}
                  className="flex items-center gap-3 hover:text-brand-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-400" />
                  {siteConfig.phone2}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 hover:text-brand-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-brand-400" />
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <p>
            Crafted with excellence for education
          </p>
        </div>
      </div>
    </footer>
  );
}
