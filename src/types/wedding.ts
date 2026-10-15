export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  caption: string;
  imageUrl: string;
}

export interface WeddingData {
  coupleNames: string;
  groomName: string;
  brideName: string;
  date: string;
  dateFormatted: string;
  poruwaTime: string;
  ceremonyTime: string;
  venueName: string;
  venueCity: string;
  mapsUrl: string;
  contactAvindu: string;
  contactYavishka: string;
  heroImage: string;
  gallery: GalleryPhoto[];
}

export interface RsvpSubmission {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  attendance: 'attending' | 'declining';
  guestsCount: number;
  dietary?: string;
  wishes?: string;
  submittedAt: string;
}

export interface RsvpStats {
  totalSubmissions: number;
  attendingResponses: number;
  declinedResponses: number;
  totalExpectedGuests: number;
}
