"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { TransitionLink as Link } from "@/components/ui/page-transition";
interface IconProps extends React.SVGProps<SVGSVGElement> {
	size?: number;
}

const Instagram = ({ size = 20, ...props }: IconProps) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size} {...props}>
		<rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
		<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
		<line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
	</svg>
);

const Linkedin = ({ size = 20, ...props }: IconProps) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size} {...props}>
		<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
		<rect width="4" height="12" x="2" y="9" />
		<circle cx="4" cy="4" r="2" />
	</svg>
);

const Github = ({ size = 20, ...props }: IconProps) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size} {...props}>
		<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
		<path d="M9 18c-4.51 2-5-2-7-2" />
	</svg>
);

const Facebook = ({ size = 20, ...props }: IconProps) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size} {...props}>
		<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
	</svg>
);

const Mail = ({ size = 20, ...props }: IconProps) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size} {...props}>
		<rect width="20" height="16" x="2" y="4" rx="2" />
		<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
	</svg>
);

interface iNavItem {
	heading: string;
	href: string;
	subheading?: string;
	imgSrc?: string;
}

interface iNavLinkProps extends iNavItem {
	setIsActive: (isActive: boolean) => void;
	index: number;
}

interface iCurvedNavbarProps {
	setIsActive: (isActive: boolean) => void;
	navItems: iNavItem[];
}

interface iHeaderProps {
	navItems?: iNavItem[];
	footer?: React.ReactNode;
}

const MENU_SLIDE_ANIMATION = {
	initial: { x: "calc(100% + 100px)" },
	enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] } },
	exit: {
		x: "calc(100% + 100px)",
		transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
	},
};

export const defaultNavItems: iNavItem[] = [
	{
		heading: "Home",
		href: "/",
	},
	{
		heading: "Services",
		href: "/services",
	},
	{
		heading: "Studio",
		href: "/studio",
	},
	{
		heading: "Careers",
		href: "/careers",
	},
	{
		heading: "Contact",
		href: "/contact",
	},
];

const CustomFooter: React.FC = () => {
	return (
		<div className="flex w-full text-sm justify-between text-black px-10 md:px-24 py-6 border-t border-black/10">
			<a href="https://instagram.com/studio.unicx" target="_blank" rel="noopener noreferrer" className="hover:text-[#1A3DE8] transition-colors">
				<Instagram size={20} />
			</a>
			<a href="https://linkedin.com/company/studio.unicx" target="_blank" rel="noopener noreferrer" className="hover:text-[#1A3DE8] transition-colors">
				<Linkedin size={20} />
			</a>
			<a href="https://github.com/studio.unicx" target="_blank" rel="noopener noreferrer" className="hover:text-[#1A3DE8] transition-colors">
				<Github size={20} />
			</a>
			<a href="https://facebook.com/studio.unicx" target="_blank" rel="noopener noreferrer" className="hover:text-[#1A3DE8] transition-colors">
				<Facebook size={20} />
			</a>
			<a href="mailto:hello@studio.unicx.in" className="hover:text-[#1A3DE8] transition-colors">
				<Mail size={20} />
			</a>
		</div>
	);
};

