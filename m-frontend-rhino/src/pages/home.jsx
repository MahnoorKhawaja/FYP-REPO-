import { Play, ArrowRight, BarChart3, Shield, Zap, Calendar, Phone } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { Brain, Cpu, Database, LineChart, Factory, Utensils, Heart, Car, Building,  Microscope, Cloud, Lock, Sparkles, Target, Users, Globe } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Import video files
import heroVideo from '../assets/v1.mp4';
import techVideo from '../assets/v1.mp4';
import dataVideo from '../assets/v1.mp4';

const features = [
  {
    icon: Brain,
    title: 'Neural Olfactory Networks',
    description: 'Proprietary deep learning architectures trained on billions of scent data points for unprecedented accuracy in molecular recognition.',
    gradient: 'from-purple-500 to-blue-500',
  },
  {
    icon: Cpu,
    title: 'Quantum Processing',
    description: 'Real-time analysis with sub-50ms latency using quantum-inspired algorithms for instantaneous scent pattern recognition.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Database,
    title: 'Global Scent Repository',
    description: 'Access the world\'s most comprehensive digital olfaction database with 50,000+ authenticated scent signatures.',
    gradient: 'from-cyan-500 to-green-500',
  },
  {
    icon: LineChart,
    title: 'Predictive Intelligence',
    description: 'Advanced temporal forecasting models that predict scent evolution and detect anomalies 48 hours in advance.',
    gradient: 'from-green-500 to-yellow-500',
  },
  {
    icon: Shield,
    title: 'Zero-Trust Security',
    description: 'Military-grade encryption with quantum-resistant protocols and SOC 2 Type II certified infrastructure.',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Zap,
    title: 'Hyper-Scale Architecture',
    description: 'Cloud-native microservices architecture that automatically scales to process millions of scent analyses simultaneously.',
    gradient: 'from-orange-500 to-red-500',
  },
];

const useCases = [
  {
    icon: Factory,
    title: 'Industrial Safety',
    description: 'Real-time monitoring of volatile organic compounds and hazardous chemical emissions.',
    metrics: ['99.9% detection accuracy', '<30s response time', '24/7 automated monitoring'],
    video: '/videos/industrial-safety.mp4',
  },
  {
    icon: Utensils,
    title: 'Food Quality',
    description: 'Precision analysis of food freshness, contamination, and flavor profile consistency.',
    metrics: ['95% spoilage prediction', 'Real-time quality control', 'Supply chain optimization'],
    video: '/videos/food-quality.mp4',
  },
  {
    icon: Heart,
    title: 'Medical Diagnostics',
    description: 'Non-invasive disease detection through breath analysis and biomarker identification.',
    metrics: ['Early disease detection', 'Non-invasive testing', 'Continuous monitoring'],
    video: '/videos/medical-diagnostics.mp4',
  },
];

