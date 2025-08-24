import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { sendEmail } from "@/lib/email-service";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name || !form.email || !form.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await sendEmail({
        to_name: 'Rajkumar Mandal',
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      });
      
      toast({
        title: "Success!",
        description: "Your message has been sent successfully. I'll get back to you soon!",
      });
      
      // Reset form
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "Rajmandal14792@gmail.com",
      href: "mailto:Rajmandal14792@gmail.com",
      testId: "contact-email"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "+91 8793148668",
      href: "tel:+918793148668",
      testId: "contact-phone"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      value: "linkedin.com/in/rajkumarmandal17",
      href: "https://linkedin.com/in/rajkumarmandal17",
      testId: "contact-linkedin"
    },
    {
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      value: "github.com/rajkumarmandal17",
      href: "https://github.com/rajkumarmandal17",
      testId: "contact-github"
    },
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl font-bold text-foreground mb-4">Get In Touch</h2>
          <p className="text-lg text-muted-foreground">Let's discuss opportunities and collaborations</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="animate-slide-up">
            <h3 className="text-2xl font-bold text-foreground mb-8">Contact Information</h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center group">
                  <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center mr-4 text-brand-600 dark:text-brand-400 group-hover:bg-brand-200 dark:group-hover:bg-brand-800/50 transition-colors">
                    {info.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{info.label}</p>
                    <a
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-muted-foreground hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                      data-testid={info.testId}
                    >
                      {info.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12">
              <Card className="border-border shadow-lg">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-4">Let's Connect</h4>
                  <p className="text-muted-foreground mb-4">
                    I'm always interested in discussing new opportunities, collaborating on projects, 
                    or simply having a conversation about technology and software development.
                  </p>
                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      data-testid="social-github"
                    >
                      <a
                        href="https://github.com/rajkumarmandal17"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      data-testid="social-linkedin"
                    >
                      <a
                        href="https://linkedin.com/in/rajkumarmandal17"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      data-testid="social-email"
                    >
                      <a href="mailto:Rajmandal14792@gmail.com">
                        <Mail className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="animate-slide-up">
            <Card className="border-border shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Send Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                  <div>
                    <Label htmlFor="name" className="text-foreground font-semibold">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      className="mt-2"
                      placeholder="Your full name"
                      required
                      data-testid="contact-name-input"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-foreground font-semibold">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleInputChange}
                      className="mt-2"
                      placeholder="your.email@example.com"
                      required
                      data-testid="contact-email-input"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-foreground font-semibold">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="mt-2 resize-none"
                      placeholder="Tell me about your project or opportunity..."
                      required
                      data-testid="contact-message-input"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-brand-500 hover:bg-brand-600 text-white py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isSubmitting}
                    data-testid="contact-submit-button"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
