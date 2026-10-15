import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'wedding_store.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial default wedding configuration and mock RSVPs
const DEFAULT_STORE = {
  admin: {
    usernameHash: crypto.createHash('sha256').update('aviyavi').digest('hex'),
    passwordHash: crypto.createHash('sha256').update('19991205').digest('hex'),
  },
  wedding: {
    coupleNames: "Avindu & Yavishka",
    groomName: "Avindu",
    brideName: "Yavishka",
    date: "2027-01-20",
    dateFormatted: "Wednesday, January 20, 2027",
    poruwaTime: "9:42 AM",
    ceremonyTime: "9:00 AM – 3:30 PM",
    venueName: "Ruwanara Royal Majesty",
    venueCity: "Narammala, Sri Lanka",
    mapsUrl: "https://www.google.com/maps/place/Ruwanara+Royal+Majestry/@7.4096942,80.2057845,17z/data=!3m1!4b1!4m9!3m8!1s0x3ae323a00180e845:0x1d5459078a749b5a!5m2!4m1!1i2!8m2!3d7.4096942!4d80.2057845!16s%2Fg%2F11fctc63w2!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MTAxMi4wIKXMDSoASAFQAw%3D%3D",
    contactAvindu: "0789481126",
    contactYavishka: "0760178126",
    heroImage: "/src/assets/images/wedding_hero_banner_1792088294742.jpg",
    gallery: [
      {
        id: "gal-1",
        title: "Eternal Promise",
        category: "Ceremony Moments",
        caption: "Surrounded by blooming white roses, beginning our journey of everlasting love.",
        imageUrl: "/src/assets/images/wedding_hero_banner_1792088294742.jpg"
      },
      {
        id: "gal-2",
        title: "A Garden Walk",
        category: "Love Story",
        caption: "Walking hand in hand through the serene paths of love and endless happiness.",
        imageUrl: "/src/assets/images/couple_romantic_stroll_1792088296007.jpg"
      },
      {
        id: "gal-3",
        title: "Golden Bond",
        category: "Pre-Shoot",
        caption: "Two golden rings, a bouquet of white roses, and hearts beating as one.",
        imageUrl: "/src/assets/images/couple_rings_hands_1792088296866.jpg"
      },
      {
        id: "gal-4",
        title: "Royal Banquet Setting",
        category: "Celebration",
        caption: "Majestic chandeliers, golden candlelights, and joyful reunions at Ruwanara Royal Majesty.",
        imageUrl: "/src/assets/images/wedding_venue_reception_1792088296294.jpg"
      }
    ]
  },
  rsvps: [
    {
      id: "rsvp-seed-1",
      name: "Bandara Senanayaka & Family",
      email: "bandara.s@example.com",
      phone: "0771234567",
      attendance: "attending",
      guestsCount: 4,
      dietary: "Traditional Sri Lankan / Vegetarian options",
      wishes: "Wishing dear Avindu and Yavishka the most blessed, joyous, and prosperous marriage!",
      submittedAt: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: "rsvp-seed-2",
      name: "Dr. Kusal Kodikara",
      email: "kusal.k@example.com",
      phone: "0719876543",
      attendance: "attending",
      guestsCount: 2,
      dietary: "No restrictions",
      wishes: "Congratulations both of you! Looking forward to celebrating this royal day together.",
      submittedAt: new Date(Date.now() - 86400000).toISOString()
    }
  ]
};

// Load or initialize store
function loadStore() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
      return data;
    }
  } catch (err) {
    console.error("Error reading store, fallback to default", err);
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_STORE, null, 2), 'utf-8');
  return DEFAULT_STORE;
}

function saveStore(data: any) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// In-memory active admin sessions
const activeSessions = new Set<string>();

app.use(express.json({ limit: '10mb' }));

// Auth Middleware for Admin Routes
function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: "Unauthorized access: Admin session required." });
    return;
  }
  const token = authHeader.split(' ')[1];
  if (!activeSessions.has(token)) {
    res.status(403).json({ error: "Session expired or invalid. Please log in again." });
    return;
  }
  next();
}

// Public API: Get Wedding Details & Gallery
app.get('/api/wedding-details', (_req: Request, res: Response) => {
  const store = loadStore();
  // Never leak admin hashes or rsvp list to public
  res.json({
    wedding: store.wedding,
  });
});

// Public API: Submit RSVP (Private - guest never sees other guests)
app.post('/api/rsvp', (req: Request, res: Response): void => {
  const { name, email, phone, attendance, guestsCount, dietary, wishes } = req.body;
  if (!name || !attendance) {
    res.status(400).json({ error: "Name and attendance confirmation are required." });
    return;
  }

  const store = loadStore();
  const newRsvp = {
    id: `rsvp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: String(name).trim(),
    email: email ? String(email).trim() : '',
    phone: phone ? String(phone).trim() : '',
    attendance: attendance === 'declining' ? 'declining' : 'attending',
    guestsCount: attendance === 'declining' ? 0 : Math.max(1, Number(guestsCount) || 1),
    dietary: dietary ? String(dietary).trim() : 'Standard',
    wishes: wishes ? String(wishes).trim() : '',
    submittedAt: new Date().toISOString()
  };

  store.rsvps.unshift(newRsvp);
  saveStore(store);

  res.json({
    success: true,
    message: attendance === 'attending' 
      ? `Thank you, ${name}! Your RSVP has been confirmed. We can't wait to celebrate with you!`
      : `Thank you for letting us know, ${name}. You will be warmly remembered in our hearts!`
  });
});