const NavLink: React.FC<iNavLinkProps> = ({
	heading,
	href,
	setIsActive,
	index,
}) => {
	const ref = useRef<HTMLAnchorElement | null>(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const handleMouseMove = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
	) => {
		if (!ref.current) return;
		const rect = ref.current.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;
		x.set(mouseX / rect.width - 0.5);
		y.set(mouseY / rect.height - 0.5);
	};

	const handleClick = () => {
		setIsActive(false);
	};

	return (
		<motion.div
			onClick={handleClick}
			initial="initial"
			whileHover="whileHover"
			className="group relative flex items-center justify-between border-b border-black/15 py-3.5 transition-colors duration-500 uppercase"
		>
			<Link ref={ref} onMouseMove={handleMouseMove} href={href} className="w-full">
				<div className="relative flex items-center">
					<span className="text-black/40 transition-colors duration-500 text-2xl font-light mr-4 min-w-[28px]">
						0{index}.
					</span>
					<div className="flex flex-row gap-2">
						<motion.span
							variants={{
								initial: { x: 0 },
								whileHover: { x: 8 },
							}}
							transition={{
								type: "spring",
								staggerChildren: 0.04,
								delayChildren: 0.05,
							}}
							className="relative z-10 block text-2xl font-light tracking-wider text-black transition-colors duration-500"
						>
							{heading.split("").map((letter, i) => {
								return (
									<motion.span
										key={i}
										variants={{
											initial: { x: 0 },
											whileHover: { x: 4 },
										}}
										transition={{ type: "spring" }}
										className="inline-block"
									>
										{letter === " " ? "\u00A0" : letter}
									</motion.span>
								);
							})}
						</motion.span>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};

const Curve: React.FC = () => {
	const [height, setHeight] = useState(0);

	useEffect(() => {
		setHeight(window.innerHeight);
		const handleResize = () => setHeight(window.innerHeight);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	if (height === 0) return null;

	const initialPath = `M100 0 L200 0 L200 ${height} L100 ${height} Q-100 ${height / 2} 100 0`;
	const targetPath = `M100 0 L200 0 L200 ${height} L100 ${height} Q100 ${height / 2} 100 0`;

	const curve = {
		initial: { d: initialPath },
		enter: {
			d: targetPath,
			transition: { duration: 1, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
		},
		exit: {
			d: initialPath,
			transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
		},
	};

	return (
		<svg
			className="absolute top-0 -left-[99px] w-[100px] stroke-none h-full"
			style={{ fill: "#ffffff" }}
		>
			<motion.path
				variants={curve}
				initial="initial"
				animate="enter"
				exit="exit"
			/>
		</svg>
	);
};

export const CurvedNavbar: React.FC<
	iCurvedNavbarProps & { footer?: React.ReactNode }
> = ({ setIsActive, navItems, footer = <CustomFooter /> }) => {
	return (
		<motion.div
			variants={MENU_SLIDE_ANIMATION}
			initial="initial"
			animate="enter"
			exit="exit"
			className="h-[100dvh] w-screen max-w-md fixed right-0 top-0 z-40 bg-white shadow-2xl"
		>
			<div className="h-full pt-20 pb-4 flex flex-col justify-between">
				<div className="flex flex-col gap-4 px-8 md:px-16">
					<div className="text-black/40 border-b border-black/10 uppercase text-xs tracking-widest pb-2 font-mono">
						<p>Navigation</p>
					</div>
					<section className="bg-transparent">
						<div className="flex flex-col">
							{navItems.map((item, index) => {
								return (
									<NavLink
										key={item.href}
										{...item}
										setIsActive={setIsActive}
										index={index + 1}
									/>
								);
							})}
						</div>
					</section>
				</div>
				{footer}
			</div>
			<Curve />
		</motion.div>
	);
};

export default function CurvedMenuHeader({
	navItems = defaultNavItems,
	footer = <CustomFooter />,
}: iHeaderProps) {
	const [isActive, setIsActive] = useState(false);

	const handleClick = () => {
		setIsActive(!isActive);
	};

	return (
		<>
			<div className="relative">
				<button
					type="button"
					aria-label="Toggle navigation menu"
					aria-expanded={isActive}
					onClick={handleClick}
					className="fixed right-6 top-3 sm:top-4 z-50 w-12 h-12 rounded-lg flex items-center justify-center cursor-pointer border border-white/20 bg-black text-white hover:border-white/40 transition-colors md:hidden"
				>
					<div className="relative w-6 h-5 flex flex-col justify-between items-start">
						<span
							className={`block h-[2.5px] rounded-full transition-all duration-300 ${isActive ? "rotate-45 translate-y-[9px] bg-white w-6" : "bg-[#FF6A00] w-6"}`}
						></span>
						<span
							className={`block h-[2.5px] rounded-full transition-all duration-300 ${isActive ? "opacity-0 w-6 bg-white" : "bg-[#FF9F00] w-[16px]"}`}
						></span>
						<span
							className={`block h-[2.5px] rounded-full transition-all duration-300 ${isActive ? "-rotate-45 -translate-y-[9px] bg-white w-6" : "bg-[#FFC400] w-[10px]"}`}
						></span>
					</div>
				</button>
			</div>

			<AnimatePresence mode="wait">
				{isActive && (
					<CurvedNavbar
						setIsActive={setIsActive}
						navItems={navItems}
						footer={footer}
					/>
				)}
			</AnimatePresence>
		</>
	);
}