const techStack = [
  {
    icon: Microscope,
    title: 'Nano-Sensor Arrays',
    description: 'Multi-modal sensor technology capable of detecting concentrations at parts-per-quadrillion levels.',
    specs: ['PPQ sensitivity', 'Multi-array fusion', 'Self-calibrating', 'AI-optimized'],
  },
  {
    icon: Cpu,
    title: 'Edge AI Processing',
    description: 'On-device neural networks for real-time analysis without cloud dependency.',
    specs: ['Tensor processing', 'Federated learning', 'Edge intelligence', 'Low latency'],
  },
  {
    icon: Cloud,
    title: 'Distributed Cloud',
    description: 'Global edge network with intelligent data routing and processing optimization.',
    specs: ['Global coverage', 'Auto-scaling', 'Intelligent routing', '99.99% uptime'],
  },
  {
    icon: Lock,
    title: 'Quantum Security',
    description: 'Post-quantum cryptographic protocols ensuring data integrity and privacy.',
    specs: ['Quantum-resistant', 'Zero-knowledge proofs', 'End-to-end encryption', 'GDPR compliant'],
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
                  QUANTUM OLFACTION PLATFORM
                </span>
              </div>

              {/* Main Heading */}
              <h1 ref={titleRef} className="text-5xl font-black leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
                The Future of
                <span className="block mt-3 text-transparent bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text">
                  Scent Intelligence
                </span>
              </h1>

              {/* Subtitle */}
              <p ref={subtitleRef} className="max-w-2xl mt-8 text-2xl font-light leading-relaxed tracking-wide text-white/90">
                Harnessing quantum-inspired AI and multi-modal sensor fusion to decode 
                the molecular language of scents with unprecedented precision.
              </p>

              {/* CTA Buttons */}
              <div ref={ctaRef} className="flex flex-col justify-center gap-6 mt-12 sm:flex-row lg:justify-start">
                <button className="flex items-center justify-center px-10 py-5 text-lg font-bold text-white transition-all duration-300 transform shadow-2xl group bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl hover:from-blue-700 hover:to-purple-700 hover:shadow-3xl hover:-translate-y-1">
                  <Calendar className="w-6 h-6 mr-3" />
                  Schedule Demo
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </button>
                
                <button className="flex items-center justify-center px-10 py-5 text-lg font-bold text-white transition-all duration-300 border-2 shadow-xl group bg-white/10 backdrop-blur-lg border-white/30 rounded-2xl hover:bg-white/20 hover:shadow-2xl">
                  <Play className="w-6 h-6 mr-3" />
                  Platform Tour
                </button>
              </div>

              {/* Stats */}
              <div ref={statsRef} className="grid max-w-md grid-cols-3 gap-6 mx-auto mt-16 lg:mx-0">
                {[
                  { value: '99.97%', label: 'Accuracy' },
                  { value: '23ms', label: 'Response' },
                  { value: '50K+', label: 'Scents' }
                ].map((stat, index) => (
                  <div key={index} className="p-5 text-center transition-all duration-300 border bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl hover:bg-white/15">
                    <div className="text-2xl font-black text-white">{stat.value}</div>
                    <div className="mt-1 text-sm font-medium tracking-wide text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Advanced Visualization */}
            <div className="relative">
              <div className="relative p-8 border shadow-2xl bg-white/10 backdrop-blur-2xl border-white/20 rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl"></div>
                
                {/* Live Analysis Dashboard */}
                <div className="relative p-6 shadow-inner bg-gradient-to-br from-blue-600/90 to-purple-600/90 rounded-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold tracking-wide text-white">QUANTUM ANALYSIS ACTIVE</h3>
                    <div className="flex space-x-1">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Molecular Grid */}
                  <div className="grid grid-cols-5 gap-3 mb-6">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div
                        key={i}
                        className="rounded-lg aspect-square bg-white/20 animate-pulse"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      ></div>
                    ))}
                  </div>

                  {/* Real-time Data Stream */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-white/90">
                      <span>Molecular Signature:</span>
                      <span className="font-mono font-bold">C10H16</span>
                    </div>
                    <div className="flex justify-between text-white/90">
                      <span>Quantum Confidence:</span>
                      <span className="font-mono font-bold">99.2%</span>
                    </div>
                    <div className="flex justify-between text-white/90">
                      <span>Concentration:</span>
                      <span className="font-mono font-bold">2.3 PPM</span>
                    </div>
                  </div>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[
                    { icon: BarChart3, label: 'Analytics' },
                    { icon: Shield, label: 'Security' },
                    { icon: Zap, label: 'AI Core' }
                  ].map((item, index) => (
                    <div key={index} className="text-center group">
                      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 transition-all duration-300 bg-white/10 rounded-xl group-hover:bg-white/20">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs font-medium tracking-wide text-white/80">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute px-4 py-2 text-sm font-bold text-white rounded-full shadow-2xl -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-500">
                LIVE DETECTION
              </div>
              <div className="absolute px-4 py-2 border shadow-2xl -bottom-3 -left-3 bg-white/10 backdrop-blur-lg border-white/20 rounded-xl">
                <div className="flex items-center">
                  <div className="w-2 h-2 mr-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-white">QUANTUM ONLINE</span>
                </div>
              </div>
            </div>
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
      <section ref={metricsRef} className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
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
          <div className="mb-20 text-center">
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Enterprise Scale, <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">Quantum Precision</span>
            </h2>
            <p className="max-w-3xl mx-auto mt-6 text-xl font-light tracking-wide text-gray-300">
              Processing billions of scent data points across global infrastructure with unmatched accuracy and speed.
            </p>
          </div>

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
      <section ref={featuresRef} className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">Quantum-Leap</span> Technology
            </h2>
            <p className="max-w-3xl mx-auto mt-6 text-xl font-light tracking-wide text-gray-600">
              Our platform represents the convergence of cutting-edge AI, advanced sensor technology, and quantum computing principles.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative overflow-hidden transition-all duration-500 bg-white shadow-2xl feature-card group rounded-3xl hover:shadow-3xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="relative p-8">
                  <div className={`bg-gradient-to-br ${feature.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-lg font-light leading-relaxed tracking-wide text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Use Cases Section */}
      <section ref={useCasesRef} className="relative py-24 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
        <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              Transformative <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">Applications</span>
            </h2>
            <p className="max-w-3xl mx-auto mt-6 text-xl font-light tracking-wide text-gray-600">
              Revolutionizing industries through advanced scent intelligence and real-time molecular analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="relative overflow-hidden transition-all duration-500 bg-white shadow-2xl use-case-card group rounded-3xl hover:shadow-3xl"
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute flex items-center justify-center top-6 left-6 bg-white/20 backdrop-blur-lg w-14 h-14 rounded-2xl">
                    <useCase.icon className="text-white w-7 h-7" />
                  </div>
                </div>
                
                <div className="relative p-8">
                  <h3 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
                    {useCase.title}
                  </h3>
                  <p className="mb-6 text-lg font-light leading-relaxed tracking-wide text-gray-600">
                    {useCase.description}
                  </p>
                  
                  <div className="space-y-3">
                    {useCase.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="flex items-center text-sm text-gray-500">
                        <div className="w-2 h-2 mr-3 bg-blue-500 rounded-full"></div>
                        {metric}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Technology Section */}
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
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">Architected</span> for Excellence
            </h2>
            <p className="max-w-3xl mx-auto mt-6 text-xl font-light tracking-wide text-gray-300">
              Built on a foundation of cutting-edge technologies and enterprise-grade infrastructure.
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

      {/* Enhanced CTA Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Ready to Revolutionize Your Industry?
          </h2>
          <p className="max-w-2xl mx-auto mb-12 text-xl font-light tracking-wide text-blue-100">
            Join the future of scent intelligence and transform your operations with quantum-level precision.
          </p>

          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <button className="flex items-center justify-center px-12 py-5 text-lg font-bold text-blue-600 transition-all duration-300 transform bg-white shadow-2xl group rounded-2xl hover:bg-blue-50 hover:shadow-3xl hover:-translate-y-1">
              <Calendar className="w-6 h-6 mr-3" />
              Book Enterprise Demo
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </button>
            
            <button className="flex items-center justify-center px-12 py-5 text-lg font-bold text-white transition-all duration-300 bg-transparent border-2 border-white shadow-xl group rounded-2xl hover:bg-white/10 hover:shadow-2xl">
              <Phone className="w-6 h-6 mr-3" />
              Contact Solutions
            </button>
          </div>

          <div className="mt-8 text-sm font-medium tracking-wide text-blue-200">
            • Zero commitment 30-day trial • Enterprise-grade security • 24/7 dedicated support
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;