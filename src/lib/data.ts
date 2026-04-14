
export interface College {
    id: string;
    slug: string;
    name: string;
    location: string;
    state: string;
    rating: number;
    reviews: number;
    fees: string;
    courses: string[];
    type: "Private" | "Government" | "Deemed";
    description?: string;
    imageUrl?: string;
    logoUrl?: string;
    coverUrl?: string;
    tags: string[];
    established?: string;
    about?: string;
    highlights?: string[];
    infrastructure?: string[];
    cutoffs?: {
        title: string;
        table: { label: string; value: string }[];
        description?: string;
    }[];
    coursesDetails?: {
        name: string;
        duration: string;
        type: string;
    }[];
    feesDetails?: {
        title: string;
        items: { label: string; value: string }[];
        note?: string;
    }[];
    placements?: {
        highlights?: string[];
        topRecruiters?: { category: string; companies: string[] }[];
        stats: { label: string; value: string }[];
    };
    scholarships?: {
        title: string;
        items: { label: string; value: string }[];
    }[];
    faqs?: { question: string; answer: string }[];
    admissions?: {
        process: string[];
        eligibility: string[];
        documents: string[];
    };
    keyDates?: {
        event: string;
        date: string;
    }[];
    whyChoose?: string[];
    alumni?: {
        description?: string;
        companies?: string[];
        achievements?: string[];
    };
    compare?: {
        parameter: string;
        thisCollege: string;
        competitor1?: string;
        competitor2?: string;
    }[];
    contact?: {
        phone?: string;
        email?: string;
        website?: string;
        address?: string;
        whatsapp?: string;
    };
    galleryImages?: { url: string; alt: string }[];
    whyChooseAkashTalks?: string[];
}

export interface Exam {
    id: string;
    slug: string;
    name: string;
    fullName: string;
    logoUrl: string;
    description: string;
    date: string;
    applicationLink: string;
    // Expanded Fields
    introduction: string; // Brief intro for the exam
    overview: string;
    aboutExam: string; // Detailed about the exam and conducting body
    importantDates: { event: string; date: string }[];
    applicationProcess: { step: string; description: string }[];
    documents: string[];
    eligibility: string[];
    examPattern: {
        mode: string;
        duration: string;
        totalMarks: string;
        markingScheme: string;
        subjects: string[];
    };
    counselling: string;
    faqs: { question: string; answer: string }[];
}

// Medical College Interface
export interface MedicalCollege {
    id: string;
    slug: string;
    name: string;
    location: string;
    state: string;
    type: "Private" | "Government" | "Deemed";
    established: string;
    imageUrl: string;
    rating: number;
    reviews: number;
    courses: string[];
    description: string;
    about: string;
    highlights: string[];

    // NEET Cutoffs
    neetCutoffs: {
        year: string;
        stateQuota?: { rank: string; score: string };
        aiq?: { rank: string; score: string };
        managementQuota?: { rank: string; score: string };
    }[];

    // Fee Structure
    mqFees: {
        total: string;
        perSemester?: string;
        admissionFee?: string;
        breakdown?: string;
    };
    hostelFees: {
        roomType: string;
        annual: string;
        deposit?: string;
    }[];
    miscFees: { label: string; value: string }[];
    securityDeposit: string;

    // Courses & Seats
    coursesSeats: {
        course: string;
        totalSeats: number;
        stateQuota?: number;
        aiq?: number;
        managementQuota?: number;
    }[];

    // Hospital Info
    hospital: {
        name: string;
        beds: number;
        patientLoad?: string;
        specialities?: string[];
    };

    // Internship
    internship: {
        duration: string;
        stipend: string;
    };

    // Admission
    admissionProcess: string[];

    // Faculty
    facultyDepartments: string[];

    // Standard sections
    scholarships?: { title: string; items: { label: string; value: string }[] }[];
    compare?: { parameter: string; thisCollege: string; competitor1: string; competitor2?: string }[];
    faqs: { question: string; answer: string }[];
    galleryImages?: { url: string; alt: string }[];
    whyChooseAkashTalks: string[];
}


