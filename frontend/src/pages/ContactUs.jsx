import { Mail, Phone, MapPin } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import Navigation from '../components/Navigation';

export default function ContactUs() {
    return (
        <div><Navigation />
        <div className="min-h-screen bg-muted/40 py-12 px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
                    <p className="text-lg text-muted-foreground">
                        Get in touch with us. We're here to help!
                    </p>
                </div>

                <div className="max-w-xl mx-auto">
                    {/* Contact Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Get in Touch</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <MapPin className="text-primary mt-1" size={24} />
                                <div>
                                    <h3 className="font-semibold">Address</h3>
                                    <p className="text-muted-foreground text-sm">Kamburupitiya, Sri Lanka</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <Phone className="text-primary mt-1" size={24} />
                                <div>
                                    <h3 className="font-semibold">Phone</h3>
                                    <p className="text-muted-foreground text-sm">+94 77 256 5490</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <Mail className="text-primary mt-1" size={24} />
                                <div>
                                    <h3 className="font-semibold">Email</h3>
                                    <p className="text-muted-foreground text-sm">info@kamburupitiyabodim.com</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
        </div>
    );
}
