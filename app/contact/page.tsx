import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-green-50/30 to-green-100/20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2f3e2f] leading-tight mb-8">Contact Us</h1>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2d5a2d] to-[#4a5b4a] rounded-full flex items-center justify-center">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2f3e2f]">Quick Contact Form</h3>
                </div>

                <form className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-[#2f3e2f] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/30 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#2f3e2f] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/30 transition-all"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#2f3e2f] mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/30 transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-[#2f3e2f] mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/30 transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="research">Research</option>
                      <option value="training">Training</option>
                      <option value="partnership">Partnership</option>
                      <option value="media">Media</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#2f3e2f] mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/30 transition-all resize-none"
                      placeholder="Enter your message"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#2d5a2d] to-[#4a5b4a] text-white font-medium py-3 px-6 rounded-lg hover:from-[#4a5b4a] hover:to-[#2d5a2d] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Office Location */}
              <div className="group relative bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2d5a2d] to-[#4a5b4a] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#2f3e2f] mb-2">Our Office Location</h3>
                    <p className="text-[#4a5b4a] leading-relaxed">
                      TETFund Centre of Excellence in Food Security (TCoEFS)
                      <br />
                      Faculty of Agriculture, University of Jos,
                      <br />
                      PMB 2084, Jos, Plateau State, Nigeria.
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="group relative bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2d5a2d] to-[#4a5b4a] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#2f3e2f] mb-2">Call Us</h3>
                    <div className="space-y-1 text-[#4a5b4a]">
                      <p>08034390119</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Addresses */}
              <div className="group relative bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2d5a2d] to-[#4a5b4a] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#2f3e2f] mb-2">Email Us</h3>
                    <div className="space-y-1 text-[#4a5b4a] text-sm">
                      <p>General Inquiries: info@tcoefs.unijos.edu.ng</p>
                      <p>Research Partnerships: research@tcoefs.unijos.edu.ng</p>
                      <p>Media & Communications: media@tcoefs.unijos.edu.ng</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="group relative bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2d5a2d] to-[#4a5b4a] rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#2f3e2f] mb-2">Office Hours</h3>
                    <div className="space-y-1 text-[#4a5b4a]">
                      <p>Monday – Friday: 8:00 AM – 5:00 PM (WAT)</p>
                      <p>Saturday – Sunday: Closed</p>
                      <p className="text-sm text-[#4a5b4a]/80">(Except for special events and training sessions)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2f3e2f] mb-4">
              Find Us on the <span className="text-[#2d5a2d]">Map</span>
            </h2>
            <p className="text-lg text-[#4a5b4a] leading-relaxed">
              Visit us at the University of Jos, Faculty of Agriculture
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2023.6623327205368!2d8.878163947965762!3d9.963869171306849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10537281a77bb175%3A0x4992da7ae7f572b5!2sUniversity%20Of%20Jos%20Permanent%20Site!5e1!3m2!1sen!2sng!4v1755900963322!5m2!1sen!2sng"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2f3e2f] mb-4">
            Connect With Us <span className="text-[#2d5a2d]">Online</span>
          </h2>
          <p className="text-lg text-[#4a5b4a] leading-relaxed mb-12">
            Follow our activities, research updates, and events on our official channels
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Facebook",
                url: "https://facebook.com/TCoEFSNigeria",
                logo: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                ),
              },
              {
                name: "LinkedIn",
                url: "https://linkedin.com/company/tetfund-centre-of-excellence-in-food-security-tcoefs-university-of-jos/",
                logo: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ),
              },
              {
                name: "X (formerly Twitter)",
                url: "https://x.com/TCoEFS_NG",
                logo: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ),
              },
              {
                name: "Instagram",
                url: "https://instagram.com/tcoefs_ng",
                logo: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.082 5.52.204 5.036.388a5.918 5.918 0 0 0-2.14 1.393A5.918 5.918 0 0 0 1.503 4.92c-.184.484-.306 1.058-.34 2.005C1.128 7.989 1.115 8.396 1.115 12.017c0 3.621.013 4.028.048 4.976.034.947.156 1.521.34 2.005a5.918 5.918 0 0 0 2.14 1.393 5.918 5.918 0 0 0 2.14 1.393c.484.184 1.058.306 2.005.34.948.035 1.355.048 4.976.048 3.621 0 4.028-.013 4.976-.048.947-.034 1.521-.156 2.005-.34a5.918 5.918 0 0 0 2.14-1.393 5.918 5.918 0 0 0 1.393-2.14c.184-.484.306-1.058.34-2.005.035-.948.048-1.355.048-4.976 0-3.621-.013-4.028-.048-4.976-.034-.947-.156-1.521-.34-2.005a5.918 5.918 0 0 0-1.393-2.14A5.918 5.918 0 0 0 19.078.388c-.484-.184-1.058-.306-2.005-.34C16.025.013 15.618 0 12.017 0zm0 2.16c3.557 0 3.98.013 5.386.048.947.034 1.462.156 1.804.26.453.176.777.387 1.117.727.34.34.551.664.727 1.117.104.342.226.857.26 1.804.035 1.406.048 1.829.048 5.386 0 3.557-.013 3.98-.048 5.386-.034.947-.156 1.462-.26 1.804-.176.453-.387.777-.727 1.117-.34.34-.664.551-1.117.727-.342.104-.857.226-1.804.26-1.406.035-1.829.048-5.386.048-3.557 0-3.98-.013-5.386-.048-.947-.034-1.462-.156-1.804-.26-.453-.176-.777-.387-1.117-.727-.34-.34-.551-.664-.727-1.117-.104-.342-.226-.857-.26-1.804-.035-1.406-.048-1.829-.048-5.386 0-3.557.013-3.98.048-5.386.034-.947.156-1.462.26-1.804.176-.453.387-.777.727-1.117.34-.34.664-.551 1.117-.727.342-.104.857-.226 1.804-.26 1.406-.035 1.829-.048 5.386-.048z" />
                    <path d="M12.017 15.33a3.313 3.313 0 1 1 0-6.626 3.313 3.313 0 0 1 0 6.626zm0-8.466a5.153 5.153 0 1 0 0 10.306 5.153 5.153 0 0 0 0-10.306z" />
                    <path d="M19.846 6.595a1.204 1.204 0 1 1-2.408 0 1.204 1.204 0 0 1 2.408 0z" />
                  </svg>
                ),
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="text-center">
                  <div className="text-[#2d5a2d] mb-3 flex justify-center">{social.logo}</div>
                  <h3 className="text-lg font-semibold text-[#2f3e2f] mb-2">{social.name}</h3>
                  <p className="text-sm text-[#4a5b4a] break-all">{social.url.replace("https://", "")}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
