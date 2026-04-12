"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Building2, BookOpen, DollarSign, Briefcase, Calendar,
    Users, Award, TrendingUp, Scale, ClipboardList, HelpCircle,
    Lightbulb, Images
} from "lucide-react"

// Map icon names to components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Building2,
    BookOpen,
    DollarSign,
    Briefcase,
    Calendar,
    Users,
    Award,
    TrendingUp,
    Scale,
    ClipboardList,
    HelpCircle,
    Lightbulb,
    Images,
}

interface Section {
    id: string
    label: string
    iconName: string
}

interface ScrollSpyTOCProps {
    sections: Section[]
    className?: string
}

export function ScrollSpyTOC({ sections, className = "" }: ScrollSpyTOCProps) {
    const [activeSection, setActiveSection] = React.useState<string>(sections[0]?.id || "")

    React.useEffect(() => {
        const observers: IntersectionObserver[] = []
        const sectionElements: Element[] = []

        sections.forEach(({ id }) => {
            const element = document.getElementById(id)
            if (element) {
                sectionElements.push(element)
            }
        })

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                }
            })
        }

        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -60% 0px",
            threshold: 0
        }

        sectionElements.forEach((element) => {
            const observer = new IntersectionObserver(observerCallback, observerOptions)
            observer.observe(element)
            observers.push(observer)
        })

        return () => {
            observers.forEach((observer) => observer.disconnect())
        }
    }, [sections])

    return (
        <div className={`space-y-1 bg-card border rounded-2xl p-4 shadow-sm max-h-[80vh] overflow-y-auto ${className}`}>
            <p className="font-semibold text-muted-foreground px-4 mb-2 text-sm uppercase tracking-wider">
                Table of Contents
            </p>
            <nav className="relative">
                {sections.map(({ id, label, iconName }) => {
                    const isActive = activeSection === id
                    const Icon = iconMap[iconName] || Building2
                    return (
                        <a
                            key={id}
                            href={`#${id}`}
                            className="relative flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all z-10"
                        >
                            {isActive && (
                                <motion.span
                                    layoutId="activeTOC"
                                    className="absolute inset-0 bg-[#f6c804]/10 rounded-lg border border-[#f6c804]/30"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                            <Icon className={`h-4 w-4 relative z-10 transition-colors ${isActive ? "text-[#f6c804]" : "text-muted-foreground"}`} />
                            <span className={`relative z-10 transition-colors ${isActive ? "text-[#f6c804]" : "text-muted-foreground hover:text-foreground"}`}>
                                {label}
                            </span>
                        </a>
                    )
                })}
            </nav>
        </div>
    )
}

// Mobile horizontal scrolling version
interface MobileScrollSpyTOCProps {
    sections: Section[]
    className?: string
}

export function MobileScrollSpyTOC({ sections, className = "" }: MobileScrollSpyTOCProps) {
    const [activeSection, setActiveSection] = React.useState<string>(sections[0]?.id || "")
    const scrollContainerRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const observers: IntersectionObserver[] = []
        const sectionElements: Element[] = []

        sections.forEach(({ id }) => {
            const element = document.getElementById(id)
            if (element) {
                sectionElements.push(element)
            }
        })

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                }
            })
        }

        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -60% 0px",
            threshold: 0
        }

        sectionElements.forEach((element) => {
            const observer = new IntersectionObserver(observerCallback, observerOptions)
            observer.observe(element)
            observers.push(observer)
        })

        return () => {
            observers.forEach((observer) => observer.disconnect())
        }
    }, [sections])

    // Auto-scroll active item into view
    React.useEffect(() => {
        const activeElement = scrollContainerRef.current?.querySelector(`[data-section="${activeSection}"]`)
        if (activeElement) {
            activeElement.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
        }
    }, [activeSection])

    return (
        <div className={className}>
            <p className="font-semibold text-muted-foreground text-xs uppercase tracking-wider mb-3">
                Jump to Section
            </p>
            <div
                ref={scrollContainerRef}
                className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
            >
                {sections.map(({ id, label, iconName }) => {
                    const isActive = activeSection === id
                    const Icon = iconMap[iconName] || Building2
                    return (
                        <a
                            key={id}
                            href={`#${id}`}
                            data-section={id}
                            className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap shrink-0 transition-all ${isActive
                                ? "bg-[#f6c804]/10 text-[#f6c804] border border-[#f6c804]/50"
                                : "bg-card border border-border text-muted-foreground hover:text-[#f6c804] hover:border-[#f6c804]/50"
                                }`}
                        >
                            <Icon className="h-4 w-4" />
                            {label}
                        </a>
                    )
                })}
            </div>
        </div>
    )
}

// Floating Mobile TOC with Drawer - replaces horizontal scroll
interface FloatingMobileTOCProps {
    sections: Section[]
    className?: string
}

export function FloatingMobileTOC({ sections, className = "" }: FloatingMobileTOCProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [activeSection, setActiveSection] = React.useState<string>(sections[0]?.id || "")

    React.useEffect(() => {
        const observers: IntersectionObserver[] = []
        const sectionElements: Element[] = []

        sections.forEach(({ id }) => {
            const element = document.getElementById(id)
            if (element) {
                sectionElements.push(element)
            }
        })

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                }
            })
        }

        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -60% 0px",
            threshold: 0
        }

        sectionElements.forEach((element) => {
            const observer = new IntersectionObserver(observerCallback, observerOptions)
            observer.observe(element)
            observers.push(observer)
        })

        return () => {
            observers.forEach((observer) => observer.disconnect())
        }
    }, [sections])

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    // Listen for menu open state to hide TOC button
    React.useEffect(() => {
        const checkMenuState = () => {
            setIsMenuOpen(document.body.hasAttribute('data-menu-open'));
        };

        // Initial check
        checkMenuState();

        const observer = new MutationObserver(checkMenuState);
        observer.observe(document.body, { attributes: true, attributeFilter: ['data-menu-open'] });

        return () => observer.disconnect();
    }, []);

    // Prevent body scroll when drawer is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    const handleSectionClick = (id: string) => {
        setIsOpen(false)
        // Small delay to let drawer close before scrolling
        setTimeout(() => {
            const element = document.getElementById(id)
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" })
            }
        }, 150)
    }

    return (
        <div className={`${className} transition-opacity duration-200 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {/* Floating Button - positioned above the contact button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-28 right-6 z-40 h-11 w-11 rounded-full bg-[#f6c804] text-black shadow-lg flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <BookOpen className="h-5 w-5" />
            </motion.button>

            {/* Drawer Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Drawer Content - Premium Dark Glassmorphism */}
                        <motion.div
                            initial={{ y: "100%", opacity: 0.8 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0.8 }}
                            transition={{
                                type: "tween",
                                duration: 0.35,
                                ease: [0.32, 0.72, 0, 1]
                            }}
                            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-[2rem] shadow-2xl max-h-[80vh] overflow-hidden"
                        >
                            {/* Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#1a1a2e] to-[#0f0f1a]" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(246,200,4,0.08),_transparent_50%)]" />

                            {/* Content Container */}
                            <div className="relative z-10">
                                {/* Handle bar */}
                                <div className="flex justify-center pt-4 pb-2">
                                    <div className="w-10 h-1 rounded-full bg-white/25" />
                                </div>

                                {/* Header */}
                                <div className="px-5 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[#f6c804] to-[#e5b703] shadow-lg shadow-[#f6c804]/20">
                                            <BookOpen className="h-5 w-5 text-black" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">Quick Navigation</h3>
                                            <p className="text-xs text-white/50">Tap to jump to section</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="mx-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                                {/* Sections List */}
                                <div className="overflow-y-auto max-h-[calc(80vh-140px)] py-3 px-3">
                                    <nav className="space-y-1.5">
                                        {sections.map(({ id, label, iconName }) => {
                                            const isActive = activeSection === id
                                            const Icon = iconMap[iconName] || Building2
                                            return (
                                                <button
                                                    key={id}
                                                    onClick={() => handleSectionClick(id)}
                                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${isActive
                                                        ? "bg-[#f6c804] text-black shadow-lg shadow-[#f6c804]/30"
                                                        : "text-white/70 hover:bg-white/5 hover:text-white active:scale-[0.98]"
                                                        }`}
                                                >
                                                    <div className={`p-2 rounded-lg transition-colors ${isActive
                                                        ? "bg-black/15"
                                                        : "bg-white/5"
                                                        }`}>
                                                        <Icon className="h-4 w-4" />
                                                    </div>
                                                    <span className="font-medium text-sm">{label}</span>
                                                    {isActive && (
                                                        <div className="ml-auto">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-black/40" />
                                                        </div>
                                                    )}
                                                </button>
                                            )
                                        })}
                                    </nav>
                                </div>

                                {/* Close hint */}
                                <div className="text-center pb-6 pt-2">
                                    <p className="text-[11px] text-white/30 tracking-wide uppercase">Tap outside to close</p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
