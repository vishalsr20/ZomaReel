import React, { useState } from 'react'

const HelpAndSupport = () => {
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const faqs = [
    {
      id: 1,
      question: "How do I like and save videos?",
      answer: "Tap the heart icon on the right side of any video to like it. Tap the bookmark icon to save videos to your collection for easy access later."
    },
    {
      id: 2,
      question: "Why isn't my video playing?",
      answer: "Videos auto-play when they're in view (at least 60% visible). If a video isn't playing, try scrolling slightly or checking your internet connection. Make sure your device's volume isn't muted."
    },
    {
      id: 3,
      question: "How do I visit a food partner's store?",
      answer: "Look for the 'Visit store' button at the bottom of videos featuring food partners. Tap it to view their full menu and offerings."
    },
    {
      id: 4,
      question: "Can I control video playback?",
      answer: "Videos loop automatically. They play when scrolled into view and pause when you scroll away. Tap the video to pause/play manually on most devices."
    },
    {
      id: 5,
      question: "How do I see comments on a video?",
      answer: "Tap the comment icon on the right side of any video to view and add comments. The number shows how many comments the video has received."
    },
    {
      id: 6,
      question: "What should I do if content isn't loading?",
      answer: "Check your internet connection first. Try refreshing the page or clearing your browser cache. If issues persist, please contact us using the form below."
    }
  ]

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-auto">
      {/* Animated starry background */}
      <div 
        className="fixed inset-0 opacity-60 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(3px 3px at 20% 30%, #fff, transparent),
            radial-gradient(2px 2px at 60% 70%, #4fc3f7, transparent),
            radial-gradient(2px 2px at 50% 50%, #f06292, transparent),
            radial-gradient(1px 1px at 80% 10%, #fff, transparent),
            radial-gradient(3px 3px at 90% 60%, #ba68c8, transparent),
            radial-gradient(2px 2px at 33% 80%, #ffd54f, transparent),
            radial-gradient(1px 1px at 15% 95%, #4db6ac, transparent),
            radial-gradient(2px 2px at 45% 15%, #ff8a65, transparent),
            radial-gradient(1px 1px at 75% 85%, #aed581, transparent),
            radial-gradient(3px 3px at 25% 65%, #64b5f6, transparent)
          `,
          backgroundSize: '200% 200%',
          animation: 'twinkle 6s ease-in-out infinite'
        }}
      />
      
      {/* Animated particles */}
      <div 
        className="fixed inset-0 opacity-70 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(circle at 10% 20%, rgba(255, 100, 200, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 90% 80%, rgba(100, 200, 255, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(200, 100, 255, 0.12) 0%, transparent 45%),
            radial-gradient(circle at 30% 90%, rgba(255, 200, 100, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 80% 30%, rgba(100, 255, 150, 0.12) 0%, transparent 45%)
          `,
          backgroundSize: '200% 200%',
          animation: 'float 12s ease-in-out infinite'
        }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto px-5 py-10 text-white">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 
            className="text-5xl font-bold mb-3"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #4fc3f7 50%, #f06292 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Help & Support
          </h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            We're here to help you get the most out of your experience
          </p>
        </header>

        {/* FAQ Section */}
        <section className="mb-16 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl">
          <h2 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <div 
                key={faq.id} 
                className="bg-black/30 rounded-xl overflow-hidden border border-white/8"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex justify-between items-center p-5 text-left hover:bg-white/5 transition-colors"
                  aria-expanded={expandedFaq === faq.id}
                >
                  <span className="text-lg font-medium pr-4">{faq.question}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`flex-shrink-0 transition-transform duration-300 ${
                      expandedFaq === faq.id ? 'rotate-180' : ''
                    }`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="mb-16 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl">
          <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
          <p className="text-white/80 mb-8">
            Can't find what you're looking for? Send us a message and we'll get back to you within 24 hours.
          </p>
          
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" className="mb-4">
                <circle cx="12" cy="12" r="10" />
                <polyline points="8 12 11 15 16 9" />
              </svg>
              <h3 className="text-2xl font-semibold mb-2 text-green-400">Message Sent!</h3>
              <p className="text-white/70">We've received your message and will respond soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-none"
                  placeholder="Describe your issue or question..."
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Send Message
              </button>
            </form>
          )}
        </section>

        {/* Quick Links */}
        <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl">
          <h3 className="text-2xl font-semibold mb-6">Quick Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="#" className="flex items-center gap-3 p-4 bg-black/30 rounded-lg hover:bg-black/50 transition-colors border border-white/8">
              <span className="text-2xl">📚</span>
              <span className="font-medium">User Guide</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-4 bg-black/30 rounded-lg hover:bg-black/50 transition-colors border border-white/8">
              <span className="text-2xl">🔒</span>
              <span className="font-medium">Privacy Policy</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-4 bg-black/30 rounded-lg hover:bg-black/50 transition-colors border border-white/8">
              <span className="text-2xl">📋</span>
              <span className="font-medium">Terms of Service</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-4 bg-black/30 rounded-lg hover:bg-black/50 transition-colors border border-white/8">
              <span className="text-2xl">🍽️</span>
              <span className="font-medium">Partner with Us</span>
            </a>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.4;
            background-position: 0% 0%;
          }
          50% {
            opacity: 0.8;
            background-position: 100% 100%;
          }
        }

        @keyframes float {
          0%, 100% {
            background-position: 0% 0%;
            transform: scale(1) rotate(0deg);
          }
          33% {
            background-position: 50% 100%;
            transform: scale(1.15) rotate(5deg);
          }
          66% {
            background-position: 100% 50%;
            transform: scale(0.95) rotate(-5deg);
          }
        }
      `}</style>
    </div>
  )
}

export default HelpAndSupport