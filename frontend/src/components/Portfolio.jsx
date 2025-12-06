import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowUpRight, 
  Terminal, 
  Check,
  MapPin,
  Phone,
  MessageSquare,
  Send
} from 'lucide-react';

// Function to safely copy text using the clipboard API or the fallback execCommand
const copyTextToClipboard = (text, onSuccess, onError) => {
  // Use modern Clipboard API if available and allowed
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(onSuccess).catch(() => {
      // Fallback to execCommand if modern API fails (often due to permissions)
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed"; // Prevents keyboard scroll in iOS
      textArea.style.opacity = 0;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          onSuccess();
        } else {
          onError("Manual copy required.");
        }
      } catch (err) {
        onError(`Copy failed: ${err.message}`);
      } finally {
        document.body.removeChild(textArea);
      }
    });
  } else {
    // Fallback for older browsers or if API is entirely unavailable
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; 
    textArea.style.opacity = 0;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        onSuccess();
      } else {
        onError("Manual copy required.");
      }
    } catch (err) {
      onError(`Copy failed: ${err.message}`);
    } finally {
      document.body.removeChild(textArea);
    }
  }
};


const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [emailCopied, setEmailCopied] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const handleContact = (e) => {
    e.preventDefault();
    const email = "harshithk0403@gmail.com";
    
    // Use the robust copy function
    copyTextToClipboard(
      email,
      // Success callback
      () => {
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
        // Attempt to open mail client (secondary action)
        setTimeout(() => {
          window.location.href = `mailto:${email}`;
        }, 500);
      },
      // Error callback (optional, for debugging)
      (message) => {
        console.error("Copy failed:", message);
        // Attempt to open mail client directly if copy fails
        window.location.href = `mailto:${email}`;
      }
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'work', 'projects', 'about', 'contact']; 
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const experiences = [
    {
      company: "TapRight (Stealth Startup)",
      role: "Co-Founder",
      date: "Oct 2025 - Present",
      description: "Building innovative financial solutions with a focus on full stack development. Leading technical strategy for scalable, low-latency credit card optimization engines.",
      tags: ["React Native", "FastAPI", "Python", "PostgreSQL"]
    },
    {
      company: "Tech Diversified",
      role: "Full Stack Developer",
      date: "Aug 2024 - May 2025",
      description: "Engineered the centralized MARS web platform and a high-performance native Android app. Integrated dynamic React dashboards and PDF reporting, cutting report generation time by 40%.",
      tags: ["React", "Next.js", "Android"]
    },
    {
      company: "Arizona State University",
      role: "Grader for Entrepreneurship (FSE 301/501)",
      date: "Aug 2024 - Dec 2024",
      description: "Partnered with faculty to assess assignments and refine grading rubrics for Entrepreneur & Value Creation courses, ensuring accuracy and providing feedback to deepen student understanding.",
      tags: ["Academia", "Curriculum", "Mentorship"]
    },
    {
      company: "Arizona State University",
      role: "Teaching Assistant (UGTA)",
      date: "Jan 2024 - May 2024",
      description: "Mentored 800+ students in Software Engineering and Information Assurance. Redesigned assignments reducing submission errors by 20% and directed weekly recitations.",
      tags: ["Mentorship", "Java", "Security"]
    },
    {
      company: "ITC Limited",
      role: "Software Developer",
      date: "Jun 2023 - Jul 2023",
      description: "Developed a real-time clock-in system using SQL, Python, and PostgreSQL (15% efficiency boost). Automated analytics to enhance inventory control.",
      tags: ["SQL", "Python", "PostgreSQL"]
    }
  ];

  const projects = [
    {
      title: "TapRight",
      category: "Fintech Mobile App",
      link: "https://www.tapright.app",
      description: "Smart credit card recommendation engine. Analyzes real-time location & merchant codes to maximize user rewards by suggesting the best credit cards.",
      stats: "Sub-100ms Latency",
      tech: ["React Native", "FastAPI", "Python", "PostgreSQL"],
      color: "bg-blue-50"
    },
    {
      title: "BackTrack",
      category: "Browser Extension",
      description: "A floating table of contents for AI chat interfaces. Navigate prompts with ease on ChatGPT, Claude, and Gemini with a draggable, resizable glassmorphism panel.",
      stats: "100% Private",
      tech: ["React", "TypeScript", "Tailwind CSS", "Shadow DOM"],
      color: "bg-violet-50"
    },
    {
      title: "Effort Logger",
      category: "Enterprise Tool",
      description: "Agile project management tool with real-time updates and enterprise-grade encryption for data privacy.",
      stats: "Secure Auth",
      tech: ["Java", "JavaFX", "Agile", "Encryption"],
      color: "bg-orange-50"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-stone-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Floating Navigation Pill */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="bg-white/80 backdrop-blur-md border border-stone-200 rounded-full px-2 py-2 shadow-lg shadow-stone-200/50 flex items-center gap-1 pointer-events-auto">
          {['Home', 'Work', 'Projects', 'About', 'Contact'].map((item) => {
            const id = item.toLowerCase();
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-stone-900 text-white shadow-md' 
                    : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {item}
              </button>
            );
          })}
          <div className="w-px h-4 bg-stone-300 mx-2 hidden sm:block"></div>
          <button 
            onClick={handleContact}
            className="p-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-colors hidden sm:flex items-center justify-center relative group"
            title="Contact Me (Email copied on click)"
          >
            {emailCopied ? <Check size={16} /> : <Mail size={16} />}
            {emailCopied && (
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-stone-800 text-white px-2 py-1 rounded whitespace-nowrap">
                Copied!
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col justify-center px-6 pt-20 relative">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-b from-orange-100/40 to-emerald-100/40 rounded-full blur-[120px] -z-10 opacity-60 pointer-events-none" />
        
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-stone-200 bg-white text-xs font-medium text-stone-500 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Available for New Opportunities
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif font-medium leading-[0.95] tracking-tight text-stone-900">
              Harshith Kamma<span className="text-emerald-500">.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-stone-500 max-w-2xl font-light leading-relaxed">
              Software Engineer & AI Enthusiast. Co-Founder of <span className="text-stone-900 font-medium">TapRight</span>. I build intuitive, data-powered financial tools that transform complex algorithms into <span className="text-stone-900 font-medium">smarter user decisions</span>.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="https://github.com/HarshithKamma" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800 transition-all hover:scale-105 active:scale-95">
                <Github size={20} /> GitHub
              </a>
              <a href="https://linkedin.com/in/harshithkamma" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 text-stone-700 rounded-xl font-medium hover:bg-stone-50 transition-all hover:border-stone-300">
                <Linkedin size={20} /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-stone-400">
          <ArrowUpRight size={24} className="rotate-[135deg]" />
        </div>
      </section>

      {/* Selected Work (Experience) */}
      <section id="work" className="py-32 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <h2 className="text-4xl font-serif text-stone-900">Work</h2>
            <div className="h-px bg-stone-200 flex-grow mx-8 hidden md:block"></div>
            <p className="text-stone-500">2023 — Present</p>
          </div>

          <div className="grid gap-6">
            {experiences.map((exp, i) => (
              <div key={i} className="group relative bg-white p-8 rounded-2xl border border-stone-100 hover:border-stone-200 shadow-sm hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300">
                <div className="grid md:grid-cols-[1fr_2fr] gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900">{exp.company}</h3>
                    <div className="text-stone-400 text-sm mt-1 mb-4 md:mb-0">{exp.date}</div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-stone-100 text-stone-600 text-xs rounded border border-stone-200">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-emerald-700 mb-2">{exp.role}</h4>
                    <p className="text-stone-600 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects (Bento Grid) */}
      <section id="projects" className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-serif text-stone-900 mb-16">Featured Projects</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <ProjectCard key={i} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* About & Skills (Magazine Layout) */}
      <section id="about" className="py-32 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-[1.5fr_1fr] gap-16">
            
            {/* Left: Bio */}
            <div>
              <h2 className="text-4xl font-serif text-stone-900 mb-8">About Me</h2>
              <div className="prose prose-lg prose-stone text-stone-600">
                <p className="mb-6">
                  I am a Computer Science graduate of <span className="text-stone-900 font-semibold">Arizona State University</span>, based in <span className="text-stone-900 font-semibold">Tustin, California</span>.
                </p>
                <p className="mb-6">
                  My journey started with a curiosity for how things work, which quickly evolved into a passion for building them. From architecting <span className="text-emerald-600 font-medium">fintech solutions</span> to optimizing <span className="text-emerald-600 font-medium">enterprise workflows</span>, I focus on creating software that is robust, scalable, and delightful to use.
                </p>
                <p>
                  When I'm not coding, you can find me playing cricket or just sleeping.
                </p>
              </div>
            </div>

            {/* Right: Skills List */}
            <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-lg shadow-stone-200/50 h-fit">
              <h3 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-2">
                <Terminal size={20} className="text-emerald-500" />
                Technical Arsenal
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Languages</div>
                  <div className="flex flex-wrap gap-2">
                    {["Java", "Python", "C/C++", "SQL", "JavaScript", "TypeScript"].map((s) => (
                      <span key={s} className="px-2 py-1 bg-stone-50 text-stone-700 text-sm rounded hover:bg-emerald-50 hover:text-emerald-700 transition-colors cursor-default">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="w-full h-px bg-stone-100" />

                <div>
                  <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Core Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {["React Native", "Next.js", "Node.js", "FastAPI", "Tailwind"].map((s) => (
                      <span key={s} className="px-2 py-1 bg-stone-50 text-stone-700 text-sm rounded hover:bg-emerald-50 hover:text-emerald-700 transition-colors cursor-default">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="w-full h-px bg-stone-100" />

                <div>
                  <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Infrastructure</div>
                  <div className="flex flex-wrap gap-2">
                    {["AWS", "Google Cloud", "Docker", "Git", "Figma"].map((s) => (
                      <span key={s} className="px-2 py-1 bg-stone-50 text-stone-700 text-sm rounded hover:bg-emerald-50 hover:text-emerald-700 transition-colors cursor-default">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* New Contact Section */}
      <section id="contact" className="py-32 px-6 bg-stone-50/50 border-t border-stone-100">
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-4xl font-serif text-stone-900 mb-10">Let's Connect</h2>
            <p className="text-stone-600 text-lg mb-16 max-w-2xl">
                I'm always open to discussing new engineering challenges, mentorship, or career opportunities. Feel free to reach out directly.
            </p>

            <div className="grid md:grid-cols-2 gap-12">
                
                {/* Contact Info (Left - Primary focus) */}
                <div className="space-y-8">
                    <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                        <MessageSquare size={20} className="text-emerald-500"/> Direct Contact
                    </h3>
                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-stone-700 group cursor-pointer" onClick={handleContact}>
                            <Mail size={20} className="text-stone-500 group-hover:text-emerald-600 transition-colors" />
                            <span className="hover:text-emerald-600 transition-colors">harshithk0403@gmail.com</span>
                            <span className={`text-xs text-stone-500 border border-stone-200 px-2 py-1 rounded-full ml-auto ${emailCopied ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100'}`}>
                                {emailCopied ? 'Copied!' : 'Click to Copy'}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-stone-700">
                            <MapPin size={20} className="text-stone-500" />
                            <span>Tustin, California, United States</span>
                        </div>
                        <div className="flex items-center gap-4 text-stone-700">
                            <Phone size={20} className="text-stone-500" />
                            <span>602-813-4661 (Mobile)</span>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-stone-900 pt-4">Follow Me</h3>
                    <div className="flex gap-6">
                      <a href="https://linkedin.com/in/harshithkamma" target="_blank" rel="noreferrer" className="p-3 bg-white border border-stone-200 rounded-full text-stone-600 hover:text-emerald-600 hover:border-emerald-300 transition-colors">
                        <Linkedin size={24} />
                      </a>
                      <a href="https://github.com/HarshithKamma" target="_blank" rel="noreferrer" className="p-3 bg-white border border-stone-200 rounded-full text-stone-600 hover:text-stone-900 hover:border-stone-300 transition-colors">
                        <Github size={24} />
                      </a>
                    </div>
                </div>

                {/* Quick Message Form (Right) */}
                <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-lg h-full flex flex-col items-center justify-center text-center">
                    <Send size={48} className="text-emerald-500 mb-6" />
                    <h3 className="text-2xl font-bold text-stone-900 mb-4 font-serif">Ready to start a conversation?</h3>
                    <p className="text-stone-600 mb-8">
                        The best way to reach me is via email for immediate consideration.
                    </p>
                    <button 
                        onClick={handleContact}
                        className="px-8 py-4 bg-stone-900 text-white font-medium rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-stone-300/50"
                    >
                        Send Email
                    </button>
                </div>
            </div>
            
            {/* Footer Text */}
            <div className="mt-20 pt-8 border-t border-stone-200 text-center text-stone-400 text-sm">
                <p>&copy; 2025 Harshith Kamma. Crafted with code.</p>
            </div>

        </div>
      </section>

    </div>
  );
};

// ProjectCard Component
const ProjectCard = ({ project }) => {
  return (
    <div className={`group relative rounded-3xl p-10 flex flex-col justify-between min-h-[500px] overflow-hidden transition-all duration-500 hover:shadow-2xl ${project.color}`}>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <span className="px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wider text-stone-800">
            {project.category}
          </span>
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer" className="p-2 bg-white rounded-full hover:scale-110 transition-transform shadow-sm">
              <ArrowUpRight size={18} />
            </a>
          )}
        </div>
        <h3 className="text-3xl font-bold text-stone-900 mb-2">{project.title}</h3>
        <p className="text-stone-600 font-medium mb-6 max-w-md">
          {project.description}
        </p>
      </div>

      {/* Bottom Stats/Tech */}
      <div className="relative z-10 mt-auto border-t border-stone-900/10 pt-6">
        <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-serif text-stone-900 italic">{project.stats}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="px-3 py-1 bg-white/80 rounded-md text-xs font-semibold text-stone-700">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Decorative Blob */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br from-white to-transparent rounded-full blur-3xl opacity-50 pointer-events-none group-hover:scale-150 transition-transform duration-700" />
    </div>
  );
};

export default Portfolio;
