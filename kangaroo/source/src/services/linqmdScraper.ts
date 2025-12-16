import { Doctor } from '../App';

export interface ScrapedDoctorData {
  name: string;
  specialty: string;
  subSpecialty?: string;
  experience: number;
  availability: string[];
  image: string;
  linqmdUrl: string;
  summary?: string;
  overview?: string;
  expertise?: string;
  qualification?: string;
}

/**
 * Mock data for common LinqMD profiles (for demo purposes)
 */
export const mockLinqMDData: { [key: string]: ScrapedDoctorData } = {
//   'murali-mohan-s': {
//     name: 'Dr. Murali Mohan S',
//     specialty: 'Cardiology',
//     subSpecialty: 'Interventional Cardiology',
//     experience: 18,
//     availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
//     image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
//     linqmdUrl: 'https://www.linqmd.com/doctor/murali-mohan-s',
//     summary: 'Experienced cardiologist specializing in interventional procedures',
//     overview: 'Dr. Murali Mohan S is a renowned cardiologist with extensive experience in interventional cardiology. He specializes in complex cardiac procedures and has helped numerous patients with heart conditions.',
//     expertise: 'Angioplasty, Cardiac Catheterization, Stent Placement, Heart Disease Management',
//     qualification: 'MBBS, MD (Internal Medicine), DM (Cardiology)'
//   },
//   'lavanya': {
//     name: 'Dr. Lavanya',
//     specialty: 'Dermatology',
//     subSpecialty: 'Cosmetic Dermatology',
//     experience: 12,
//     availability: ['Mon', 'Wed', 'Fri', 'Sat'],
//     image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
//     linqmdUrl: 'https://www.linqmd.com/doctor/lavanya',
//     summary: 'Board-certified dermatologist with expertise in cosmetic procedures',
//     overview: 'Dr. Lavanya is a skilled dermatologist who combines medical expertise with aesthetic sensibility. She provides comprehensive skin care solutions and cosmetic treatments tailored to each patient.',
//     expertise: 'Laser Treatments, Anti-Aging Procedures, Acne Treatment, Skin Rejuvenation',
//     qualification: 'MBBS, MD (Dermatology), Fellowship in Cosmetic Dermatology'
//   }
};

/**
 * Scrapes doctor data from LinqMD profile URL
 * Note: Due to CORS restrictions, this uses a proxy approach with fallback to mock data
 */
