import { Play, ArrowRight, BarChart3, Shield, Zap, Calendar, Phone } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { Brain, Cpu, Database, LineChart, Factory, Utensils, Heart, Car, Building,  Microscope, Cloud, Lock, Sparkles, Target, Users, Globe } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Import video files
import heroVideo from '../assets/v1.mp4';
import techVideo from '../assets/v1.mp4';
import dataVideo from '../assets/v1.mp4';


const techStack = [
 {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Deep learning models trained to evaluate facial structures with precision and objectivity.',
    specs: ['Facial landmark detection', 'Deep CNN architecture', 'Objective outcome scoring', 'Automated evaluation'],
  },
  {
    icon: Cpu,
    title: 'Computer Vision Pipeline',
    description: 'Robust image processing workflow for pre- and post-operative image comparison.',
    specs: ['Image alignment', '3D reconstruction ready', 'Noise reduction', 'Feature extraction'],
  },
  {
    icon: Cloud,
    title: 'Data-Driven Insights',
    description: 'Generates quantifiable metrics to support clinical decisions and surgical outcome assessments.',
    specs: ['AI-based scoring', 'Deviation mapping', 'Predictive evaluation', 'Surgeon dashboard'],
    },
  {
    icon: Lock,
    title: 'Educational Integration',
    description: 'Enables surgical trainees to analyze cases and understand decision reasoning through AI feedback.',
    specs: ['Teaching assistant mode', 'Simulation-ready', 'Case repository', 'Interactive learning'],
  },
];

const metrics = [
  { icon: Target, value: '99.97%', label: 'Detection Accuracy', description: 'Industry-leading precision' },
  { icon: Zap, value: '23ms', label: 'Average Response', description: 'Near-instant analysis' },
  { icon: Database, value: '50K+', label: 'Scent Library', description: 'Comprehensive database' },
  { icon: Globe, value: '150+', label: 'Countries', description: 'Global deployment' },
  { icon: Users, value: '1M+', label: 'Analyses Daily', description: 'Massive scale' },
  { icon: Sparkles, value: '24/7', label: 'Uptime', description: 'Always available' },
];

