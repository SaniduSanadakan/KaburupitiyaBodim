import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        quickLinks: [
            { name: 'Home', path: '/' },
            { name: 'About Us', path: '/about-us' },
            { name: 'Contact Us', path: '/contact-us' },
        ],
        contact: [
            { icon: MapPin, text: 'Kamburupitiya, Sri Lanka' },
            { icon: Phone, text: '+94 77 256 5490' },
            { icon: Mail, text: 'info@kamburupitiyabodim.com' },
        ],
        social: [
            { icon: Facebook, href: '#', label: 'Facebook' },
            { icon: Instagram, href: '#', label: 'Instagram' },
            { icon: Twitter, href: '#', label: 'Twitter' },
        ],
    };

    return (
        <footer className="bg-background border-t mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-lg font-bold text-primary mb-4">Kamburupitiya Bodim</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Your trusted platform for finding quality boarding accommodations in Kamburupitiya. 
                            We connect students with comfortable and affordable living spaces.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {footerLinks.quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                        <ul className="space-y-3">
                            {footerLinks.contact.map((item, index) => (
                                <li key={index} className="flex items-start space-x-3">
                                    <item.icon className="text-primary mt-0.5" size={18} />
                                    <span className="text-muted-foreground text-sm">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                        
                        {/* Social Media Links */}
                        <div className="flex space-x-4 mt-6">
                            {footerLinks.social.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-muted-foreground text-sm">
                            © {currentYear} Kamburupitiya Bodim. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <Link
                                to="#"
                                className="text-muted-foreground hover:text-primary text-sm transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="#"
                                className="text-muted-foreground hover:text-primary text-sm transition-colors"
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