// --- Colleges Data (Preserved 28 items) ---
export const colleges: College[] = [
    // --- West Bengal ---
    {
        id: "1",
        slug: "institute-of-engineering-management-kolkata",
        name: "Institute of Engineering & Management (Salt Lake)",
        location: "Salt Lake, Kolkata",
        state: "West Bengal",
        rating: 4.5,
        reviews: 1850,
        fees: "₹ 7.65L - 8.70L Total",
        courses: ["B.Tech", "M.Tech", "MBA", "BCA", "MCA"],
        type: "Private",
        tags: ["Top Ranked", "Best Placements", "NAAC A Grade"],
        logoUrl: "/footer-logo.jpg",
        established: "1989",
        description: "Premier private engineering college in Kolkata known for strict academic discipline and excellent placements.",
        imageUrl: "/images/colleges/iem-salt-lake.jpg",
        about: "Institute of Engineering & Management (IEM) is a premier private engineering college in Kolkata, established in 1989. It is one of the oldest and most reputed private engineering colleges in West Bengal, known for its strict academic discipline, excellent placement records, and strong alumni network. The institute is affiliated to MAKAUT (Maulana Abul Kalam Azad University of Technology) and approved by AICTE. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["NAAC 'A' Grade Accredited", "NIRF Ranked Institution", "Oldest Private Engineering College in West Bengal (Est. 1989)", "Located in Salt Lake IT Hub", "1054+ Students Placed in 2024", "₹32 LPA Highest Package", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        infrastructure: ["3 Campuses located in the IT Hub of Salt Lake", "State-of-the-art Innovation & IoT Labs", "AI/ML Research Center", "Digital Library with IEEE/ACM/Springer Access", "Smart Classrooms with Projectors", "Separate Boys and Girls Hostels", "Cafeteria and Food Court", "Sports Facilities including Cricket, Football, Basketball"],
        cutoffs: [
            { title: "WBJEE Cutoff 2024", table: [{ label: "CSE", value: "Rank 3287 - 6398" }, { label: "IT", value: "Rank 4000 - 7500" }, { label: "ECE", value: "Rank 5500 - 9000" }, { label: "EE", value: "Rank 8000 - 15000" }], description: "Primary admission through WBJEE counseling." },
            { title: "JEE Main Cutoff 2024", table: [{ label: "CSE", value: "Percentile 85-92" }, { label: "IT", value: "Percentile 80-88" }], description: "Limited seats available through JEE Main." }
        ],
        coursesDetails: [
            { name: "Computer Science and Engineering", duration: "4 Years", type: "B.Tech" },
            { name: "Information Technology", duration: "4 Years", type: "B.Tech" },
            { name: "Electronics & Communication Engineering", duration: "4 Years", type: "B.Tech" },
            { name: "Electrical Engineering", duration: "4 Years", type: "B.Tech" },
            { name: "Mechanical Engineering", duration: "4 Years", type: "B.Tech" },
            { name: "Computer Science and Engineering", duration: "2 Years", type: "M.Tech" },
            { name: "Master of Business Administration", duration: "2 Years", type: "MBA" },
            { name: "Bachelor of Computer Applications", duration: "3 Years", type: "BCA" },
            { name: "Master of Computer Applications", duration: "2 Years", type: "MCA" }
        ],
        feesDetails: [
            { title: "B.Tech Fee Structure (2024-25)", items: [{ label: "1st Year Fees", value: "₹2.0 - 2.5 Lakhs" }, { label: "Total B.Tech (4 Years)", value: "₹7.65 - 8.70 Lakhs" }], note: "Excludes hostel and mess charges. Fees vary by branch." },
            { title: "Hostel Fees", items: [{ label: "Annual Hostel Fee", value: "₹70,000 - 90,000" }, { label: "Mess Charges (Annual)", value: "₹48,000 - 55,000" }], note: "Separate hostels for boys and girls." }
        ],
        placements: {
            stats: [{ label: "Highest Package", value: "₹32 LPA" }, { label: "Average Package", value: "₹6.5 LPA" }, { label: "Median Package", value: "₹5.2 LPA" }, { label: "Placement Rate", value: "95%+" }],
            highlights: ["Consistent placement record for over 35 years", "Multiple offers for top performers", "Pre-placement offers from internships", "Strong alumni referral network"],
            topRecruiters: [
                { category: "Tech Giants", companies: ["Amazon", "Microsoft", "Google", "Flipkart"] },
                { category: "IT Services", companies: ["TCS", "Cognizant", "Wipro", "Infosys", "Capgemini", "Accenture"] },
                { category: "Product Companies", companies: ["Zoho", "Freshworks", "Thoughtworks", "Mindtree"] }
            ]
        },
        admissions: {
            process: [
                "Appear for WBJEE / JEE Main entrance exam",
                "Check cutoff ranks and eligibility on official website",
                "Register for WBJEE Counseling or apply through JEE Main quota",
                "Fill college preference order during counseling",
                "Attend document verification upon seat allotment",
                "Pay admission fees and confirm seat"
            ],
            eligibility: [
                "Passed 10+2 with Physics, Chemistry and Mathematics",
                "Minimum 60% aggregate marks in PCM (55% for reserved categories)",
                "Valid WBJEE or JEE Main score",
                "Age requirement: 17 years as of December 31st of admission year"
            ],
            documents: [
                "10th and 12th Marksheets and Certificates",
                "WBJEE/JEE Main Scorecard and Rank Card",
                "Domicile Certificate (for WB candidates)",
                "Category Certificate (if applicable)",
                "Transfer Certificate from previous institution",
                "Passport size photographs (8-10 copies)",
                "Aadhaar Card"
            ]
        },
        keyDates: [
            { event: "WBJEE Registration", date: "December 2025" },
            { event: "WBJEE Exam", date: "April 2026" },
            { event: "WBJEE Result", date: "June 2026" },
            { event: "Counseling Starts", date: "July 2026" },
            { event: "Classes Begin", date: "August 2026" }
        ],
        whyChoose: [
            "35+ years of academic excellence and industry reputation",
            "Located in the heart of Salt Lake IT Hub with proximity to major IT companies",
            "Strong placement record with 95%+ placement rate consistently",
            "NAAC 'A' Grade accreditation ensuring quality education",
            "Modern infrastructure with AI/ML labs, IoT center, and digital library",
            "Active alumni network spanning across global tech companies",
            "Industry partnerships for internships and live projects"
        ],
        scholarships: [
            { title: "Merit Scholarships", items: [{ label: "WBJEE Rank < 1000", value: "50% Tuition Fee Waiver" }, { label: "WBJEE Rank < 3000", value: "25% Tuition Fee Waiver" }] },
            { title: "TFW Scheme", items: [{ label: "Tuition Fee Waiver", value: "Full Tuition Fee Waived" }] }
        ],
        alumni: {
            description: "IEM boasts a strong alumni network of 20,000+ graduates working in leading companies worldwide. Alumni actively participate in campus recruitment, mentorship, and guest lectures.",
            companies: ["Google", "Amazon", "Microsoft", "Goldman Sachs", "JP Morgan", "TCS", "Infosys", "Wipro"],
            achievements: ["Multiple IEM alumni in leadership positions at Fortune 500 companies", "Several successful startup founders from IEM", "Active IEM Alumni Association with annual meets"]
        },
        compare: [
            { parameter: "NIRF Rank Band", thisCollege: "101-150", competitor1: "76-100 (Heritage)", competitor2: "151-200 (TINT)" },
            { parameter: "Highest Package", thisCollege: "₹32 LPA", competitor1: "₹28 LPA", competitor2: "₹20 LPA" },
            { parameter: "Average Package", thisCollege: "₹6.5 LPA", competitor1: "₹5.8 LPA", competitor2: "₹5.0 LPA" },
            { parameter: "Total Fees (4 Years)", thisCollege: "₹8.5 Lakhs", competitor1: "₹9 Lakhs", competitor2: "₹7 Lakhs" }
        ],
        faqs: [
            { question: "Is IEM Kolkata a good college?", answer: "Yes, IEM is one of the top private engineering colleges in West Bengal with NAAC 'A' grade accreditation, strong placements (95%+), and a legacy of 35+ years." },
            { question: "What is the fee structure of IEM?", answer: "The total B.Tech fee at IEM is approximately ₹8.4 - 8.65 Lakhs for 4 years, excluding hostel and mess charges." },
            { question: "What is the WBJEE cutoff for IEM CSE?", answer: "The WBJEE cutoff for CSE at IEM typically ranges from Rank 3287 to 6398 depending on the year and category." },
            { question: "Does IEM have hostels?", answer: "Yes, IEM has separate hostels for boys and girls with modern facilities. Hostel fees are around ₹70,000 - 90,000 per year." },
            { question: "What companies visit IEM for placements?", answer: "Top recruiters include Amazon, Microsoft, TCS, Cognizant, Wipro, Infosys, Capgemini, Accenture, Zoho, and many more." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }
        ],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: [
            "Direct admission assistance without any hidden charges",
            "Expert guidance on WBJEE counseling and seat allocation",
            "Transparent fee structure information and scholarship guidance",
            "Personalized career counseling to choose the right branch",
            "End-to-end support from application to admission confirmation",
            "Access to exclusive student reviews and insider tips",
            "Post-admission support for hostel and documentation"
        ]
    },
    {
        id: "2",
        slug: "techno-india-salt-lake",
        name: "Techno India Main Salt Lake",
        location: "Salt Lake, Kolkata",
        state: "West Bengal",
        rating: 4.2,
        reviews: 1420,
        fees: "₹ 4L - 6L Total",
        courses: ["B.Tech", "M.Tech", "BBA", "MBA", "MCA"],
        type: "Private",
        tags: ["Industry Connect", "NAAC Accredited", "Affordable"],
        logoUrl: "/footer-logo.jpg",
        established: "2001",
        description: "Leading private engineering college in Salt Lake with strong industry connections and excellent placement record.",
        imageUrl: "/images/colleges/techno-india-salt-lake.png",
        about: "Techno India Salt Lake is one of the flagship institutes of the Techno India Group, established in 2001. Located in the heart of Salt Lake City, it offers a wide range of undergraduate and postgraduate programs in engineering, management, and computer applications. The college is known for its affordable fee structure and strong industry connections. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["NAAC Accredited", "Part of Techno India Group", "Affordable Fee Structure", "Strong Industry Connections", "Modern Campus in Salt Lake", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        infrastructure: ["Modern Campus with IT Labs", "Well-equipped Libraries", "Seminar Halls", "Sports Facilities", "Cafeteria"],
        cutoffs: [{ title: "WBJEE Cutoff 2024", table: [{ label: "CSE", value: "Rank 8000 - 15000" }, { label: "IT", value: "Rank 10000 - 18000" }, { label: "ECE", value: "Rank 12000 - 20000" }], description: "Admission through WBJEE counseling." }],
        coursesDetails: [
            { name: "Computer Science and Engineering", duration: "4 Years", type: "B.Tech" },
            { name: "Information Technology", duration: "4 Years", type: "B.Tech" },
            { name: "Electronics & Communication Engineering", duration: "4 Years", type: "B.Tech" },
            { name: "Electrical Engineering", duration: "4 Years", type: "B.Tech" },
            { name: "Master of Business Administration", duration: "2 Years", type: "MBA" }
        ],
        feesDetails: [{ title: "B.Tech Fee Structure (2024-25)", items: [{ label: "Annual Fee", value: "₹1 - 1.5 Lakhs" }, { label: "Total B.Tech (4 Years)", value: "₹4.02 - 6 Lakhs" }], note: "Affordable options available in Kolkata depending on branch." }],
        placements: {
            stats: [{ label: "Highest Package", value: "₹18 LPA" }, { label: "Average Package", value: "₹4.5 LPA" }, { label: "Placement Rate", value: "85%+" }],
            highlights: ["Strong IT sector placements", "Regular campus drives"],
            topRecruiters: [{ category: "IT Companies", companies: ["TCS", "Wipro", "Infosys", "Cognizant", "Capgemini"] }]
        },
        admissions: {
            process: ["Appear for WBJEE", "Participate in counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCM", "Valid WBJEE score"],
            documents: ["10th & 12th Marksheets", "WBJEE Rank Card", "Category Certificate"]
        },
        keyDates: [{ event: "WBJEE Counseling", date: "July 2026" }, { event: "Classes Begin", date: "August 2026" }],
        whyChoose: ["Affordable fee structure", "Salt Lake location with IT hub proximity", "Part of established Techno India Group", "Good placement support"],
        scholarships: [{ title: "Merit Scholarship", items: [{ label: "Top WBJEE Rankers", value: "Up to 30% fee waiver" }] }],
        alumni: { description: "Strong network of Techno India alumni working in IT companies across India.", companies: ["TCS", "Wipro", "Infosys", "Cognizant", "Capgemini"] },
        compare: [{ parameter: "Average Package", thisCollege: "₹4.5 LPA", competitor1: "₹6.5 LPA (IEM)", competitor2: "₹5.8 LPA (Heritage)" }, { parameter: "Total Fees (4 Years)", thisCollege: "₹4-5.2 Lakhs", competitor1: "₹8.5 Lakhs (IEM)", competitor2: "₹8-9 Lakhs (Heritage)" }],
        faqs: [
            { question: "Is Techno India Salt Lake good for CSE?", answer: "Yes, it offers quality CSE education at an affordable price with decent placements in IT companies." },
            { question: "What is the fee at Techno India?", answer: "The annual fee is around ₹1-1.3 Lakhs, making it one of the most affordable options." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }
        ],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Expert counseling for WBJEE admissions", "Transparent fee guidance", "Scholarship assistance", "Complete admission support", "Post-admission hostel help", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "wb-3",
        slug: "haldia-institute-of-technology",
        name: "Haldia Institute of Technology",
        location: "Haldia, West Bengal",
        state: "West Bengal",
        rating: 4.0,
        reviews: 1200,
        fees: "₹ 5.82L Total",
        courses: ["B.Tech", "MBA"],
        type: "Private",
        tags: ["Oldest Private College", "Core Placements", "Large Campus"],
        established: "1996",
        description: "First private engineering college in West Bengal with massive campus and strong core engineering placements.",
        imageUrl: "/images/colleges/haldia-institute-of-technology.jpg",
        about: "Haldia Institute of Technology (HIT) was established in 1996 and is the first self-financing engineering college in West Bengal. Located in the industrial hub of Haldia, it offers excellent exposure to core industries like petrochemicals, refineries, and manufacturing. The institute has a sprawling 60-acre campus. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["First Private Engineering College in WB (1996)", "60-acre Campus", "Strong Core Engineering Focus", "Industrial Location in Haldia", "Good for Mechanical, Chemical, Civil Engineering", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        infrastructure: ["60-acre Campus", "Central Library", "Hostels for Boys and Girls", "Workshops and Labs", "Sports Ground"],
        cutoffs: [{ title: "WBJEE Cutoff 2024", table: [{ label: "CSE", value: "Rank 15000 - 25000" }, { label: "Mechanical", value: "Rank 20000 - 35000" }], description: "Lower cutoffs due to location." }],
        coursesDetails: [
            { name: "Computer Science and Engineering", duration: "4 Years", type: "B.Tech" },
            { name: "Mechanical Engineering", duration: "4 Years", type: "B.Tech" },
            { name: "Civil Engineering", duration: "4 Years", type: "B.Tech" },
            { name: "Chemical Engineering", duration: "4 Years", type: "B.Tech" },
            { name: "Electrical Engineering", duration: "4 Years", type: "B.Tech" }
        ],
        feesDetails: [{ title: "B.Tech Fee Structure (2024-25)", items: [{ label: "1st Year Fees", value: "₹93,950 (1st Sem) + ₹68,750 (2nd Sem)" }, { label: "Total B.Tech (4 Years)", value: "₹5.82 Lakhs (approx)" }], note: "Excluding hostel. With hostel ~₹6.83 Lakhs" }],
        placements: {
            stats: [{ label: "Highest Package", value: "₹12 LPA" }, { label: "Average Package", value: "₹4 LPA" }, { label: "Placement Rate", value: "75%+" }],
            highlights: ["Strong core sector placements", "Good for petrochemical and manufacturing jobs"],
            topRecruiters: [{ category: "Core Companies", companies: ["IOCL", "HPCL", "L&T", "Tata Steel", "Jindal"] }]
        },
        admissions: { process: ["WBJEE counseling", "Document verification", "Fee payment"], eligibility: ["10+2 with PCM", "Valid WBJEE score"], documents: ["Marksheets", "WBJEE Rank Card"] },
        keyDates: [{ event: "WBJEE Counseling", date: "July 2026" }, { event: "Classes Begin", date: "August 2026" }],
        whyChoose: ["Affordable fees", "Industrial location", "Strong core placements", "Large campus"],
        scholarships: [{ title: "Merit Scholarship", items: [{ label: "Merit Students", value: "Up to 25% fee waiver" }] }, { title: "TFW Scheme", items: [{ label: "Tuition Fee Waiver", value: "Full Tuition Fee Waived" }] }],
        alumni: { description: "HIT alumni work in major core sector companies across India.", companies: ["IOCL", "HPCL", "L&T", "Tata Steel", "ONGC", "NTPC"] },
        compare: [{ parameter: "Strength", thisCollege: "Core Engineering Focus", competitor1: "IT Focus (IEM)", competitor2: "IT Focus (Techno India)" }, { parameter: "Total Fees (4 Years)", thisCollege: "₹4-5 Lakhs", competitor1: "₹8.5 Lakhs (IEM)", competitor2: "₹4-5.2 Lakhs (Techno India)" }],
        faqs: [{ question: "Is HIT good for core branches?", answer: "Yes, HIT is excellent for Mechanical, Chemical, and Civil Engineering with good industrial exposure." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Guidance for core branch selection", "Industrial placement insights", "Hostel and location guidance", "Complete admission assistance", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "wb-4",
        slug: "rcc-institute-of-information-technology",
        name: "RCC Institute of Information Technology",
        location: "Kolkata, West Bengal",
        state: "West Bengal",
        rating: 3.9,
        reviews: 800,
        fees: "₹ 6.04L Total",
        courses: ["B.Tech", "MCA"],
        type: "Government",
        tags: ["Semi-Government", "Affordable", "IT Focused"],
        established: "2000",
        description: "A semi-government engineering college in Kolkata known for specialized IT education and affordable fees.",
        imageUrl: "/images/colleges/rcc-institute-of-information-technology.png",
        about: "RCC Institute of Information Technology (RCCIIT) is a semi-government engineering college established in 2000. It is approved by AICTE and affiliated to MAKAUT. The institute focuses on Information Technology and Computer Science education. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["Semi-Government Status", "Affordable Fees", "IT and CSE Focus", "Good Faculty", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        cutoffs: [{ title: "WBJEE Cutoff 2024", table: [{ label: "CSE", value: "Rank 12000 - 20000" }, { label: "IT", value: "Rank 15000 - 25000" }] }],
        coursesDetails: [{ name: "Computer Science and Engineering", duration: "4 Years", type: "B.Tech" }, { name: "Information Technology", duration: "4 Years", type: "B.Tech" }],
        feesDetails: [{ title: "B.Tech Fee Structure (2024-25)", items: [{ label: "Total B.Tech (4 Years)", value: "₹6.04 Lakhs" }] }],
        placements: { stats: [{ label: "Highest Package", value: "₹15 LPA" }, { label: "Average Package", value: "₹4 LPA" }], topRecruiters: [{ category: "IT", companies: ["TCS", "Wipro", "Infosys"] }] },
        admissions: { process: ["WBJEE counseling"], eligibility: ["10+2 with PCM"], documents: ["Marksheets", "WBJEE Rank Card"] },
        keyDates: [{ event: "WBJEE Counseling", date: "July 2026" }],
        whyChoose: ["Semi-government status", "Affordable fees", "IT focused curriculum", "Central Kolkata location"],
        scholarships: [{ title: "TFW Scheme", items: [{ label: "Tuition Fee Waiver", value: "Full Tuition Fee Waived for eligible students" }] }],
        alumni: { description: "RCCIIT alumni work in IT companies across India.", companies: ["TCS", "Wipro", "Infosys", "Cognizant", "Tech Mahindra"] },
        compare: [{ parameter: "Type", thisCollege: "Semi-Government", competitor1: "Private (IEM)", competitor2: "Private (Heritage)" }, { parameter: "Total Fees", thisCollege: "₹3.5-4.5 Lakhs", competitor1: "₹8.5 Lakhs", competitor2: "₹8-9 Lakhs" }],
        faqs: [{ question: "Is RCCIIT a government college?", answer: "It's a semi-government college with government-aided status, making it affordable." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Affordable college guidance", "IT career counseling", "Admission support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "wb-5",
        slug: "jis-college-of-engineering",
        name: "JIS College of Engineering",
        location: "Kalyani, West Bengal",
        state: "West Bengal",
        rating: 4.1,
        reviews: 1500,
        fees: "₹ 4.2L - 6.52L Total",
        courses: ["B.Tech", "M.Tech"],
        type: "Private",
        tags: ["Autonomous", "Research Focus", "Good Infrastructure"],
        established: "2000",
        description: "Autonomous institute with excellent research facilities, diverse courses, and growing reputation.",
        imageUrl: "/images/colleges/jis-college-of-engineering.jpg",
        about: "JIS College of Engineering (JISCE) is an autonomous engineering college located in Kalyani, West Bengal. It is part of the JIS Group and has gained Autonomous status, allowing it to design its own curriculum. The college is known for its research focus and modern infrastructure. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["Autonomous Status", "Research Focus", "Good Infrastructure", "Part of JIS Group", "NAAC Accredited", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        infrastructure: ["Modern Labs", "Central Library", "Hostels", "Sports Complex", "Auditorium"],
        cutoffs: [{ title: "WBJEE Cutoff 2024", table: [{ label: "CSE", value: "Rank 8000 - 15000" }, { label: "ECE", value: "Rank 12000 - 20000" }] }],
        coursesDetails: [{ name: "Computer Science and Engineering", duration: "4 Years", type: "B.Tech" }, { name: "Electronics & Communication Engineering", duration: "4 Years", type: "B.Tech" }, { name: "Electrical Engineering", duration: "4 Years", type: "B.Tech" }],
        feesDetails: [{ title: "B.Tech Fee Structure (2024-25)", items: [{ label: "Total B.Tech (4 Years)", value: "₹4.2 - 6.52 Lakhs" }], note: "Varies depending on B.Tech specialization" }],
        placements: { stats: [{ label: "Highest Package", value: "₹20 LPA" }, { label: "Average Package", value: "₹5 LPA" }, { label: "Placement Rate", value: "85%+" }], topRecruiters: [{ category: "IT", companies: ["TCS", "Wipro", "Cognizant", "Capgemini"] }] },
        admissions: { process: ["WBJEE counseling", "Document verification"], eligibility: ["10+2 with PCM"], documents: ["Marksheets", "WBJEE Rank Card"] },
        keyDates: [{ event: "WBJEE Counseling", date: "July 2026" }, { event: "Classes Begin", date: "August 2026" }],
        whyChoose: ["Autonomous curriculum", "Research opportunities", "Good placements", "Modern campus"],
        scholarships: [{ title: "Merit Scholarship", items: [{ label: "Top WBJEE Rankers", value: "Up to 40% fee waiver" }] }, { title: "JIS Group Scholarship", items: [{ label: "Economically Weaker Sections", value: "Special fee concession" }] }],
        alumni: { description: "Strong alumni network across IT industry.", companies: ["TCS", "Wipro", "Cognizant", "Capgemini", "Infosys"] },
        compare: [{ parameter: "Status", thisCollege: "Autonomous", competitor1: "Non-Autonomous (RCCIIT)", competitor2: "Autonomous (Heritage)" }, { parameter: "Average Package", thisCollege: "₹5 LPA", competitor1: "₹4 LPA", competitor2: "₹5.8 LPA" }],
        faqs: [{ question: "Is JISCE autonomous?", answer: "Yes, JISCE has autonomous status which allows it to design industry-relevant curriculum." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Autonomous college guidance", "Research program information", "Complete admission support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "wb-6",
        slug: "heritage-institute-of-technology",
        name: "Heritage Institute of Technology",
        location: "Kolkata, West Bengal",
        state: "West Bengal",
        rating: 4.4,
        reviews: 1600,
        fees: "₹ 5.89L Total",
        courses: ["B.Tech", "M.Tech"],
        type: "Private",
        tags: ["Autonomous", "Top Ranked", "Excellent Placements"],
        established: "2001",
        description: "One of the top autonomous engineering colleges in Kolkata with excellent infrastructure and placements.",
        imageUrl: "/images/colleges/heritage-institute-of-technology.png",
        about: "Heritage Institute of Technology (HITK) is a premier autonomous engineering college in Kolkata, established in 2001. It is consistently ranked among the top private engineering colleges in West Bengal. The institute has achieved autonomous status and is known for its excellent placements and modern infrastructure. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["Autonomous Status", "NIRF Ranked", "Excellent Placements", "Modern Infrastructure", "Strong Alumni Network", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        infrastructure: ["State-of-the-art Labs", "Digital Library", "Smart Classrooms", "Hostels", "Sports Facilities", "Auditorium"],
        cutoffs: [{ title: "WBJEE Cutoff 2024", table: [{ label: "CSE", value: "Rank 4000 - 8000" }, { label: "IT", value: "Rank 6000 - 10000" }, { label: "ECE", value: "Rank 8000 - 12000" }], description: "One of the most sought-after colleges." }],
        coursesDetails: [{ name: "Computer Science and Engineering", duration: "4 Years", type: "B.Tech" }, { name: "Information Technology", duration: "4 Years", type: "B.Tech" }, { name: "Electronics & Communication Engineering", duration: "4 Years", type: "B.Tech" }, { name: "Electrical Engineering", duration: "4 Years", type: "B.Tech" }],
        feesDetails: [{ title: "B.Tech Fee Structure (2024-25)", items: [{ label: "Total B.Tech (4 Years)", value: "₹5.89 Lakhs" }], note: "Excludes hostel which is ~₹2.8 Lakhs extra" }],
        placements: { stats: [{ label: "Highest Package", value: "₹28 LPA" }, { label: "Average Package", value: "₹5.8 LPA" }, { label: "Placement Rate", value: "92%+" }], highlights: ["Top placements in West Bengal private colleges"], topRecruiters: [{ category: "Tech", companies: ["Amazon", "Microsoft", "TCS", "Cognizant", "Wipro", "Capgemini"] }] },
        admissions: { process: ["WBJEE counseling", "JEE Main quota available", "Document verification"], eligibility: ["10+2 with PCM", "Valid WBJEE/JEE Main score"], documents: ["Marksheets", "Rank Card", "Certificates"] },
        keyDates: [{ event: "WBJEE Counseling", date: "July 2026" }],
        whyChoose: ["Top ranked in West Bengal", "Autonomous curriculum", "Excellent placements", "Modern infrastructure", "Strong alumni network"],
        scholarships: [{ title: "Merit Scholarship", items: [{ label: "Top WBJEE Rankers", value: "Up to 50% fee waiver" }] }],
        alumni: { description: "Strong alumni network with graduates in top companies.", companies: ["Google", "Amazon", "Microsoft", "Goldman Sachs"] },
        compare: [{ parameter: "Average Package", thisCollege: "₹5.8 LPA", competitor1: "₹6.5 LPA (IEM)" }],
        faqs: [{ question: "Is Heritage better than IEM?", answer: "Both are top colleges. Heritage has slightly better NIRF rank, while IEM has older legacy and higher packages in some years." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Top college admission guidance", "WBJEE counseling support", "Scholarship information", "Complete documentation help", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "wb-7",
        slug: "techno-international-new-town",
        name: "Techno International New Town (TINT)",
        location: "New Town, Kolkata",
        state: "West Bengal",
        rating: 4.0,
        reviews: 900,
        fees: "₹ 5L - 7.65L Total",
        courses: ["B.Tech", "BCA"],
        type: "Private",
        tags: ["Modern Campus", "Tech Fests", "Innovation Hub"],
        established: "2010",
        description: "Modern engineering college in New Town with focus on innovation, startups, and excellent infrastructure.",
        imageUrl: "/images/colleges/techno-international-new-town.png",
        about: "Techno International New Town (TINT) is a modern engineering college located in Kolkata's rapidly developing New Town area. Part of the Techno India Group, TINT is known for its contemporary campus, focus on innovation, and vibrant tech fest culture. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["Modern Campus in New Town", "Innovation & Startup Focus", "Active Tech Fests", "Good Infrastructure", "Growing Placement Record", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        cutoffs: [{ title: "WBJEE Cutoff 2024", table: [{ label: "CSE", value: "Rank 12000 - 22000" }, { label: "IT", value: "Rank 15000 - 25000" }] }],
        coursesDetails: [{ name: "Computer Science and Engineering", duration: "4 Years", type: "B.Tech" }, { name: "Information Technology", duration: "4 Years", type: "B.Tech" }],
        feesDetails: [{ title: "B.Tech Fee Structure (2024-25)", items: [{ label: "Total B.Tech (4 Years)", value: "₹5 - 7.65 Lakhs" }] }],
        placements: { stats: [{ label: "Highest Package", value: "₹20 LPA" }, { label: "Average Package", value: "₹5 LPA" }], topRecruiters: [{ category: "IT", companies: ["TCS", "Wipro", "Cognizant"] }] },
        admissions: { process: ["WBJEE counseling"], eligibility: ["10+2 with PCM"], documents: ["Marksheets", "WBJEE Rank Card"] },
        keyDates: [{ event: "WBJEE Counseling", date: "July 2026" }],
        whyChoose: ["Modern New Town location", "Innovation focus", "Good infrastructure", "Growing reputation"],
        scholarships: [{ title: "Techno India Scholarship", items: [{ label: "Top Performers", value: "Up to 30% fee waiver" }] }],
        alumni: { description: "Growing alumni network in IT companies.", companies: ["TCS", "Wipro", "Cognizant", "Capgemini"] },
        compare: [{ parameter: "Location", thisCollege: "New Town", competitor1: "Salt Lake (Techno India)", competitor2: "Central Kolkata (IEM)" }, { parameter: "Focus", thisCollege: "Innovation & Startups", competitor1: "Traditional", competitor2: "Placements" }],
        faqs: [{ question: "Is TINT a good college?", answer: "TINT is a good option for students looking for modern infrastructure and innovation-focused education in New Town area." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["New Town college guidance", "Innovation program information", "Admission assistance", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "wb-8",
        slug: "netaji-subhash-engineering-college",
        name: "Netaji Subhash Engineering College",
        location: "Garia, Kolkata",
        state: "West Bengal",
        rating: 3.8,
        reviews: 1100,
        fees: "₹ 6.8L - 6.92L Total",
        courses: ["B.Tech", "MCA"],
        type: "Private",
        tags: ["Legacy Institute", "South Kolkata"],
        established: "1998",
        description: "Established institute in South Kolkata with consistent academic performance and decent placements.",
        imageUrl: "/images/colleges/netaji-subhash-engineering-college.jpg",
        about: "Netaji Subhash Engineering College (NSEC) is one of the established private engineering colleges in South Kolkata, founded in 1998. Located in Garia, it offers undergraduate and postgraduate programs in engineering and computer applications. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["Established in 1998", "South Kolkata Location", "Consistent Academic Record", "Easy Metro Connectivity", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        cutoffs: [{ title: "WBJEE Cutoff 2024", table: [{ label: "CSE", value: "Rank 15000 - 28000" }, { label: "IT", value: "Rank 18000 - 32000" }] }],
        coursesDetails: [{ name: "Computer Science and Engineering", duration: "4 Years", type: "B.Tech" }, { name: "Information Technology", duration: "4 Years", type: "B.Tech" }],
        feesDetails: [{ title: "B.Tech Fee Structure (2024-25)", items: [{ label: "Total B.Tech (4 Years)", value: "₹6.8 - 6.92 Lakhs" }], note: "Hostel charges are separate (~₹30,000/year)" }],
        placements: { stats: [{ label: "Highest Package", value: "₹12 LPA" }, { label: "Average Package", value: "₹3.8 LPA" }], topRecruiters: [{ category: "IT", companies: ["TCS", "Wipro", "Infosys"] }] },
        admissions: { process: ["WBJEE counseling"], eligibility: ["10+2 with PCM"], documents: ["Marksheets", "WBJEE Rank Card"] },
        keyDates: [{ event: "WBJEE Counseling", date: "July 2026" }],
        whyChoose: ["South Kolkata location", "Metro connectivity", "Affordable fees", "Established since 1998"],
        scholarships: [{ title: "Merit Scholarship", items: [{ label: "Merit Students", value: "Fee concession available" }] }],
        alumni: { description: "NSEC alumni network in IT sector.", companies: ["TCS", "Wipro", "Infosys", "HCL"] },
        compare: [{ parameter: "Location", thisCollege: "South Kolkata", competitor1: "Salt Lake (Techno India)", competitor2: "Central Kolkata (IEM)" }, { parameter: "Fees", thisCollege: "₹4-5 Lakhs", competitor1: "₹4-5.2 Lakhs", competitor2: "₹8.5 Lakhs" }],
        faqs: [{ question: "Where is NSEC located?", answer: "NSEC is located in Garia, South Kolkata, with easy metro connectivity." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["South Kolkata college guidance", "Affordable option counseling", "Admission support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "wb-9",
        slug: "meghnad-saha-institute-of-technology",
        name: "Meghnad Saha Institute of Technology (MSIT)",
        location: "Kolkata, West Bengal",
        state: "West Bengal",
        rating: 3.9,
        reviews: 850,
        fees: "₹ 5.55L - 6.97L Total",
        courses: ["B.Tech", "MBA"],
        type: "Private",
        tags: ["Techno India Group", "Good Faculty"],
        established: "2001",
        description: "Reputed college under Techno India Group offering quality technical education with experienced faculty.",
        imageUrl: "/images/colleges/meghnad-saha-institute-of-technology.png",
        about: "Meghnad Saha Institute of Technology (MSIT) is a private engineering college under the Techno India Group, named after the renowned physicist Meghnad Saha. Established in 2001, it is known for its quality faculty and consistent academic performance. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["Part of Techno India Group", "Named after Physicist Meghnad Saha", "Good Faculty", "Decent Placements", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        cutoffs: [{ title: "WBJEE Cutoff 2024", table: [{ label: "CSE", value: "Rank 12000 - 22000" }, { label: "ECE", value: "Rank 15000 - 28000" }] }],
        coursesDetails: [{ name: "Computer Science and Engineering", duration: "4 Years", type: "B.Tech" }, { name: "Electronics & Communication Engineering", duration: "4 Years", type: "B.Tech" }],
        feesDetails: [{ title: "B.Tech Fee Structure (2024-25)", items: [{ label: "Total B.Tech (4 Years)", value: "₹5.55 - 6.97 Lakhs" }] }],
        placements: { stats: [{ label: "Highest Package", value: "₹15 LPA" }, { label: "Average Package", value: "₹4.2 LPA" }], topRecruiters: [{ category: "IT", companies: ["TCS", "Wipro", "Cognizant", "Infosys"] }] },
        admissions: { process: ["WBJEE counseling"], eligibility: ["10+2 with PCM"], documents: ["Marksheets", "WBJEE Rank Card"] },
        keyDates: [{ event: "WBJEE Counseling", date: "July 2026" }],
        whyChoose: ["Part of Techno India Group", "Good faculty", "Affordable fees", "Decent placements"],
        scholarships: [{ title: "Techno India Scholarship", items: [{ label: "Merit Students", value: "Fee concession available" }] }],
        alumni: { description: "MSIT alumni work in IT companies.", companies: ["TCS", "Wipro", "Cognizant", "Infosys"] },
        compare: [{ parameter: "Group", thisCollege: "Techno India Group", competitor1: "Same Group (TISL)", competitor2: "JIS Group (JISCE)" }],
        faqs: [{ question: "Is MSIT part of Techno India Group?", answer: "Yes, MSIT is one of the colleges under the Techno India Group." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Techno India Group guidance", "Fee comparison support", "Admission assistance", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "wb-10",
        slug: "academy-of-technology",
        name: "Academy of Technology (AOT)",
        location: "Hooghly, West Bengal",
        state: "West Bengal",
        rating: 4.1,
        reviews: 1300,
        fees: "₹ 2.6L - 4.7L Total",
        courses: ["B.Tech", "MCA"],
        type: "Private",
        tags: ["Strict Discipline", "Placement Focus", "Good Results"],
        established: "2004",
        description: "Known for high placement rates specifically in major IT service companies with strict academic discipline.",
        imageUrl: "/images/colleges/academy-of-technology.png",
        about: "Academy of Technology (AOT) is a private engineering college located in Hooghly district, West Bengal. Established in 2004, AOT is known for its strict academic discipline and focus on placements, particularly in IT service companies. The college has consistently achieved high placement rates. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["High Placement Rate", "Strict Academic Discipline", "IT Service Company Focus", "Affordable Fees", "Residential Campus", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        infrastructure: ["Residential Campus", "Labs", "Library", "Hostels", "Sports Ground"],
        cutoffs: [{ title: "WBJEE Cutoff 2024", table: [{ label: "CSE", value: "Rank 10000 - 18000" }, { label: "IT", value: "Rank 12000 - 22000" }] }],
        coursesDetails: [{ name: "Computer Science and Engineering", duration: "4 Years", type: "B.Tech" }, { name: "Information Technology", duration: "4 Years", type: "B.Tech" }, { name: "Electronics & Communication Engineering", duration: "4 Years", type: "B.Tech" }],
        feesDetails: [{ title: "B.Tech Fee Structure (2024-25)", items: [{ label: "Total B.Tech (4 Years)", value: "₹2.6 - 4.7 Lakhs" }], note: "Affordable with good ROI" }],
        placements: { stats: [{ label: "Highest Package", value: "₹18 LPA" }, { label: "Average Package", value: "₹4.8 LPA" }, { label: "Placement Rate", value: "90%+" }], highlights: ["Strong TCS, Wipro, Cognizant placements"], topRecruiters: [{ category: "IT Services", companies: ["TCS", "Wipro", "Cognizant", "Infosys", "Capgemini", "Tech Mahindra"] }] },
        admissions: { process: ["WBJEE counseling", "Document verification"], eligibility: ["10+2 with PCM", "Valid WBJEE score"], documents: ["Marksheets", "WBJEE Rank Card", "Certificates"] },
        keyDates: [{ event: "WBJEE Counseling", date: "July 2026" }],
        whyChoose: ["High placement rate (90%+)", "Strict discipline ensures focus", "Affordable fees", "Good for IT service placements", "Residential campus"],
        scholarships: [{ title: "Merit Scholarship", items: [{ label: "Top Performers", value: "Fee concession available" }] }],
        faqs: [
            { question: "Is AOT good for placements?", answer: "Yes, AOT has a 90%+ placement rate with strong recruitments from TCS, Wipro, Cognizant, and other IT service companies." },
            { question: "Is AOT strict?", answer: "Yes, AOT is known for strict academic discipline which helps students focus on studies and placements." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }
        ],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Placement-focused college guidance", "Discipline and culture insights", "Fee and scholarship support", "Complete admission assistance", "Hostel guidance for residential campus", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },

    // --- Karnataka ---
    {
        id: "ka-1",
        slug: "rv-college-of-engineering",
        name: "RV College of Engineering Bengaluru",
        location: "Bengaluru, Karnataka",
        state: "Karnataka",
        rating: 4.8,
        reviews: 3000,
        fees: "₹ 10L - 15L Total",
        courses: ["B.E.", "M.Tech"],
        type: "Private",
        tags: ["Top Rated", "COMEDK", "Autonomous"],
        established: "1963",
        description: "One of the most prestigious private engineering colleges in India with exceptional placements and legacy.",
        imageUrl: "/images/colleges/rv-college-of-engineering.png",
        about: "RV College of Engineering (RVCE) is one of the earliest self-financing engineering colleges in India, established in 1963. Located in Bengaluru, it is affiliated to VTU and has Autonomous status. RVCE is consistently ranked among the top engineering colleges in Karnataka and India. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["Established in 1963", "Autonomous Status", "NAAC A++ Grade", "Top 50 in NIRF", "Excellent Placements", "Strong Alumni Network", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        infrastructure: ["Modern Labs", "Central Library", "Innovation Center", "Sports Complex", "Hostels", "Auditorium"],
        cutoffs: [{ title: "COMEDK Cutoff 2024", table: [{ label: "CSE", value: "Rank < 500" }, { label: "ECE", value: "Rank 500 - 1500" }, { label: "Mechanical", value: "Rank 2000 - 4000" }] }],
        coursesDetails: [{ name: "Computer Science and Engineering", duration: "4 Years", type: "B.E." }, { name: "Electronics & Communication", duration: "4 Years", type: "B.E." }, { name: "Mechanical Engineering", duration: "4 Years", type: "B.E." }],
        feesDetails: [{ title: "B.E. Fee Structure (2024-25)", items: [{ label: "Total B.E. (4 Years)", value: "₹10 - 15 Lakhs+" }], note: "Varies heavily based on quota (COMEDK vs Management)" }],
        placements: { stats: [{ label: "Highest Package", value: "₹62 LPA" }, { label: "Average Package", value: "₹12 LPA" }, { label: "Placement Rate", value: "95%+" }], highlights: ["Top placements in Karnataka", "Multiple international offers"], topRecruiters: [{ category: "Tech Giants", companies: ["Google", "Microsoft", "Amazon", "Oracle", "Adobe", "Goldman Sachs"] }] },
        admissions: { process: ["Appear for COMEDK/KCET", "Participate in counseling", "Document verification"], eligibility: ["10+2 with PCM", "COMEDK/KCET score"], documents: ["Marksheets", "Rank Card", "Domicile"] },
        keyDates: [{ event: "COMEDK Exam", date: "May 2026" }, { event: "Counseling", date: "June-July 2026" }],
        whyChoose: ["Top 50 in India", "Exceptional placements", "Legacy of 60+ years", "Strong industry connections", "Bangalore IT hub location"],
        scholarships: [{ title: "Merit Scholarship", items: [{ label: "Top COMEDK Rankers", value: "Up to 100% fee waiver" }] }],
        alumni: { description: "Strong global alumni network.", companies: ["Google", "Microsoft", "Amazon", "Facebook", "Apple"] },
        faqs: [{ question: "Is RVCE the best college in Karnataka?", answer: "RVCE is among the top 3 private engineering colleges in Karnataka with excellent placements." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Top college admission guidance", "COMEDK counseling support", "Management quota assistance", "Complete documentation help", "Hostel and accommodation guidance", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "ka-2",
        slug: "dayananda-sagar-university",
        name: "Dayananda Sagar University",
        location: "Bengaluru, Karnataka",
        state: "Karnataka",
        rating: 4.3,
        reviews: 1200,
        fees: "₹ 12L - 19L Total",
        courses: ["B.Tech", "MBA"],
        type: "Private",
        tags: ["University", "Innovation", "Modern Campus"],
        established: "2014",
        description: "Leading university with focus on innovation, entrepreneurship, and industry-ready education.",
        imageUrl: "/images/colleges/dayananda-sagar-university.jpg",
        about: "Dayananda Sagar University (DSU) is a private university established in 2014 in Bengaluru. It is part of the Dayananda Sagar Institutions group which has over 5 decades of educational excellence. The university focuses on innovation, entrepreneurship, and practical skill development. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["Private University Status", "Modern Infrastructure", "Innovation Focus", "Industry Partnerships", "Incubation Center", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        cutoffs: [{ title: "DSU Entrance 2024", table: [{ label: "CSE", value: "Merit-based admission" }] }],
        coursesDetails: [{ name: "Computer Science and Engineering", duration: "4 Years", type: "B.Tech" }, { name: "Artificial Intelligence & ML", duration: "4 Years", type: "B.Tech" }],
        feesDetails: [{ title: "B.Tech Fee Structure (2024-25)", items: [{ label: "Total B.Tech (4 Years)", value: "₹12 - 19 Lakhs" }], note: "Varies based on quota and CSE specializations" }],
        placements: { stats: [{ label: "Highest Package", value: "₹25 LPA" }, { label: "Average Package", value: "₹6 LPA" }], topRecruiters: [{ category: "IT", companies: ["TCS", "Infosys", "Wipro", "Cognizant"] }] },
        admissions: { process: ["Apply online", "Merit-based selection", "Counseling"], eligibility: ["10+2 with PCM"], documents: ["Marksheets", "ID Proof"] },
        whyChoose: ["University status", "Modern campus", "Innovation focus", "Bangalore location"],
        faqs: [{ question: "Is DSU a good university?", answer: "Yes, DSU is a reputed private university with modern facilities and decent placements." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Direct admission assistance", "Fee negotiation support", "Complete counseling", "Hostel guidance", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "ka-3",
        slug: "bms-college-of-engineering",
        name: "B.M.S. College of Engineering",
        location: "Bengaluru, Karnataka",
        state: "Karnataka",
        rating: 4.7,
        reviews: 2500,
        fees: "₹ 10L - 15L Total",
        courses: ["B.E.", "M.Tech"],
        type: "Private",
        tags: ["Historic", "Autonomous", "First Private Engineering College in India"],
        established: "1946",
        description: "India's first private engineering college with rich legacy of 75+ years and exceptional academic standards.",
        imageUrl: "/images/colleges/bms-college-of-engineering.png",
        about: "B.M.S. College of Engineering (BMSCE) was established in 1946 and holds the distinction of being the first private engineering college in India. Located in the heart of Bengaluru, BMSCE has Autonomous status and is known for its academic excellence, strong alumni network, and consistent placements. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["First Private Engineering College in India (1946)", "Autonomous Status", "NAAC A++ Grade", "75+ Years of Excellence", "Strong Alumni Network", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        infrastructure: ["Heritage Campus", "Modern Labs", "Central Library", "Sports Complex", "Hostels"],
        cutoffs: [{ title: "COMEDK Cutoff 2024", table: [{ label: "CSE", value: "Rank < 800" }, { label: "ECE", value: "Rank 800 - 2000" }] }],
        coursesDetails: [{ name: "Computer Science and Engineering", duration: "4 Years", type: "B.E." }, { name: "Electronics & Communication", duration: "4 Years", type: "B.E." }],
        feesDetails: [{ title: "B.E. Fee Structure (2024-25)", items: [{ label: "Total B.E. (4 Years)", value: "₹10 - 15 Lakhs+" }], note: "Varies heavily based on admission quota" }],
        placements: { stats: [{ label: "Highest Package", value: "₹50 LPA" }, { label: "Average Package", value: "₹10 LPA" }, { label: "Placement Rate", value: "92%+" }], topRecruiters: [{ category: "Tech", companies: ["Google", "Microsoft", "Amazon", "Samsung", "Qualcomm"] }] },
        admissions: { process: ["COMEDK/KCET", "Counseling", "Document verification"], eligibility: ["10+2 with PCM"], documents: ["Marksheets", "Rank Card"] },
        whyChoose: ["Historic institution", "Strong legacy", "Excellent placements", "Central Bangalore location", "Strong alumni"],
        alumni: { companies: ["Google", "Microsoft", "Amazon", "Apple", "Intel"] },
        faqs: [{ question: "Is BMSCE the oldest private engineering college?", answer: "Yes, BMSCE established in 1946 is India's first private engineering college." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Legacy institution guidance", "COMEDK support", "Management quota help", "Complete assistance", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "ka-4",
        slug: "ramaiah-university-of-applied-sciences",
        name: "Ramaiah University of Applied Sciences",
        location: "Bengaluru, Karnataka",
        state: "Karnataka",
        rating: 4.5,
        reviews: 1800,
        fees: "₹ 9.6L - 21L Total",
        courses: ["B.Tech", "M.Des"],
        type: "Private",
        tags: ["Applied Sciences", "Research", "Industry Focused"],
        established: "2013",
        description: "Multidisciplinary university focused on applied research and industry-relevant education.",
        imageUrl: "/images/colleges/ramaiah-university-of-applied-sciences.png",
        about: "Ramaiah University of Applied Sciences (RUAS) is a private university established in 2013. Part of the Gokula Education Foundation, it focuses on applied sciences, research, and industry-oriented education. The university offers unique interdisciplinary programs. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["University Status", "Applied Sciences Focus", "Industry Partnerships", "Research Oriented", "Modern Infrastructure", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        cutoffs: [{ title: "RUAS Entrance 2024", table: [{ label: "CSE", value: "Merit-based" }] }],
        coursesDetails: [{ name: "Computer Science", duration: "4 Years", type: "B.Tech" }, { name: "Product Design", duration: "4 Years", type: "B.Des" }],
        feesDetails: [{ title: "B.Tech Fee Structure (2024-25)", items: [{ label: "Total B.Tech (4 Years)", value: "₹9.6 - 21 Lakhs" }], note: "Depends on specialization and quota" }],
        placements: { stats: [{ label: "Highest Package", value: "₹24 LPA" }, { label: "Average Package", value: "₹7 LPA" }], topRecruiters: [{ category: "Tech", companies: ["Bosch", "Infosys", "TCS", "Wipro"] }] },
        admissions: { process: ["Apply online", "Entrance test", "Interview"], eligibility: ["10+2 with PCM"], documents: ["Marksheets", "ID Proof"] },
        whyChoose: ["Applied research focus", "Industry projects", "Modern labs", "Bangalore location"],
        faqs: [{ question: "Is RUAS good for engineering?", answer: "Yes, RUAS offers quality engineering education with focus on applied sciences and research." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Direct admission support", "Program guidance", "Complete counseling", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "ka-5",
        slug: "pes-university",
        name: "PES University",
        location: "Bengaluru, Karnataka",
        state: "Karnataka",
        rating: 4.6,
        reviews: 2200,
        fees: "₹ 18L - 20L Total",
        courses: ["B.Tech", "BBA"],
        type: "Private",
        tags: ["Entrance Exam", "PESSAT", "Top Placements"],
        established: "2013",
        description: "Top-tier university known for rigorous academics, PESSAT entrance exam, and exceptional placements.",
        imageUrl: "/images/colleges/pes-university.png",
        about: "PES University is one of the top private universities in India, established in 2013. It conducts its own entrance exam PESSAT and is known for rigorous academics, excellent placements, and modern infrastructure. PES has campuses in Electronic City and Hanumanthanagar. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["Top 50 in NIRF", "PESSAT Entrance Exam", "Excellent Placements", "Modern Campuses", "Strong Industry Ties", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        infrastructure: ["Multiple Campuses", "State-of-the-art Labs", "Innovation Center", "Sports Complex", "Hostels"],
        cutoffs: [{ title: "PESSAT Cutoff 2024", table: [{ label: "CSE", value: "Top 5000 Rank" }, { label: "ECE", value: "Top 8000 Rank" }] }],
        coursesDetails: [{ name: "Computer Science and Engineering", duration: "4 Years", type: "B.Tech" }, { name: "Electronics & Communication", duration: "4 Years", type: "B.Tech" }, { name: "Data Science", duration: "4 Years", type: "B.Tech" }],
        feesDetails: [{ title: "B.Tech Fee Structure (2024-25)", items: [{ label: "Total B.Tech (4 Years)", value: "₹18 - 20 Lakhs (PESSAT Quota)" }], note: "Management quota fees are significantly higher" }],
        placements: { stats: [{ label: "Highest Package", value: "₹55 LPA" }, { label: "Average Package", value: "₹14 LPA" }, { label: "Placement Rate", value: "97%+" }], highlights: ["Among highest placements in South India"], topRecruiters: [{ category: "Tech Giants", companies: ["Google", "Microsoft", "Amazon", "Goldman Sachs", "Oracle", "Adobe"] }] },
        admissions: { process: ["Register for PESSAT", "Take PESSAT exam", "Counseling based on rank"], eligibility: ["10+2 with PCM", "PESSAT score"], documents: ["Marksheets", "PESSAT Rank Card"] },
        keyDates: [{ event: "PESSAT Exam", date: "April-May 2026" }, { event: "Counseling", date: "June 2026" }],
        whyChoose: ["Top placements in South India", "PESSAT ensures quality intake", "Modern infrastructure", "Strong alumni network", "Bangalore tech hub location"],
        scholarships: [{ title: "Merit Scholarship", items: [{ label: "Top PESSAT Rankers", value: "Up to 100% fee waiver" }] }],
        alumni: { companies: ["Google", "Microsoft", "Amazon", "Facebook", "Uber"] },
        faqs: [
            { question: "Is PES University good?", answer: "Yes, PES is among the top 5 private universities in South India with exceptional placements." },
            { question: "What is PESSAT?", answer: "PESSAT is PES University's own entrance exam conducted for admissions." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }
        ],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["PESSAT preparation guidance", "Admission counseling", "Scholarship assistance", "Complete documentation", "Hostel guidance", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "ka-6",
        slug: "acharya-institute-of-technology",
        name: "Acharya Institute of Technology",
        location: "Bengaluru, Karnataka",
        state: "Karnataka",
        rating: 4.0,
        reviews: 1500,
        fees: "₹ 7.04L - 10.66L Total",
        courses: ["B.E.", "MBA"],
        type: "Private",
        tags: ["Large Campus", "International", "Affordable"],
        established: "2000",
        description: "Known for its massive 100+ acre campus, international student community, and affordable quality education.",
        imageUrl: "/images/colleges/acharya-institute-of-technology.png",
        about: "Acharya Institute of Technology (AIT) is part of the Acharya Group of Institutions, established in 2000. Located on a sprawling 100+ acre campus on the outskirts of Bengaluru, AIT is known for its green campus, affordable fees, and diverse student community including international students. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["100+ Acre Green Campus", "International Students", "NAAC A+ Grade", "Affordable Fees", "Sports Facilities", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        infrastructure: ["Massive Green Campus", "Modern Labs", "Olympic-size Pool", "Sports Complex", "Hostels", "Auditorium"],
        cutoffs: [{ title: "COMEDK Cutoff 2024", table: [{ label: "CSE", value: "Rank 5000 - 12000" }, { label: "ECE", value: "Rank 8000 - 15000" }] }],
        coursesDetails: [{ name: "Computer Science and Engineering", duration: "4 Years", type: "B.E." }, { name: "Electronics & Communication", duration: "4 Years", type: "B.E." }],
        feesDetails: [{ title: "B.E. Fee Structure (2024-25)", items: [{ label: "Total B.E. (4 Years)", value: "₹7.04 - 10.66 Lakhs" }], note: "Varies based on COMEDK vs Management Quota" }],
        placements: { stats: [{ label: "Highest Package", value: "₹20 LPA" }, { label: "Average Package", value: "₹5.5 LPA" }, { label: "Placement Rate", value: "85%+" }], topRecruiters: [{ category: "IT", companies: ["TCS", "Infosys", "Wipro", "Cognizant", "Capgemini"] }] },
        admissions: { process: ["COMEDK/KCET", "Direct admission", "Counseling"], eligibility: ["10+2 with PCM"], documents: ["Marksheets", "Rank Card"] },
        whyChoose: ["Affordable fees", "Massive green campus", "Good infrastructure", "International exposure"],
        faqs: [{ question: "Is Acharya Institute good?", answer: "Yes, AIT is a good option with affordable fees, large campus, and decent placements." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Affordable college guidance", "COMEDK support", "Direct admission help", "Complete assistance", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },

    // --- Maharashtra ---
    {
        id: "mh-1",
        slug: "dr-d-y-patil-vidyapeeth",
        name: "Dr. D. Y. Patil Vidyapeeth",
        location: "Pune, Maharashtra",
        state: "Maharashtra",
        rating: 4.2,
        reviews: 1400,
        fees: "₹ 8L+ Total",
        courses: ["B.Tech", "MBBS"],
        type: "Deemed",
        tags: ["Deemed University", "Medical & Engg", "Pune"],
        established: "2003",
        description: "Renowned deemed university offering quality education in engineering and medical sciences in Pune.",
        imageUrl: "/images/colleges/dr-d-y-patil-vidyapeeth-pune.png",
        about: "Dr. D. Y. Patil Vidyapeeth is a Deemed-to-be-University established in 2003 in Pune. It offers programs in Engineering, Medical Sciences, Management, and allied health sciences. The university is NAAC accredited and focuses on research and innovation. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["Deemed University", "NAAC Accredited", "Medical & Engineering Programs", "Research Focus", "Pune Location", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        cutoffs: [{ title: "Entrance 2024", table: [{ label: "B.Tech", value: "Merit + Entrance" }] }],
        coursesDetails: [{ name: "Computer Science and Engineering", duration: "4 Years", type: "B.Tech" }, { name: "Electronics & Communication", duration: "4 Years", type: "B.Tech" }],
        feesDetails: [{ title: "B.Tech Fee Structure", items: [{ label: "Total B.Tech (4 Years)", value: "₹8 - 10 Lakhs" }] }],
        placements: { stats: [{ label: "Highest Package", value: "₹18 LPA" }, { label: "Average Package", value: "₹5.5 LPA" }], topRecruiters: [{ category: "IT", companies: ["TCS", "Infosys", "Wipro", "Cognizant"] }] },
        admissions: { process: ["Apply online", "Entrance exam", "Counseling"], eligibility: ["10+2 with PCM"], documents: ["Marksheets", "ID Proof"] },
        whyChoose: ["Deemed university status", "Multiple programs", "Pune location", "Research opportunities"],
        faqs: [{ question: "Is DY Patil Vidyapeeth good?", answer: "Yes, it's a reputed deemed university with quality education in engineering and medical sciences." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Deemed university guidance", "Multiple program counseling", "Complete admission support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "mh-2",
        slug: "maharashtra-institute-of-technology",
        name: "Maharashtra Institute Of Technology",
        location: "Pune, Maharashtra",
        state: "Maharashtra",
        rating: 4.4,
        reviews: 2000,
        fees: "₹ 10L+ Total",
        courses: ["B.Tech"],
        type: "Private",
        tags: ["MIT Pune", "Legacy", "Top Ranked"],
        established: "1983",
        description: "Pioneer in private engineering education in Maharashtra with 40+ years of excellence.",
        imageUrl: "/images/colleges/maharashtra-institute-of-technology-pune.jpg",
        about: "Maharashtra Institute of Technology (MIT), Pune was established in 1983 by MAEER's MIT Group. It is one of the oldest and most prestigious private engineering colleges in Maharashtra. The college is affiliated to SPPU and offers undergraduate and postgraduate programs in engineering. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["Established in 1983", "40+ Years of Excellence", "NAAC A+ Grade", "Strong Industry Connections", "Legacy Institution", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        infrastructure: ["Modern Labs", "Central Library", "Sports Complex", "Hostels", "Auditorium"],
        cutoffs: [{ title: "MHT-CET Cutoff 2024", table: [{ label: "CSE", value: "Top 10000 Rank" }, { label: "ECE", value: "Top 15000 Rank" }] }],
        coursesDetails: [{ name: "Computer Science and Engineering", duration: "4 Years", type: "B.Tech" }, { name: "Electronics Engineering", duration: "4 Years", type: "B.Tech" }],
        feesDetails: [{ title: "B.Tech Fee Structure", items: [{ label: "Total B.Tech (4 Years)", value: "₹10 - 12 Lakhs" }] }],
        placements: { stats: [{ label: "Highest Package", value: "₹30 LPA" }, { label: "Average Package", value: "₹7 LPA" }, { label: "Placement Rate", value: "90%+" }], topRecruiters: [{ category: "Tech", companies: ["Microsoft", "Amazon", "TCS", "Infosys", "Wipro"] }] },
        admissions: { process: ["MHT-CET/JEE Main", "CAP Counseling", "Document verification"], eligibility: ["10+2 with PCM", "Valid MHT-CET/JEE score"], documents: ["Marksheets", "Rank Card", "Domicile"] },
        keyDates: [{ event: "MHT-CET Exam", date: "May 2026" }, { event: "Counseling", date: "July 2026" }],
        whyChoose: ["Legacy of 40+ years", "Top ranked in Maharashtra", "Strong placements", "Pune IT hub location"],
        scholarships: [{ title: "Merit Scholarship", items: [{ label: "Top Rankers", value: "Up to 50% fee waiver" }] }],
        faqs: [{ question: "Is MIT Pune good?", answer: "Yes, MIT Pune is one of the top private engineering colleges in Maharashtra with excellent legacy and placements." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["MHT-CET counseling", "Legacy institution guidance", "Complete admission support", "Hostel assistance", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "mh-3",
        slug: "symbiosis-international",
        name: "Symbiosis International (Deemed University)",
        location: "Pune, Maharashtra",
        state: "Maharashtra",
        rating: 4.5,
        reviews: 1800,
        fees: "₹ 12L+ Total",
        courses: ["B.Tech", "MBA"],
        type: "Deemed",
        tags: ["SIT", "International", "SET Entrance"],
        established: "2002",
        description: "Part of the prestigious Symbiosis family with world-class facilities and international exposure.",
        imageUrl: "/images/colleges/symbiosis-international-university.jpg",
        about: "Symbiosis International (Deemed University) is one of the most prestigious private universities in India. Symbiosis Institute of Technology (SIT) offers engineering programs with focus on innovation, international exposure, and industry readiness. Admission is through SET (Symbiosis Entrance Test). The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["Prestigious Symbiosis Brand", "International Collaborations", "SET Entrance Exam", "Modern Infrastructure", "Industry Partnerships", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        infrastructure: ["World-class Campus", "Innovation Labs", "International Hostels", "Sports Complex", "Cafeteria"],
        cutoffs: [{ title: "SET Cutoff 2024", table: [{ label: "CSE", value: "Top 5000 Rank" }] }],
        coursesDetails: [{ name: "Computer Science and Engineering", duration: "4 Years", type: "B.Tech" }, { name: "Electronics & Telecommunication", duration: "4 Years", type: "B.Tech" }],
        feesDetails: [{ title: "B.Tech Fee Structure", items: [{ label: "Total B.Tech (4 Years)", value: "₹12 - 15 Lakhs" }], note: "Premium fees with excellent ROI" }],
        placements: { stats: [{ label: "Highest Package", value: "₹35 LPA" }, { label: "Average Package", value: "₹9 LPA" }, { label: "Placement Rate", value: "95%+" }], topRecruiters: [{ category: "Tech", companies: ["Microsoft", "Amazon", "Goldman Sachs", "TCS", "Infosys"] }] },
        admissions: { process: ["Register for SET", "Take SET exam", "PI (Personal Interview)", "Counseling"], eligibility: ["10+2 with PCM", "SET score"], documents: ["Marksheets", "SET Score Card"] },
        keyDates: [{ event: "SET Exam", date: "May 2026" }, { event: "PI & Counseling", date: "June 2026" }],
        whyChoose: ["Symbiosis brand value", "International exposure", "Excellent placements", "Modern campus", "Strong alumni"],
        scholarships: [{ title: "Merit Scholarship", items: [{ label: "Top SET Rankers", value: "Up to 100% scholarship" }] }],
        faqs: [{ question: "Is Symbiosis good for engineering?", answer: "Yes, SIT Pune offers quality engineering education with strong placements and international exposure." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["SET preparation guidance", "Symbiosis admission support", "Scholarship assistance", "Complete counseling", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "mh-4",
        slug: "d-y-patil-university",
        name: "D.Y. Patil University",
        location: "Navi Mumbai, Maharashtra",
        state: "Maharashtra",
        rating: 4.1,
        reviews: 1100,
        fees: "₹ 9L+ Total",
        courses: ["B.Tech"],
        type: "Private",
        tags: ["Navi Mumbai", "Sports", "Modern Campus"],
        established: "2007",
        description: "Known for its modern stadium, sports infrastructure, and quality academics in Navi Mumbai.",
        imageUrl: "/images/colleges/d-y-patil-university.png",
        about: "D.Y. Patil University, Navi Mumbai is a private university established in 2007. Famous for hosting IPL matches at its stadium, the university also offers quality engineering education with modern infrastructure and good placement support. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["Famous DY Patil Stadium", "Modern Campus", "Sports Excellence", "Navi Mumbai Location", "Good Infrastructure", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        cutoffs: [{ title: "University Entrance 2024", table: [{ label: "CSE", value: "Merit-based" }] }],
        coursesDetails: [{ name: "Computer Science and Engineering", duration: "4 Years", type: "B.Tech" }, { name: "Mechanical Engineering", duration: "4 Years", type: "B.Tech" }],
        feesDetails: [{ title: "B.Tech Fee Structure", items: [{ label: "Total B.Tech (4 Years)", value: "₹9 - 11 Lakhs" }] }],
        placements: { stats: [{ label: "Highest Package", value: "₹18 LPA" }, { label: "Average Package", value: "₹5 LPA" }], topRecruiters: [{ category: "IT", companies: ["TCS", "Infosys", "Wipro", "L&T"] }] },
        admissions: { process: ["Apply online", "Merit-based selection"], eligibility: ["10+2 with PCM"], documents: ["Marksheets", "ID Proof"] },
        whyChoose: ["Modern campus", "Sports facilities", "Navi Mumbai location", "Good infrastructure"],
        faqs: [{ question: "Is DY Patil Navi Mumbai good?", answer: "Yes, it's a good option with modern infrastructure and decent placements." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Direct admission guidance", "Campus and program insights", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },

    // --- Tamil Nadu ---
    {
        id: "tn-1",
        slug: "vellore-institute-of-technology",
        name: "Vellore Institute of Technology (VIT)",
        location: "Vellore, Tamil Nadu",
        state: "Tamil Nadu",
        rating: 4.8,
        reviews: 5000,
        fees: "₹ 12L+ Total",
        courses: ["B.Tech"],
        type: "Deemed",
        tags: ["VITEEE", "No. 1 Private", "Top Placements"],
        established: "1984",
        description: "Highest ranked private engineering institution in India with massive placement records and global recognition.",
        imageUrl: "/images/colleges/vit-vellore.jpg",
        about: "Vellore Institute of Technology (VIT) is a deemed-to-be-university established in 1984. It is consistently ranked as India's No. 1 private engineering institution. VIT conducts VITEEE entrance exam for admissions and has campuses in Vellore, Chennai, Bhopal, and AP. Known for exceptional placements and diverse student community. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["No. 1 Private University in India", "VITEEE Entrance Exam", "40+ Years of Excellence", "4 Campuses Across India", "30,000+ Students", "Exceptional Placements", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        infrastructure: ["Massive 360-acre Campus", "State-of-the-art Labs", "Central Library", "International Hostels", "Sports Complex", "Innovation Center"],
        cutoffs: [{ title: "VITEEE Cutoff 2024", table: [{ label: "CSE", value: "Rank < 5000" }, { label: "CSE with Spec.", value: "Rank < 8000" }, { label: "ECE", value: "Rank < 10000" }] }],
        coursesDetails: [
            { name: "Computer Science and Engineering", duration: "4 Years", type: "B.Tech" },
            { name: "CSE - Artificial Intelligence", duration: "4 Years", type: "B.Tech" },
            { name: "CSE - Data Science", duration: "4 Years", type: "B.Tech" },
            { name: "Electronics & Communication", duration: "4 Years", type: "B.Tech" }
        ],
        feesDetails: [{ title: "B.Tech Fee Structure", items: [{ label: "Total B.Tech (4 Years)", value: "₹12 - 16 Lakhs" }], note: "Fees vary by campus and program" }],
        placements: {
            stats: [{ label: "Highest Package", value: "₹85 LPA" }, { label: "Average Package", value: "₹8.5 LPA" }, { label: "Placement Rate", value: "98%+" }],
            highlights: ["Highest placements among private colleges", "10,000+ students placed annually", "500+ recruiting companies"],
            topRecruiters: [{ category: "Tech Giants", companies: ["Google", "Microsoft", "Amazon", "Goldman Sachs", "Deloitte", "Oracle", "Adobe"] }]
        },
        admissions: { process: ["Register for VITEEE", "Take VITEEE exam", "Counseling based on rank", "Choose campus and program"], eligibility: ["10+2 with PCM", "VITEEE score"], documents: ["Marksheets", "VITEEE Rank Card", "ID Proof"] },
        keyDates: [{ event: "VITEEE Registration", date: "November 2025" }, { event: "VITEEE Exam", date: "April 2026" }, { event: "Counseling", date: "May-June 2026" }],
        whyChoose: ["No. 1 Private University in India", "Exceptional placements (₹85 LPA highest)", "Global recognition", "Diverse student community", "Multiple campus options", "Strong alumni network"],
        scholarships: [{ title: "Merit Scholarship", items: [{ label: "VITEEE Top 50", value: "100% Tuition Fee Waiver" }, { label: "VITEEE Top 500", value: "75% Tuition Fee Waiver" }, { label: "VITEEE Top 1000", value: "50% Tuition Fee Waiver" }] }],
        alumni: { description: "Largest private university alumni network in India.", companies: ["Google", "Microsoft", "Amazon", "Facebook", "Apple", "Goldman Sachs", "McKinsey"] },
        faqs: [
            { question: "Is VIT the best private college?", answer: "Yes, VIT is consistently ranked No. 1 private engineering institution in India by NIRF." },
            { question: "What is VITEEE?", answer: "VITEEE is VIT's entrance exam conducted for B.Tech admissions." },
            { question: "What is the highest package at VIT?", answer: "The highest package at VIT is ₹85 LPA (international offers go even higher)." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }
        ],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["VITEEE preparation guidance", "Campus selection support (Vellore/Chennai/AP/Bhopal)", "Scholarship counseling", "Complete admission assistance", "Hostel and accommodation help", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "tn-2",
        slug: "srm-institute-of-science-and-technology",
        name: "SRM Institute of Science and Technology",
        location: "Chennai, Tamil Nadu",
        state: "Tamil Nadu",
        rating: 4.6,
        reviews: 4000,
        fees: "₹ 10L+ Total",
        courses: ["B.Tech"],
        type: "Deemed",
        tags: ["SRMJEEE", "Diverse", "Multiple Campuses"],
        established: "1985",
        description: "Multidisciplinary deemed university with huge campus, global connections, and excellent placements.",
        imageUrl: "/images/colleges/srm-institute-of-science-and-technology.png",
        about: "SRM Institute of Science and Technology (SRMIST) is one of the top-ranked deemed universities in India, established in 1985. With campuses in Chennai (Kattankulathur), Ramapuram, Vadapalani, and Delhi NCR, SRM offers diverse engineering programs. Admission is through SRMJEEE entrance exam. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["Top 15 in NIRF", "SRMJEEE Entrance Exam", "Multiple Campuses", "4000+ Acre Main Campus", "Global Collaborations", "35+ Years of Excellence", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        infrastructure: ["Massive Main Campus", "State-of-the-art Labs", "Medical Centre", "Sports Complex", "International Hostels", "Research Centers"],
        cutoffs: [{ title: "SRMJEEE Cutoff 2024", table: [{ label: "CSE", value: "Rank < 10000" }, { label: "ECE", value: "Rank < 15000" }] }],
        coursesDetails: [
            { name: "Computer Science and Engineering", duration: "4 Years", type: "B.Tech" },
            { name: "CSE - AI & ML", duration: "4 Years", type: "B.Tech" },
            { name: "Electronics & Communication", duration: "4 Years", type: "B.Tech" }
        ],
        feesDetails: [{ title: "B.Tech Fee Structure", items: [{ label: "Total B.Tech (4 Years)", value: "₹10 - 14 Lakhs" }], note: "Fees vary by program and campus" }],
        placements: {
            stats: [{ label: "Highest Package", value: "₹51 LPA" }, { label: "Average Package", value: "₹7 LPA" }, { label: "Placement Rate", value: "95%+" }],
            topRecruiters: [{ category: "Tech", companies: ["Amazon", "Microsoft", "Google", "TCS", "Infosys", "Cognizant"] }]
        },
        admissions: { process: ["Register for SRMJEEE", "Take SRMJEEE exam", "Counseling"], eligibility: ["10+2 with PCM", "SRMJEEE score"], documents: ["Marksheets", "SRMJEEE Rank Card"] },
        keyDates: [{ event: "SRMJEEE Exam", date: "April-June 2026" }, { event: "Counseling", date: "June-July 2026" }],
        whyChoose: ["Top 15 in India", "Multiple campus options", "Strong placements", "Global exposure", "Massive campus"],
        scholarships: [{ title: "Merit Scholarship", items: [{ label: "Top Rankers", value: "Up to 100% fee waiver" }] }],
        faqs: [{ question: "Is SRM good for engineering?", answer: "Yes, SRM is among the top 15 engineering institutions in India with excellent infrastructure and placements." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["SRMJEEE guidance", "Campus selection help", "Scholarship support", "Complete admission assistance", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },

    // --- Uttarakhand ---
    {
        id: "uk-1",
        slug: "university-of-petroleum-and-energy-studies",
        name: "University of Petroleum and Energy Studies (UPES)",
        location: "Dehradun, Uttarakhand",
        state: "Uttarakhand",
        rating: 4.3,
        reviews: 1500,
        fees: "₹ 14L+ Total",
        courses: ["B.Tech", "MBA"],
        type: "Private",
        tags: ["Domain Specific", "Energy", "Specializations"],
        established: "2003",
        description: "Specialized university known for unique domain-specific programs in Energy, Cloud, AI, and Aerospace.",
        imageUrl: "/images/colleges/upes-dehradun.png",
        about: "University of Petroleum and Energy Studies (UPES) is a private university established in 2003 in Dehradun. Unlike traditional engineering colleges, UPES offers highly specialized, industry-focused programs in domains like Petroleum, Energy, Aerospace, Cloud Computing, and AI/ML. Strong industry partnerships ensure excellent placements. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["Domain-Specific Programs", "Strong Industry Ties", "Unique Specializations", "100% Placement Assistance", "Scenic Dehradun Location", "NAAC A Grade", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        infrastructure: ["Modern Campus", "Oil Rig Simulation Lab", "Cloud Computing Center", "Aerospace Labs", "Hostels"],
        cutoffs: [{ title: "UPESEAT 2024", table: [{ label: "CSE Specializations", value: "Merit-based" }] }],
        coursesDetails: [
            { name: "CSE - Cloud Computing", duration: "4 Years", type: "B.Tech" },
            { name: "CSE - Artificial Intelligence", duration: "4 Years", type: "B.Tech" },
            { name: "Petroleum Engineering", duration: "4 Years", type: "B.Tech" },
            { name: "Aerospace Engineering", duration: "4 Years", type: "B.Tech" }
        ],
        feesDetails: [{ title: "B.Tech Fee Structure", items: [{ label: "Total B.Tech (4 Years)", value: "₹14 - 18 Lakhs" }], note: "Premium fees for specialized programs" }],
        placements: {
            stats: [{ label: "Highest Package", value: "₹50 LPA" }, { label: "Average Package", value: "₹8 LPA" }, { label: "Placement Rate", value: "95%+" }],
            topRecruiters: [{ category: "Domain Companies", companies: ["ONGC", "IOCL", "Amazon", "Microsoft", "Deloitte", "EY"] }]
        },
        admissions: { process: ["Apply through UPESEAT/JEE/Board Merit", "Counseling", "Program selection"], eligibility: ["10+2 with PCM"], documents: ["Marksheets", "ID Proof"] },
        keyDates: [{ event: "UPESEAT Exam", date: "Multiple dates (2026)" }],
        whyChoose: ["Unique specializations", "Industry-focused curriculum", "High placements", "Scenic location", "Strong alumni"],
        scholarships: [{ title: "Merit Scholarship", items: [{ label: "Top Board Scores", value: "Up to 100% tuition waiver" }] }],
        faqs: [
            { question: "Is UPES good for engineering?", answer: "Yes, UPES is excellent for domain-specific programs like Energy, Aerospace, Cloud, and AI." },
            { question: "What makes UPES different?", answer: "UPES offers highly specialized programs focused on specific industry domains, unlike general engineering." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }
        ],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Specialization guidance", "Domain career counseling", "Complete admission support", "Scholarship assistance", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "uk-2",
        slug: "doon-university",
        name: "Doon University",
        location: "Dehradun, Uttarakhand",
        state: "Uttarakhand",
        rating: 3.9,
        reviews: 500,
        fees: "₹ 3L - 4L Total",
        courses: ["B.Tech"],
        type: "Government",
        tags: ["State University", "Scenic", "Affordable"],
        established: "2005",
        description: "State university offering quality and affordable education in the scenic Doon valley.",
        imageUrl: "/images/colleges/doon-university.png",
        about: "Doon University is a state government university established in 2005 in Dehradun. It offers undergraduate and postgraduate programs with a focus on quality education at affordable fees. Located in the scenic Doon valley, it provides a peaceful learning environment. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["State Government University", "Affordable Fees", "Scenic Location", "Quality Education", "Growing Infrastructure", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        cutoffs: [{ title: "State Entrance 2024", table: [{ label: "B.Tech", value: "State counseling" }] }],
        coursesDetails: [{ name: "Computer Science and Engineering", duration: "4 Years", type: "B.Tech" }],
        feesDetails: [{ title: "B.Tech Fee Structure", items: [{ label: "Total B.Tech (4 Years)", value: "₹3 - 4 Lakhs" }], note: "Very affordable" }],
        placements: { stats: [{ label: "Average Package", value: "₹4 LPA" }], topRecruiters: [{ category: "IT", companies: ["TCS", "Infosys", "Wipro"] }] },
        admissions: { process: ["State entrance/JEE", "Counseling"], eligibility: ["10+2 with PCM"], documents: ["Marksheets", "Domicile"] },
        whyChoose: ["Affordable fees", "Government university", "Scenic location", "Quality education"],
        faqs: [{ question: "Is Doon University good?", answer: "It's a good affordable option for students seeking government university education in a scenic location." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Government college guidance", "Affordable option counseling", "Complete admission support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },

    // --- Odisha ---
    {
        id: "od-1",
        slug: "kalinga-institute-of-industrial-technology",
        name: "Kalinga Institute of Industrial Technology",
        location: "Bhubaneswar, Odisha",
        state: "Odisha",
        rating: 4.7,
        reviews: 2800,
        fees: "₹ 14L+ Total",
        courses: ["B.Tech"],
        type: "Deemed",
        tags: ["KIITEE", "Massive Campus", "100% Placement"],
        established: "1992",
        description: "World-class deemed university with 100% placement assistance, massive campus, and KISS social initiative.",
        imageUrl: "/images/colleges/kiit-bhubaneswar.jpg",
        about: "Kalinga Institute of Industrial Technology (KIIT) is a deemed-to-be-university established in 1992 in Bhubaneswar. It has grown to become one of the top private universities in India with a 25+ square km campus, 30,000+ students, and 100% placement assistance. KIIT also runs KISS (Kalinga Institute of Social Sciences) for tribal children. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["Top 20 in NIRF", "KIITEE Entrance Exam", "25+ sq km Campus", "30,000+ Students", "100% Placement Assistance", "KISS Social Initiative", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        infrastructure: ["Massive Integrated Campus", "World-class Labs", "Stadium", "Medical Centre", "International Hostels", "Multiple Cafeterias"],
        cutoffs: [{ title: "KIITEE Cutoff 2024", table: [{ label: "CSE", value: "Rank < 8000" }, { label: "ECE", value: "Rank < 12000" }] }],
        coursesDetails: [{ name: "Computer Science and Engineering", duration: "4 Years", type: "B.Tech" }, { name: "Electronics & Communication", duration: "4 Years", type: "B.Tech" }, { name: "Civil Engineering", duration: "4 Years", type: "B.Tech" }],
        feesDetails: [{ title: "B.Tech Fee Structure", items: [{ label: "Total B.Tech (4 Years)", value: "₹14 - 16 Lakhs" }] }],
        placements: {
            stats: [{ label: "Highest Package", value: "₹52 LPA" }, { label: "Average Package", value: "₹8 LPA" }, { label: "Placement Rate", value: "100% Assistance" }],
            topRecruiters: [{ category: "Tech", companies: ["Amazon", "Microsoft", "Google", "Oracle", "TCS", "Infosys"] }]
        },
        admissions: { process: ["Register for KIITEE", "Take KIITEE exam", "Counseling based on rank"], eligibility: ["10+2 with PCM", "KIITEE score"], documents: ["Marksheets", "KIITEE Rank Card"] },
        keyDates: [{ event: "KIITEE Exam", date: "April-May 2026" }],
        whyChoose: ["Top 20 in India", "Massive world-class campus", "100% placement assistance", "Strong social initiative (KISS)", "Affordable compared to peers"],
        scholarships: [{ title: "Merit Scholarship", items: [{ label: "Top KIITEE Rankers", value: "Up to 100% fee waiver" }] }],
        faqs: [{ question: "Is KIIT good for engineering?", answer: "Yes, KIIT is among the top 20 engineering institutions in India with excellent infrastructure and placements." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["KIITEE preparation guidance", "Scholarship counseling", "Complete admission support", "Hostel guidance", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "od-2",
        slug: "siksha-o-anusandhan-university",
        name: "Siksha 'O' Anusandhan (SOA) University",
        location: "Bhubaneswar, Odisha",
        state: "Odisha",
        rating: 4.5,
        reviews: 1600,
        fees: "₹ 10L+ Total",
        courses: ["B.Tech", "MBBS"],
        type: "Deemed",
        tags: ["SAAT", "Research", "Medical & Engineering"],
        established: "2007",
        description: "Top-ranked deemed university with focus on medical and engineering research excellence.",
        imageUrl: "/images/colleges/siksha-o-anusandhan-university.png",
        about: "Siksha 'O' Anusandhan (SOA) is a deemed-to-be-university established in 2007 in Bhubaneswar. It offers programs in Engineering, Medical Sciences, and Management. SOA conducts its own entrance exam SAAT and is known for research focus and quality education. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["NIRF Ranked", "SAAT Entrance Exam", "Medical & Engineering", "Research Focus", "NAAC A++ Grade", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        cutoffs: [{ title: "SAAT Cutoff 2024", table: [{ label: "CSE", value: "Merit-based" }] }],
        coursesDetails: [{ name: "Computer Science and Engineering", duration: "4 Years", type: "B.Tech" }, { name: "Electronics & Communication", duration: "4 Years", type: "B.Tech" }],
        feesDetails: [{ title: "B.Tech Fee Structure", items: [{ label: "Total B.Tech (4 Years)", value: "₹10 - 12 Lakhs" }] }],
        placements: { stats: [{ label: "Highest Package", value: "₹25 LPA" }, { label: "Average Package", value: "₹6 LPA" }], topRecruiters: [{ category: "Tech", companies: ["TCS", "Infosys", "Wipro", "Cognizant"] }] },
        admissions: { process: ["Apply for SAAT", "Take SAAT exam", "Counseling"], eligibility: ["10+2 with PCM"], documents: ["Marksheets", "SAAT Score Card"] },
        whyChoose: ["NAAC A++ Grade", "Research opportunities", "Medical & Engineering programs", "Good placements"],
        faqs: [{ question: "Is SOA good for engineering?", answer: "Yes, SOA is a reputed deemed university with quality engineering and research programs." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["SAAT guidance", "Multiple program counseling", "Complete admission support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "od-3",
        slug: "c-v-raman-global-university",
        name: "C. V. Raman Global University",
        location: "Bhubaneswar, Odisha",
        state: "Odisha",
        rating: 4.2,
        reviews: 1000,
        fees: "₹ 6L - 8L Total",
        courses: ["B.Tech"],
        type: "Private",
        tags: ["Skills", "Global", "Industry Focus"],
        established: "2012",
        description: "Focused on skill development, global exposure, and industry-ready education for students.",
        imageUrl: "/images/colleges/c-v-raman-global-university.jpg",
        about: "C. V. Raman Global University is a private university in Bhubaneswar established in 2012. Named after Nobel laureate C. V. Raman, the university focuses on skill development, industry partnerships, and global exposure. It offers various engineering and management programs. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["Skill Development Focus", "Industry Partnerships", "Global Collaborations", "Modern Infrastructure", "Affordable Fees", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        cutoffs: [{ title: "University Entrance 2024", table: [{ label: "CSE", value: "Merit-based" }] }],
        coursesDetails: [{ name: "Computer Science and Engineering", duration: "4 Years", type: "B.Tech" }],
        feesDetails: [{ title: "B.Tech Fee Structure", items: [{ label: "Total B.Tech (4 Years)", value: "₹6 - 8 Lakhs" }] }],
        placements: { stats: [{ label: "Highest Package", value: "₹15 LPA" }, { label: "Average Package", value: "₹4.5 LPA" }], topRecruiters: [{ category: "IT", companies: ["TCS", "Wipro", "Infosys"] }] },
        admissions: { process: ["Apply online", "Merit-based selection"], eligibility: ["10+2 with PCM"], documents: ["Marksheets", "ID Proof"] },
        whyChoose: ["Skill focus", "Industry connections", "Affordable fees", "Global exposure"],
        faqs: [{ question: "Is CVR good?", answer: "Yes, it's a good option with focus on skills and industry-ready education at affordable fees." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Skill-focused college guidance", "Industry partnership insights", "Complete admission support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "od-4",
        slug: "silicon-university",
        name: "Silicon University",
        location: "Bhubaneswar, Odisha",
        state: "Odisha",
        rating: 4.1,
        reviews: 900,
        fees: "₹ 5L - 6L Total",
        courses: ["B.Tech"],
        type: "Private",
        tags: ["Strict Academics", "Discipline", "IT Focus"],
        established: "2001",
        description: "Known for rigorous academic curriculum, strict discipline, and strong IT sector placements.",
        imageUrl: "/images/colleges/silicon-university.png",
        about: "Silicon University (formerly Silicon Institute of Technology) is a private university in Bhubaneswar known for its strict academic discipline and focus on IT education. Established in 2001, it has built a reputation for producing industry-ready graduates. The institute emphasizes a holistic development approach, encouraging students to participate in technical fests, hackathons, and research projects. With a curriculum designed to meet industry 4.0 standards, students are trained in emerging technologies like AI, ML, and IoT. The campus provides a vibrant atmosphere with various clubs and societies for extracurricular activities.",
        highlights: ["Strict Academic Discipline", "IT Sector Focus", "Good Placements", "Affordable Fees", "Structured Curriculum", "Experienced Faculty", "Modern Infrastructure", "Holistic Development", "Industry-Ready Curriculum"],
        cutoffs: [{ title: "Entrance 2024", table: [{ label: "CSE", value: "Merit + Entrance" }] }],
        coursesDetails: [{ name: "Computer Science and Engineering", duration: "4 Years", type: "B.Tech" }, { name: "Information Technology", duration: "4 Years", type: "B.Tech" }],
        feesDetails: [{ title: "B.Tech Fee Structure", items: [{ label: "Total B.Tech (4 Years)", value: "₹5 - 6 Lakhs" }], note: "Affordable with good results" }],
        placements: { stats: [{ label: "Highest Package", value: "₹18 LPA" }, { label: "Average Package", value: "₹5 LPA" }, { label: "Placement Rate", value: "88%+" }], topRecruiters: [{ category: "IT Services", companies: ["TCS", "Wipro", "Cognizant", "Infosys", "Tech Mahindra"] }] },
        admissions: { process: ["Apply online", "Entrance test", "Counseling"], eligibility: ["10+2 with PCM"], documents: ["Marksheets", "ID Proof"] },
        whyChoose: ["Strict discipline ensures focus", "Good IT placements", "Affordable fees", "Structured learning"],
        faqs: [
            { question: "Is Silicon University strict?", answer: "Yes, Silicon is known for strict academic discipline which helps students focus on learning." },
            { question: "Is Silicon good for IT?", answer: "Yes, Silicon has strong IT sector placements with good average packages." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }
        ],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Discipline-focused guidance", "IT career counseling", "Affordable option support", "Complete admission assistance", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    }
];

// --- Comprehensive Exams Data ---
export const exams: Exam[] = [
    {
        id: "bitsat",
        slug: "bitsat-2026",
        name: "BITSAT 2026",
        logoUrl: "https://placehold.co/100x100/2563eb/ffffff?text=BITSAT",
        fullName: "Birla Institute of Technology and Science Admission Test",
        description: "BITSAT is a computer-based online test for admission to Integrated First Degree Programmes of BITS Pilani Campuses in Pilani, Goa, and Hyderabad.",
        date: "Session 1: May 2026 | Session 2: June 2026",
        applicationLink: "https://www.bitsadmission.com/",
        introduction: "BITSAT (Birla Institute of Technology and Science Admission Test) is one of the most prestigious engineering entrance exams in India. Conducted by BITS Pilani, this exam opens doors to world-class education at three campuses - Pilani, Goa, and Hyderabad. With no reservation policy and purely merit-based admissions, BITSAT attracts the best minds from across India. This exam is a gateway to some of the most prestigious institutes in the region. Securing a good rank requires consistent preparation and a clear understanding of the syllabus.",
        aboutExam: "BITSAT is conducted by Birla Institute of Technology and Science (BITS), Pilani - an all-India Institute for higher education ranked among the top engineering institutions in India. BITS Pilani was established in 1964 by the late Mr. G.D. Birla and is now an Institute of Eminence. BITSAT is unique because it's one of the few exams in India that follows a strict merit-based admission policy with absolutely no reservation based on caste, category, or region. The exam has two sessions giving candidates two attempts, and bonus questions for those who finish early. Known for its competitive nature, this exam attracts thousands of aspirants every year. Akash Talks provides comprehensive guidance, from application filling to counseling, ensuring students make informed decisions.",
        overview: "Birla Institute of Technology and Science Admission Test (BITSAT) is an entrance exam conducted by BITS Pilani. It is one of the most competitive engineering entrance exams in India. The exam is held for admission to B.E., B.Pharm, and M.Sc. programs at Pilani, Goa, and Hyderabad campuses. BITSAT 2026 will be conducted in two sessions, allowing candidates two attempts to improve their scores. The exam tests candidates on Physics, Chemistry, Mathematics/Biology, English Proficiency, and Logical Reasoning. The exam assesses candidates on their conceptual understanding and problem-solving skills. It is conducted annually and follows a strict pattern.",
        importantDates: [
            { event: "Application Start Date", date: "January 2026 (Tentative)" },
            { event: "Application End Date", date: "April 2026 (Tentative)" },
            { event: "Slot Booking Session 1", date: "Early May 2026" },
            { event: "BITSAT Session 1 Exam", date: "Late May 2026" },
            { event: "BITSAT Session 2 Application", date: "Late May - June 2026" },
            { event: "BITSAT Session 2 Exam", date: "Mid June 2026" },
            { event: "Counseling (Iteration 1)", date: "July 2026" }
        ],
        applicationProcess: [
            { step: "Registration", description: "Visit the official website (bitsadmission.com) and register with a valid email ID and mobile number." },
            { step: "Fill Application Form", description: "Enter personal, academic, and contact details. Choose your preferred exam centers." },
            { step: "Upload Documents", description: "Upload scanned photograph (4KB to 100KB) and signature (1KB to 50KB) in JPG/JPEG format." },
            { step: "Pay Application Fee", description: "Fee is approx ₹3400 (Male) / ₹2900 (Female) for a single session. For both sessions, it is higher. Pay via Net Banking/Credit Card/Debit Card/UPI." },
            { step: "Slot Booking", description: "Reserve your preferred exam date and time slot through the slot booking system when it opens. It is first-come-first-serve." }
        ],
        documents: [
            "Class 10 Marksheet and Certificate",
            "Class 12 Marksheet (if available)",
            "Scanned Photograph (Recent, color, white background)",
            "Scanned Signature",
            "Credit/Debit Card or Net Banking details for payment",
            "Valid Photo ID Proof (Aadhaar, Passport, etc.) for exam day"
        ],
        eligibility: [
            "Candidates should have passed the 12th class examination of 10+2 system from a recognized Central or State board or its equivalent.",
            "Must have Physics, Chemistry, and Mathematics (PCM) as subjects. (PCB for B.Pharm).",
            "Minimum 75% aggregate marks in PCM/PCB subjects in 12th examination.",
            "Minimum 60% marks in each of Physics, Chemistry, and Mathematics/Biology individually.",
            "Proficiency in English is required.",
            "Students potentially appearing for 12th exams in 2026 are also eligible."
        ],
        examPattern: {
            mode: "Online (Computer Based Test)",
            duration: "3 Hours (180 Minutes). No break between parts.",
            totalMarks: "390",
            markingScheme: "+3 for correct answer, -1 for incorrect answer. Unattempted questions get 0.",
            subjects: [
                "Part I: Physics (30 Questions)",
                "Part II: Chemistry (30 Questions)",
                "Part III: English Proficiency (10 Questions) & Logical Reasoning (20 Questions)",
                "Part IV: Mathematics/Biology (40 Questions)"
            ]
        },
        counselling: "Admission is purely merit-based on the BITSAT score. After the exam, there are multiple rounds of seat allotment called 'Iterations'. Candidates must fill their preference order for Campuses (Pilani, Goa, Hyderabad) and Branches carefully. There is no reservation policy (except for BITS Dubai which has its own process). Direct admission is offered to Board Toppers.",
        faqs: [
            { question: "Can I appear for both sessions?", answer: "Yes, candidates can appear for both Session 1 and Session 2. The best of the two scores will be considered for admission." },
            { question: "Is there any reservation in BITS?", answer: "No, BITS Pilani does not follow any reservation policy based on caste or category. Admissions are strictly based on merit." },
            { question: "What is a good score in BITSAT?", answer: "A score above 300 is generally considered safe for top branches like CSE/ECE in any of the three campuses. For Pilani CSE, 330+ is typically required." },
            { question: "Is there a negative marking?", answer: "Yes, 1 mark is deducted for every incorrect answer." },
            { question: "Are there bonus questions?", answer: "Yes, if a candidate answers all 130 questions, they can attempt 12 bonus questions for extra marks. Once you start bonus questions, you cannot go back to the main paper." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }, { question: "How can Akash Talks help in counseling?", answer: "We provide personalized rank analysis and college preference lists to help you get the best seat." }, { question: "Is the application process online?", answer: "Yes, the entire application process is conducted online through the official portal." }, { question: "What documents are needed for counseling?", answer: "Standard documents include Admit Card, Rank Card, 10th/12th Marksheets, and Domicile Certificate." }
        ]
    },
    {
        id: "wbjee",
        slug: "wbjee-2026",
        name: "WBJEE 2026",
        logoUrl: "/images/exams/wbjee-logo.png",
        fullName: "West Bengal Joint Entrance Examination",
        description: "State-level entrance exam for admission to undergraduate engineering, technology, pharmacy, and architecture courses in West Bengal.",
        date: "April 2026 (Expected)",
        applicationLink: "https://wbjeeb.nic.in/",
        introduction: "WBJEE (West Bengal Joint Entrance Examination) is the gateway to top engineering colleges in West Bengal including Jadavpur University, IEM, Heritage, and 200+ other institutions. Known for its challenging mathematics section, WBJEE is one of the most respected state-level engineering entrance exams in India. This exam is a gateway to some of the most prestigious institutes in the region. Securing a good rank requires consistent preparation and a clear understanding of the syllabus.",
        aboutExam: "WBJEE is conducted by the West Bengal Joint Entrance Examinations Board (WBJEEB), a state government-controlled body established in 1962. The exam provides admission to over 200 engineering, pharmacy, and architecture colleges in West Bengal. WBJEEB has a legacy of conducting fair and transparent examinations. The exam is held in offline (OMR-based) mode and is known for its high-quality questions, especially in Mathematics which often features problems requiring deep conceptual understanding. Known for its competitive nature, this exam attracts thousands of aspirants every year. Akash Talks provides comprehensive guidance, from application filling to counseling, ensuring students make informed decisions.",
        overview: "The West Bengal Joint Entrance Examination (WBJEE) is a state-government controlled centralized test, conducted by the West Bengal Joint Entrance Examinations Board (WBJEEB). It is the gateway for admission to many private and governmental engineering institutions in West Bengal, including Jadavpur University. It is known for its high standard of questions, especially in Mathematics, and is conducted in offline (OMR) mode. The exam assesses candidates on their conceptual understanding and problem-solving skills. It is conducted annually and follows a strict pattern.",
        importantDates: [
            { event: "Registration Begins", date: "December 2025" },
            { event: "Registration Ends", date: "February 2026" },
            { event: "Correction Window", date: "February 2026" },
            { event: "Admit Card Download", date: "April 2026" },
            { event: "WBJEE 2026 Exam Date", date: "Last Sunday of April 2026 (Tentative)" },
            { event: "Result Declaration", date: "June 2026" }
        ],
        applicationProcess: [
            { step: "Online Registration", description: "Register on the official website wbjeeb.nic.in using name, mobile number, and email." },
            { step: "Fill Application Form", description: "Enter personal details, domicile (West Bengal or Other), category, and academic details." },
            { step: "Upload Images", description: "Upload scanned recent color photograph and signature as per specified dimensions and size." },
            { step: "Fee Payment", description: "Pay examination fees online (approx ₹500 for General, ₹400 for Reserved categories)." },
            { step: "Confirmation Page", description: "Download and print the potential confirmation page. This is important for future reference." }
        ],
        documents: [
            "Aadhaar Card / Voter ID / Passport / School ID",
            "Class 10 Admit Card/Certificate (for age proof)",
            "Class 12 Marksheet (for counseling)",
            "Scanned Photograph & Signature",
            "Domicile Certificate (mandatory for West Bengal Govt colleges and reservation)",
            "Category Certificate (if applicable for SC/ST/OBC/TFW)"
        ],
        eligibility: [
            "Must be a Citizen of India.",
            "Lower age limit: 17 years as of 31st Dec 2026. No upper age limit for Engineering.",
            "Must have passed 10+2 with Physics and Mathematics along with any one of Chemistry/Biotechnology/Biology/Computer Science/Computer Application.",
            "Minimum 45% aggregate marks in the three compulsory subjects (40% for SC/ST/OBC/Pwd).",
            "Must have passed English in 10+2 with at least 30% marks."
        ],
        examPattern: {
            mode: "Offline (OMR Based)",
            duration: "4 Hours total (Paper I: Mathematics - 2 hours, Paper II: Physics & Chemistry - 2 hours)",
            totalMarks: "200 (Mathematics: 100, Physics: 50, Chemistry: 50)",
            markingScheme: "Category 1 (1 mark): +1/-0.25; Category 2 (2 marks): +2/-0.5; Category 3 (2 marks): +2/0 (Multiple Correct Options, Partial Marking available).",
            subjects: ["Mathematics (75 Questions)", "Physics (40 Questions)", "Chemistry (40 Questions)"]
        },
        counselling: "WBJEEB conducts purely web-based counseling (e-counseling). Candidates who secure a GMR (General Merit Rank) need to register, pay a counseling fee, and fill their choices of colleges and branches. Seats are allotted in multiple rounds based on rank and preference. Separate rounds are held for JEE Main candidates for some seats.",
        faqs: [
            { question: "Is Domicile required for WBJEE?", answer: "Domicile is NOT required to appear for the exam. Students from all over India can appear. However, Domicile is mandatory for claiming seats in Government colleges and for TFW (Tuition Fee Waiver) schemes." },
            { question: "Can outside West Bengal students apply?", answer: "Yes, students from other states can apply. They will be treated as 'General' category candidates and are eligible for seats in Private Universities and colleges, as well as General seats in some Govt Universities (like Jadavpur University)." },
            { question: "Is calculator allowed?", answer: "No, calculators or any electronic gadgets are strictly prohibited inside the examination hall." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }, { question: "How can Akash Talks help in counseling?", answer: "We provide personalized rank analysis and college preference lists to help you get the best seat." }, { question: "Is the application process online?", answer: "Yes, the entire application process is conducted online through the official portal." }, { question: "What documents are needed for counseling?", answer: "Standard documents include Admit Card, Rank Card, 10th/12th Marksheets, and Domicile Certificate." }
        ]
    },
    {
        id: "srmjeee",
        slug: "srmjeee-2026",
        name: "SRMJEEE 2026",
        logoUrl: "/images/exams/srmjeee-logo.png",
        fullName: "SRM Joint Engineering Entrance Examination",
        description: "Common entrance examination for admission to B.Tech programs at all SRM Group campuses.",
        date: "Phase 1: April 2026 | Phase 2: June 2026",
        applicationLink: "https://applications.srmist.edu.in/",
        introduction: "SRMJEEE (SRM Joint Engineering Entrance Examination) is your ticket to one of India's largest and most prestigious private university systems. With campuses in Chennai, Ghaziabad, Andhra Pradesh, and more, SRMJEEE offers students multiple location options while maintaining quality education standards. This exam is a gateway to some of the most prestigious institutes in the region. Securing a good rank requires consistent preparation and a clear understanding of the syllabus.",
        aboutExam: "SRMJEEE is conducted by SRM Institute of Science and Technology (SRMIST), formerly known as SRM University. SRMIST is one of the top-ranked universities in India with NAAC A++ Grade and Top 15 NIRF ranking. The exam can be taken in Remote Proctored Online Mode (RPOM) from the comfort of your home, making it convenient for students across India and abroad. With no negative marking, SRMJEEE is considered one of the most student-friendly entrance exams. Known for its competitive nature, this exam attracts thousands of aspirants every year. Akash Talks provides comprehensive guidance, from application filling to counseling, ensuring students make informed decisions.",
        overview: "SRM Joint Engineering Entrance Examination (SRMJEEE) is conducted by SRM Institute of Science and Technology for admission to B.Tech programs across its campuses in Kattankulathur (Main Campus), Ramapuram, Vadapalani, Ghaziabad, Tiruchirappalli, and SRM University Sonepat & Andhra Pradesh. It is usually conducted in Remote Proctored Online Mode (RPOM), allowing candidates to take the exam from their homes. The exam assesses candidates on their conceptual understanding and problem-solving skills. It is conducted annually and follows a strict pattern.",
        importantDates: [
            { event: "Applications Open", date: "November 2025" },
            { event: "Phase 1 Application Deadline", date: "April 2026 (Week 2)" },
            { event: "Phase 1 Exam Slot Booking", date: "April 2026 (Week 3)" },
            { event: "Phase 1 Exam", date: "April 2026 (Last Weekend)" },
            { event: "Phase 2 Application Deadline", date: "June 2026 (Week 2)" },
            { event: "Phase 2 Exam", date: "June 2026 (Weekend)" }
        ],
        applicationProcess: [
            { step: "Register", description: "Sign up on srmist.edu.in using name, email, and mobile number." },
            { step: "Verify Email", description: "Verify your email ID to activate your account." },
            { step: "Fill Application", description: "Complete the form with personal, academic, and address details. Select campus preferences carefully." },
            { step: "Payment", description: "Pay the non-refundable application fee of ₹1200 via online mode." },
            { step: "Upload Photo/Sign", description: "Upload scanned recent photograph and signature as per specifications." }
        ],
        documents: [
            "Class 10 Marksheet (as Date of Birth proof)",
            "Class 12 Marksheet (during counseling)",
            "Scanned Photograph and Signature for application",
            "Aadhaar Card/Passport/Any Govt ID Proof for exam day verification"
        ],
        eligibility: [
            "Nationality: Resident Indian, Non-Resident Indian (NRI), holder of PIO or OCI card issued by Govt. of India.",
            "Age: Should have attained the age of 16 years and 6 months on the 31st July of the calendar year in which the 12th Board examination is to be held.",
            "Passed 10+2 with Physics and Chemistry as compulsory subjects along with one of Mathematics or Biology (Botany and Zoology).",
            "Minimum 60% aggregate in PCM/PCB. (For KTR, Ramapuram, Vadapalani, and Ghaziabad campuses).",
            "Minimum 50% for other campuses (Andhra Pradesh, Sonepat)."
        ],
        examPattern: {
            mode: "Online (Remote Proctored Mode) - Take from Home",
            duration: "2 Hours 30 Minutes",
            totalMarks: "125",
            markingScheme: "+1 per question, No Negative Marking",
            subjects: ["Physics (35 Q)", "Chemistry (35 Q)", "Maths/Biology (40 Q)", "English (5 Q)", "Aptitude (10 Q)"]
        },
        counselling: "Online counseling is held after results. Rank holders have to fill choices of campus and program. Seats are allotted based on SRMJEEE rank. Selected candidates must pay a part of the tuition fee to confirm their seat. Phase 1 counseling happens immediately after Phase 1 results.",
        faqs: [
            { question: "Is there negative marking in SRMJEEE?", answer: "No, SRMJEEE does not have any negative marking." },
            { question: "Can I take the exam from my mobile?", answer: "No, you must use a Laptop or Desktop with a working camera and microphone. Mobile phones are not allowed." },
            { question: "Can I get KTR campus with low rank?", answer: "KTR (Main Campus) CSE usually closes at a rank around 10,000-15,000. Other branches may go up to 45,000+." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }, { question: "How can Akash Talks help in counseling?", answer: "We provide personalized rank analysis and college preference lists to help you get the best seat." }, { question: "Is the application process online?", answer: "Yes, the entire application process is conducted online through the official portal." }, { question: "What documents are needed for counseling?", answer: "Standard documents include Admit Card, Rank Card, 10th/12th Marksheets, and Domicile Certificate." }
        ]
    },
    {
        id: "iemcet",
        slug: "iemcet-entrance-exam",
        name: "IEM CET 2026",
        logoUrl: "/images/exams/iemcet-logo.png",
        fullName: "IEM Common Entrance Test",
        description: "Entrance test for admission to various undergraduate and postgraduate courses at IEM Kolkata and UEM.",
        date: "Multiple Phases (March-July 2026)",
        applicationLink: "https://iem.edu.in/",
        introduction: "IEMCET (IEM Common Entrance Test) is an entrance exam for students who want to join the prestigious University of Engineering & Management (UEM) and Institute of Engineering & Management (IEM) family. It's an excellent backup option for students who haven't appeared for WBJEE or JEE Main. This exam is a gateway to some of the most prestigious institutes in the region. Securing a good rank requires consistent preparation and a clear understanding of the syllabus.",
        aboutExam: "IEMCET is conducted by the IEM-UEM Group, one of the leading educational groups in Eastern India. The group runs IEM Kolkata (affiliated to MAKAUT), UEM Kolkata, and UEM Jaipur. The exam is designed to be student-friendly with multiple phases throughout the year, giving students several chances to qualify. The exam is often free of cost and can be taken from home online. Known for its competitive nature, this exam attracts thousands of aspirants every year. Akash Talks provides comprehensive guidance, from application filling to counseling, ensuring students make informed decisions.",
        overview: "IEMCET is conducted by the IEM-UEM group for admissions into its B.Tech, BCA, BBA, and other courses. It serves as a gateway for students who might not have appeared for WBJEE or want specifically to join the prestigious University of Engineering & Management (UEM) Jaipur/Kolkata and Institute of Engineering & Management (IEM). The exam assesses candidates on their conceptual understanding and problem-solving skills. It is conducted annually and follows a strict pattern.",
        importantDates: [
            { event: "Registration Starts", date: "January 2026" },
            { event: "Phase 1 Exam", date: "March 2026" },
            { event: "Phase 2 Exam", date: "April 2026" },
            { event: "Phase 3 Exam", date: "May 2026" },
            { event: "Result Declaration", date: "Usually 3-4 days after exam date" }
        ],
        applicationProcess: [
            { step: "Online Application", description: "Visit the IEM/UEM official website and click on the 'Apply Now' button." },
            { step: "Slot Booking", description: "After registration, select your preferred exam date and time slot from the available options." },
            { step: "Admit Card", description: "Receive your admit card/link on your registered email." },
            { step: "Exam", description: "Appear for the online exam from your home using a computer." }
        ],
        documents: [
            "Class 10 & 12 Marksheets (for eligibility check)",
            "Aadhaar Card or PAN Card",
            "Scanned copy of passport size photo"
        ],
        eligibility: [
            "For B.Tech: Passed 10+2 with Physics and Maths as compulsory subjects.",
            "Must have valid score in Class 10 and 12 (min 60% usually recommended).",
            "Must be at least 17 years of age."
        ],
        examPattern: {
            mode: "Online (Home Based available)",
            duration: "2 Hours",
            totalMarks: "Varies (Usually 360 or 100 depending on year)",
            markingScheme: "Generally +4 for correct, -1 for wrong (for B.Tech pattern).",
            subjects: ["Physics", "Chemistry", "Mathematics", "English/Aptitude"]
        },
        counselling: "Counseling is done by the institute based on IEMCET score and Class 12 marks. Students are called for offline/online counseling to select their branch.",
        faqs: [
            { question: "Is IEMCET mandatory?", answer: "If you do not have a valid WBJEE or JEE Main rank, IEMCET is required for admission to UEM Jaipur and UEM Kolkata. For IEM Kolkata, WBJEE/JEE Main is primary." },
            { question: "Is there an exam fee?", answer: "Often, there is no exam fee for IEMCET/IEMJEE, but check the official portal for the specific year." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }, { question: "How can Akash Talks help in counseling?", answer: "We provide personalized rank analysis and college preference lists to help you get the best seat." }, { question: "Is the application process online?", answer: "Yes, the entire application process is conducted online through the official portal." }, { question: "What documents are needed for counseling?", answer: "Standard documents include Admit Card, Rank Card, 10th/12th Marksheets, and Domicile Certificate." }
        ]
    },
    {
        id: "iemjee",
        slug: "iemjee",
        name: "IEMJEE 2026",
        logoUrl: "/images/exams/iemjee-logo.png",
        fullName: "Institute of Engineering & Management Joint Entrance Exam",
        description: "Exam for admission to B.Tech, BCA, BBA, M.Tech, MCA, MBA courses of IEM Group.",
        date: "Multiple Phases (Online)",
        applicationLink: "https://iemjee.iem.edu.in/",
        introduction: "IEMJEE (Institute of Engineering & Management Joint Entrance Exam) is the most direct route to UEM Jaipur and UEM Kolkata admissions. With multiple phases, free exam fee, and instant results, IEMJEE offers a hassle-free admission experience for aspiring engineers. This exam is a gateway to some of the most prestigious institutes in the region. Securing a good rank requires consistent preparation and a clear understanding of the syllabus.",
        aboutExam: "IEMJEE is conducted by the IEM-UEM Group for admissions specifically to UEM Jaipur and UEM Kolkata. The exam has a unique feature of instant or near-instant result generation, allowing students to know their status within hours. The exam is completely free of cost in most phases and can be taken online from home. It's an excellent opportunity for students who missed other entrance exams or are specifically interested in the UEM campuses. Known for its competitive nature, this exam attracts thousands of aspirants every year. Akash Talks provides comprehensive guidance, from application filling to counseling, ensuring students make informed decisions.",
        overview: "IEMJEE is a common entrance examination for admission to B.Tech, BCA, BBA, M.Tech, MCA, M.Sc, and MBA courses of the IEM Group (IEM Kolkata and UEM Jaipur/Kolkata). It offers a seamless admission process for students aiming for these specific campuses. The exam is often conducted in multiple shifts and allows students to take it from home. The exam assesses candidates on their conceptual understanding and problem-solving skills. It is conducted annually and follows a strict pattern.",
        importantDates: [
            { event: "Phase 1 Application", date: "January - February 2026" },
            { event: "Phase 1 Exam", date: "February 2026" },
            { event: "Phase 2 Application", date: "March - April 2026" },
            { event: "Phase 2 Exam", date: "April 2026" }
        ],
        applicationProcess: [
            { step: "Visit Application Portal", description: "Go to iemjee.iem.edu.in." },
            { step: "Register", description: "Fill the simple registration form with basic details." },
            { step: "Take Exam", description: "In many cases, you can take the exam immediately or book a near slot." },
            { step: "Result", description: "Instant or near-instant result generation." }
        ],
        documents: [
            "Standard academic documents (10th/12th Marksheets).",
            "ID Proof."
        ],
        eligibility: [
            "Passed 10+2 examination with Physics and Mathematics as compulsory subjects.",
            "Minimum 60% marks in Class 10 and 12 is generally required for good branches."
        ],
        examPattern: {
            mode: "Online (Remote)",
            duration: "2 Hours",
            totalMarks: "360",
            markingScheme: "+4 for correct, -1 for incorrect.",
            subjects: ["Physics (30 Q)", "Chemistry (30 Q)", "Mathematics (30 Q)"]
        },
        counselling: "Immediate provisional admission offers are often made based on scores. Students have to pay a registration fee to book their seat.",
        faqs: [
            { question: "Is there an exam fee?", answer: "Currently, there is no examination fee for appearing in IEMJEE." },
            { question: "Can I get admission in IEM Kolkata through IEMJEE?", answer: "IEMJEE is primarily for UEM Jaipur and UEM Kolkata. For IEM Kolkata (MAKAUT affiliated), WBJEE/JEE Main is the main route, but management quota seats *might* consider it. Check with admission cell." }, { question: "Does the college provide internship support?", answer: "Yes, the college has a dedicated placement cell that assists students in securing summer internships and industrial training." }, { question: "Is there a dedicated placement cell?", answer: "Yes, the Training and Placement Cell works year-round to bring top companies for recruitment and trains students in soft skills." }, { question: "Are there hostel facilities available?", answer: "Yes, separate hostel facilities are available for boys and girls with all necessary amenities and security." }, { question: "How can Akash Talks help in counseling?", answer: "We provide personalized rank analysis and college preference lists to help you get the best seat." }, { question: "Is the application process online?", answer: "Yes, the entire application process is conducted online through the official portal." }, { question: "What documents are needed for counseling?", answer: "Standard documents include Admit Card, Rank Card, 10th/12th Marksheets, and Domicile Certificate." }
        ]
    }
,
    {
        id: "new-med-1",
        slug: "jagannath-gupta-institute-of-medical-sciences-and-hospital",
        name: "Jagannath Gupta Institute of Medical Sciences and Hospital",
        location: "Kolkata, West Bengal",
        state: "West Bengal",
        rating: 4.0,
        reviews: 66,
        fees: "₹99,36,000",
        courses: ["MBBS"],
        type: "Private",
        description: "Private medical college in Kolkata with attached hospital and modern facilities.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Jagannath+Gupta+Institute+of+Medical+Sciences+and+Hospital",
        tags: ["Medical", "MBBS"],
        about: "Private medical college in Kolkata with attached hospital and modern facilities.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹99,36,000" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-2",
        slug: "jis-school-of-medical-science-and-research",
        name: "JIS School of Medical Science and Research",
        location: "Kolkata, West Bengal",
        state: "West Bengal",
        rating: 4.0,
        reviews: 87,
        fees: "₹99,55,000",
        courses: ["MBBS"],
        type: "Private",
        description: "Part of reputed JIS Group with modern medical education facilities.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=JIS+School+of+Medical+Science+and+Research",
        tags: ["Medical", "MBBS"],
        about: "Part of reputed JIS Group with modern medical education facilities.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹99,55,000" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-3",
        slug: "jmn-medical-college",
        name: "JMN Medical College",
        location: "Near Kalyani, West Bengal",
        state: "West Bengal",
        rating: 4.0,
        reviews: 138,
        fees: "₹88,00,000",
        courses: ["MBBS"],
        type: "Private",
        description: "Located near AIIMS Kalyani with growing medical education facilities.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=JMN+Medical+College",
        tags: ["Medical", "MBBS"],
        about: "Located near AIIMS Kalyani with growing medical education facilities.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹88,00,000" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-4",
        slug: "shri-ramkrishna-institute-of-medical-sciences-and-sanaka-hospitals",
        name: "Shri Ramkrishna Institute of Medical Sciences and Sanaka Hospitals",
        location: "Durgapur, West Bengal",
        state: "West Bengal",
        rating: 4.0,
        reviews: 90,
        fees: "₹99,31,000",
        courses: ["MBBS"],
        type: "Private",
        description: "Medical college in Durgapur with Sanaka Hospitals attachment.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Shri+Ramkrishna+Institute+of+Medical+Sciences+and+Sanaka+Hospitals",
        tags: ["Medical", "MBBS"],
        about: "Medical college in Durgapur with Sanaka Hospitals attachment.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹99,31,000" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-5",
        slug: "kpc-medical-college-and-hospital",
        name: "KPC Medical College and Hospital",
        location: "Jadavpur, Kolkata",
        state: "Kolkata",
        rating: 4.0,
        reviews: 104,
        fees: "₹72,00,000",
        courses: ["MBBS"],
        type: "Private",
        description: "Established medical college in Jadavpur, Kolkata with good clinical exposure.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=KPC+Medical+College+and+Hospital",
        tags: ["Medical", "MBBS"],
        about: "Established medical college in Jadavpur, Kolkata with good clinical exposure.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹72,00,000" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-6",
        slug: "krishnanagar-institute-of-medical-science-private-limited",
        name: "Krishnanagar Institute of Medical Science Private Limited",
        location: "Krishnanagar, West Bengal",
        state: "West Bengal",
        rating: 4.0,
        reviews: 114,
        fees: "₹91,00,000",
        courses: ["MBBS"],
        type: "Private",
        description: "Medical college located 4 hours from Kolkata in Krishnanagar.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Krishnanagar+Institute+of+Medical+Science+Private+Limited",
        tags: ["Medical", "MBBS"],
        about: "Medical college located 4 hours from Kolkata in Krishnanagar.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹91,00,000" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-7",
        slug: "icare-institute-of-medical-science-and-research-and-dr-b-c-roy-hospital",
        name: "ICARE Institute of Medical Science and Research and Dr. B.C. Roy Hospital",
        location: "Haldia, West Bengal",
        state: "West Bengal",
        rating: 4.0,
        reviews: 103,
        fees: "₹90,00,000 (Settlement)",
        courses: ["MBBS"],
        type: "Private",
        description: "Medical college in industrial hub of Haldia with Dr. B.C. Roy Hospital.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=ICARE+Institute+of+Medical+Science+and+Research+and+Dr.+B.C.+Roy+Hospital",
        tags: ["Medical", "MBBS"],
        about: "Medical college in industrial hub of Haldia with Dr. B.C. Roy Hospital.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹90,00,000 (Settlement)" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-8",
        slug: "iq-city-medical-college",
        name: "IQ City Medical College",
        location: "Durgapur, West Bengal",
        state: "West Bengal",
        rating: 4.0,
        reviews: 79,
        fees: "₹1,00,00,000 (Settlement)",
        courses: ["MBBS"],
        type: "Private",
        description: "Part of IQ City Complex in Durgapur with excellent infrastructure.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=IQ+City+Medical+College",
        tags: ["Medical", "MBBS"],
        about: "Part of IQ City Complex in Durgapur with excellent infrastructure.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,00,00,000 (Settlement)" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-9",
        slug: "ajay-sangaal-institute-of-medical-science-research",
        name: "Ajay Sangaal Institute of Medical Science & Research",
        location: "Shamli, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 136,
        fees: "₹1,25,82,880",
        courses: ["MBBS"],
        type: "Private",
        description: "New private medical college in Shamli with NEET based admissions.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Ajay+Sangaal+Institute+of+Medical+Science+&+Research",
        tags: ["Medical", "MBBS"],
        about: "New private medical college in Shamli with NEET based admissions.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,25,82,880" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-10",
        slug: "career-institute-of-medical-sciences-hospital",
        name: "Career Institute of Medical Sciences & Hospital",
        location: "Lucknow, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 94,
        fees: "₹1,20,00,000",
        courses: ["MBBS"],
        type: "Private",
        description: "Established medical college in Lucknow with good clinical exposure.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Career+Institute+of+Medical+Sciences+&+Hospital",
        tags: ["Medical", "MBBS"],
        about: "Established medical college in Lucknow with good clinical exposure.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,20,00,000" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-11",
        slug: "era-s-lucknow-medical-college-hospital",
        name: "Era's Lucknow Medical College & Hospital",
        location: "Lucknow, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 60,
        fees: "₹1,66,00,000",
        courses: ["MBBS"],
        type: "Private",
        description: "One of the oldest private medical colleges in Lucknow with excellent reputation.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Era's+Lucknow+Medical+College+&+Hospital",
        tags: ["Medical", "MBBS"],
        about: "One of the oldest private medical colleges in Lucknow with excellent reputation.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,66,00,000" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-12",
        slug: "f-h-medical-college",
        name: "F.H. Medical College",
        location: "Agra, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 103,
        fees: "₹1,65,00,000",
        courses: ["MBBS"],
        type: "Private",
        description: "Private medical college in Agra with good infrastructure.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=F.H.+Medical+College",
        tags: ["Medical", "MBBS"],
        about: "Private medical college in Agra with good infrastructure.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,65,00,000" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-13",
        slug: "g-s-medical-college-hospital",
        name: "G.S Medical College & Hospital",
        location: "Hapur, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 59,
        fees: "₹1,17,88,920",
        courses: ["MBBS"],
        type: "Private",
        description: "Private medical college in Hapur near Delhi NCR.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=G.S+Medical+College+&+Hospital",
        tags: ["Medical", "MBBS"],
        about: "Private medical college in Hapur near Delhi NCR.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,17,88,920" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-14",
        slug: "heritage-institute-of-medical-sciences",
        name: "Heritage Institute of Medical Sciences",
        location: "Varanasi, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 59,
        fees: "₹1,32,14,920",
        courses: ["MBBS"],
        type: "Private",
        description: "Private medical college in the holy city of Varanasi.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Heritage+Institute+of+Medical+Sciences",
        tags: ["Medical", "MBBS"],
        about: "Private medical college in the holy city of Varanasi.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,32,14,920" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-15",
        slug: "hind-institute-of-medical-sciences",
        name: "Hind Institute of Medical Sciences",
        location: "Barabanki, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 114,
        fees: "₹1,40,47,340",
        courses: ["MBBS"],
        type: "Private",
        description: "Well-established medical college near Lucknow.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Hind+Institute+of+Medical+Sciences",
        tags: ["Medical", "MBBS"],
        about: "Well-established medical college near Lucknow.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,40,47,340" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-16",
        slug: "hind-institute-of-medical-sciences-sitapur",
        name: "Hind Institute of Medical Sciences Sitapur",
        location: "Sitapur, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 139,
        fees: "₹1,07,72,290",
        courses: ["MBBS"],
        type: "Private",
        description: "Private medical college in Sitapur with affordable fees.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Hind+Institute+of+Medical+Sciences+Sitapur",
        tags: ["Medical", "MBBS"],
        about: "Private medical college in Sitapur with affordable fees.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,07,72,290" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-17",
        slug: "integral-institute-of-medical-sciences-research",
        name: "Integral Institute of Medical Sciences & Research",
        location: "Lucknow, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 70,
        fees: "₹1,80,00,000",
        courses: ["MBBS"],
        type: "Private",
        description: "Part of Integral University in Lucknow with good facilities.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Integral+Institute+of+Medical+Sciences+&+Research",
        tags: ["Medical", "MBBS"],
        about: "Part of Integral University in Lucknow with good facilities.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,80,00,000" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-18",
        slug: "kanti-devi-medical-college-hospital-research-centre",
        name: "Kanti Devi Medical College, Hospital & Research Centre",
        location: "Mathura, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 92,
        fees: "₹1,22,82,400",
        courses: ["MBBS"],
        type: "Private",
        description: "Private medical college in the holy city of Mathura.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Kanti+Devi+Medical+College,+Hospital+&+Research+Centre",
        tags: ["Medical", "MBBS"],
        about: "Private medical college in the holy city of Mathura.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,22,82,400" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-19",
        slug: "kmc-medical-college-hospital",
        name: "KMC Medical College & Hospital",
        location: "Mathura, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 122,
        fees: "₹1,25,82,880",
        courses: ["MBBS"],
        type: "Private",
        description: "New medical college in Mathura with modern facilities.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=KMC+Medical+College+&+Hospital",
        tags: ["Medical", "MBBS"],
        about: "New medical college in Mathura with modern facilities.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,25,82,880" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-20",
        slug: "krishna-mohan-medical-college-hospital",
        name: "Krishna Mohan Medical College & Hospital",
        location: "Mathura, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 99,
        fees: "₹1,17,38,560",
        courses: ["MBBS"],
        type: "Private",
        description: "Established medical college in Mathura with good reputation.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Krishna+Mohan+Medical+College+&+Hospital",
        tags: ["Medical", "MBBS"],
        about: "Established medical college in Mathura with good reputation.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,17,38,560" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-21",
        slug: "mayo-institute-of-medical-sciences",
        name: "Mayo Institute of Medical Sciences",
        location: "Barabanki, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 75,
        fees: "₹1,12,11,620",
        courses: ["MBBS"],
        type: "Private",
        description: "Reputed medical college near Lucknow with good clinical exposure.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Mayo+Institute+of+Medical+Sciences",
        tags: ["Medical", "MBBS"],
        about: "Reputed medical college near Lucknow with good clinical exposure.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,12,11,620" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-22",
        slug: "muzaffarnagar-medical-college",
        name: "Muzaffarnagar Medical College",
        location: "Muzaffarnagar, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 119,
        fees: "₹1,39,38,830",
        courses: ["MBBS"],
        type: "Private",
        description: "One of the older private medical colleges in Western UP.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Muzaffarnagar+Medical+College",
        tags: ["Medical", "MBBS"],
        about: "One of the older private medical colleges in Western UP.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,39,38,830" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-23",
        slug: "naraina-medical-college-research-centre",
        name: "Naraina Medical College & Research Centre",
        location: "Kanpur, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 79,
        fees: "₹1,21,46,830",
        courses: ["MBBS"],
        type: "Private",
        description: "Private medical college in the industrial city of Kanpur.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Naraina+Medical+College+&+Research+Centre",
        tags: ["Medical", "MBBS"],
        about: "Private medical college in the industrial city of Kanpur.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,21,46,830" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-24",
        slug: "national-capital-region-institute-of-medical-sciences",
        name: "National Capital Region Institute of Medical Sciences",
        location: "Meerut, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 80,
        fees: "₹1,21,99,170",
        courses: ["MBBS"],
        type: "Private",
        description: "Private medical college in Meerut, part of NCR region.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=National+Capital+Region+Institute+of+Medical+Sciences",
        tags: ["Medical", "MBBS"],
        about: "Private medical college in Meerut, part of NCR region.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,21,99,170" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-25",
        slug: "noida-international-institute-of-medical-sciences",
        name: "Noida International Institute of Medical Sciences",
        location: "Greater Noida, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 79,
        fees: "₹1,19,22,110",
        courses: ["MBBS"],
        type: "Private",
        description: "New medical college in Greater Noida with modern infrastructure.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Noida+International+Institute+of+Medical+Sciences",
        tags: ["Medical", "MBBS"],
        about: "New medical college in Greater Noida with modern infrastructure.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,19,22,110" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-26",
        slug: "prasad-institute-of-medical-sciences",
        name: "Prasad Institute of Medical Sciences",
        location: "Lucknow, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 126,
        fees: "₹1,10,39,320",
        courses: ["MBBS"],
        type: "Private",
        description: "Private medical college in Lucknow with affordable fees.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Prasad+Institute+of+Medical+Sciences",
        tags: ["Medical", "MBBS"],
        about: "Private medical college in Lucknow with affordable fees.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,10,39,320" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-27",
        slug: "rajshree-medical-research-institute",
        name: "Rajshree Medical Research Institute",
        location: "Bareilly, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 143,
        fees: "₹1,47,40,870",
        courses: ["MBBS"],
        type: "Private",
        description: "Established medical college in Bareilly with good reputation.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Rajshree+Medical+Research+Institute",
        tags: ["Medical", "MBBS"],
        about: "Established medical college in Bareilly with good reputation.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,47,40,870" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-28",
        slug: "rama-medical-college-research-centre-hapur",
        name: "Rama Medical College & Research Centre Hapur",
        location: "Hapur, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 51,
        fees: "₹1,30,99,680",
        courses: ["MBBS"],
        type: "Private",
        description: "Established Rama group medical college near Delhi NCR.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Rama+Medical+College+&+Research+Centre+Hapur",
        tags: ["Medical", "MBBS"],
        about: "Established Rama group medical college near Delhi NCR.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,30,99,680" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-29",
        slug: "rama-medical-college-research-centre-kanpur",
        name: "Rama Medical College & Research Centre Kanpur",
        location: "Kanpur, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 126,
        fees: "₹1,27,18,560",
        courses: ["MBBS"],
        type: "Private",
        description: "Established Rama group medical college in Kanpur with good reputation.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Rama+Medical+College+&+Research+Centre+Kanpur",
        tags: ["Medical", "MBBS"],
        about: "Established Rama group medical college in Kanpur with good reputation.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,27,18,560" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-30",
        slug: "rohilkhand-medical-college-hospital",
        name: "Rohilkhand Medical College & Hospital",
        location: "Bareilly, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 148,
        fees: "₹1,56,03,010",
        courses: ["MBBS"],
        type: "Private",
        description: "One of the oldest private medical colleges in Rohilkhand region.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Rohilkhand+Medical+College+&+Hospital",
        tags: ["Medical", "MBBS"],
        about: "One of the oldest private medical colleges in Rohilkhand region.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,56,03,010" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-31",
        slug: "saraswati-institute-of-medical-sciences",
        name: "Saraswati Institute of Medical Sciences",
        location: "Hapur, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 133,
        fees: "₹1,18,16,710",
        courses: ["MBBS"],
        type: "Private",
        description: "Established medical college in Hapur with good clinical exposure.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Saraswati+Institute+of+Medical+Sciences",
        tags: ["Medical", "MBBS"],
        about: "Established medical college in Hapur with good clinical exposure.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,18,16,710" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-32",
        slug: "saraswati-medical-college",
        name: "Saraswati Medical College",
        location: "Unnao, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 141,
        fees: "₹1,15,96,100",
        courses: ["MBBS"],
        type: "Private",
        description: "Private medical college in Unnao near Lucknow.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Saraswati+Medical+College",
        tags: ["Medical", "MBBS"],
        about: "Private medical college in Unnao near Lucknow.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,15,96,100" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-33",
        slug: "school-of-medical-sciences-research-sharda-hospital",
        name: "School of Medical Sciences & Research, Sharda Hospital",
        location: "Greater Noida, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 71,
        fees: "₹1,50,00,000 (Approx)",
        courses: ["MBBS"],
        type: "Private",
        description: "Part of Sharda University with excellent infrastructure.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=School+of+Medical+Sciences+&+Research,+Sharda+Hospital",
        tags: ["Medical", "MBBS"],
        about: "Part of Sharda University with excellent infrastructure.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,50,00,000 (Approx)" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-34",
        slug: "shri-gorakhnath-medical-college-hospital-research-centre",
        name: "Shri Gorakhnath Medical College Hospital & Research Centre",
        location: "Gorakhpur, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 123,
        fees: "₹1,25,82,880",
        courses: ["MBBS"],
        type: "Private",
        description: "New medical college in Gorakhpur with modern facilities.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Shri+Gorakhnath+Medical+College+Hospital+&+Research+Centre",
        tags: ["Medical", "MBBS"],
        about: "New medical college in Gorakhpur with modern facilities.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,25,82,880" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-35",
        slug: "shri-siddhi-vinayak-medical-college-hospital",
        name: "Shri Siddhi Vinayak Medical College & Hospital",
        location: "Sambhal, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 99,
        fees: "₹1,25,82,880",
        courses: ["MBBS"],
        type: "Private",
        description: "New medical college in Sambhal with growing infrastructure.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Shri+Siddhi+Vinayak+Medical+College+&+Hospital",
        tags: ["Medical", "MBBS"],
        about: "New medical college in Sambhal with growing infrastructure.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,25,82,880" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-36",
        slug: "sks-hospital-medical-college-research-centre",
        name: "SKS Hospital Medical College & Research Centre",
        location: "Mathura, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 133,
        fees: "₹1,21,46,830",
        courses: ["MBBS"],
        type: "Private",
        description: "New medical college in Mathura with modern infrastructure.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=SKS+Hospital+Medical+College+&+Research+Centre",
        tags: ["Medical", "MBBS"],
        about: "New medical college in Mathura with modern infrastructure.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,21,46,830" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-37",
        slug: "sri-rammurti-smarak-institute-of-medical-sciences",
        name: "Sri Rammurti Smarak Institute of Medical Sciences",
        location: "Bareilly, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 134,
        fees: "₹1,64,85,120",
        courses: ["MBBS"],
        type: "Private",
        description: "One of the oldest private medical colleges in Bareilly.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Sri+Rammurti+Smarak+Institute+of+Medical+Sciences",
        tags: ["Medical", "MBBS"],
        about: "One of the oldest private medical colleges in Bareilly.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,64,85,120" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-38",
        slug: "subharti-medical-college",
        name: "Subharti Medical College",
        location: "Meerut, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 135,
        fees: "₹1,15,81,330",
        courses: ["MBBS"],
        type: "Private",
        description: "One of the oldest and most reputed private medical colleges in UP.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Subharti+Medical+College",
        tags: ["Medical", "MBBS"],
        about: "One of the oldest and most reputed private medical colleges in UP.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,15,81,330" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-39",
        slug: "t-s-misra-medical-college-hospital",
        name: "T.S. Misra Medical College & Hospital",
        location: "Lucknow, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 52,
        fees: "₹1,29,91,990",
        courses: ["MBBS"],
        type: "Private",
        description: "Private medical college in Lucknow with good facilities.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=T.S.+Misra+Medical+College+&+Hospital",
        tags: ["Medical", "MBBS"],
        about: "Private medical college in Lucknow with good facilities.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,29,91,990" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-40",
        slug: "teerthankar-mahaveer-medical-college-research-centre",
        name: "Teerthankar Mahaveer Medical College & Research Centre",
        location: "Moradabad, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 109,
        fees: "₹1,62,00,000",
        courses: ["MBBS"],
        type: "Private",
        description: "Part of TMU with excellent infrastructure and hospital.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Teerthankar+Mahaveer+Medical+College+&+Research+Centre",
        tags: ["Medical", "MBBS"],
        about: "Part of TMU with excellent infrastructure and hospital.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,62,00,000" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-41",
        slug: "united-institute-of-medical-sciences",
        name: "United Institute of Medical Sciences",
        location: "Prayagraj, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 121,
        fees: "₹1,19,04,010",
        courses: ["MBBS"],
        type: "Private",
        description: "New medical college in Prayagraj with modern facilities.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=United+Institute+of+Medical+Sciences",
        tags: ["Medical", "MBBS"],
        about: "New medical college in Prayagraj with modern facilities.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,19,04,010" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-42",
        slug: "varunarjun-medical-college-rohilkhand-hospital",
        name: "Varunarjun Medical College & Rohilkhand Hospital",
        location: "Shahjahanpur, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 78,
        fees: "₹1,21,00,000",
        courses: ["MBBS"],
        type: "Private",
        description: "Private medical college in Shahjahanpur with good hospital.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Varunarjun+Medical+College+&+Rohilkhand+Hospital",
        tags: ["Medical", "MBBS"],
        about: "Private medical college in Shahjahanpur with good hospital.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,21,00,000" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-43",
        slug: "venkateswara-institute-of-medical-sciences",
        name: "Venkateswara Institute of Medical Sciences",
        location: "Amroaha, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 97,
        fees: "₹1,11,05,080",
        courses: ["MBBS"],
        type: "Private",
        description: "Private medical college in Amroaha with good infrastructure.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Venkateswara+Institute+of+Medical+Sciences",
        tags: ["Medical", "MBBS"],
        about: "Private medical college in Amroaha with good infrastructure.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,11,05,080" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-44",
        slug: "santosh-medical-college",
        name: "Santosh Medical College",
        location: "Ghaziabad, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 113,
        fees: "₹1,80,00,000 (Approx)",
        courses: ["MBBS"],
        type: "Private",
        description: "One of the oldest and most reputed private medical colleges in NCR.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Santosh+Medical+College",
        tags: ["Medical", "MBBS"],
        about: "One of the oldest and most reputed private medical colleges in NCR.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,80,00,000 (Approx)" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    },
    {
        id: "new-med-45",
        slug: "dr-b-s-kushwah-institute-of-medical-college",
        name: "Dr. B.S. Kushwah Institute of Medical College",
        location: "Kanpur, Uttar Pradesh",
        state: "Uttar Pradesh",
        rating: 4.0,
        reviews: 137,
        fees: "₹1,25,80,000",
        courses: ["MBBS"],
        type: "Private",
        description: "New medical college in Kanpur with modern facilities.",
        imageUrl: "https://placehold.co/800x600/1e293b/fff?text=Dr.+B.S.+Kushwah+Institute+of+Medical+College",
        tags: ["Medical", "MBBS"],
        about: "New medical college in Kanpur with modern facilities.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty"],
        coursesDetails: [
            { name: "MBBS", duration: "5.5 Years", type: "Full Time" }
        ],
        feesDetails: [
            {
                title: "Management Quota (MQ) Fees",
                items: [{ label: "Total Fees", value: "₹1,25,80,000" }]
            }
        ],
        admissions: {
            process: ["Apply through NEET counseling", "Document verification", "Fee payment"],
            eligibility: ["10+2 with PCB minimum 50%", "Valid NEET UG Rank"],
            documents: ["10th/12th Marksheets", "NEET Scorecard", "ID Proof", "Photographs"]
        }
    }
];

// Group colleges by state
export const collegesByState = colleges.reduce((acc, college) => {
    if (!acc[college.state]) {
        acc[college.state] = [];
    }
    acc[college.state].push(college);
    return acc;
}, {} as Record<string, College[]>);

// Company contact information
export const companyInfo = {
    name: "Akash Talks",
    tagline: "Direct Admission in B.Tech",
    phones: ["+91 9874878782", "+91 8825352628"],
    email: "akashtalkscounselling@gmail.com",
    youtube: "https://www.youtube.com/@akash_talks",
    address: {
        line1: "GN-34/1, Aurora Water Front, Unit 21",
        line2: "11th Floor, Sector V",
        city: "Salt Lake, Kolkata",
        state: "West Bengal",
        pincode: "700091",
        full: "GN-34/1, Aurora Water Front, Unit 21, 11th Floor, Sector V, Salt Lake, Kolkata - 700091"
    },
    officeTiming: "10:00 am to 6:00 pm",
    services: [
        "Direct B.Tech Admissions",
        "Direct MBBS Admissions",
        "College Selection Guidance",
        "Career Counseling",
        "Application Support",
        "Scholarship Assistance"
    ],
    states: ["West Bengal", "Karnataka", "Maharashtra", "Tamil Nadu", "Uttarakhand", "Odisha", "Uttar Pradesh"]
};

// --- Medical Colleges Data ---
export const medicalColleges: MedicalCollege[] = [
    // --- West Bengal Medical Colleges ---
    {
        id: "wb-med-1",
        slug: "jagannath-gupta-institute-of-medical-sciences",
        name: "Jagannath Gupta Institute of Medical Sciences and Hospital",
        location: "Kolkata, West Bengal",
        state: "West Bengal",
        type: "Private",
        established: "2012",
        imageUrl: "/images/colleges/jagannath-gupta-kolkata.png",
        rating: 4.0,
        reviews: 450,
        courses: ["MBBS"],
        description: "Private medical college in Kolkata with attached hospital and modern facilities.",
        about: "Jagannath Gupta Institute of Medical Sciences and Hospital is a private medical college established in 2012 in Kolkata. It offers MBBS program with state-of-the-art facilities and experienced faculty. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Attached Teaching Hospital", "Modern Infrastructure", "Experienced Faculty", "Good Clinical Exposure", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", stateQuota: { rank: "25000", score: "450" }, managementQuota: { rank: "280000", score: "350" } }],
        mqFees: { total: "₹99,36,000", perSemester: "₹10,94,000", admissionFee: "₹50,000", breakdown: "1st Year = ₹33.72L (₹32.82L + ₹50K + ₹15K + ₹25K), Remaining = ₹10.94L x 6 semesters" },
        hostelFees: [
            { roomType: "Triple Non-AC Room", annual: "₹1,44,000", deposit: "₹15,000" },
            { roomType: "Triple AC Room", annual: "₹1,68,000", deposit: "₹15,000" },
            { roomType: "Single AC Room", annual: "₹2,16,000", deposit: "₹25,000" }
        ],
        miscFees: [{ label: "Caution Money (Refundable)", value: "₹15,000" }, { label: "Sports & Cultural Fee", value: "₹25,000" }],
        securityDeposit: "₹3,00,000 (Bank Guarantee Removal)",
        coursesSeats: [{ course: "MBBS", totalSeats: 150, stateQuota: 50, managementQuota: 100 }],
        hospital: { name: "Jagannath Gupta Hospital", beds: 500, patientLoad: "High" },
        internship: { duration: "12 months", stipend: "₹20,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment via DD/NEFT"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Microbiology", "Medicine", "Surgery", "Pediatrics", "Obstetrics & Gynecology"],
        scholarships: [{ title: "Merit Scholarship", items: [{ label: "Top NEET Rankers", value: "Fee concession available" }] }],
        faqs: [{ question: "What is the total MBBS fee at Jagannath Gupta?", answer: "The total MQ fee is approximately ₹99.36 Lakhs for the entire course." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Expert MBBS admission guidance", "Fee negotiation support", "Complete counseling assistance", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "wb-med-2",
        slug: "jis-school-of-medical-science",
        name: "JIS School of Medical Science and Research",
        location: "Kolkata, West Bengal",
        state: "West Bengal",
        type: "Private",
        established: "2020",
        imageUrl: "/images/colleges/jis-medical-kolkata.jpg",
        rating: 4.1,
        reviews: 280,
        courses: ["MBBS"],
        description: "Part of reputed JIS Group with modern medical education facilities.",
        about: "JIS School of Medical Science and Research is a private medical college under the JIS Group in Kolkata. It offers quality medical education with modern infrastructure and good clinical exposure. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Part of JIS Group", "Modern Infrastructure", "Good Hospital Attachment", "Growing Reputation", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "350000", score: "320" } }],
        mqFees: { total: "₹99,55,000", perSemester: "₹10,85,000", admissionFee: "₹50,000", breakdown: "1st Year = ₹22.6L (₹21.7L + ₹50K + ₹15K + ₹15K + ₹10K), Then ₹10.85L x 6 = ₹65.1L, Last Year = ₹5.2L" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,50,000", deposit: "₹15,000" }],
        miscFees: [{ label: "Caution Deposit", value: "₹15,000" }, { label: "Sports & Culture Fee", value: "₹15,000/year" }, { label: "Library Charge", value: "₹10,000/year" }],
        securityDeposit: "₹3,00,000 (Bank Guarantee)",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "JIS Hospital", beds: 450, patientLoad: "Good" },
        internship: { duration: "12 months", stipend: "₹18,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Bank transfer/NEFT/RTGS"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Microbiology", "Medicine", "Surgery"],
        faqs: [{ question: "What is the total MBBS fee at JIS Medical?", answer: "The total MQ fee is approximately ₹92 Lakhs + Miscellaneous charges." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["JIS Group admission guidance", "Fee structure clarity", "Complete admission support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "wb-med-3",
        slug: "jmn-medical-college",
        name: "JMN Medical College",
        location: "Near Kalyani, West Bengal",
        state: "West Bengal",
        type: "Private",
        established: "2019",
        imageUrl: "/images/colleges/jmn-medical-college.png",
        rating: 3.9,
        reviews: 180,
        courses: ["MBBS"],
        description: "Located near AIIMS Kalyani with growing medical education facilities.",
        about: "JMN Medical College is a private medical college located 2 hours from Kolkata, near AIIMS Kalyani. It offers MBBS program with modern facilities and is growing in reputation. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Near AIIMS Kalyani", "Modern Campus", "Growing Infrastructure", "Affordable Fees", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "400000", score: "300" } }],
        mqFees: { total: "₹88,00,000", perSemester: "₹9,50,000", admissionFee: "₹50,000", breakdown: "Total During Admission = ₹21,50,000" },
        hostelFees: [
            { roomType: "Double Occupancy Non-AC", annual: "₹1,44,000", deposit: "₹15,000" },
            { roomType: "Double Occupancy AC", annual: "₹1,96,000", deposit: "₹15,000" }
        ],
        miscFees: [{ label: "Hostel Admission Fee", value: "₹10,000 (One time)" }, { label: "Caution Deposit", value: "₹15,000" }, { label: "Sports & Cultural", value: "₹1,85,000" }],
        securityDeposit: "₹15,000 (Caution Deposit)",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "JMN Hospital", beds: 350, patientLoad: "Moderate" },
        internship: { duration: "12 months", stipend: "₹15,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Inform college before allotment", "Payment via Cheque/DD"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery"],
        faqs: [{ question: "Where is JMN Medical College?", answer: "It is located 2 hours from Kolkata, near AIIMS Kalyani." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Affordable MBBS guidance", "Location insights", "Complete admission support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "wb-med-4",
        slug: "shri-ramkrishna-institute-of-medical-sciences",
        name: "Shri Ramkrishna Institute of Medical Sciences and Sanaka Hospitals",
        location: "Durgapur, West Bengal",
        state: "West Bengal",
        type: "Private",
        established: "2020",
        imageUrl: "/images/colleges/sanaka-medical-durgapur.jpg",
        rating: 4.0,
        reviews: 200,
        courses: ["MBBS"],
        description: "Medical college in Durgapur with Sanaka Hospitals attachment.",
        about: "Shri Ramkrishna Institute of Medical Sciences is a private medical college in Durgapur, West Bengal with Sanaka Hospitals as the teaching hospital. It offers quality MBBS education. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Durgapur Location", "Sanaka Hospital Attachment", "Modern Facilities", "Industrial Area", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "380000", score: "310" } }],
        mqFees: { total: "₹99,31,000", perSemester: "₹10,94,000", admissionFee: "₹50,000", breakdown: "Tution ₹10,94,000 x 9 = ₹98,46,000 + Fees" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,50,000", deposit: "₹10,000" }],
        miscFees: [{ label: "Caution Money (Refundable)", value: "₹10,000" }, { label: "Sports & Cultural", value: "₹25,000" }],
        securityDeposit: "₹10,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "Sanaka Hospitals", beds: 400, patientLoad: "Good" },
        internship: { duration: "12 months", stipend: "₹18,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Inform before allotment", "Post-dated cheques required"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery", "Orthopedics"],
        faqs: [{ question: "What is the settlement fee at Shri Ramkrishna?", answer: "Final settlement is approximately ₹92 Lakhs." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Durgapur college guidance", "Fee structure clarity", "Complete admission support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "wb-med-5",
        slug: "kpc-medical-college-hospital",
        name: "KPC Medical College and Hospital",
        location: "Jadavpur, Kolkata",
        state: "West Bengal",
        type: "Private",
        established: "2008",
        imageUrl: "/images/colleges/kpc-medical-kolkata.png",
        rating: 4.2,
        reviews: 520,
        courses: ["MBBS"],
        description: "Established medical college in Jadavpur, Kolkata with good clinical exposure.",
        about: "KPC Medical College and Hospital is a well-established private medical college in Jadavpur, Kolkata. Known for good clinical exposure and experienced faculty. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Jadavpur Location", "Established Since 2008", "Good Clinical Exposure", "Experienced Faculty", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", stateQuota: { rank: "18000", score: "480" }, managementQuota: { rank: "320000", score: "340" } }],
        mqFees: { total: "₹72,00,000", perSemester: "₹8,00,000", admissionFee: "₹50,000", breakdown: "Tuition = ₹6,00,000/semester" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹54,500 (per month including food)", deposit: "₹10,000" }],
        miscFees: [{ label: "Caution Deposit", value: "₹25,000" }],
        securityDeposit: "₹72,00,000 (Discontinuation Bond)",
        coursesSeats: [{ course: "MBBS", totalSeats: 150, stateQuota: 50, managementQuota: 100 }],
        hospital: { name: "KPC Hospital", beds: 550, patientLoad: "High" },
        internship: { duration: "12 months", stipend: "₹22,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Payment via Demand Draft"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Microbiology", "Medicine", "Surgery", "Pediatrics", "OBG", "Orthopedics"],
        faqs: [{ question: "What is KPC Medical admission amount?", answer: "Total during admission = ₹37,75,000" }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Kolkata medical college guidance", "Fee negotiation", "Complete admission support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "wb-med-6",
        slug: "krishnanagar-institute-of-medical-science",
        name: "Krishnanagar Institute of Medical Science Private Limited",
        location: "Krishnanagar, West Bengal",
        state: "West Bengal",
        type: "Private",
        established: "2019",
        imageUrl: "/images/colleges/krishmanagar-medical.jpg",
        rating: 3.8,
        reviews: 150,
        courses: ["MBBS"],
        description: "Medical college located 4 hours from Kolkata in Krishnanagar.",
        about: "Krishnanagar Institute of Medical Science is a private medical college located in Krishnanagar, about 4 hours from Kolkata. It offers MBBS program with growing infrastructure. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Krishnanagar Location", "Growing Infrastructure", "Affordable", "Good for State Students", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "420000", score: "290" } }],
        mqFees: { total: "₹91,00,000", perSemester: "₹10,00,000", admissionFee: "₹50,000", breakdown: "Total = ₹91,00,000, Amount During Admission = ₹21,00,000" },
        hostelFees: [
            { roomType: "Triple Sharing Non-AC", annual: "₹72,000", deposit: "₹25,000" },
            { roomType: "Triple Sharing AC", annual: "₹1,08,000", deposit: "₹25,000" }
        ],
        miscFees: [{ label: "Caution Money (Refundable)", value: "₹25,000" }, { label: "Sports & Cultural", value: "₹25,000" }, { label: "Fooding", value: "₹90,000/year" }],
        securityDeposit: "₹25,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "KIMS Hospital", beds: 350, patientLoad: "Moderate" },
        internship: { duration: "12 months", stipend: "₹15,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Post-dated cheques required", "Demand Draft/NEFT/RTGS"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery"],
        faqs: [{ question: "What is the location of KIMS?", answer: "It is located in Krishnanagar, about 4 hours from Kolkata." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Affordable MBBS guidance", "Location insights", "Complete admission support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "wb-med-7",
        slug: "icare-institute-of-medical-science",
        name: "ICARE Institute of Medical Science and Research and Dr. B.C. Roy Hospital",
        location: "Haldia, West Bengal",
        state: "West Bengal",
        type: "Private",
        established: "2019",
        imageUrl: "/images/colleges/icare-haldia-medical.png",
        rating: 4.1,
        reviews: 220,
        courses: ["MBBS"],
        description: "Medical college in industrial hub of Haldia with Dr. B.C. Roy Hospital.",
        about: "ICARE Institute of Medical Science is located in the industrial hub of Haldia, West Bengal. Attached to Dr. B.C. Roy Hospital, it offers quality medical education with good clinical exposure. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Haldia Industrial Location", "Dr. B.C. Roy Hospital", "Good Clinical Exposure", "Modern Campus", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", stateQuota: { rank: "22000", score: "460" }, managementQuota: { rank: "350000", score: "320" } }],
        mqFees: { total: "₹90,00,000 (Settlement)", perSemester: "₹11,00,000", admissionFee: "₹50,000", breakdown: "1st Time = ₹33L + ₹50K + ₹15K + ₹25K + ₹10K = ₹34L + ₹3L (cash), Rest = ₹9L x 6 = ₹54L" },
        hostelFees: [{ roomType: "Triple Non-AC Room", annual: "₹1,70,000", deposit: "₹10,000" }],
        miscFees: [{ label: "Caution Money (Refundable)", value: "₹15,000" }, { label: "Sports & Cultural (One Time)", value: "₹25,000" }, { label: "Library Registration (One Time)", value: "₹10,000" }],
        securityDeposit: "₹2,00,000 (Transfer to college account)",
        coursesSeats: [{ course: "MBBS", totalSeats: 150, stateQuota: 50, managementQuota: 100 }],
        hospital: { name: "Dr. B.C. Roy Hospital", beds: 500, patientLoad: "High" },
        internship: { duration: "12 months", stipend: "₹20,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Microbiology", "Medicine", "Surgery", "Pediatrics", "OBG"],
        faqs: [{ question: "What is the total fee at ICARE?", answer: "The settlement fee is approximately ₹90 Lakhs." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Haldia medical college guidance", "Fee negotiation", "Complete admission support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "wb-med-8",
        slug: "iq-city-medical-college",
        name: "IQ City Medical College",
        location: "Durgapur, West Bengal",
        state: "West Bengal",
        type: "Private",
        established: "2017",
        imageUrl: "/images/colleges/iq-city-medical-durgapur.png",
        rating: 4.2,
        reviews: 380,
        courses: ["MBBS"],
        description: "Part of IQ City Complex in Durgapur with excellent infrastructure.",
        about: "IQ City Medical College is part of the IQ City Complex in Durgapur, West Bengal. Known for excellent infrastructure, modern facilities, and quality medical education. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["IQ City Complex", "Excellent Infrastructure", "Modern Facilities", "Good Hospital", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", stateQuota: { rank: "20000", score: "470" }, managementQuota: { rank: "340000", score: "330" } }],
        mqFees: { total: "₹1,00,00,000 (Settlement)", perSemester: "₹10,94,000", admissionFee: "₹50,000", breakdown: "1st = ₹32.82L + Misc + ₹3L (Cash - Bank Guarantee), Then ₹10.946 x 6 = ₹65.64L" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,60,000", deposit: "₹15,000" }],
        miscFees: [{ label: "Caution Money", value: "₹15,000" }, { label: "Sports & Cultural", value: "₹25,000" }],
        securityDeposit: "₹2-5,00,000 (Transfer before choice filling)",
        coursesSeats: [{ course: "MBBS", totalSeats: 150, stateQuota: 50, managementQuota: 100 }],
        hospital: { name: "IQ City Hospital", beds: 600, patientLoad: "High" },
        internship: { duration: "12 months", stipend: "₹22,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Confirm before choice filling", "Transfer ₹2-5L to college account beforehand"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Microbiology", "Medicine", "Surgery", "Pediatrics", "OBG", "Orthopedics", "ENT", "Ophthalmology"],
        faqs: [{ question: "What is the total fee at IQ City Medical?", answer: "The settlement fee is approximately ₹1 Crore." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Durgapur medical guidance", "IQ City expertise", "Fee negotiation", "Complete admission support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    // --- Uttar Pradesh Medical Colleges ---
    {
        id: "up-med-1",
        slug: "ajay-sangaal-institute-of-medical-science",
        name: "Ajay Sangaal Institute of Medical Science & Research",
        location: "Shamli, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2024",
        imageUrl: "/images/colleges/ajay-sangaal-shamli.png",
        rating: 3.8,
        reviews: 80,
        courses: ["MBBS"],
        description: "New private medical college in Shamli with NEET based admissions.",
        about: "Ajay Sangaal Institute of Medical Science & Research is a new private medical college established in 2024 in Shamli, Uttar Pradesh. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["New College", "Modern Infrastructure", "NEET Based Admission", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "361", score: "456573" } }],
        mqFees: { total: "₹1,25,82,880", perSemester: "₹12,58,288" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "Attached Hospital", beds: 300 },
        internship: { duration: "12 months", stipend: "₹15,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery"],
        faqs: [{ question: "What is MQ fee at Ajay Sangaal?", answer: "Approximately ₹12.58 Lakhs per year." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["UP medical admission guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-2",
        slug: "career-institute-of-medical-sciences",
        name: "Career Institute of Medical Sciences & Hospital",
        location: "Lucknow, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2011",
        imageUrl: "/images/colleges/career-institute-lucknow.png",
        rating: 4.0,
        reviews: 350,
        courses: ["MBBS"],
        description: "Established medical college in Lucknow with good clinical exposure.",
        about: "Career Institute of Medical Sciences & Hospital is a well-established private medical college in Lucknow offering quality medical education since 2011. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Lucknow Location", "Established Since 2011", "Good Clinical Exposure", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "332", score: "526069" } }],
        mqFees: { total: "₹1,20,00,000", perSemester: "₹12,00,000" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,50,000" }],
        miscFees: [{ label: "Service Bond", value: "2 Years / ₹10L Penalty" }],
        securityDeposit: "As per college policy",
        coursesSeats: [{ course: "MBBS", totalSeats: 150, managementQuota: 100 }],
        hospital: { name: "Career Hospital", beds: 500 },
        internship: { duration: "12 months", stipend: "₹18,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery", "Pediatrics", "OBG"],
        faqs: [{ question: "Is there a service bond at Career Institute?", answer: "Yes, 2 years service bond with ₹10L penalty." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Lucknow medical guidance", "Bond clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-3",
        slug: "eras-lucknow-medical-college",
        name: "Era's Lucknow Medical College & Hospital",
        location: "Lucknow, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2001",
        imageUrl: "/images/colleges/eras-medical-lucknow.png",
        rating: 4.2,
        reviews: 620,
        courses: ["MBBS"],
        description: "One of the oldest private medical colleges in Lucknow with excellent reputation.",
        about: "Era's Lucknow Medical College & Hospital is one of the oldest and most reputed private medical colleges in Lucknow, established in 2001. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Established 2001", "Excellent Reputation", "Large Hospital", "Experienced Faculty", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "360", score: "366290" } }],
        mqFees: { total: "₹1,66,00,000", perSemester: "₹16,60,000" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,50,000" }],
        miscFees: [{ label: "As per college", value: "Variable" }],
        securityDeposit: "As per college policy",
        coursesSeats: [{ course: "MBBS", totalSeats: 150, managementQuota: 100 }],
        hospital: { name: "Era Hospital", beds: 700 },
        internship: { duration: "12 months", stipend: "₹20,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery", "Pediatrics", "OBG", "Orthopedics"],
        faqs: [{ question: "Is Era's Medical a good college?", answer: "Yes, it's one of the oldest and most reputed private medical colleges in UP." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Era's admission guidance", "Fee negotiation", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-4",
        slug: "fh-medical-college-agra",
        name: "F.H. Medical College",
        location: "Agra, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2014",
        imageUrl: "/images/colleges/fh-medical-college-agra.jpg",
        rating: 3.9,
        reviews: 280,
        courses: ["MBBS"],
        description: "Private medical college in Agra with good infrastructure.",
        about: "F.H. Medical College is a private medical college in Agra established in 2014, offering quality medical education. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Agra Location", "Modern Infrastructure", "Good Hospital", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "324", score: "548412" } }],
        mqFees: { total: "₹1,65,00,000", perSemester: "₹16,50,000" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹3,00,000" }],
        miscFees: [{ label: "As per college", value: "Variable" }],
        securityDeposit: "As per college policy",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "F.H. Hospital", beds: 400 },
        internship: { duration: "12 months", stipend: "₹15,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery"],
        faqs: [{ question: "Where is F.H. Medical College?", answer: "Located in Agra, Uttar Pradesh." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Agra medical guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-5",
        slug: "gs-medical-college-hapur",
        name: "G.S Medical College & Hospital",
        location: "Hapur, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2017",
        imageUrl: "/images/colleges/gs-medical-hapur.png",
        rating: 3.9,
        reviews: 190,
        courses: ["MBBS"],
        description: "Private medical college in Hapur near Delhi NCR.",
        about: "G.S Medical College & Hospital is a private medical college in Hapur, near Delhi NCR, established in 2017. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Near Delhi NCR", "Modern Campus", "Good Connectivity", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "470", score: "250646" } }],
        mqFees: { total: "₹1,17,88,920", perSemester: "₹11,78,892" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "G.S Hospital", beds: 350 },
        internship: { duration: "12 months", stipend: "₹15,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery"],
        faqs: [{ question: "Is G.S Medical near Delhi?", answer: "Yes, located in Hapur which is near Delhi NCR." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["NCR medical guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-6",
        slug: "heritage-institute-of-medical-sciences-varanasi",
        name: "Heritage Institute of Medical Sciences",
        location: "Varanasi, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2015",
        imageUrl: "/images/colleges/heritage-medical-varanasi.png",
        rating: 4.0,
        reviews: 280,
        courses: ["MBBS"],
        description: "Private medical college in the holy city of Varanasi.",
        about: "Heritage Institute of Medical Sciences is a private medical college in Varanasi established in 2015. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Varanasi Location", "Growing Reputation", "Good Infrastructure", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "466", score: "256128" } }],
        mqFees: { total: "₹1,32,14,920", perSemester: "₹13,21,492" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "Heritage Hospital", beds: 400 },
        internship: { duration: "12 months", stipend: "₹15,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery"],
        faqs: [{ question: "Where is Heritage Medical Sciences?", answer: "Located in Varanasi, Uttar Pradesh." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Varanasi medical guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-7",
        slug: "hind-institute-of-medical-sciences-barabanki",
        name: "Hind Institute of Medical Sciences",
        location: "Barabanki, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2005",
        imageUrl: "/images/colleges/hind-medical-barabanki.png",
        rating: 4.0,
        reviews: 420,
        courses: ["MBBS"],
        description: "Well-established medical college near Lucknow.",
        about: "Hind Institute of Medical Sciences in Barabanki is a well-established private medical college near Lucknow, established in 2005. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Near Lucknow", "Established 2005", "Good Clinical Exposure", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "576", score: "105386" } }],
        mqFees: { total: "₹1,40,47,340", perSemester: "₹14,04,734" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 150, managementQuota: 100 }],
        hospital: { name: "Hind Hospital", beds: 500 },
        internship: { duration: "12 months", stipend: "₹18,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery", "Pediatrics"],
        faqs: [{ question: "Is Hind Institute near Lucknow?", answer: "Yes, located in Barabanki, very close to Lucknow." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Lucknow region guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-8",
        slug: "hind-institute-of-medical-sciences-sitapur",
        name: "Hind Institute of Medical Sciences Sitapur",
        location: "Sitapur, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2015",
        imageUrl: "/images/colleges/hind-medical-sitapur.jpg",
        rating: 3.9,
        reviews: 180,
        courses: ["MBBS"],
        description: "Private medical college in Sitapur with affordable fees.",
        about: "Hind Institute of Medical Sciences Sitapur is a private medical college established in 2015 in Sitapur, offering affordable medical education. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Affordable Fees", "Growing Infrastructure", "Good Faculty", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "557", score: "128892" } }],
        mqFees: { total: "₹1,07,72,290", perSemester: "₹10,77,229" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "Hind Hospital Sitapur", beds: 350 },
        internship: { duration: "12 months", stipend: "₹15,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery"],
        faqs: [{ question: "What are the fees at Hind Sitapur?", answer: "Approximately ₹10.77 Lakhs per year." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Affordable MBBS guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-9",
        slug: "integral-institute-of-medical-sciences",
        name: "Integral Institute of Medical Sciences & Research",
        location: "Lucknow, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2013",
        imageUrl: "/images/colleges/integral-medical-lucknow.png",
        rating: 4.0,
        reviews: 300,
        courses: ["MBBS"],
        description: "Part of Integral University in Lucknow with good facilities.",
        about: "Integral Institute of Medical Sciences & Research is part of Integral University in Lucknow, established in 2013. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Part of Integral University", "Lucknow Location", "Good Infrastructure", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "337", score: "514405" } }],
        mqFees: { total: "₹1,80,00,000", perSemester: "₹18,00,000" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹2,60,000" }],
        miscFees: [{ label: "As per college", value: "Variable" }],
        securityDeposit: "As per college policy",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "Integral Hospital", beds: 450 },
        internship: { duration: "12 months", stipend: "₹18,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery", "Pediatrics"],
        faqs: [{ question: "Is Integral Medical part of a university?", answer: "Yes, part of Integral University in Lucknow." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Lucknow medical guidance", "University insights", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-10",
        slug: "kanti-devi-medical-college",
        name: "Kanti Devi Medical College, Hospital & Research Centre",
        location: "Mathura, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2015",
        imageUrl: "/images/colleges/kanti-devi-mathura.png",
        rating: 3.9,
        reviews: 220,
        courses: ["MBBS"],
        description: "Private medical college in the holy city of Mathura.",
        about: "Kanti Devi Medical College is a private medical college in Mathura, established in 2015. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Mathura Location", "Good Infrastructure", "Growing Reputation", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "415", score: "345298" } }],
        mqFees: { total: "₹1,22,82,400", perSemester: "₹12,28,240" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "Kanti Devi Hospital", beds: 400 },
        internship: { duration: "12 months", stipend: "₹15,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery"],
        faqs: [{ question: "Where is Kanti Devi Medical?", answer: "Located in Mathura, Uttar Pradesh." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Mathura medical guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-11",
        slug: "kmc-medical-college-mathura",
        name: "KMC Medical College & Hospital",
        location: "Mathura, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2024",
        imageUrl: "/images/colleges/kmc-medical-mathura.png",
        rating: 3.7,
        reviews: 50,
        courses: ["MBBS"],
        description: "New medical college in Mathura with modern facilities.",
        about: "KMC Medical College & Hospital is a new private medical college in Mathura established in 2024. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["New College 2024", "Modern Infrastructure", "Mathura Location", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "353", score: "475245" } }],
        mqFees: { total: "₹1,25,82,880", perSemester: "₹12,58,288" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "KMC Hospital", beds: 300 },
        internship: { duration: "12 months", stipend: "₹15,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery"],
        faqs: [{ question: "Is KMC Medical new?", answer: "Yes, established in 2024." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["New college guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-12",
        slug: "krishna-mohan-medical-college",
        name: "Krishna Mohan Medical College & Hospital",
        location: "Mathura, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2013",
        imageUrl: "/images/colleges/krishna-mohan-mathura.png",
        rating: 4.0,
        reviews: 350,
        courses: ["MBBS"],
        description: "Established medical college in Mathura with good reputation.",
        about: "Krishna Mohan Medical College & Hospital is an established private medical college in Mathura since 2013. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Established 2013", "Good Reputation", "Mathura Location", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "408", score: "358892" } }],
        mqFees: { total: "₹1,17,38,560", perSemester: "₹11,73,856" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 150, managementQuota: 100 }],
        hospital: { name: "Krishna Mohan Hospital", beds: 450 },
        internship: { duration: "12 months", stipend: "₹18,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery", "Pediatrics"],
        faqs: [{ question: "How old is Krishna Mohan Medical?", answer: "Established in 2013." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Mathura medical guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-13",
        slug: "mayo-institute-of-medical-sciences",
        name: "Mayo Institute of Medical Sciences",
        location: "Barabanki, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2012",
        imageUrl: "/images/colleges/mayo-medical-barabanki.png",
        rating: 4.0,
        reviews: 380,
        courses: ["MBBS"],
        description: "Reputed medical college near Lucknow with good clinical exposure.",
        about: "Mayo Institute of Medical Sciences in Barabanki is a reputed private medical college near Lucknow established in 2012. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Near Lucknow", "Good Reputation", "Clinical Exposure", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "423", score: "329472" } }],
        mqFees: { total: "₹1,12,11,620", perSemester: "₹11,21,162" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 150, managementQuota: 100 }],
        hospital: { name: "Mayo Hospital", beds: 500 },
        internship: { duration: "12 months", stipend: "₹18,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery", "Pediatrics"],
        faqs: [{ question: "Is Mayo Institute near Lucknow?", answer: "Yes, in Barabanki, close to Lucknow." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Lucknow region guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-14",
        slug: "muzaffarnagar-medical-college",
        name: "Muzaffarnagar Medical College",
        location: "Muzaffarnagar, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2006",
        imageUrl: "/images/colleges/muzaffarnagar-medical-college.jpg",
        rating: 4.1,
        reviews: 480,
        courses: ["MBBS"],
        description: "One of the older private medical colleges in Western UP.",
        about: "Muzaffarnagar Medical College is one of the older private medical colleges in Western UP, established in 2006. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Established 2006", "Western UP Location", "Good Track Record", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "551", score: "136211" } }],
        mqFees: { total: "₹1,39,38,830", perSemester: "₹13,93,883" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 150, managementQuota: 100 }],
        hospital: { name: "MMC Hospital", beds: 550 },
        internship: { duration: "12 months", stipend: "₹18,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery", "Pediatrics", "OBG"],
        faqs: [{ question: "How old is Muzaffarnagar Medical?", answer: "Established in 2006, one of the older private colleges in UP." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Western UP guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-15",
        slug: "naraina-medical-college-kanpur",
        name: "Naraina Medical College & Research Centre",
        location: "Kanpur, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2013",
        imageUrl: "/images/colleges/naraina-medical-kanpur.png",
        rating: 3.9,
        reviews: 290,
        courses: ["MBBS"],
        description: "Private medical college in the industrial city of Kanpur.",
        about: "Naraina Medical College & Research Centre is a private medical college in Kanpur established in 2013. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Kanpur Location", "Industrial City", "Growing Infrastructure", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "382", score: "411715" } }],
        mqFees: { total: "₹1,21,46,830", perSemester: "₹12,14,683" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "Naraina Hospital", beds: 400 },
        internship: { duration: "12 months", stipend: "₹15,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery"],
        faqs: [{ question: "Where is Naraina Medical?", answer: "Located in Kanpur, Uttar Pradesh." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Kanpur medical guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-16",
        slug: "ncr-institute-of-medical-sciences-meerut",
        name: "National Capital Region Institute of Medical Sciences",
        location: "Meerut, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2018",
        imageUrl: "/images/colleges/ncr-institute-meerut.jpg",
        rating: 3.9,
        reviews: 160,
        courses: ["MBBS"],
        description: "Private medical college in Meerut, part of NCR region.",
        about: "NCR Institute of Medical Sciences is located in Meerut, offering medical education in the NCR region since 2018. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["NCR Location", "Meerut City", "Growing College", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "441", score: "298141" } }],
        mqFees: { total: "₹1,21,99,170", perSemester: "₹12,19,917" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "NCR Hospital", beds: 400 },
        internship: { duration: "12 months", stipend: "₹15,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery"],
        faqs: [{ question: "Where is NCR Medical Sciences?", answer: "Located in Meerut, part of NCR region." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["NCR region guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-17",
        slug: "noida-international-institute-of-medical-sciences",
        name: "Noida International Institute of Medical Sciences",
        location: "Greater Noida, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2020",
        imageUrl: "/images/colleges/noida-international-medical.png",
        rating: 3.9,
        reviews: 120,
        courses: ["MBBS"],
        description: "New medical college in Greater Noida with modern infrastructure.",
        about: "Noida International Institute of Medical Sciences is a new private medical college in Greater Noida established in 2020. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Greater Noida Location", "Modern Infrastructure", "NCR Region", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "507", score: "194984" } }],
        mqFees: { total: "₹1,19,22,110", perSemester: "₹11,92,211" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "NIIMS Hospital", beds: 350 },
        internship: { duration: "12 months", stipend: "₹15,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery"],
        faqs: [{ question: "Is NIIMS in Noida?", answer: "Yes, located in Greater Noida." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Noida medical guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-18",
        slug: "prasad-institute-of-medical-sciences",
        name: "Prasad Institute of Medical Sciences",
        location: "Lucknow, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2016",
        imageUrl: "/images/colleges/prasad-medical-lucknow.jpg",
        rating: 3.9,
        reviews: 220,
        courses: ["MBBS"],
        description: "Private medical college in Lucknow with affordable fees.",
        about: "Prasad Institute of Medical Sciences is a private medical college in Lucknow established in 2016, offering affordable medical education. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Lucknow Location", "Affordable Fees", "Growing Infrastructure", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "418", score: "338814" } }],
        mqFees: { total: "₹1,10,39,320", perSemester: "₹11,03,932" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "Prasad Hospital", beds: 400 },
        internship: { duration: "12 months", stipend: "₹15,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery"],
        faqs: [{ question: "What are fees at Prasad Medical?", answer: "Approximately ₹11.04 Lakhs per year." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Lucknow medical guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-19",
        slug: "rajshree-medical-research-institute-bareilly",
        name: "Rajshree Medical Research Institute",
        location: "Bareilly, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2014",
        imageUrl: "/images/colleges/rajshree-medical-bareilly.png",
        rating: 4.0,
        reviews: 310,
        courses: ["MBBS"],
        description: "Established medical college in Bareilly with good reputation.",
        about: "Rajshree Medical Research Institute is an established private medical college in Bareilly since 2014. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Bareilly Location", "Established 2014", "Good Hospital", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "388", score: "398211" } }],
        mqFees: { total: "₹1,47,40,870", perSemester: "₹14,74,087" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "Rajshree Hospital", beds: 450 },
        internship: { duration: "12 months", stipend: "₹15,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery", "Pediatrics"],
        faqs: [{ question: "Where is Rajshree Medical?", answer: "Located in Bareilly, Uttar Pradesh." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Bareilly medical guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-20",
        slug: "rama-medical-college-hapur",
        name: "Rama Medical College & Research Centre Hapur",
        location: "Hapur, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2011",
        imageUrl: "/images/colleges/rama-medical-hapur.jpg",
        rating: 4.0,
        reviews: 360,
        courses: ["MBBS"],
        description: "Established Rama group medical college near Delhi NCR.",
        about: "Rama Medical College & Research Centre Hapur is part of the Rama Group, established in 2011 near Delhi NCR. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Rama Group", "Near NCR", "Established 2011", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "458", score: "269965" } }],
        mqFees: { total: "₹1,30,99,680", perSemester: "₹13,09,968" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 150, managementQuota: 100 }],
        hospital: { name: "Rama Hospital Hapur", beds: 550 },
        internship: { duration: "12 months", stipend: "₹18,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery", "Pediatrics", "OBG"],
        faqs: [{ question: "Is Rama Hapur part of Rama Group?", answer: "Yes, part of the renowned Rama Educational Group." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Rama Group expertise", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-21",
        slug: "rama-medical-college-kanpur",
        name: "Rama Medical College & Research Centre Kanpur",
        location: "Kanpur, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2008",
        imageUrl: "/images/colleges/rama-medical-kanpur.png",
        rating: 4.1,
        reviews: 450,
        courses: ["MBBS"],
        description: "Established Rama group medical college in Kanpur with good reputation.",
        about: "Rama Medical College & Research Centre Kanpur is part of the Rama Group, established in 2008 with excellent clinical facilities. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Rama Group", "Kanpur Location", "Established 2008", "Good Hospital", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "497", score: "209162" } }],
        mqFees: { total: "₹1,27,18,560", perSemester: "₹12,71,856" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 150, managementQuota: 100 }],
        hospital: { name: "Rama Hospital Kanpur", beds: 600 },
        internship: { duration: "12 months", stipend: "₹18,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery", "Pediatrics", "OBG", "Orthopedics"],
        faqs: [{ question: "How old is Rama Kanpur?", answer: "Established in 2008, one of the older Rama campuses." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Rama Group expertise", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-22",
        slug: "rohilkhand-medical-college-bareilly",
        name: "Rohilkhand Medical College & Hospital",
        location: "Bareilly, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2006",
        imageUrl: "/images/colleges/rohilkhand-medical-bareilly.png",
        rating: 4.2,
        reviews: 520,
        courses: ["MBBS"],
        description: "One of the oldest private medical colleges in Rohilkhand region.",
        about: "Rohilkhand Medical College & Hospital is one of the oldest private medical colleges in the Rohilkhand region, established in 2006. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Established 2006", "Rohilkhand Region", "Large Hospital", "Good Reputation", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "510", score: "191495" } }],
        mqFees: { total: "₹1,56,03,010", perSemester: "₹15,60,301" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 150, managementQuota: 100 }],
        hospital: { name: "RMC Hospital", beds: 650 },
        internship: { duration: "12 months", stipend: "₹20,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery", "Pediatrics", "OBG", "Orthopedics"],
        faqs: [{ question: "Is Rohilkhand Medical a good college?", answer: "Yes, one of the oldest and reputed private medical colleges in UP." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Bareilly medical guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-23",
        slug: "saraswati-institute-of-medical-sciences-hapur",
        name: "Saraswati Institute of Medical Sciences",
        location: "Hapur, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2008",
        imageUrl: "/images/colleges/saraswati-medical-hapur.png",
        rating: 4.0,
        reviews: 340,
        courses: ["MBBS"],
        description: "Established medical college in Hapur with good clinical exposure.",
        about: "Saraswati Institute of Medical Sciences is an established private medical college in Hapur near Delhi NCR since 2008. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Near NCR", "Established 2008", "Good Clinical Exposure", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "499", score: "206094" } }],
        mqFees: { total: "₹1,18,16,710", perSemester: "₹11,81,671" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "SIMS Hospital", beds: 450 },
        internship: { duration: "12 months", stipend: "₹15,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery"],
        faqs: [{ question: "Where is Saraswati Medical Hapur?", answer: "Located in Hapur, near Delhi NCR." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["NCR region guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-24",
        slug: "saraswati-medical-college-unnao",
        name: "Saraswati Medical College",
        location: "Unnao, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2016",
        imageUrl: "/images/colleges/saraswati-medical-unnao.jpg",
        rating: 3.9,
        reviews: 200,
        courses: ["MBBS"],
        description: "Private medical college in Unnao near Lucknow.",
        about: "Saraswati Medical College is a private medical college in Unnao, near Lucknow, established in 2016. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Near Lucknow", "Affordable", "Growing College", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "366", score: "445674" } }],
        mqFees: { total: "₹1,15,96,100", perSemester: "₹11,59,610" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "SMC Hospital", beds: 350 },
        internship: { duration: "12 months", stipend: "₹15,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery"],
        faqs: [{ question: "Is Saraswati Unnao near Lucknow?", answer: "Yes, Unnao is very close to Lucknow." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Lucknow region guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-25",
        slug: "school-of-medical-sciences-sharda-hospital",
        name: "School of Medical Sciences & Research, Sharda Hospital",
        location: "Greater Noida, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2009",
        imageUrl: "/images/colleges/sharda-medical-noida.png",
        rating: 4.2,
        reviews: 580,
        courses: ["MBBS"],
        description: "Part of Sharda University with excellent infrastructure.",
        about: "School of Medical Sciences & Research is part of Sharda University in Greater Noida, offering excellent medical education since 2009. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Sharda University", "Greater Noida", "Excellent Infrastructure", "Large Hospital", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "596", score: "82011" } }],
        mqFees: { total: "₹1,50,00,000 (Approx)", perSemester: "₹15,00,000" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹2,00,000" }],
        miscFees: [{ label: "As per university", value: "Variable" }],
        securityDeposit: "As per university policy",
        coursesSeats: [{ course: "MBBS", totalSeats: 150, managementQuota: 100 }],
        hospital: { name: "Sharda Hospital", beds: 800 },
        internship: { duration: "12 months", stipend: "₹20,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery", "Pediatrics", "OBG", "Orthopedics", "ENT", "Ophthalmology"],
        faqs: [{ question: "Is Sharda Medical part of Sharda University?", answer: "Yes, part of Sharda University in Greater Noida." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Sharda University expertise", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-26",
        slug: "shri-gorakhnath-medical-college",
        name: "Shri Gorakhnath Medical College Hospital & Research Centre",
        location: "Gorakhpur, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2024",
        imageUrl: "/images/colleges/shri-gorakhnath-gorakhpur.png",
        rating: 3.7,
        reviews: 60,
        courses: ["MBBS"],
        description: "New medical college in Gorakhpur with modern facilities.",
        about: "Shri Gorakhnath Medical College is a new private medical college in Gorakhpur established in 2024. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["New College 2024", "Gorakhpur Location", "Modern Infrastructure", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "448", score: "286136" } }],
        mqFees: { total: "₹1,25,82,880", perSemester: "₹12,58,288" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "Shri Gorakhnath Hospital", beds: 300 },
        internship: { duration: "12 months", stipend: "₹15,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery"],
        faqs: [{ question: "Is Shri Gorakhnath Medical new?", answer: "Yes, established in 2024." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Gorakhpur medical guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-27",
        slug: "shri-siddhi-vinayak-medical-college",
        name: "Shri Siddhi Vinayak Medical College & Hospital",
        location: "Sambhal, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2024",
        imageUrl: "/images/colleges/siddhi-vinayak-sambhal.png",
        rating: 3.7,
        reviews: 55,
        courses: ["MBBS"],
        description: "New medical college in Sambhal with growing infrastructure.",
        about: "Shri Siddhi Vinayak Medical College & Hospital is a new private medical college in Sambhal established in 2024. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["New College 2024", "Sambhal Location", "Modern Facilities", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "359", score: "461811" } }],
        mqFees: { total: "₹1,25,82,880", perSemester: "₹12,58,288" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "SSVM Hospital", beds: 300 },
        internship: { duration: "12 months", stipend: "₹15,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery"],
        faqs: [{ question: "Where is Siddhi Vinayak Medical?", answer: "Located in Sambhal, Uttar Pradesh." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["UP medical guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-28",
        slug: "sks-hospital-medical-college-mathura",
        name: "SKS Hospital Medical College & Research Centre",
        location: "Mathura, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2023",
        imageUrl: "/images/colleges/sks-medical-mathura.png",
        rating: 3.8,
        reviews: 90,
        courses: ["MBBS"],
        description: "New medical college in Mathura with modern infrastructure.",
        about: "SKS Hospital Medical College & Research Centre is a new private medical college in Mathura established in 2023. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["New College 2023", "Mathura Location", "Modern Infrastructure", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "376", score: "424004" } }],
        mqFees: { total: "₹1,21,46,830", perSemester: "₹12,14,683" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "SKS Hospital", beds: 350 },
        internship: { duration: "12 months", stipend: "₹15,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery"],
        faqs: [{ question: "Is SKS Medical College new?", answer: "Yes, established in 2023." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Mathura medical guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-29",
        slug: "sri-rammurti-smarak-institute",
        name: "Sri Rammurti Smarak Institute of Medical Sciences",
        location: "Bareilly, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2002",
        imageUrl: "/images/colleges/srms-bareilly.png",
        rating: 4.1,
        reviews: 490,
        courses: ["MBBS"],
        description: "One of the oldest private medical colleges in Bareilly.",
        about: "Sri Rammurti Smarak Institute of Medical Sciences is one of the oldest private medical colleges in Bareilly, established in 2002. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Established 2002", "Bareilly Location", "Excellent Reputation", "Large Hospital", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "568", score: "114962" } }],
        mqFees: { total: "₹1,64,85,120", perSemester: "₹16,48,512" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 150, managementQuota: 100 }],
        hospital: { name: "SRMS Hospital", beds: 700 },
        internship: { duration: "12 months", stipend: "₹20,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery", "Pediatrics", "OBG", "Orthopedics"],
        faqs: [{ question: "How old is SRMS Medical?", answer: "Established in 2002, one of the oldest in Bareilly." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["SRMS expertise", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-30",
        slug: "subharti-medical-college-meerut",
        name: "Subharti Medical College",
        location: "Meerut, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "1996",
        imageUrl: "/images/colleges/subharti-medical-meerut.jpg",
        rating: 4.3,
        reviews: 680,
        courses: ["MBBS"],
        description: "One of the oldest and most reputed private medical colleges in UP.",
        about: "Subharti Medical College is part of Swami Vivekanand Subharti University in Meerut, established in 1996. One of the oldest and most reputed private medical colleges in UP. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Established 1996", "University Campus", "Excellent Reputation", "Large Hospital", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "417", score: "340515" } }],
        mqFees: { total: "₹1,15,81,330", perSemester: "₹11,58,133" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 150, managementQuota: 100 }],
        hospital: { name: "Subharti Hospital", beds: 1000 },
        internship: { duration: "12 months", stipend: "₹22,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery", "Pediatrics", "OBG", "Orthopedics", "ENT", "Ophthalmology"],
        faqs: [{ question: "Is Subharti Medical a good choice?", answer: "Yes, one of the oldest and most reputed private medical colleges in UP." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Subharti expertise", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-31",
        slug: "ts-misra-medical-college-lucknow",
        name: "T.S. Misra Medical College & Hospital",
        location: "Lucknow, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2016",
        imageUrl: "/images/colleges/ts-misra-lucknow.png",
        rating: 4.0,
        reviews: 290,
        courses: ["MBBS"],
        description: "Private medical college in Lucknow with good facilities.",
        about: "T.S. Misra Medical College & Hospital is a private medical college in Lucknow established in 2016. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Lucknow Location", "Good Infrastructure", "Growing Reputation", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "427", score: "323092" } }],
        mqFees: { total: "₹1,29,91,990", perSemester: "₹12,99,199" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "TSM Hospital", beds: 450 },
        internship: { duration: "12 months", stipend: "₹18,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery", "Pediatrics"],
        faqs: [{ question: "Where is T.S. Misra Medical?", answer: "Located in Lucknow, Uttar Pradesh." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Lucknow medical guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-32",
        slug: "teerthankar-mahaveer-medical-college",
        name: "Teerthankar Mahaveer Medical College & Research Centre",
        location: "Moradabad, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2008",
        imageUrl: "/images/colleges/teerthankar-mahaveer-moradabad.png",
        rating: 4.2,
        reviews: 520,
        courses: ["MBBS"],
        description: "Part of TMU with excellent infrastructure and hospital.",
        about: "Teerthankar Mahaveer Medical College & Research Centre is part of Teerthankar Mahaveer University in Moradabad, established in 2008. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["TMU Campus", "Moradabad Location", "Excellent Hospital", "Good Reputation", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "298", score: "618220" } }],
        mqFees: { total: "₹1,62,00,000", perSemester: "₹16,20,000" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 150, managementQuota: 100 }],
        hospital: { name: "TMU Hospital", beds: 800 },
        internship: { duration: "12 months", stipend: "₹22,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery", "Pediatrics", "OBG", "Orthopedics", "ENT", "Ophthalmology"],
        faqs: [{ question: "Is TMU Medical a good college?", answer: "Yes, one of the top private medical colleges in UP with excellent infrastructure." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["TMU expertise", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-33",
        slug: "united-institute-of-medical-sciences-prayagraj",
        name: "United Institute of Medical Sciences",
        location: "Prayagraj, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2020",
        imageUrl: "/images/colleges/united-medial-prayagraj.png",
        rating: 3.9,
        reviews: 140,
        courses: ["MBBS"],
        description: "New medical college in Prayagraj with modern facilities.",
        about: "United Institute of Medical Sciences is a new private medical college in Prayagraj established in 2020. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Prayagraj Location", "New College 2020", "Modern Infrastructure", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "487", score: "223480" } }],
        mqFees: { total: "₹1,19,04,010", perSemester: "₹11,90,401" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "United Hospital", beds: 350 },
        internship: { duration: "12 months", stipend: "₹15,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery"],
        faqs: [{ question: "Is United Medical new?", answer: "Yes, established in 2020." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Prayagraj medical guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-34",
        slug: "varunarjun-medical-college",
        name: "Varunarjun Medical College & Rohilkhand Hospital",
        location: "Shahjahanpur, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2016",
        imageUrl: "/images/colleges/varunarjun-shahjahanpur.png",
        rating: 3.9,
        reviews: 210,
        courses: ["MBBS"],
        description: "Private medical college in Shahjahanpur with good hospital.",
        about: "Varunarjun Medical College & Rohilkhand Hospital is a private medical college in Shahjahanpur established in 2016. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Shahjahanpur Location", "Good Hospital", "Rohilkhand Region", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "331", score: "529671" } }],
        mqFees: { total: "₹1,21,00,000", perSemester: "₹12,10,000" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "Rohilkhand Hospital", beds: 400 },
        internship: { duration: "12 months", stipend: "₹15,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery"],
        faqs: [{ question: "Where is Varunarjun Medical?", answer: "Located in Shahjahanpur, Uttar Pradesh." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Rohilkhand region guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-35",
        slug: "venkateswara-institute-of-medical-sciences",
        name: "Venkateswara Institute of Medical Sciences",
        location: "Amroaha, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2016",
        imageUrl: "/images/colleges/venkateswara-medical-amroha.png",
        rating: 3.8,
        reviews: 180,
        courses: ["MBBS"],
        description: "Private medical college in Amroaha with good infrastructure.",
        about: "Venkateswara Institute of Medical Sciences is a private medical college in Amroaha (Gajraula) established in 2016. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Amroaha Location", "Growing College", "Good Infrastructure", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "378", score: "420195" } }],
        mqFees: { total: "₹1,11,05,080", perSemester: "₹11,10,508" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,75,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹85,600" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "VIMS Hospital", beds: 350 },
        internship: { duration: "12 months", stipend: "₹15,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery"],
        faqs: [{ question: "Where is Venkateswara Medical?", answer: "Located in Gajraula, Amroaha district, Uttar Pradesh." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["UP medical guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-36",
        slug: "santosh-medical-college-ghaziabad",
        name: "Santosh Medical College",
        location: "Ghaziabad, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "1995",
        imageUrl: "/images/colleges/santosh-medical-ghaziabad.png",
        rating: 4.3,
        reviews: 720,
        courses: ["MBBS"],
        description: "One of the oldest and most reputed private medical colleges in NCR.",
        about: "Santosh Medical College is part of Santosh Deemed University in Ghaziabad, one of the oldest private medical colleges in NCR established in 1995. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["Established 1995", "NCR Location", "Deemed University", "Excellent Reputation", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "280", score: "672540" } }],
        mqFees: { total: "₹1,80,00,000 (Approx)", perSemester: "₹18,00,000" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹2,00,000" }],
        miscFees: [{ label: "As per university", value: "Variable" }],
        securityDeposit: "As per university policy",
        coursesSeats: [{ course: "MBBS", totalSeats: 150, managementQuota: 100 }],
        hospital: { name: "Santosh Hospital", beds: 900 },
        internship: { duration: "12 months", stipend: "₹25,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery", "Pediatrics", "OBG", "Orthopedics", "ENT", "Ophthalmology"],
        faqs: [{ question: "Is Santosh Medical a good choice?", answer: "Yes, one of the oldest and most reputed private medical colleges in NCR." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Santosh expertise", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    },
    {
        id: "up-med-37",
        slug: "dr-bs-kushwah-institute-of-medical-college",
        name: "Dr. B.S. Kushwah Institute of Medical College",
        location: "Kanpur, Uttar Pradesh",
        state: "Uttar Pradesh",
        type: "Private",
        established: "2024",
        imageUrl: "/images/colleges/bs-kushwah-kanpur.png",
        rating: 3.7,
        reviews: 45,
        courses: ["MBBS"],
        description: "New medical college in Kanpur with modern facilities.",
        about: "Dr. B.S. Kushwah Institute of Medical College is a new private medical college in Kanpur established in 2024. The college is committed to producing competent healthcare professionals with a strong ethical foundation. It offers a comprehensive learning environment with access to a high-patient-flow hospital for clinical training. Students gain hands-on experience under the guidance of experienced senior doctors and faculty members.",
        highlights: ["New College 2024", "Kanpur Location", "Modern Infrastructure", "24x7 Emergency Services", "State-of-the-art Labs", "High Patient Flow", "Experienced Doctors"],
        neetCutoffs: [{ year: "2024", managementQuota: { rank: "300", score: "612335" } }],
        mqFees: { total: "₹1,25,80,000", perSemester: "₹12,58,000" },
        hostelFees: [{ roomType: "Standard Room", annual: "₹1,65,000" }],
        miscFees: [{ label: "Misc Fees", value: "₹94,160" }],
        securityDeposit: "₹3,00,000",
        coursesSeats: [{ course: "MBBS", totalSeats: 100, managementQuota: 100 }],
        hospital: { name: "BSK Hospital", beds: 300 },
        internship: { duration: "12 months", stipend: "₹15,000/month" },
        admissionProcess: ["Apply through NEET counseling", "Document verification", "Fee payment"],
        facultyDepartments: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Medicine", "Surgery"],
        faqs: [{ question: "Is Dr. B.S. Kushwah new?", answer: "Yes, established in 2024." }, { question: "Is the medical degree recognized?", answer: "Yes, the MBBS degree is recognized by the NMC (National Medical Commission) and is valid for practice across India and abroad after clearing licensing exams." }, { question: "What is the patient flow in the hospital?", answer: "The attached teaching hospital has a good patient flow, ensuring excellent clinical exposure and hands-on training for students." }, { question: "Are residential facilities available?", answer: "Yes, the campus provides comfortable hostel accommodation for students, creating a conducive environment for study and rest." }],
        galleryImages: [
            { url: "https://placehold.co/800x600/1e293b/fff?text=Campus+View", alt: "Campus View" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Library", alt: "Library" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Laboratories", alt: "Laboratories" },
            { url: "https://placehold.co/800x600/1e293b/fff?text=Hostel", alt: "Student Hostel" }
        ],
        whyChooseAkashTalks: ["Kanpur medical guidance", "Fee clarity", "Complete support", "Post-admission support for hostel and documentation", "Guidance on scholarship applications and education loans", "Zero hidden charges policy"]
    }
];
