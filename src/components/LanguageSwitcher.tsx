"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LanguageSwitcherProps {
  language: "en" | "ar" | "hi" | "ur";
  onLanguageChange: (lang: "en" | "ar" | "hi" | "ur") => void;
}

const languages = {
  en: { name: "English", flag: "🇺🇸" },
  ar: { name: "العربية", flag: "🇦🇪" },
  hi: { name: "हिंदी", flag: "🇮🇳" },
  ur: { name: "اردو", flag: "🇵🇰" },
};

export default function LanguageSwitcher({ language, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-blue-200 mb-2">
        Language / اللغة
      </label>
      <Select value={language} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-full bg-blue-700 border-blue-600 text-white">
          <SelectValue placeholder="Select Language">
            <div className="flex items-center space-x-2">
              <span>{languages[language].flag}</span>
              <span>{languages[language].name}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-blue-700 border-blue-600">
          {Object.entries(languages).map(([code, { name, flag }]) => (
            <SelectItem 
              key={code} 
              value={code}
              className="text-white hover:bg-blue-600 focus:bg-blue-600"
            >
              <div className="flex items-center space-x-2">
                <span>{flag}</span>
                <span>{name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}