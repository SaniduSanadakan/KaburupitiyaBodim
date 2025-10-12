import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about-us' },
        { name: 'Contact Us', path: '/contact-us' }
    ];

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="bg-background border-b sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-primary hover:opacity-90 transition-opacity">
                            Kamburupitiya Bodim
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:gap-4">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {navLinks.map((link) => (
                                    <NavigationMenuItem key={link.path}>
                                        <NavigationMenuLink asChild active={isActive(link.path)}>
                                            <Link
                                                to={link.path}
                                                className={cn(
                                                    navigationMenuTriggerStyle(),
                                                    isActive(link.path) && 'bg-accent text-accent-foreground'
                                                )}
                                            >
                                                {link.name}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                        <Button asChild>
                            <Link to="/login">Login</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4 space-y-2">
                        {navLinks.map((link) => (
                            <Button
                                key={link.path}
                                variant={isActive(link.path) ? 'secondary' : 'ghost'}
                                asChild
                                className="w-full justify-start"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Link to={link.path}>
                                    {link.name}
                                </Link>
                            </Button>
                        ))}
                        <Button
                            asChild
                            className="w-full"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Link to="/login">Login</Link>
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    );
}
