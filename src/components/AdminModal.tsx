import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  LogOut,
  Users,
  Image as ImageIcon,
  Link as LinkIcon,
  Download,
  Trash2,
  Plus,
  Check,
  Search,
  CheckCircle,
  XCircle,
  Sparkles,
  Share2,
  Copy,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { RsvpSubmission, RsvpStats, WeddingData, GalleryPhoto } from '../types/wedding';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  wedding: WeddingData;
  onUpdateWedding: (updated: WeddingData) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  wedding,
  onUpdateWedding,
}) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('wedding_admin_token'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<'rsvps' | 'gallery' | 'links'>('rsvps');

  // RSVP Management State
  const [rsvps, setRsvps] = useState<RsvpSubmission[]>([]);
  const [stats, setStats] = useState<RsvpStats | null>(null);
  const [rsvpFilter, setRsvpFilter] = useState<'all' | 'attending' | 'declining'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedRsvpId, setCopiedRsvpId] = useState<string | null>(null);

  // Gallery Add Photo State
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    category: 'Ceremony Moments',
    caption: '',
    imageUrl: '',
  });
  const [heroInput, setHeroInput] = useState(wedding.heroImage);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Link Generator State
  const [guestLinkInput, setGuestLinkInput] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copiedCustom, setCopiedCustom] = useState(false);
  const [copiedGeneral, setCopiedGeneral] = useState(false);

  useEffect(() => {
    if (token) {
      fetchRsvps();
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }
      setToken(data.token);
      localStorage.setItem('wedding_admin_token', data.token);
      setPassword('');
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (token) {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }
    setToken(null);
    localStorage.removeItem('wedding_admin_token');
    setRsvps([]);
    setStats(null);
  };

  const fetchRsvps = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/admin/rsvps', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401 || res.status === 403) {
        handleLogout();
        return;
      }
      const data = await res.json();
      setRsvps(data.rsvps || []);
      setStats(data.stats || null);
    } catch {
      // Handled silently
    }
  };

  const handleDeleteRsvp = async (id: string) => {
    if (!token || !window.confirm('Are you sure you want to remove this RSVP entry?')) return;
    try {
      const res = await fetch(`/api/admin/rsvps/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        fetchRsvps();
      }
    } catch {
      // Error
    }
  };

  const handleCopyRsvpLink = (name: string, id: string) => {
    const origin = window.location.origin;
    const link = `${origin}/?to=${encodeURIComponent(name)}`;
    navigator.clipboard.writeText(link);
    setCopiedRsvpId(id);
    setTimeout(() => setCopiedRsvpId(null), 2000);
  };

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newPhoto.title || !newPhoto.imageUrl) return;

    setLoading(true);
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPhoto),
      });
      const data = await res.json();
      if (res.ok) {
        onUpdateWedding({
          ...wedding,
          gallery: data.gallery,
        });
        setNewPhoto({ title: '', category: 'Ceremony Moments', caption: '', imageUrl: '' });
        setFeedbackMsg('New photo added to the gallery successfully!');
        setTimeout(() => setFeedbackMsg(''), 3000);
      }
    } catch {
      // Error
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePhoto = async (id: string) => {
    if (!token || !window.confirm('Delete this photo from gallery?')) return;
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        onUpdateWedding({
          ...wedding,
          gallery: data.gallery,
        });
      }
    } catch {
      // Error
    }
  };

  const handleSaveHero = async () => {
    if (!token || !heroInput.trim()) return;
    try {
      const res = await fetch('/api/admin/wedding-details', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          wedding: { heroImage: heroInput.trim() },
        }),
      });
      const data = await res.json();
      if (res.ok) {
        onUpdateWedding(data.wedding);
        setFeedbackMsg('Hero photo updated successfully!');
        setTimeout(() => setFeedbackMsg(''), 3000);
      }
    } catch {
      // Error
    }
  };

  const handleGenerateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestLinkInput.trim()) return;
    const origin = window.location.origin;
    const encoded = encodeURIComponent(guestLinkInput.trim());
    const fullLink = `${origin}/?to=${encoded}`;
    setGeneratedLink(fullLink);
  };

  const handleShareToWhatsApp = (link: string, guest?: string) => {
    const text = guest
      ? `Dearest ${guest}, with the blessings of our parents, we warmly invite you to celebrate our royal wedding on Wednesday, January 20, 2027 at Ruwanara Royal Majesty, Narammala.\n\nPlease open your personalized royal invitation here:\n${link}`
      : `With the blessings of our parents, Avindu & Yavishka warmly invite you to celebrate their royal wedding on Wednesday, January 20, 2027 at Ruwanara Royal Majesty, Narammala.\n\nPlease view the wedding invitation here:\n${link}`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleExportCsv = () => {
    if (!rsvps.length) return;
    const headers = ['Name', 'Attendance', 'Guests Count', 'Phone', 'Email', 'Dietary', 'Wishes', 'Submitted Date'];
    const rows = rsvps.map((r) => [
      `"${r.name.replace(/"/g, '""')}"`,
      r.attendance,
      r.guestsCount,
      `"${(r.phone || '').replace(/"/g, '""')}"`,
      `"${(r.email || '').replace(/"/g, '""')}"`,
      `"${(r.dietary || '').replace(/"/g, '""')}"`,
      `"${(r.wishes || '').replace(/"/g, '""')}"`,
      new Date(r.submittedAt).toLocaleString(),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Wedding_RSVP_Avindu_Yavishka_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  const filteredRsvps = rsvps.filter((r) => {
    const matchesFilter = rsvpFilter === 'all' || r.attendance === rsvpFilter;
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.phone && r.phone.includes(searchQuery));
    return matchesFilter && matchesSearch;
  });

  const generalInvitationUrl = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FFFDF9] rounded-3xl border-2 border-[#D4AF37]/50 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#1E1712] via-[#2D231B] to-[#18130E] text-[#FFF9E6] flex items-center justify-between border-b border-[#D4AF37]/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#FFE89E]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-royal text-base sm:text-lg font-bold tracking-wider uppercase text-[#FFF2CC]">
                Avindu &amp; Yavishka Admin Suite
              </h2>
              <p className="font-serif-luxury text-xs text-neutral-300">
                Confidential RSVP database &amp; exclusive link sharing center
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {token && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg border border-red-500/40 text-red-200 hover:bg-red-950/40 text-xs font-royal flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-200 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!token ? (
            /* Login Screen */
            <div className="max-w-md mx-auto py-8 space-y-6">
              <div className="text-center space-y-1">
                <h3 className="font-serif-luxury text-2xl font-bold text-[#18130E]">
                  Secure Couple Sign In
                </h3>
                <p className="font-serif-luxury text-sm text-[#544234]">
                  Enter your credentials to access confidential guest responses, manage photos, and generate invitation links.
                </p>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-royal uppercase tracking-wider text-[#3D3024] font-bold">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter admin username"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-royal uppercase tracking-wider text-[#3D3024] font-bold">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-royal uppercase tracking-wider text-xs font-bold text-white bg-gradient-to-r from-[#946F19] to-[#7A5B12] hover:from-[#A87F1E] hover:to-[#8B6815] transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Authenticating...' : 'Sign In to Portal'}
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Admin Suite */
            <div className="space-y-6">
              {/* Navigation Tabs */}
              <div className="flex border-b border-[#D4AF37]/30 pb-2 gap-2">
                <button
                  onClick={() => setActiveTab('rsvps')}
                  className={`px-4 py-2 rounded-xl text-xs font-royal uppercase tracking-wider font-bold transition-colors flex items-center gap-2 cursor-pointer ${
                    activeTab === 'rsvps'
                      ? 'bg-[#18130E] text-[#FFE89E]'
                      : 'text-[#473B2F] hover:bg-[#FAF0DC]'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>RSVP Responses</span>
                  {stats && (
                    <span className="px-1.5 py-0.2 rounded-full bg-[#FFE89E] text-[#18130E] text-[10px]">
                      {stats.totalSubmissions}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('links')}
                  className={`px-4 py-2 rounded-xl text-xs font-royal uppercase tracking-wider font-bold transition-colors flex items-center gap-2 cursor-pointer ${
                    activeTab === 'links'
                      ? 'bg-[#18130E] text-[#FFE89E]'
                      : 'text-[#473B2F] hover:bg-[#FAF0DC]'
                  }`}
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Links &amp; Invites</span>
                </button>

                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`px-4 py-2 rounded-xl text-xs font-royal uppercase tracking-wider font-bold transition-colors flex items-center gap-2 cursor-pointer ${
                    activeTab === 'gallery'
                      ? 'bg-[#18130E] text-[#FFE89E]'
                      : 'text-[#473B2F] hover:bg-[#FAF0DC]'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Gallery Photos</span>
                </button>
              </div>

              {feedbackMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>{feedbackMsg}</span>
                </div>
              )}

              {/* TAB 1: RSVPS */}
              {activeTab === 'rsvps' && (
                <div className="space-y-6">
                  {/* Summary Metric Cards */}
                  {stats && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/50 shadow-xs">
                        <span className="text-[10px] font-royal uppercase tracking-wider text-[#735310] font-bold">
                          Total Submissions
                        </span>
                        <p className="font-royal text-2xl font-bold text-[#18130E] mt-1 tabular-nums">
                          {stats.totalSubmissions}
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-xs">
                        <span className="text-[10px] font-royal uppercase tracking-wider text-emerald-800 font-bold">
                          Attending
                        </span>
                        <p className="font-royal text-2xl font-bold text-emerald-900 mt-1 tabular-nums">
                          {stats.attendingResponses}
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 shadow-xs">
                        <span className="text-[10px] font-royal uppercase tracking-wider text-rose-800 font-bold">
                          Declined
                        </span>
                        <p className="font-royal text-2xl font-bold text-rose-900 mt-1 tabular-nums">
                          {stats.declinedResponses}
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#FAF0DC] border border-[#D4AF37] shadow-xs">
                        <span className="text-[10px] font-royal uppercase tracking-wider text-[#735310] font-bold">
                          Total Headcount
                        </span>
                        <p className="font-royal text-2xl font-bold text-[#735310] mt-1 tabular-nums">
                          {stats.totalExpectedGuests} <span className="text-xs">guests</span>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Filter & Export Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search guest or phone..."
                          className="pl-8 pr-3 py-1.5 rounded-lg border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#B8860B]"
                        />
                      </div>

                      <div className="flex items-center gap-1 bg-[#F5EFEB] p-1 rounded-lg">
                        {(['all', 'attending', 'declining'] as const).map((filter) => (
                          <button
                            key={filter}
                            onClick={() => setRsvpFilter(filter)}
                            className={`px-2.5 py-1 text-[11px] font-royal uppercase tracking-wider font-semibold rounded-md transition-colors cursor-pointer ${
                              rsvpFilter === filter
                                ? 'bg-white text-[#18130E] shadow-xs'
                                : 'text-[#544234] hover:text-[#18130E]'
                            }`}
                          >
                            {filter}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleExportCsv}
                      className="px-3 py-1.5 rounded-lg border border-[#D4AF37]/50 bg-white text-[#543D1A] hover:bg-[#FAF4E8] text-xs font-royal font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5 text-[#B8860B]" />
                      <span>Export CSV</span>
                    </button>
                  </div>

                  {/* Responses Table */}
                  <div className="border border-[#D4AF37]/30 rounded-2xl overflow-hidden bg-white shadow-xs">
                    {filteredRsvps.length === 0 ? (
                      <div className="p-8 text-center text-neutral-500 font-serif-luxury text-sm">
                        No RSVP submissions found matching the criteria.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-[#FAF7F2] border-b border-[#D4AF37]/20 font-royal uppercase tracking-wider text-[#735310] font-bold">
                            <tr>
                              <th className="p-3">Guest Name</th>
                              <th className="p-3">Status</th>
                              <th className="p-3 text-center">Count</th>
                              <th className="p-3">Contact</th>
                              <th className="p-3">Dietary</th>
                              <th className="p-3">Wishes / Note</th>
                              <th className="p-3 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-100 font-medium text-[#2E241B]">
                            {filteredRsvps.map((rsvp) => (
                              <tr key={rsvp.id} className="hover:bg-[#FFFDF9]">
                                <td className="p-3 font-bold font-serif-luxury text-sm text-[#18130E]">
                                  {rsvp.name}
                                </td>
                                <td className="p-3">
                                  {rsvp.attendance === 'attending' ? (
                                    <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                                      <CheckCircle className="w-3.5 h-3.5" />
                                      Attending
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 text-rose-700 font-bold">
                                      <XCircle className="w-3.5 h-3.5" />
                                      Declined
                                    </span>
                                  )}
                                </td>
                                <td className="p-3 text-center tabular-nums font-bold">
                                  {rsvp.guestsCount}
                                </td>
                                <td className="p-3 text-neutral-600">
                                  <div>{rsvp.phone || '—'}</div>
                                  <div className="text-[10px] text-neutral-400">{rsvp.email}</div>
                                </td>
                                <td className="p-3 text-neutral-600">
                                  {rsvp.dietary || 'Standard'}
                                </td>
                                <td className="p-3 max-w-xs font-serif-luxury italic text-neutral-700 truncate" title={rsvp.wishes}>
                                  {rsvp.wishes || '—'}
                                </td>
                                <td className="p-3 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      onClick={() => handleCopyRsvpLink(rsvp.name, rsvp.id)}
                                      className="p-1.5 text-[#8C6207] hover:bg-[#FAF0DC] rounded-md transition-colors"
                                      title="Copy personalized invitation link for this guest"
                                    >
                                      {copiedRsvpId === rsvp.id ? (
                                        <Check className="w-4 h-4 text-emerald-600" />
                                      ) : (
                                        <Copy className="w-4 h-4" />
                                      )}
                                    </button>
                                    <button
                                      onClick={() => handleDeleteRsvp(rsvp.id)}
                                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                                      title="Delete RSVP"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: LINK SHARING & GUEST INVITATION CENTER */}
              {activeTab === 'links' && (
                <div className="space-y-6 max-w-2xl mx-auto py-2">
                  {/* General Link Card */}
                  <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/50 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-royal uppercase tracking-wider text-[#735310] font-bold">
                          General Wedding Website Link
                        </span>
                        <h4 className="font-serif-luxury text-lg font-bold text-[#18130E]">
                          Base Invitation URL
                        </h4>
                      </div>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FAF0DC] text-[#735310] font-royal font-bold">
                        Universal Link
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={generalInvitationUrl}
                        className="flex-1 px-3.5 py-2 rounded-xl border border-neutral-300 text-xs bg-white text-[#18130E] font-mono select-all"
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(generalInvitationUrl);
                          setCopiedGeneral(true);
                          setTimeout(() => setCopiedGeneral(false), 2000);
                        }}
                        className="px-4 py-2 rounded-xl bg-[#18130E] text-[#FFE89E] font-royal text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        {copiedGeneral ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedGeneral ? 'Copied' : 'Copy'}</span>
                      </button>
                      <button
                        onClick={() => handleShareToWhatsApp(generalInvitationUrl)}
                        className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-royal text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                        title="Share on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </button>
                    </div>
                  </div>

                  {/* Personalized Guest Link Generator */}
                  <div className="p-5 rounded-2xl bg-[#FAF7F2] border-2 border-[#D4AF37]/60 shadow-sm space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-royal uppercase tracking-wider text-[#8C6207] font-bold">
                        Exclusive Feature for Guests
                      </span>
                      <h4 className="font-serif-luxury text-xl font-bold text-[#18130E]">
                        Generate Personalized Guest Link
                      </h4>
                      <p className="font-serif-luxury text-xs text-[#544234]">
                        Type any guest or family name. When they open their link, their name will be elegantly inscribed on the golden royal wax envelope and RSVP form!
                      </p>
                    </div>

                    {/* Quick prefixes */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-royal text-[#735310] font-bold">Quick Prefixes:</span>
                      {['Mr. & Mrs.', 'Uncle & Family', 'Dr. & Family', 'Hon. & Family', 'Dearest Friends'].map((prefix) => (
                        <button
                          key={prefix}
                          type="button"
                          onClick={() => setGuestLinkInput(prefix + ' ')}
                          className="px-2.5 py-0.5 rounded-lg bg-white border border-[#D4AF37]/40 text-[#473B2F] text-[11px] font-royal hover:border-[#D4AF37] cursor-pointer"
                        >
                          +{prefix}
                        </button>
                      ))}
                    </div>

                    <form onSubmit={handleGenerateLink} className="space-y-3">
                      <div>
                        <input
                          type="text"
                          value={guestLinkInput}
                          onChange={(e) => setGuestLinkInput(e.target.value)}
                          placeholder="e.g. Uncle Kamal &amp; Family or Dr. Kusal Kodikara"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white text-xs text-[#18130E] focus:ring-2 focus:ring-[#B8860B]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#946F19] to-[#7A5B12] text-white font-royal text-xs uppercase tracking-wider font-bold cursor-pointer shadow-md hover:from-[#A87F1E] hover:to-[#8B6815] transition-all"
                      >
                        Create Personalized Link
                      </button>
                    </form>

                    {generatedLink && (
                      <div className="p-4 rounded-xl bg-[#FAF0DC] border border-[#D4AF37] space-y-3">
                        <span className="text-[10px] font-royal uppercase tracking-wider text-[#735310] font-bold block">
                          Generated Link for <span className="text-[#18130E] font-bold">{guestLinkInput}</span>:
                        </span>
                        
                        <div className="flex gap-2">
                          <input
                            type="text"
                            readOnly
                            value={generatedLink}
                            className="flex-1 px-3 py-1.5 rounded-lg border border-neutral-300 text-xs bg-white text-[#18130E] font-mono select-all"
                          />
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(generatedLink);
                              setCopiedCustom(true);
                              setTimeout(() => setCopiedCustom(false), 2000);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#18130E] text-[#FFE89E] font-royal text-xs font-semibold cursor-pointer shrink-0"
                          >
                            {copiedCustom ? 'Copied!' : 'Copy'}
                          </button>
                        </div>

                        {/* WhatsApp One-Click Direct Message */}
                        <div className="pt-1">
                          <button
                            onClick={() => handleShareToWhatsApp(generatedLink, guestLinkInput)}
                            className="w-full py-2 px-3 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-royal font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>Send Custom Invitation on WhatsApp</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: GALLERY PHOTOS */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  {/* Change Hero Photo */}
                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/40 space-y-3">
                    <h4 className="font-royal text-xs uppercase tracking-wider text-[#18130E] font-bold">
                      Main Wedding Hero Portrait
                    </h4>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={heroInput}
                        onChange={(e) => setHeroInput(e.target.value)}
                        placeholder="Image URL or local asset path"
                        className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 text-xs focus:ring-1 focus:ring-[#B8860B]"
                      />
                      <button
                        onClick={handleSaveHero}
                        className="px-4 py-2 rounded-xl bg-[#18130E] text-[#FFE89E] font-royal text-xs uppercase font-bold cursor-pointer"
                      >
                        Update Hero
                      </button>
                    </div>
                  </div>

                  {/* Add New Gallery Photo Form */}
                  <form onSubmit={handleAddPhoto} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D4AF37]/30 space-y-3">
                    <h4 className="font-royal text-xs uppercase tracking-wider text-[#18130E] font-bold">
                      Add New Photo to Gallery
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        value={newPhoto.title}
                        onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                        placeholder="Photo Title (e.g. Ring Exchange)"
                        className="px-3 py-2 rounded-xl border border-neutral-200 text-xs bg-white focus:ring-1 focus:ring-[#B8860B]"
                      />
                      <input
                        type="text"
                        required
                        value={newPhoto.imageUrl}
                        onChange={(e) => setNewPhoto({ ...newPhoto, imageUrl: e.target.value })}
                        placeholder="Image URL (https://... or /src/assets/...)"
                        className="px-3 py-2 rounded-xl border border-neutral-200 text-xs bg-white focus:ring-1 focus:ring-[#B8860B]"
                      />
                      <input
                        type="text"
                        value={newPhoto.category}
                        onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                        placeholder="Category (e.g. Love Story, Pre-Shoot)"
                        className="px-3 py-2 rounded-xl border border-neutral-200 text-xs bg-white focus:ring-1 focus:ring-[#B8860B]"
                      />
                      <input
                        type="text"
                        value={newPhoto.caption}
                        onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
                        placeholder="Romantic Caption or Memory"
                        className="px-3 py-2 rounded-xl border border-neutral-200 text-xs bg-white focus:ring-1 focus:ring-[#B8860B]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 rounded-xl bg-[#946F19] hover:bg-[#A87F1E] text-white font-royal text-xs uppercase font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Gallery</span>
                    </button>
                  </form>

                  {/* Current Gallery List */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {wedding.gallery.map((photo) => (
                      <div key={photo.id} className="relative rounded-xl overflow-hidden border border-neutral-200 bg-white group aspect-[4/3]">
                        <img
                          src={photo.imageUrl}
                          alt={photo.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white">
                          <p className="font-bold text-xs truncate">{photo.title}</p>
                          <button
                            onClick={() => handleDeletePhoto(photo.id)}
                            className="p-1.5 self-end bg-rose-600 hover:bg-rose-700 text-white rounded-md text-xs"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
