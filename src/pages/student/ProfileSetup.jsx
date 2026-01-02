import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Book, Globe, MapPin, Check, ChevronRight, ChevronLeft, Save } from 'lucide-react';
import AuthService from '../../services/AuthService';

const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Academic Background', icon: Book },
    { number: 3, title: 'Study Preferences', icon: Globe },
    { number: 4, title: 'Goals & Budget', icon: MapPin },
];

const ProfileSetup = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        degree: 'Bachelors',
        major: '',
        gpa: '',
        englishTest: 'IELTS',
        englishScore: '',
        targetCountries: [],
        intake: 'Fall 2026',
        budget: '',
        careerGoal: ''
    });

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser) {
            setFormData(prev => ({
                ...prev,
                ...currentUser,
                // Ensure array is initialized
                targetCountries: currentUser.targetCountries || []
            }));
        } else {
            // No user logged in, redirect to login
            navigate('/login/student');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCountryToggle = (country) => {
        setFormData(prev => {
            const countries = prev.targetCountries.includes(country)
                ? prev.targetCountries.filter(c => c !== country)
                : [...prev.targetCountries, country];
            return { ...prev, targetCountries: countries };
        });
    };

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo(0, 0);
        } else {
            // Finish & Save
            try {
                AuthService.updateProfile(formData);
                navigate('/student/dashboard');
            } catch (error) {
                console.error("Failed to save profile:", error);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSkip = () => {
        AuthService.updateProfile(formData); // Save what we have
        navigate('/student/dashboard');
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 bg-white border-2 border-indigo-50 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 text-slate-900 placeholder-slate-400 transition-all font-medium"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Email (Read-only)</label>
                            <input
                                type="email"
                                value={formData.email}
                                disabled
                                className="block w-full px-4 py-3 bg-slate-100 border-2 border-slate-100 rounded-xl text-slate-500 font-medium cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                readOnly={!!formData.phone}
                                className={`block w-full px-4 py-3 border-2 rounded-xl transition-all font-medium ${formData.phone
                                    ? 'bg-slate-100 border-slate-100 text-slate-500 cursor-not-allowed'
                                    : 'bg-white border-indigo-50 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 text-slate-900 placeholder-slate-400'
                                    }`}
                                placeholder="+1 (555) 123-4567"
                            />
                            {formData.phone && <p className="text-xs text-slate-500 mt-2">Phone number imported from signup.</p>}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Current/Latest Degree</label>
                            <select
                                name="degree"
                                value={formData.degree}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 bg-white border-2 border-indigo-50 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 text-slate-900 transition-all font-medium cursor-pointer"
                            >
                                <option>High School</option>
                                <option>Bachelors</option>
                                <option>Masters</option>
                                <option>PhD</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Field of Study (Major)</label>
                            <input
                                type="text"
                                name="major"
                                value={formData.major}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 bg-white border-2 border-indigo-50 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 text-slate-900 placeholder-slate-400 transition-all font-medium"
                                placeholder="Computer Science"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">GPA / Percentage</label>
                            <input
                                type="text"
                                name="gpa"
                                value={formData.gpa}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 bg-white border-2 border-indigo-50 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 text-slate-900 placeholder-slate-400 transition-all font-medium"
                                placeholder="3.8 / 4.0 or 85%"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">English Proficiency</label>
                                <select
                                    name="englishTest"
                                    value={formData.englishTest}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-3 bg-white border-2 border-indigo-50 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 text-slate-900 transition-all font-medium cursor-pointer"
                                >
                                    <option>IELTS</option>
                                    <option>TOEFL</option>
                                    <option>PTE</option>
                                    <option>Duolingo</option>
                                    <option>None</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Score</label>
                                <input
                                    type="text"
                                    name="englishScore"
                                    value={formData.englishScore}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-3 bg-white border-2 border-indigo-50 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 text-slate-900 placeholder-slate-400 transition-all font-medium"
                                    placeholder={formData.englishTest === 'IELTS' ? 'e.g. 7.5' : 'Score'}
                                />
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-3">Target Countries</label>
                            <div className="grid grid-cols-2 gap-4">
                                {['USA', 'UK', 'Canada', 'Germany', 'Australia', 'Switzerland'].map(country => (
                                    <button
                                        key={country}
                                        type="button"
                                        onClick={() => handleCountryToggle(country)}
                                        className={`p-4 border-2 rounded-xl flex items-center justify-between transition-all duration-300 ${formData.targetCountries.includes(country)
                                            ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105'
                                            : 'border-indigo-50 bg-white text-slate-500 hover:border-indigo-200 hover:bg-indigo-50'
                                            }`}
                                    >
                                        <span className="font-bold">{country}</span>
                                        {formData.targetCountries.includes(country) && <Check size={18} className="text-white" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Intake</label>
                            <select
                                name="intake"
                                value={formData.intake}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 bg-white border-2 border-indigo-50 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 text-slate-900 transition-all font-medium cursor-pointer"
                            >
                                <option>Fall 2026</option>
                                <option>Spring 2027</option>
                                <option>Fall 2027</option>
                            </select>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Estimated Annual Budget</label>
                            <select
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 bg-white border-2 border-indigo-50 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 text-slate-900 transition-all font-medium cursor-pointer"
                            >
                                <option value="">Select budget range</option>
                                <option value="<10k">Less than $10,000</option>
                                <option value="10k-20k">$10,000 - $20,000</option>
                                <option value="20k-40k">$20,000 - $40,000</option>
                                <option value="40k+">More than $40,000</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Career Goal</label>
                            <textarea
                                name="careerGoal"
                                value={formData.careerGoal}
                                onChange={handleChange}
                                rows={4}
                                className="block w-full px-4 py-3 bg-white border-2 border-indigo-50 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 text-slate-900 placeholder-slate-400 transition-all resize-none font-medium"
                                placeholder="I want to specialize in AI and work as a Machine Learning Engineer..."
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="relative w-full flex justify-center py-10">
            {/* Full Screen Background Image & Overlay */}
            <div className="fixed inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"
                    alt="University Library"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"></div>
            </div>

            <div className="max-w-3xl w-full mx-auto relative z-10 animate-in fade-in zoom-in duration-500 p-4">
                <div className="bg-white/95 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 relative ring-1 ring-black/5">

                    {/* Progress Bar */}
                    <div className="bg-indigo-50/50 border-b border-indigo-100/50 px-8 py-8 backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Setup Your Profile</h2>
                                <p className="text-slate-500 mt-1 font-medium">Let's personalize your experience.</p>
                            </div>
                            <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">Step {currentStep} of 4</span>
                        </div>
                        <div className="relative mx-4">
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-indigo-50 rounded-full -translate-y-1/2 z-0"></div>
                            <div className="relative z-10 flex justify-between">
                                {steps.map((step) => {
                                    const Icon = step.icon;
                                    const isActive = step.number === currentStep;
                                    const isCompleted = step.number < currentStep;
                                    return (
                                        <div key={step.number} className="flex flex-col items-center group cursor-default">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${isActive ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200 scale-110' :
                                                isCompleted ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-slate-400 border-indigo-50'
                                                }`}>
                                                {isCompleted ? <Check size={20} /> : <Icon size={20} />}
                                            </div>
                                            <span className={`mt-3 text-xs font-bold uppercase tracking-wider transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-400'} hidden sm:block`}>
                                                {step.title}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 min-h-[400px]">
                        <div className="animate-in fade-in slide-in-from-right-8 duration-500 key={currentStep}">
                            {renderStepContent()}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-white/50 px-8 py-6 border-t border-indigo-50 flex justify-between items-center backdrop-blur-md">
                        <button
                            onClick={handleSkip}
                            className="text-slate-500 hover:text-indigo-600 font-bold px-4 transition-colors"
                        >
                            Skip for now
                        </button>
                        <div className="flex gap-4">
                            {currentStep > 1 && (
                                <button
                                    onClick={handleBack}
                                    className="px-6 py-2.5 border border-indigo-100 rounded-xl text-slate-500 font-bold hover:bg-white hover:text-indigo-600 transition-colors bg-white/50"
                                >
                                    Back
                                </button>
                            )}
                            <button
                                onClick={handleNext}
                                className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg shadow-indigo-200 hover:shadow-xl group"
                            >
                                {currentStep === 4 ? 'Finish Setup' : 'Continue'}
                                {currentStep === 4 ? <Save size={18} /> : <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSetup;
