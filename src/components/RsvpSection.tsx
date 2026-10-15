import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Send, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { playSuccessChime } from '../utils/audio';

interface RsvpSectionProps {
  initialGuestName?: string;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ initialGuestName = '' }) => {
  const [formData, setFormData] = useState({
    name: initialGuestName,
    email: '',
    phone: '',
    attendance: 'attending',
    guestsCount: 1,
    dietary: 'Standard',
    wishes: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Please provide your full name.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit RSVP');
      }

      playSuccessChime();
      setSuccessMessage(data.message || 'Thank you! Your RSVP has been confirmed.');
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp" className="py-20 sm:py-28 relative bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-2 mb-10"
        >
          <span className="font-royal text-xs uppercase tracking-[0.25em] text-[#8C6207] font-bold">
            Confidential RSVP
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18130E]">
            Kindly Respond by December 20, 2026
          </h2>
          <p className="font-serif-luxury text-base text-[#473B2F] max-w-lg mx-auto font-medium">
            Please let us know if you can join our celebration on January 20, 2027 at Ruwanara Royal Majesty.
          </p>
        </motion.div>

        {/* The Card Form Canvas with Smooth Presence */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="glass-card-darker rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(184,134,11,0.12)] border-2 border-[#C5A059]/50 relative foil-glint-effect"
        >
          {/* Strict Privacy Guarantee Badge */}
          <div className="flex items-center gap-2 p-3.5 rounded-xl bg-[#FAF0DC] border border-[#D4AF37]/50 text-[#59421A] text-xs font-serif-luxury font-medium mb-6">
            <ShieldCheck className="w-4 h-4 text-[#8C6207] shrink-0" />
            <span>
              <strong>Private &amp; Confidential:</strong> Guest responses are securely sent to Avindu &amp; Yavishka only. Your RSVP is never visible to other attendees.
            </span>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                className="text-center py-8 space-y-5"
              >
                {/* Celebratory Icon with Glow */}
                <motion.div
                  animate={{ scale: [0.8, 1.15, 1], rotate: [0, 10, 0] }}
                  transition={{ duration: 0.8 }}
                  className="w-16 h-16 rounded-full bg-[#18130E] text-[#FFE89E] flex items-center justify-center mx-auto shadow-lg poruwa-pulse"
                >
                  <CheckCircle2 className="w-8 h-8" />
                </motion.div>

                <div className="space-y-2">
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#18130E]">
                    Response Received with Gratitude!
                  </h3>
                  <p className="font-serif-luxury text-base text-[#473B2F] max-w-md mx-auto leading-relaxed">
                    {successMessage}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/40 max-w-sm mx-auto text-left text-xs font-royal space-y-2 text-[#3D3024] shadow-xs">
                  <div className="flex justify-between">
                    <span className="text-[#735310]">Guest Name:</span>
                    <span className="font-bold text-[#18130E]">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#735310]">Attendance:</span>
                    <span className="font-bold uppercase text-[#18130E]">{formData.attendance}</span>
                  </div>
                  {formData.attendance === 'attending' && (
                    <div className="flex justify-between">
                      <span className="text-[#735310]">Number of Guests:</span>
                      <span className="font-bold text-[#18130E]">{formData.guestsCount}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-royal tracking-wider uppercase font-bold text-[#8C6207] hover:underline cursor-pointer"
                  >
                    Edit your response
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {errorMsg && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-800 border border-red-200 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Attendance Choice Buttons */}
                <div className="space-y-2">
                  <label className="block text-xs font-royal tracking-wider uppercase text-[#2B2117] font-bold">
                    Will you be attending? <span className="text-red-700">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setFormData({ ...formData, attendance: 'attending' })}
                      className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-royal font-bold tracking-wide uppercase transition-all cursor-pointer border ${
                        formData.attendance === 'attending'
                          ? 'bg-[#18130E] text-[#FFE89E] border-[#D4AF37] shadow-md'
                          : 'bg-white text-[#544335] border-neutral-200 hover:border-[#D4AF37]'
                      }`}
                    >
                      Joyfully Attending
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setFormData({ ...formData, attendance: 'declining' })}
                      className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-royal font-bold tracking-wide uppercase transition-all cursor-pointer border ${
                        formData.attendance === 'declining'
                          ? 'bg-[#18130E] text-[#FFE89E] border-[#D4AF37] shadow-md'
                          : 'bg-white text-[#544335] border-neutral-200 hover:border-[#D4AF37]'
                      }`}
                    >
                      Regretfully Declining
                    </motion.button>
                  </div>
                </div>

                {/* Guest Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-royal tracking-wider uppercase text-[#2B2117] font-bold">
                    Full Name(s) <span className="text-red-700">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Mr. & Mrs. Bandara Senanayaka"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white text-[#18130E] text-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
                  />
                </div>

                {/* Guest Count (if attending) */}
                {formData.attendance === 'attending' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-royal tracking-wider uppercase text-[#2B2117] font-bold">
                        Number of Guests Attending
                      </label>
                      <select
                        value={formData.guestsCount}
                        onChange={(e) => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white text-[#18130E] text-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
                      >
                        <option value={1}>1 Guest (Just myself)</option>
                        <option value={2}>2 Guests</option>
                        <option value={3}>3 Guests</option>
                        <option value={4}>4 Guests</option>
                        <option value={5}>5 Guests (Family)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-royal tracking-wider uppercase text-[#2B2117] font-bold">
                        Meal / Dietary Preference
                      </label>
                      <select
                        value={formData.dietary}
                        onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white text-[#18130E] text-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
                      >
                        <option value="Standard">Traditional Sri Lankan Gourmet / Standard</option>
                        <option value="Vegetarian">Strict Vegetarian</option>
                        <option value="Halal">Halal</option>
                        <option value="Kids">Child Friendly</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-royal tracking-wider uppercase text-[#2B2117] font-bold">
                      Mobile / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 077 123 4567"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white text-[#18130E] text-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-royal tracking-wider uppercase text-[#2B2117] font-bold">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white text-[#18130E] text-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
                    />
                  </div>
                </div>

                {/* Warm Wishes / Blessings */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-royal tracking-wider uppercase text-[#2B2117] font-bold">
                    Warm Wishes or Blessings for the Couple
                  </label>
                  <textarea
                    rows={3}
                    value={formData.wishes}
                    onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
                    placeholder="Share a heartfelt message for Avindu &amp; Yavishka..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white text-[#18130E] text-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl text-sm font-royal font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#946F19] via-[#B8860B] to-[#7A5B12] hover:from-[#A87F1E] hover:to-[#8B6815] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Recording Your Response...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Confidential Response</span>
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
