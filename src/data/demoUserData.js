// Demo data specifically for alirooshan@gmail.com
// This data will only be loaded for this specific user

export const demoUserData = {
    email: 'alirooshan@gmail.com',
    password: 'babayaga',
    fullName: 'Ali Rooshan',
    phone: '+92 3114679669',
    degree: 'Bachelors',
    major: 'Computer Science',
    gpa: '3.8',
    targetCountries: ['USA', 'Germany', 'Canada'],
    intake: 'Fall 2026',
    budget: '20k-40k',
    careerGoal: 'Become a software architect.',

    // Saved Programs
    savedPrograms: [
        {
            id: 1,
            name: "Imperial College London",
            program: "MSc Computer Science",
            country: "UK",
            city: "London",
            tuition: 36000,
            currency: "GBP",
            duration: "1 Year",
            deadline: "2026-03-15",
            image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
            matchScore: 95
        },
        {
            id: 2,
            name: "Technical University of Munich",
            program: "MSc Data Engineering and Analytics",
            country: "Germany",
            city: "Munich",
            tuition: 0,
            currency: "EUR",
            duration: "2 Years",
            deadline: "2026-05-31",
            image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=2070&auto=format&fit=crop",
            matchScore: 88
        },
        {
            id: 3,
            name: "University of Toronto",
            program: "MSc Applied Computing",
            country: "Canada",
            city: "Toronto",
            tuition: 42000,
            currency: "CAD",
            duration: "16 Months",
            deadline: "2026-12-15",
            image: "https://images.unsplash.com/photo-1627556592933-ffe99c1cd9eb?q=80&w=2070&auto=format&fit=crop",
            matchScore: 92
        },
        {
            id: 6,
            name: "Stanford University",
            program: "MS Computer Science",
            country: "USA",
            city: "Stanford",
            tuition: 58000,
            currency: "USD",
            duration: "2 Years",
            deadline: "2027-01-15",
            image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2070&auto=format&fit=crop",
            matchScore: 98
        }
    ],

    // Applications/Tracker
    applications: [
        {
            id: 1,
            university: "Imperial College London",
            program: "MSc Computer Science",
            status: "pending",
            appliedDate: "2026-01-15",
            deadline: "2026-03-15",
            country: "UK"
        },
        {
            id: 2,
            university: "Technical University of Munich",
            program: "MSc Data Engineering",
            status: "accepted",
            appliedDate: "2026-01-10",
            deadline: "2026-05-31",
            country: "Germany"
        },
        {
            id: 3,
            university: "Stanford University",
            program: "MS Computer Science",
            status: "pending",
            appliedDate: "2026-12-20",
            deadline: "2027-01-15",
            country: "USA"
        },
        {
            id: 4,
            university: "University of Toronto",
            program: "MSc Applied Computing",
            status: "pending",
            appliedDate: "2026-11-25",
            deadline: "2026-12-15",
            country: "Canada"
        }
    ],

    // Deadlines
    deadlines: [
        { id: 1, title: 'Imperial College London', date: '2026-03-15', type: 'Application' },
        { id: 2, title: 'DAAD Scholarship', date: '2026-04-01', type: 'Scholarship' },
        { id: 3, title: 'Visa Appointment', date: '2026-05-10', type: 'Visa' },
    ],

    // Checklist
    checklist: [
        { id: 1, task: 'Upload Passport', completed: true },
        { id: 2, task: 'Complete Profile', completed: true },
        { id: 3, task: 'Submit Transcript', completed: false }
    ],

    // Stats
    stats: { saved: 4, pending: 3, accepted: 1 }
};

export default demoUserData;
