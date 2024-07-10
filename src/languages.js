import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  English: {
    translation: {
      "searchPlaceholder": "Search...",
      "realFeel": "Real feel",
      "humidity": "Humidity",
      "wind": "Wind",
      "rise": "Rise",
      "set": "Set",
      "high": "High",
      "low": "Low",
      "hourlyForecast": "Hourly Forecast",
      "dailyForecast": "Daily Forecast"
    }
  },
  French: {
    translation: {
      "searchPlaceholder": "Chercher...",
      "realFeel": "Ressenti",
      "humidity": "Humidité",
      "wind": "Vent",
      "rise": "Lever",
      "set": "Coucher",
      "high": "Max",
      "low": "Min",
      "hourlyForecast": "Prévisions horaires",
      "dailyForecast": "Prévisions quotidiennes"
    }
  },
  Hindi: {
    translation: {
      "searchPlaceholder": "खोजें...",
      "realFeel": "वास्तविक अनुभव",
      "humidity": "नमी",
      "wind": "हवा",
      "rise": "उदय",
      "set": "अस्त",
      "high": "अधिकतम",
      "low": "न्यूनतम",
      "hourlyForecast": "प्रति घंटे का पूर्वानुमान",
      "dailyForecast": "दैनिक पूर्वानुमान"
    }
  },
  Telugu: {
    translation: {
      "searchPlaceholder": "వెతకండి...",
      "realFeel": "అసలు అనుభవం",
      "humidity": "ఆపోఆపోవులు",
      "wind": "గాలి",
      "rise": "ప్రారంభం",
      "set": "ప్రముఖం",
      "high": "అధికంగా",
      "low": "తక్కువగా",
      "hourlyForecast": "గంటల పూర్వానుమానం",
      "dailyForecast": "డేలీ ఫోర్కాస్ట్"
    }
  },
  Tamil: {
    translation: {
      "searchPlaceholder": "தேடு...",
      "realFeel": "உண்மையான உணர்வு",
      "humidity": "ஈரப்பு",
      "wind": "காற்று",
      "rise": "உதிரி",
      "set": "அமைக்கும்",
      "high": "அதிக",
      "low": "குறைந்த",
      "hourlyForecast": "மணி எடுத்துக்கொள்",
      "dailyForecast": "டெய்லி பரிமாணம்"
    }
  },
  Bengali: {
    translation: {
      "searchPlaceholder": "অনুসন্ধান করুন...",
      "realFeel": "বাস্তব অনুভূতি",
      "humidity": "আর্দ্রতা",
      "wind": "বায়ু",
      "rise": "উঠা",
      "set": "সেট করুন",
      "high": "উচ্চ",
      "low": "নিম্ন",
      "hourlyForecast": "ঘন্টায় পূর্বাভাস",
      "dailyForecast": "দৈনিক পূর্বাভাস"
    }
  },
  Malayalam: {
    translation: {
      "searchPlaceholder": "തിരയുക...",
      "realFeel": "വാസ്തവ അനുഭവം",
      "humidity": "കടൽനിറം",
      "wind": "കാറ്റ്",
      "rise": "ഉത്ഥാനം",
      "set": "സെറ്റ് ചെയ്യുക",
      "high": "ഉയര്‍ന്ന",
      "low": "കുറഞ്ഞ",
      "hourlyForecast": "മണിക്കൂറിന്റെ പ്രവചനം",
      "dailyForecast": "ദൈനംദിന പ്രവചനം"
    }
  },
  Marathi: {
    translation: {
      "searchPlaceholder": "शोधा...",
      "realFeel": "वास्तविक अनुभव",
      "humidity": "नमी",
      "wind": "पावसाळी",
      "rise": "उदय",
      "set": "सेट करा",
      "high": "जास्त",
      "low": "कमी",
      "hourlyForecast": "प्रति तासाचा अंदाज",
      "dailyForecast": "दैनिक अंदाज"
    }
  },
  Punjabi: {
    translation: {
      "searchPlaceholder": "ਖੋਜੋ...",
      "realFeel": "ਅਸਲ ਅਨੁਭਵ",
      "humidity": "ਨਮੀ",
      "wind": "ਹਵਾ",
      "rise": "ਉਭਰਣਾ",
      "set": "ਸੈੱਟ ਕਰੋ",
      "high": "ਉੱਚਾ",
      "low": "ਘੱਟ",
      "hourlyForecast": "ਘੰਟਾਂ ਦੀ ਭਵਿੱਖਵਾਣੀ",
      "dailyForecast": "ਰੋਜ਼ਾਨਾ ਭਵਿੱਖਵਾਣੀ"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "English", // default language
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
