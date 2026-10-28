// Multilingual Dictionary for MediSetu Kiosk & OPD (English, Hindi, Marathi)
export const translations = {
  en: {
    appTitle: "MediSetu Clinical Kiosk",
    hospitalTagline: "Ayushman Bharat Digital Health Portal",
    kioskGreeting: "Welcome to MediSetu Health Kiosk",
    kioskSubtitle: "Identify yourself or register as a walk-in patient to begin your OPD consultation",
    audioHelpPrompt: "Tap the speaker icon anytime to hear instructions out loud.",
    
    // Tabs
    tabLookup: "I Have a Token / Phone / ABHA",
    tabRegister: "New Walk-in Registration",

    // Lookup
    lookupPlaceholder: "Enter 4 to 14 digit Number",
    lookupBtn: "Find My Record",
    lookupHelp: "Enter your OPD Token (e.g. 4822), Mobile Number, or 14-digit ABHA ID.",

    // Register Form
    fullName: "Full Name",
    fullNamePlaceholder: "e.g. Sunita Sharma",
    phoneNumber: "Mobile Number",
    phoneNumberPlaceholder: "10-digit mobile number",
    age: "Age",
    agePlaceholder: "Years",
    gender: "Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    registerBtn: "Register & Start Intake",

    // Language Screen
    chooseLanguage: "Choose Your Preferred Language",
    chooseLanguageSub: "आपकी भाषा का चयन करें / आपली भाषा निवडा",
    startSessionBtn: "Start Clinical Session",

    // Active Session & Cabin Rule
    sessionActiveTitle: "OPD Check-In Confirmed",
    tokenLabel: "Your Queue Token",
    welcomePatient: "Welcome",
    statusStarted: "Intake Ready",

    // The Cabin Rule
    cabinRuleTitle: "Action Required: Temporary Token Issued",
    cabinRuleDesc: "You are on temporary token {token}. You may complete your intake questions and document upload on this kiosk, but you MUST visit the Registration Desk to collect your Permanent Token before entering the Doctor's Cabin.",
    permanentVerifiedTitle: "Permanent OPD Token Active",
    permanentVerifiedDesc: "Your registration is fully verified. Complete your intake here and proceed to Doctor's Cabin when your token is called.",

    // Next steps tiles
    step1Title: "1. Symptom Assessment",
    step1Desc: "Answer quick questions about your current health condition.",
    step2Title: "2. Scan Medical Reports",
    step2Desc: "Upload or take pictures of prescriptions and lab tests.",
    step3Title: "3. Health Summary Ready",
    step3Desc: "A concise timeline is generated directly for the Doctor.",

    // Desk & Doctor
    deskTitle: "OPD Registration Desk",
    doctorTitle: "Doctor OPD Consultation Queue",
    tokenNumber: "Token Number",
    permanentToken: "Permanent Token",
    temporaryToken: "Temporary Token",
    actionCall: "Call Patient",

    // Roles
    roleKiosk: "Kiosk Mode",
    roleDesk: "Registration Desk",
    roleDoctor: "Doctor OPD",

    // Interview & Clinical Questions
    interviewTitle: "Clinical Symptom Interview",
    questionProgress: "Question",
    ofText: "of",
    speakToAnswer: "Speak to Answer",
    listening: "Listening... please speak clearly",
    micFallback: "Could not match speech. Please tap an option below.",
    youSaid: "You said",
    isThisCorrect: "Is this correct?",
    confirmYes: "Yes, Correct",
    retryVoice: "Speak Again",
    nextQuestion: "Next Question",
    completeInterview: "Complete & Review",

    // Red Flag Alert
    redFlagEmergencyTitle: "CRITICAL MEDICAL ALERT",
    emergencySubtitle: "High-risk clinical symptoms detected. Do not wait.",
    emergencyHelpline: "Call 108 (Ambulance) / 112 (Emergency)",
    nurseDeskPrompt: "Please alert the nearest hospital nurse, counter, or casualty immediately.",
    helpReceivedBtn: "I Have Received Help / Proceed",

    // Review Screen
    reviewTitle: "Review Your Health Answers",
    reviewSubtitle: "Verify your answers before the summary is shared with the Doctor.",
    submitInterviewBtn: "Confirm & Proceed to Documents",
    sourceTap: "Touch",
    sourceVoice: "Voice",
    backToDashboard: "Return to Dashboard",
  },

  hi: {
    appTitle: "मेदिसेतु स्वास्थ्य कियोस्क",
    hospitalTagline: "आयुष्मान भारत डिजिटल स्वास्थ्य मिशन",
    kioskGreeting: "मेदिसेतु स्वास्थ्य सेवा में आपका स्वागत है",
    kioskSubtitle: "ओपीडी परामर्श के लिए अपना विवरण दर्ज करें या नया पंजीकरण करें",
    audioHelpPrompt: "बोलकर निर्देश सुनने के लिए स्पीकर आइकन दबाएं।",
    
    // Tabs
    tabLookup: "मेरे पास टोकन / मोबाइल / आभा नंबर है",
    tabRegister: "नया मरीज़ पंजीकरण",

    // Lookup
    lookupPlaceholder: "४ से १४ अंकों का नंबर दर्ज करें",
    lookupBtn: "मेरा रिकॉर्ड खोजें",
    lookupHelp: "अपना ओपीडी टोकन (जैसे 4822), मोबाइल नंबर, या 14 अंकों का आभा आईडी दर्ज करें।",

    // Register Form
    fullName: "मरीज़ का पूरा नाम",
    fullNamePlaceholder: "उदा. सुनीता शर्मा",
    phoneNumber: "मोबाइल नंबर",
    phoneNumberPlaceholder: "१० अंकों का मोबाइल नंबर",
    age: "उम्र",
    agePlaceholder: "वर्ष",
    gender: "लिंग",
    male: "पुरुष",
    female: "महिला",
    other: "अन्य",
    registerBtn: "पंजीकरण करें और आगे बढ़ें",

    // Language Screen
    chooseLanguage: "अपनी पसंदीदा भाषा चुनें",
    chooseLanguageSub: "कियोस्क पर बातचीत के लिए भाषा का चयन करें",
    startSessionBtn: "सत्र शुरू करें",

    // Active Session & Cabin Rule
    sessionActiveTitle: "ओपीडी चेक-इन सफल",
    tokenLabel: "आपका कतार टोकन नंबर",
    welcomePatient: "स्वागत है",
    statusStarted: "परामर्श के लिए तैयार",

    // The Cabin Rule
    cabinRuleTitle: "महत्वपूर्ण सूचना: यह अस्थायी टोकन है",
    cabinRuleDesc: "आपको अस्थायी टोकन {token} दिया गया है। आप इस स्क्रीन पर अपने लक्षण और रिपोर्ट दर्ज कर सकते हैं, लेकिन डॉक्टर के केबिन में जाने से पहले आपको पंजीकरण डेस्क से पक्का टोकन लेना अनिवार्य है।",
    permanentVerifiedTitle: "पक्का ओपीडी टोकन सक्रिय",
    permanentVerifiedDesc: "आपका पंजीकरण सत्यापित है। अपनी जांच पूरी करें और टोकन पुकारे जाने पर डॉक्टर केबिन में जाएं।",

    // Next steps tiles
    step1Title: "१. स्वास्थ्य लक्षण जांच",
    step1Desc: "अपनी वर्तमान बीमारी से जुड़े सरल प्रश्नों के उत्तर दें।",
    step2Title: "२. पुरानी पर्चियां / रिपोर्ट अपलोड करें",
    step2Desc: "अपनी पुरानी जांच रिपोर्ट या दवाओं की पर्ची की तस्वीर लें।",
    step3Title: "३. डॉक्टर हेतु संक्षिप्त रिपोर्ट",
    step3Desc: "डॉक्टर के परामर्श हेतु आपका मेडिकल इतिहास तैयार किया जा रहा है।",

    // Desk & Doctor
    deskTitle: "ओपीडी पंजीकरण डेस्क",
    doctorTitle: "डॉक्टर परामर्श कतार",
    tokenNumber: "टोकन नंबर",
    permanentToken: "स्थायी टोकन",
    temporaryToken: "अस्थायी टोकन",
    actionCall: "मरीज़ को बुलाएं",

    // Roles
    roleKiosk: "कियोस्क",
    roleDesk: "पंजीकरण डेस्क",
    roleDoctor: "डॉक्टर केबिन",

    // Interview & Clinical Questions
    interviewTitle: "स्वास्थ्य लक्षण प्रश्नोत्तरी",
    questionProgress: "प्रश्न",
    ofText: "/",
    speakToAnswer: "बोलकर बताएं",
    listening: "सुन रहे हैं... कृपया स्पष्ट बोलें",
    micFallback: "आवाज़ समझ नहीं आई। कृपया नीचे दिए गए विकल्प को छुएं (टैप करें)।",
    youSaid: "आपने कहा",
    isThisCorrect: "क्या यह सही है?",
    confirmYes: "हाँ, यह सही है",
    retryVoice: "दोबारा बोलें",
    nextQuestion: "अगला सवाल",
    completeInterview: "जांच पूर्ण करें और समीक्षा देखें",

    // Red Flag Alert
    redFlagEmergencyTitle: "आपातकालीन चिकित्सा चेतावनी",
    emergencySubtitle: "गंभीर स्वास्थ्य लक्षण का संकेत। कृपया तुरंत सहायता लें।",
    emergencyHelpline: "कॉल करें: १०८ (एम्बुलेंस) / ११२ (आपातकाल)",
    nurseDeskPrompt: "कृपया तुरंत नजदीकी अस्पताल नर्स, काउंटर या इमरजेंसी वार्ड को सूचित करें।",
    helpReceivedBtn: "मुझे मदद मिल गई / आगे बढ़ें",

    // Review Screen
    reviewTitle: "अपने उत्तरों की जांच करें",
    reviewSubtitle: "डॉक्टर को भेजने से पहले अपने दिए गए उत्तरों की पुष्टि करें।",
    submitInterviewBtn: "पुष्टि करें और पर्ची/रिपोर्ट जोड़ें",
    sourceTap: "टच किया",
    sourceVoice: "बोलकर",
    backToDashboard: "डैशबोर्ड पर वापस जाएं",
  },

  mr: {
    appTitle: "मेदिसेतु आरोग्य किऑस्क",
    hospitalTagline: "आयुष्मान भारत डिजिटल आरोग्य अभियान",
    kioskGreeting: "मेदिसेतू आरोग्य सेवेत आपले स्वागत आहे",
    kioskSubtitle: "ओपीडी सल्ल्यासाठी आपला तपशील शोधा किंवा नवीन नोंदणी करा",
    audioHelpPrompt: "सूचना ऐकण्यासाठी स्पीकर चिन्हावर स्पर्श करा.",
    
    // Tabs
    tabLookup: "माझ्याकडे टोकन / मोबाईल / आभा क्रमांक आहे",
    tabRegister: "नवीन रुग्ण नोंदणी",

    // Lookup
    lookupPlaceholder: "४ ते १४ अंकी क्रमांक टाका",
    lookupBtn: "माझी नोंद शोधा",
    lookupHelp: "आपला ओपीडी टोकन (उदा. 4822), मोबाईल नंबर किंवा 14 अंकी आभा आयडी टाका.",

    // Register Form
    fullName: "रुग्णाचे पूर्ण नाव",
    fullNamePlaceholder: "उदा. सुनिता शर्मा",
    phoneNumber: "मोबाईल नंबर",
    phoneNumberPlaceholder: "१० अंकी मोबाईल नंबर",
    age: "वय",
    agePlaceholder: "वर्षे",
    gender: "लिंग",
    male: "पुरुष",
    female: "स्त्री",
    other: "इतर",
    registerBtn: "नोंदणी करा आणि पुढे जा",

    // Language Screen
    chooseLanguage: "आपली भाषा निवडा",
    chooseLanguageSub: "कियोस्क वापरण्यासाठी पसंतीची भाषा निवडा",
    startSessionBtn: "सत्र सुरू करा",

    // Active Session & Cabin Rule
    sessionActiveTitle: "ओपीडी नोंद यशस्वी",
    tokenLabel: "आपला रांग टोकन क्रमांक",
    welcomePatient: "स्वागत आहे",
    statusStarted: "तपासणीसाठी तयार",

    // The Cabin Rule
    cabinRuleTitle: "महत्त्वाची सूचना: हा तात्पुरता टोकन आहे",
    cabinRuleDesc: "आपल्याला तात्पुरता टोकन {token} मिळाला आहे. आपण येथे लक्षणे आणि कागदपत्रे जोडू शकता, परंतु डॉक्टरांच्या केबिनमध्ये जाण्यापूर्वी नोंदणी खिडकीवरून पक्का टोकन घेणे आवश्यक आहे.",
    permanentVerifiedTitle: "पक्का ओपीडी टोकन सक्रिय",
    permanentVerifiedDesc: "आपली नोंदणी पूर्ण झाली आहे. तपासणी पूर्ण करा आणि नाव पुकारल्यावर डॉक्टर केबिनमध्ये जा.",

    // Next steps tiles
    step1Title: "१. आरोग्याची लक्षणे सांगा",
    step1Desc: "आपल्या आजाराबद्दल विचारलेल्या सोप्या प्रश्नांची उत्तरे द्या.",
    step2Title: "२. जुने रिपोर्ट / औषधांची चिठ्ठी जोडा",
    step2Desc: "जुनी तपासणी किंवा औषधांच्या कागदपत्रांचा फोटो घ्या.",
    step3Title: "३. डॉक्टरांसाठी सारांश तयार",
    step3Desc: "डॉक्टरांच्या तपासणीसाठी संपूर्ण सारांश तयार केला जात आहे.",

    // Desk & Doctor
    deskTitle: "ओपीडी नोंदणी कक्ष",
    doctorTitle: "डॉक्टर ओपीडी रुग्ण यादी",
    tokenNumber: "टोकन क्रमांक",
    permanentToken: "पक्का टोकन",
    temporaryToken: "तात्पुरता टोकन",
    actionCall: "रुग्णास बोलवा",

    // Roles
    roleKiosk: "किऑस्क",
    roleDesk: "नोंदणी कक्ष",
    roleDoctor: "डॉक्टर कक्ष",

    // Interview & Clinical Questions
    interviewTitle: "आरोग्य लक्षण प्रश्नोत्तरे",
    questionProgress: "प्रश्न",
    ofText: "/",
    speakToAnswer: "बोलून सांगा",
    listening: "ऐकत आहोत... कृपया स्पष्ट बोला",
    micFallback: "आवाज समजला नाही. कृपया खालील पर्यायावर स्पर्श करा.",
    youSaid: "तुम्ही म्हणालात",
    isThisCorrect: "हे बरोबर आहे का?",
    confirmYes: "होय, हे बरोबर आहे",
    retryVoice: "पुन्हा बोला",
    nextQuestion: "पुढील प्रश्न",
    completeInterview: "तपासणी पूर्ण करा आणि सारांश पहा",

    // Red Flag Alert
    redFlagEmergencyTitle: "तात्काळ आपत्कालीन इशारा",
    emergencySubtitle: "तीव्र आरोग्य लक्षणाचा धोका. कृपया तात्काळ वैद्यकीय मदत घ्या.",
    emergencyHelpline: "कॉल करा: १०८ (रुग्णवाहिका) / ११२ (आपत्कालीन)",
    nurseDeskPrompt: "कृपया ताबडतोब जवळील परिचारिका, खिडकी किंवा आपत्कालीन विभागाला कळवा.",
    helpReceivedBtn: "मला मदत मिळाली / पुढे जा",

    // Review Screen
    reviewTitle: "आपल्या उत्तरांची तपासणी करा",
    reviewSubtitle: "डॉक्टरांकडे नोंद पाठवण्यापूर्वी आपली उत्तरे तपासून घ्या.",
    submitInterviewBtn: "खात्री करा आणि अहवाल जोडा",
    sourceTap: "स्पर्श केला",
    sourceVoice: "बोलून",
    backToDashboard: "डॅशबोर्डवर परत जा",
  }
};
