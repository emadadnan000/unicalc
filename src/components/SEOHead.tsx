import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  universityName?: string;
  programName?: string;
  canonicalUrl?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  universityName,
  programName,
  canonicalUrl
}) => {
  const location = useLocation();

  useEffect(() => {
    // Extract university and program from URL for dynamic SEO
    const pathParts = location.pathname.split('/');
    const urlUniversity = pathParts[2];
    const urlProgram = pathParts[3];

    // University-specific SEO data
    const universityData: Record<string, any> = {
      fast: {
        name: 'FAST-NUCES',
        fullName: 'FAST National University of Computer & Emerging Sciences',
        description: 'Calculate FAST-NUCES admission merit for Computer Science, Engineering & Business programs. Free entry test calculator with accurate aggregate calculation.',
        keywords: 'fast calculator, fast admission calculator, fast merit calculator, nu entry test calculator, fast university calculator, fast cs calculator, fast engineering calculator'
      },
      nust: {
        name: 'NUST',
        fullName: 'National University of Sciences & Technology',
        description: 'Calculate NUST admission merit for Engineering & Computing programs. NET entry test calculator with accurate aggregate prediction.',
        keywords: 'nust calculator, nust merit calculator, net calculator, nust admission calculator, nust engineering calculator, nust cs calculator'
      },
      itu: {
        name: 'ITU',
        fullName: 'Information Technology University',
        description: 'Calculate ITU admission merit for Computer Science programs. Free ITU entry test calculator with accurate aggregate calculation.',
        keywords: 'itu calculator, itu merit calculator, itu admission calculator, itu cs calculator, information technology university calculator'
      },
      comsats: {
        name: 'COMSATS',
        fullName: 'COMSATS University Islamabad',
        description: 'Calculate COMSATS admission merit for CS, Engineering & programs across all campuses. Free entry test calculator.',
        keywords: 'comsats calculator, comsats merit calculator, comsats admission calculator, cui calculator'
      },
      giki: {
        name: 'GIKI',
        fullName: 'Ghulam Ishaq Khan Institute',
        description: 'Calculate GIKI admission merit for Engineering & Computer Science programs. Free GIKI entry test calculator.',
        keywords: 'giki calculator, giki merit calculator, giki admission calculator, ghulam ishaq khan calculator'
      },
      pieas: {
        name: 'PIEAS',
        fullName: 'Pakistan Institute of Engineering & Applied Sciences',
        description: 'Calculate PIEAS admission merit for Nuclear Engineering & Computing programs. Free PIEAS entry test calculator.',
        keywords: 'pieas calculator, pieas merit calculator, pieas admission calculator'
      },
      qau: {
        name: 'QAU',
        fullName: 'Quaid-i-Azam University',
        description: 'Calculate QAU admission merit for Computer Science & programs. Free QAU calculator with accurate aggregate.',
        keywords: 'qau calculator, qau merit calculator, quaid e azam university calculator'
      },
      pu: {
        name: 'PU',
        fullName: 'University of the Punjab',
        description: 'Calculate Punjab University admission merit for CS, IT & programs. Free PU entry test calculator.',
        keywords: 'pu calculator, punjab university calculator, pu merit calculator'
      },
      uet: {
        name: 'UET',
        fullName: 'University of Engineering & Technology',
        description: 'Calculate UET admission merit for Engineering programs. Free UET ECAT calculator.',
        keywords: 'uet calculator, uet merit calculator, ecat calculator, uet lahore calculator'
      },
      ned: {
        name: 'NED',
        fullName: 'NED University of Engineering & Technology',
        description: 'Calculate NED University admission merit for Engineering & Computing programs. Free NED entry test calculator.',
        keywords: 'ned calculator, ned merit calculator, ned university calculator'
      }
    };

    // Program-specific data
    const programData: Record<string, any> = {
      cs: {
        name: 'Computer Science',
        description: 'admission calculator for Computer Science programs',
        keywords: 'cs calculator, computer science calculator, cs admission pakistan'
      },
      eng: {
        name: 'Engineering',
        description: 'admission calculator for Engineering programs', 
        keywords: 'engineering calculator, engineering admission pakistan'
      },
      bus: {
        name: 'Business',
        description: 'admission calculator for Business programs',
        keywords: 'business calculator, business admission pakistan'
      }
    };

    // Build dynamic SEO data
    const currentUniversity = universityData[urlUniversity] || universityData[universityName?.toLowerCase() || ''];
    const currentProgram = programData[urlProgram] || programData[programName?.toLowerCase() || ''];

    let dynamicTitle = title;
    let dynamicDescription = description;
    let dynamicKeywords = keywords;
    let dynamicCanonical = canonicalUrl;

    // Generate university-specific SEO
    if (currentUniversity) {
      const programSuffix = currentProgram ? ` ${currentProgram.name}` : '';
      
      dynamicTitle = `${currentUniversity.name}${programSuffix} Calculator 2025 | Merit & Admission Calculator Pakistan`;
      dynamicDescription = currentUniversity.description + (currentProgram ? ` Specialized ${currentProgram.description}.` : '');
      dynamicKeywords = `${currentUniversity.keywords}${currentProgram ? ', ' + currentProgram.keywords : ''}, admission calculator pakistan 2025, merit calculator, entry test calculator`;
      dynamicCanonical = `https://unicalc.vercel.app${location.pathname}`;
    } else if (location.pathname === '/') {
      dynamicTitle = 'University Admission Calculator Pakistan 2025 | FAST NUST ITU Merit Calculator';
      dynamicDescription = '🎓 Calculate admission merit for FAST, NUST, ITU, COMSATS & 15+ Pakistani universities. Free entry test calculator, merit analysis & admission predictions for CS, Engineering programs 2025.';
      dynamicKeywords = 'university admission calculator pakistan, merit calculator, entry test calculator, fast calculator, nust calculator, itu calculator, cs admission pakistan, engineering admission calculator';
      dynamicCanonical = 'https://unicalc.vercel.app/';
    } else if (location.pathname === '/about') {
      dynamicTitle = 'About - University Admission Calculator Pakistan | Free Merit Calculator';
      dynamicDescription = 'Learn about our free university admission calculator for Pakistani universities. Calculate merit for FAST, NUST, ITU and more with accurate formulas.';
      dynamicKeywords = 'about university calculator, pakistan admission calculator, free merit calculator';
      dynamicCanonical = 'https://unicalc.vercel.app/about';
    }

    // Update document title
    if (dynamicTitle) {
      document.title = dynamicTitle;
    }

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    if (dynamicDescription) {
      updateMetaTag('description', dynamicDescription);
      updateMetaTag('og:description', dynamicDescription, true);
      updateMetaTag('twitter:description', dynamicDescription, true);
    }

    if (dynamicKeywords) {
      updateMetaTag('keywords', dynamicKeywords);
    }

    if (dynamicTitle) {
      updateMetaTag('og:title', dynamicTitle, true);
      updateMetaTag('twitter:title', dynamicTitle, true);
    }

    if (dynamicCanonical) {
      updateMetaTag('og:url', dynamicCanonical, true);
      updateMetaTag('twitter:url', dynamicCanonical, true);
      
      // Update canonical link
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = dynamicCanonical;
    }

    // Add university-specific structured data
    if (currentUniversity && urlUniversity) {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": `${currentUniversity.name} Admission Calculator`,
        "description": dynamicDescription,
        "applicationCategory": "EducationApplication",
        "operatingSystem": "Web Browser",
        "url": dynamicCanonical,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "PKR"
        },
        "author": {
          "@type": "Organization", 
          "name": "University Admission Calculator Pakistan"
        },
        "about": {
          "@type": "EducationalOrganization",
          "name": currentUniversity.fullName,
          "alternateName": currentUniversity.name
        },
        "educationalUse": "assessment",
        "audience": {
          "@type": "EducationalAudience",
          "educationalRole": "student"
        }
      };

      // Remove existing structured data for this page
      const existingScript = document.querySelector('script[data-university-seo]');
      if (existingScript) {
        existingScript.remove();
      }

      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-university-seo', 'true');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

  }, [location, title, description, keywords, universityName, programName, canonicalUrl]);

  return null;
};

export default SEOHead; 