"use client";

import React, { useState, useEffect, useRef } from 'react';
import { TransitionLink as Link } from '@/components/ui/page-transition';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import {
	Phone,
	MapPin,
	Globe,
	Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
		<rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
		<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
		<line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
	</svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
		<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
		<rect width="4" height="12" x="2" y="9" />
		<circle cx="4" cy="4" r="2" />
	</svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
		<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
		<path d="M9 18c-4.51 2-5-2-7-2" />
	</svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
		<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
	</svg>
);



interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
	isExternal?: boolean;
}

interface FooterLinkGroup {
	label: string;
	links: FooterLink[];
}

interface FooterProps extends React.ComponentProps<'footer'> {
	sticky?: boolean;
}

export function Footer({ className, sticky = true, ...props }: FooterProps) {
	const shouldReduceMotion = useReducedMotion();
	const [footerHeight, setFooterHeight] = useState(0);
	const innerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!sticky) return;

		const updateHeight = () => {
			if (innerRef.current) {
				setFooterHeight(innerRef.current.offsetHeight);
			}
		};

		updateHeight();
		window.addEventListener('resize', updateHeight);

		const observer = new ResizeObserver(updateHeight);
		if (innerRef.current) {
			observer.observe(innerRef.current);
		}

		return () => {
			window.removeEventListener('resize', updateHeight);
			observer.disconnect();
		};
	}, [sticky]);

	const socialLinks = [
		{ title: 'Instagram', href: 'https://instagram.com/studio.unicx', icon: InstagramIcon, isExternal: true },
		{ title: 'LinkedIn', href: 'https://linkedin.com/company/studio.unicx', icon: LinkedinIcon, isExternal: true },
		{ title: 'GitHub', href: 'https://github.com/studio.unicx', icon: GithubIcon, isExternal: true },
		{ title: 'Facebook', href: 'https://facebook.com/studio.unicx', icon: FacebookIcon, isExternal: true },
		{ title: 'Mail', href: 'mailto:hello@studio.unicx.in', icon: Mail, isExternal: true },
	];

	const footerLinkGroups: FooterLinkGroup[] = [
		{
			label: 'Navigation',
			links: [
				{ title: 'Home', href: '/' },
				{ title: 'Services', href: '/services' },
				{ title: 'Studio', href: '/studio' },
				{ title: 'Careers', href: '/careers' },
				{ title: 'Contact', href: '/contact' },
			],
		},
		{
			label: 'Services',
			links: [
				{ title: 'Website Development', href: '/services/website-development' },
				{ title: 'App Development', href: '/services/app-development' },
				{ title: 'Software Development', href: '/services/software-development' },
				{ title: 'Graphic Design', href: '/services/graphic-design' },
				{ title: 'Marketing', href: '/services/marketing' },
			],
		},
		{
			label: 'Connect',
			links: [
				{ title: 'hello@studio.unicx.in', href: 'mailto:hello@studio.unicx.in', icon: Mail, isExternal: true },
				{ title: 'unicx.in', href: 'https://unicx.in', icon: Globe, isExternal: true },
				{ title: '+91 90099 80049', href: 'tel:+919009980049', icon: Phone, isExternal: true },
				{ 
					title: 'Indore, India', 
					href: 'https://maps.google.com/?q=702,+7th+Floor,+Shagun+Arcade,+AB+Road,+Vijay+Nagar,+Indore,+Madhya+Pradesh+452010,+India', 
					icon: MapPin, 
					isExternal: true 
				},
			],
		},
	];

	const footerContent = (
		<div className="relative z-10 mx-auto w-full max-w-none px-6 pt-10 pb-6 sm:pt-24 sm:pb-12 sm:px-16 lg:px-24 flex flex-col justify-between h-full gap-4 md:gap-12">
			<div className="grid gap-x-6 gap-y-6 grid-cols-2 md:grid-cols-5">
				<AnimatedContainer className="col-span-2 space-y-4 md:space-y-6">
					<div className="flex items-center gap-3">
						<img src="/images/optimized/US.3.webp" alt="UniCX Logo" className="h-7 w-7 object-contain brightness-0 invert" />
						<div className="flex flex-col">
							<span className="text-lg font-bold tracking-wider uppercase text-white leading-none">Studio UnicX</span>
							<span className="text-[9px] uppercase tracking-[0.18em] text-white/40 mt-1.5 font-semibold leading-none">by UniConsultX Solutions</span>
						</div>
					</div>
					<p className="text-white/70 text-sm max-w-sm leading-relaxed hidden md:block">
						Innovative digital growth partner helping businesses scale with seamless websites, custom apps, and premium design systems.
					</p>
					<div className="flex gap-2">
						{socialLinks.map((link) => (
							<Button
								key={link.title}
								size="icon"
								variant="outline"
								className="size-9 rounded-full flex items-center justify-center"
								asChild
							>
								<a
									href={link.href}
									target={link.isExternal ? "_blank" : undefined}
									rel={link.isExternal ? "noopener noreferrer" : undefined}
									aria-label={link.title}
									className="flex items-center justify-center"
								>
									<link.icon className="size-4 shrink-0" strokeWidth={1.8} />
								</a>
							</Button>
						))}
					</div>
				</AnimatedContainer>

				{footerLinkGroups.map((group, index) => (
					<AnimatedContainer
						key={group.label}
						delay={0.1 + index * 0.1}
						className={cn(
							"space-y-3",
							group.label === 'Connect' && "col-span-2 md:col-span-1"
						)}
					>
						<h3 className="text-xs font-semibold uppercase tracking-widest text-white/50">{group.label}</h3>
						<ul className="space-y-2 text-white/70 text-sm">
							{group.links.map((link) => (
								<li key={link.title}>
									{link.isExternal ? (
										<a
											href={link.href}
											target="_blank"
											rel="noopener noreferrer"
											className="hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5"
										>
											{link.icon && <link.icon className="size-4 shrink-0" strokeWidth={1.8} />}
											{link.title}
										</a>
									) : (
										<Link
											href={link.href}
											className="hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5"
										>
											{link.icon && <link.icon className="size-4 shrink-0" strokeWidth={1.8} />}
											{link.title}
										</Link>
									)}
								</li>
							))}
						</ul>
					</AnimatedContainer>
				))}
			</div>

			{/* Watermark */}
			<div
				className="pointer-events-none mt-4 sm:mt-16 select-none overflow-visible px-4 text-center text-[12vw] sm:text-[14vw] lg:text-[10rem] font-bold leading-none tracking-[-0.04em] text-transparent hidden sm:block"
				aria-hidden="true"
			>
				<span className="bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_0%,rgba(255,255,255,0.025)_33%,rgba(255,255,255,0.09)_66%,rgba(255,255,255,0.22)_100%)] bg-clip-text pr-3">
					Studio UnicX
				</span>
			</div>

			{/* Bottom Bar */}
			<div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
				<p>© 2026 UniConsultX Solutions PVT LTD. All rights reserved.</p>
				<div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
					<Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
					<Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
					<Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
					<button
						onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
						className="hover:text-white transition-colors text-left"
					>
						Cookie Preferences
					</button>
				</div>
			</div>
		</div>
	);

	if (!sticky) {
		return (
			<footer
				className={cn('relative w-full bg-[#1A3DE8] border-t border-white/20 text-white z-10 font-sans', className)}
				{...props}
			>
				<div ref={innerRef}>{footerContent}</div>
			</footer>
		);
	}

	return (
		<footer
			className={cn(
				'relative w-full bg-[#1A3DE8] border-t border-white/20 font-sans z-0',
				className
			)}
			style={{ 
				height: footerHeight ? `${footerHeight}px` : 'auto',
				clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' 
			}}
			{...props}
		>
			<div 
				ref={innerRef}
				className="fixed bottom-0 left-0 right-0 w-full bg-[#1A3DE8] text-white flex flex-col justify-between font-sans z-[-1]"
				style={{
					height: footerHeight ? `${footerHeight}px` : 'auto',
				}}
			>
				{footerContent}
			</div>
		</footer>
	);
}


type AnimatedContainerProps = {
	className?: string;
	children?: React.ReactNode;
	delay?: number;
};

function AnimatedContainer({
	delay = 0.1,
	className,
	children,
}: AnimatedContainerProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