// Admin API: Login (Credential check done server-side ONLY)
app.post('/api/admin/login', (req: Request, res: Response): void => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: "Username and password required" });
    return;
  }

  const store = loadStore();
  const inputUserHash = crypto.createHash('sha256').update(String(username).trim()).digest('hex');
  const inputPassHash = crypto.createHash('sha256').update(String(password).trim()).digest('hex');

  // Verify against hashes stored server-side
  const userMatches = crypto.timingSafeEqual(Buffer.from(inputUserHash), Buffer.from(store.admin.usernameHash));
  const passMatches = crypto.timingSafeEqual(Buffer.from(inputPassHash), Buffer.from(store.admin.passwordHash));

  if (userMatches && passMatches) {
    const sessionToken = crypto.randomBytes(32).toString('hex');
    activeSessions.add(sessionToken);
    res.json({
      success: true,
      token: sessionToken,
      username: 'aviyavi'
    });
    return;
  }

  res.status(401).json({ error: "Invalid admin username or password." });
});

// Admin API: Verify Session
app.get('/api/admin/verify', requireAdmin, (_req: Request, res: Response) => {
  res.json({ valid: true });
});

// Admin API: Logout
app.post('/api/admin/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    activeSessions.delete(token);
  }
  res.json({ success: true });
});

// Admin API: View All RSVPs (Private to couple only)
app.get('/api/admin/rsvps', requireAdmin, (_req: Request, res: Response) => {
  const store = loadStore();
  const totalAttending = store.rsvps.filter((r: any) => r.attendance === 'attending').length;
  const totalDeclined = store.rsvps.filter((r: any) => r.attendance === 'declining').length;
  const totalGuestHeads = store.rsvps
    .filter((r: any) => r.attendance === 'attending')
    .reduce((sum: number, r: any) => sum + (Number(r.guestsCount) || 1), 0);

  res.json({
    rsvps: store.rsvps,
    stats: {
      totalSubmissions: store.rsvps.length,
      attendingResponses: totalAttending,
      declinedResponses: totalDeclined,
      totalExpectedGuests: totalGuestHeads
    }
  });
});

// Admin API: Delete RSVP
app.delete('/api/admin/rsvps/:id', requireAdmin, (req: Request, res: Response): void => {
  const store = loadStore();
  const beforeCount = store.rsvps.length;
  store.rsvps = store.rsvps.filter((r: any) => r.id !== req.params.id);
  if (store.rsvps.length === beforeCount) {
    res.status(404).json({ error: "RSVP record not found" });
    return;
  }
  saveStore(store);
  res.json({ success: true, message: "RSVP removed successfully" });
});

// Admin API: Update Gallery / Wedding details
app.put('/api/admin/wedding-details', requireAdmin, (req: Request, res: Response): void => {
  const { wedding } = req.body;
  if (!wedding) {
    res.status(400).json({ error: "Invalid update payload" });
    return;
  }
  const store = loadStore();
  store.wedding = {
    ...store.wedding,
    ...wedding
  };
  saveStore(store);
  res.json({ success: true, wedding: store.wedding });
});

// Admin API: Add/Update Photo in Gallery
app.post('/api/admin/gallery', requireAdmin, (req: Request, res: Response): void => {
  const { title, category, caption, imageUrl } = req.body;
  if (!title || !imageUrl) {
    res.status(400).json({ error: "Photo title and image URL are required" });
    return;
  }
  const store = loadStore();
  const newPhoto = {
    id: `gal-${Date.now()}`,
    title: String(title).trim(),
    category: category ? String(category).trim() : 'Special Moments',
    caption: caption ? String(caption).trim() : '',
    imageUrl: String(imageUrl).trim()
  };
  store.wedding.gallery.unshift(newPhoto);
  saveStore(store);
  res.json({ success: true, gallery: store.wedding.gallery });
});

// Admin API: Delete Photo from Gallery
app.delete('/api/admin/gallery/:id', requireAdmin, (req: Request, res: Response): void => {
  const store = loadStore();
  const initialLen = store.wedding.gallery.length;
  store.wedding.gallery = store.wedding.gallery.filter((g: any) => g.id !== req.params.id);
  if (store.wedding.gallery.length === initialLen) {
    res.status(404).json({ error: "Photo not found" });
    return;
  }
  saveStore(store);
  res.json({ success: true, gallery: store.wedding.gallery });
});

// Serve Vite dev server or static bundle
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Wedding Portal Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