const Home = () => {
  const videoRef = useRef(null);
  const techVideoRef = useRef(null);
  const dataVideoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
   const navigate = useNavigate(); 
  // Refs for animations
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const useCasesRef = useRef(null);
  const techRef = useRef(null);
  const metricsRef = useRef(null);

  useEffect(() => {
    // Hero section animations
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(ctaRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.4"
    )
    .fromTo(statsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );

    // Features grid animation
    gsap.fromTo(".feature-card",
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      }
    );

    // Use cases animation
    gsap.fromTo(".use-case-card",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: useCasesRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      }
    );

    // Technology stack animation
    gsap.fromTo(".tech-card",
      { opacity: 0, rotationY: 90 },
      {
        opacity: 1,
        rotationY: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: techRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      }
    );

    // Metrics counter animation
    gsap.fromTo(".metric-item",
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: metricsRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      }
    );

    // Parallax effect for background videos
    gsap.to(techVideoRef.current, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: techRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(dataVideoRef.current, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: metricsRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

  }, []);

  return (
    <>
      {/* Hero Section */}
      <div ref={heroRef} className="relative flex items-center justify-center min-h-screen overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => setIsVideoLoaded(true)}
            className="object-cover w-full h-full"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          
          {!isVideoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 border-b-2 border-blue-600 rounded-full animate-spin"></div>
                <div className="text-lg text-blue-600">Initializing Scent Intelligence...</div>
              </div>
            </div>
          )}
          
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-transparent to-purple-900/30"></div>
        </div>

        {/* Content */}
        <div className="relative w-full px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 mb-8 border rounded-full shadow-2xl bg-white/10 backdrop-blur-xl border-white/20">
                <Sparkles className="w-4 h-4 mr-2 text-blue-300" />
                <span className="text-sm font-semibold tracking-wide text-white">
                  RHINO VISION
                </span>
              </div>

              {/* Main Heading */}
              <h1 ref={titleRef} className="text-5xl font-black leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
                Beyond Perception -
                <span className="block mt-3 text-transparent bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text">
                  Experience the Power of Objective Evaluation
                </span>
              </h1>

              {/* Subtitle */}
              <p ref={subtitleRef} className="max-w-2xl mt-8 text-2xl font-light leading-relaxed tracking-wide text-white/90">
              An intelligent evaluation platform that bridges the gap between surgical expertise and objective outcome assessment in rhinoplasty
              </p>

              {/* CTA Buttons */}
              <div ref={ctaRef} className="flex flex-col justify-center gap-6 mt-12 sm:flex-row lg:justify-start">
                <button className="flex items-center justify-center px-10 py-5 text-lg font-bold text-white transition-all duration-300 transform shadow-2xl group bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl hover:from-blue-700 hover:to-purple-700 hover:shadow-3xl hover:-translate-y-1">
                   Log In
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </button>
                
                <button className="flex items-center justify-center px-10 py-5 text-lg font-bold text-white transition-all duration-300 border-2 shadow-xl group bg-white/10 backdrop-blur-lg border-white/30 rounded-2xl hover:bg-white/20 hover:shadow-2xl">
                                   Sign Up
                </button>
            
                <button onClick={()=>navigate("/rhinoplasty")} className="flex items-center justify-center px-10 py-5 text-lg font-bold text-white transition-all duration-300 border-2 shadow-xl group bg-white/10 backdrop-blur-lg border-white/30 rounded-2xl hover:bg-white/20 hover:shadow-2xl">
             Instant Work
                </button>
               
              </div>

            </div>

            {/* Right Content - Advanced Visualization */}
           
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute transform -translate-x-1/2 bottom-8 left-1/2">
          <div className="animate-bounce">
            <div className="flex justify-center w-6 h-10 border-2 rounded-full border-white/50">
              <div className="w-1 h-3 mt-2 rounded-full bg-white/50"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Metrics Section */}
      <section ref={metricsRef} className="relative top-12 py-24 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        <div className="absolute inset-0">
          <video
            ref={dataVideoRef}
            autoPlay
            muted
            loop
            playsInline
            className="object-cover w-full h-full opacity-20"
          >
            <source src={dataVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        </div>
        
        <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* <div className="mb-20 text-center">
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Enterprise Scale, <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">Quantum Precision</span>
            </h2>
            <p className="max-w-3xl mx-auto mt-6 text-xl font-light tracking-wide text-gray-300">
              Processing billions of scent data points across global infrastructure with unmatched accuracy and speed.
            </p>
          </div> */}

          <div className="grid grid-cols-2 gap-8 lg:grid-cols-3 xl:grid-cols-6">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center metric-item group">
                <div className="p-6 transition-all duration-500 border bg-white/5 backdrop-blur-lg border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 hover:scale-105">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-transform duration-300 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl group-hover:scale-110">
                    <metric.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="mb-2 text-3xl font-black text-white">{metric.value}</div>
                  <div className="mb-1 text-lg font-semibold text-gray-200">{metric.label}</div>
                  <div className="text-sm text-gray-400">{metric.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section ref={featuresRef} className="py-24 relative top-12 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">RHINO</span> VISION
            </h2>
            <p className="max-w-3xl mx-auto mt-6 text-xl font-light tracking-wide text-gray-600">
              A smart tool that uses image analysis to provide data-driven pre- and post-operative rhinoplasty assessments for more consistent and transparent results.
            </p>
          </div>
          </div>
      </section>

    
      <section ref={techRef} className="relative py-24 overflow-hidden text-white bg-gray-900">
        <div className="absolute inset-0">
          <video
            ref={techVideoRef}
            autoPlay
            muted
            loop
            playsInline
            className="object-cover w-full h-full opacity-30"
          >
            <source src={techVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40"></div>
        </div>

        <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">Designed </span> for Objectivity
            </h2>
            <p className="max-w-3xl mx-auto mt-6 text-xl font-light tracking-wide text-gray-300">
             Developed using state-of-the-art AI technologies to bring transparency and accuracy to rhinoplasty planning.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="p-8 transition-all duration-500 border tech-card group bg-white/5 backdrop-blur-lg border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20"
              >
                <div className="flex items-start space-x-6">
                  <div className="p-4 transition-transform duration-300 shadow-lg bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl group-hover:scale-110">
                    <tech.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-3 text-2xl font-bold tracking-tight">{tech.title}</h3>
                    <p className="mb-6 text-lg font-light leading-relaxed tracking-wide text-gray-300">
                      {tech.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {tech.specs.map((spec, specIndex) => (
                        <span
                          key={specIndex}
                          className="px-4 py-2 text-sm font-medium text-gray-200 transition-colors duration-300 border rounded-full bg-white/10 border-white/10 hover:bg-white/20"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </>
  );
};

export default Home;
