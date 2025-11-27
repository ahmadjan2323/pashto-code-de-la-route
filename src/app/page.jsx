import React, { useState, useEffect } from "react";

export default function HomePage() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("fr");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const seedDatabase = async () => {
    setIsSeeding(true);
    try {
      const response = await fetch("/api/seed-questions", { method: "POST" });
      const data = await response.json();
      setSeedResult(data);
    } catch (error) {
      setSeedResult({ error: "Failed to seed database" });
    } finally {
      setIsSeeding(false);
    }
  };

  const categories = [
    {
      id: 1,
      titleFr: "Signalisation routière",
      titleEn: "Road Signs",
      titlePs: "د سرک نښې",
      titleDr: "علائم راه",
      emoji: "🚦",
    },
    {
      id: 2,
      titleFr: "Comportement de conduite et priorité",
      titleEn: "Driving Behavior & Priority",
      titlePs: "د چلولو چلند او لومړیتوب",
      titleDr: "رفتار رانندگی و اولویت",
      emoji: "🚗",
    },
    {
      id: 3,
      titleFr: "Sécurité et piétons",
      titleEn: "Safety & Pedestrians",
      titlePs: "خوندیتوب او پیاده وروڼه",
      titleDr: "ایمنی و عابرین پیاده",
      emoji: "🧍",
    },
    {
      id: 4,
      titleFr: "Contrôle et mécanique du véhicule",
      titleEn: "Vehicle Control & Mechanics",
      titlePs: "د موټر کنټرول او میخانیک",
      titleDr: "کنترل و مکانیک خودرو",
      emoji: "⚙️",
    },
    {
      id: 5,
      titleFr: "Météo, nuit et risques",
      titleEn: "Weather, Night & Risks",
      titlePs: "هوا، شپه او خطرونه",
      titleDr: "آب‌وهوا، شب و خطرات",
      emoji: "🌧️",
    },
    {
      id: 6,
      titleFr: "Premiers secours et réponse aux accidents",
      titleEn: "First Aid & Accident Response",
      titlePs: "لومړنۍ مرسته او د پیښې ځواب",
      titleDr: "کمک‌های اولیه و واکنش به تصادف",
      emoji: "🩹",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <nav className="border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center space-x-2 border border-white rounded-lg px-3 py-2 text-sm hover:bg-gray-900 transition-colors"
              >
                <span>
                  {selectedLanguage === "fr"
                    ? "Français"
                    : selectedLanguage === "ps"
                      ? "پښتو"
                      : selectedLanguage === "dr"
                        ? "دری / فارسی"
                        : "English"}
                </span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showLanguageDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50">
                  <button
                    onClick={() => {
                      setSelectedLanguage("fr");
                      setShowLanguageDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 first:rounded-t-lg"
                  >
                    Français
                  </button>
                  <button
                    onClick={() => {
                      setSelectedLanguage("ps");
                      setShowLanguageDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700"
                  >
                    پښتو
                  </button>
                  <button
                    onClick={() => {
                      setSelectedLanguage("dr");
                      setShowLanguageDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700"
                  >
                    دری / فارسی
                  </button>
                  <button
                    onClick={() => {
                      setSelectedLanguage("en");
                      setShowLanguageDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 last:rounded-b-lg"
                  >
                    English
                  </button>
                </div>
              )}
            </div>

            {/* Navigation Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="hover:text-gray-300 transition-colors">
                Home
              </a>
              <a
                href="#learning"
                className="hover:text-gray-300 transition-colors"
              >
                Learning
              </a>
              <a href="#exam" className="hover:text-gray-300 transition-colors">
                Exam
              </a>
              <a
                href="#contact"
                className="hover:text-gray-300 transition-colors"
              >
                Contact
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section id="home" className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            پښتو Code de la Route
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Learn the French Code de la Route with translations in Pashto and
            Dari. Master driving theory with comprehensive questions and
            practice exams.
          </p>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <a
              href="#learning"
              className="px-8 py-4 border-2 border-white rounded-xl text-xl font-semibold hover:bg-white hover:text-black transition-colors"
            >
              <div>Learning</div>
              <div className="text-lg mt-1">پوهه</div>
            </a>

            <a
              href="#exam"
              className="px-8 py-4 border-2 border-white rounded-xl text-xl font-semibold hover:bg-white hover:text-black transition-colors"
            >
              <div>Exam/Test</div>
              <div className="text-lg mt-1">امتحان</div>
            </a>
          </div>

          {/* Download Link */}
          <div className="mb-8">
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors">
              Download Mobile App
            </button>
            <p className="text-sm text-gray-400 mt-2">
              Available soon on Google Play Store
            </p>
          </div>

          {/* Database Seeding Section */}
          <div className="bg-gray-900 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-4">Database Setup</h3>
            <button
              onClick={seedDatabase}
              disabled={isSeeding}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg font-medium transition-colors"
            >
              {isSeeding ? "Seeding Database..." : "Seed Questions Database"}
            </button>

            {seedResult && (
              <div className="mt-4 p-3 rounded-lg bg-gray-800">
                {seedResult.error ? (
                  <p className="text-red-400 text-sm">{seedResult.error}</p>
                ) : (
                  <p className="text-green-400 text-sm">{seedResult.message}</p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Learning Section */}
        <section id="learning" className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">
            Learning Categories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              let localTitle = "";
              if (selectedLanguage === "ps") {
                localTitle = category.titlePs;
              } else if (selectedLanguage === "dr") {
                localTitle = category.titleDr;
              } else if (selectedLanguage === "en") {
                localTitle = category.titleEn;
              }

              return (
                <div
                  key={category.id}
                  className="border-2 border-white rounded-xl p-6 hover:bg-gray-900 transition-colors cursor-pointer"
                >
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">{category.emoji}</div>
                    <h3 className="text-xl font-semibold mb-2">
                      {category.titleFr}
                    </h3>
                    {selectedLanguage !== "fr" && (
                      <p className="text-gray-300 mb-2">{localTitle}</p>
                    )}
                    <p className="text-sm text-gray-400 mt-3">80 Questions</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Exam Section */}
        <section id="exam" className="mb-16">
          <div className="bg-gray-900 rounded-xl p-8">
            <h2 className="text-4xl font-bold text-center mb-8">
              Practice Exam
            </h2>

            <div className="max-w-2xl mx-auto">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Exam Features:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    80 questions per category
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    French questions with Pashto/Dari/English translations
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    Instant results and score tracking
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    Multiple attempts allowed
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <button className="px-8 py-4 border-2 border-green-400 text-green-400 rounded-xl text-xl font-semibold hover:bg-green-400 hover:text-black transition-colors">
                  Start Practice Exam
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="text-center">
          <h2 className="text-4xl font-bold mb-8">Contact Us</h2>

          <div className="max-w-2xl mx-auto">
            <p className="text-gray-300 mb-8">
              Have questions or feedback? We'd love to hear from you.
            </p>

            <div className="flex justify-center space-x-6">
              <a
                href="#"
                className="w-12 h-12 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="#"
                className="w-12 h-12 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                aria-label="TikTok"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-400">
          <p>&copy; 2024 پښتو Code de la Route. All rights reserved.</p>
          <p className="mt-2">Learn French driving theory in Pashto and Dari</p>
        </div>
      </footer>
    </div>
  );
}