export async function scrapeDoctorFromLinqMD(url: string): Promise<ScrapedDoctorData> {
  try {
    // Extract doctor slug from URL
    const slug = url.split('/doctor/')[1];
    if (!slug) {
      throw new Error('Invalid LinqMD URL format. Expected format: https://www.linqmd.com/doctor/{slug}');
    }

    // Check if we have mock data for this slug
    if (mockLinqMDData[slug]) {
      console.log('Using mock data for:', slug);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      return mockLinqMDData[slug];
    }

    // Try to fetch with CORS proxy
    let html: string;
    try {
      // Use CORS proxy service
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      html = await response.text();
    } catch (error) {
      console.error('Fetch failed:', error);
      throw new Error(
        'Unable to fetch doctor profile. This may be due to network restrictions or the profile being private. ' +
        'Please use one of the example URLs or try again later.'
      );
    }

    // Parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Extract doctor name from class containing 'doctor-name'
    let name = 'Unknown Doctor';
    const nameSelectors = [
      '[class*="doctor-name"]',
      '.doctor-name',
      '[class*="name"]',
      'h1',
      '[itemprop="name"]'
    ];
    
    for (const selector of nameSelectors) {
      const element = doc.querySelector(selector);
      if (element?.textContent?.trim()) {
        name = element.textContent.trim();
        // Clean up common prefixes
        name = name.replace(/^(Dr\.?\s*|Doctor\s*)/i, 'Dr. ');
        break;
      }
    }

    // Extract specialty from class containing 'speciality'
    let specialty = 'General Medicine';
    const specialtySelectors = [
      '[class*="speciality"]',
      '.speciality',
      '[class*="specialty"]',
      '.specialty',
      '[itemprop="medicalSpecialty"]'
    ];
    
    for (const selector of specialtySelectors) {
      const element = doc.querySelector(selector);
      if (element?.textContent?.trim()) {
        specialty = element.textContent.trim();
        break;
      }
    }

    // Extract sub-specialty
    let subSpecialty: string | undefined;
    const subSpecialtyElement = doc.querySelector('[class*="sub-specialty"], .sub-specialty, .sub-specialization');
    if (subSpecialtyElement?.textContent?.trim()) {
      subSpecialty = subSpecialtyElement.textContent.trim();
    }

    // Extract summary
    let summary: string | undefined;
    const summarySelectors = [
      '[class*="summary"]',
      '.summary',
      '.doctor-summary',
      '[class*="brief"]',
      '.brief-description',
      '[itemprop="description"]',
      '.about-brief',
      '[data-testid="summary"]'
    ];
    
    for (const selector of summarySelectors) {
      const element = doc.querySelector(selector);
      if (element?.textContent?.trim()) {
        summary = element.textContent.trim();
        if (summary.length > 20) break; // Ensure it's substantial
      }
    }

    // Extract overview from class containing 'doctor-overview'
    let overview: string | undefined;
    const overviewSelectors = [
      '[class*="doctor-overview"]',
      '.doctor-overview',
      '[class*="overview"]',
      '.overview',
      '[class*="about"]'
    ];
    
    for (const selector of overviewSelectors) {
      const element = doc.querySelector(selector);
      if (element?.textContent?.trim()) {
        overview = element.textContent.trim();
        if (overview.length > 50) break;
      }
    }

    // Extract expertise from class containing 'doctor-expertise'
    let expertise: string | undefined;
    const expertiseSelectors = [
      '[class*="doctor-expertise"]',
      '.doctor-expertise',
      '[class*="expertise"]',
      '.expertise'
    ];
    
    for (const selector of expertiseSelectors) {
      const element = doc.querySelector(selector);
      if (element?.textContent?.trim()) {
        expertise = element.textContent.trim();
        break;
      }
    }

    // Extract qualification from class containing 'doctor-qualification'
    let qualification: string | undefined;
    const qualificationSelectors = [
      '[class*="doctor-qualification"]',
      '.doctor-qualification',
      '[class*="qualification"]',
      '.qualification',
      '[class*="education"]'
    ];
    
    for (const selector of qualificationSelectors) {
      const element = doc.querySelector(selector);
      if (element?.textContent?.trim()) {
        qualification = element.textContent.trim();
        break;
      }
    }

    // Extract experience from class="experience"
    let experience = 5;
    const experienceElement = doc.querySelector('.experience, [class*="experience"]');
    if (experienceElement?.textContent?.trim()) {
      const experienceText = experienceElement.textContent.trim();
      const match = experienceText.match(/(\d+)/);
      if (match && match[1]) {
        experience = parseInt(match[1], 10);
      }
    } else {
      // Fallback: search in full HTML
      const experiencePatterns = [
        /(\d+)\+?\s*(?:years?|yrs?)\s*(?:of\s*)?(?:experience|exp)/i,
        /experience[:\s]+(\d+)/i
      ];
      
      for (const pattern of experiencePatterns) {
        const match = html.match(pattern);
        if (match && match[1]) {
          experience = parseInt(match[1], 10);
          break;
        }
      }
    }

    // Extract profile image from class 'doctor-profile' and set fixed size
    let image = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop';
    const imgSelectors = [
      '.doctor-profile img',
      '[class*="doctor-profile"] img',
      'img[class*="profile"]',
      'img[class*="doctor"]',
      '[itemprop="image"]'
    ];
    
    for (const selector of imgSelectors) {
      const imgElement = doc.querySelector(selector);
      if (imgElement) {
        const imgSrc = imgElement.getAttribute('src');
        if (imgSrc && imgSrc.length > 10) {
          let imgUrl = imgSrc.startsWith('http') ? imgSrc : new URL(imgSrc, url).href;
          // Set fixed size by adding query parameters or using a standard size
          if (imgUrl.includes('?')) {
            imgUrl += '&w=400&h=400&fit=crop';
          } else {
            imgUrl += '?w=400&h=400&fit=crop';
          }
          image = imgUrl;
          break;
        }
      }
    }

    const availability = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

    console.log('Scraped doctor data:', { name, specialty, subSpecialty, experience, summary, overview, expertise, qualification });

    return {
      name,
      specialty,
      subSpecialty,
      experience,
      availability,
      image,
      linqmdUrl: url,
      summary,
      overview,
      expertise,
      qualification
    };
  } catch (error) {
    console.error('Error scraping LinqMD profile:', error);
    throw new Error(`Failed to scrape doctor profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Converts scraped data to Doctor format
 */
export function convertScrapedDataToDoctor(scrapedData: ScrapedDoctorData): Omit<Doctor, 'id'> {
  return {
    name: scrapedData.name,
    specialty: scrapedData.specialty,
    subSpecialty: scrapedData.subSpecialty,
    experience: scrapedData.experience,
    rating: 0,
    availability: scrapedData.availability,
    image: scrapedData.image
  };
}

/**
 * Validates LinqMD URL format
 */
export function validateLinqMDUrl(url: string): boolean {
  const pattern = /^https?:\/\/(www\.)?linqmd\.com\/doctor\/[a-z0-9-]+$/i;
  return pattern.test(url);
}
