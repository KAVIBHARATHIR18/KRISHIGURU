// window.translations and window.PEST_DATABASE will be loaded globally via index.html script tags

// Extended Multilingual Agricultural Knowledgebase & Intent Dictionary
const RESPONSES = {
  en: {
    nitrogen: "Low Nitrogen (N) causes yellowing leaves and slow growth. Add organic compost, vermicompost, or chemical urea (46% N) in split doses. Leguminous cover crops like clover or alfalfa can also naturally fix nitrogen.",
    phosphorus: "Low Phosphorus (P) stalls root growth and yield. Apply Single Super Phosphate (SSP) or Diammonium Phosphate (DAP) during early field preparation to boost root strength.",
    potassium: "Low Potassium (K) reduces crop immunity and drought resistance. Apply Muriate of Potash (MOP) to enhance stalk strength, grain quality, and disease defense.",
    ph: "Ideal soil pH is between 6.0 and 7.5. For acidic soil (pH < 6.0), add agricultural lime (calcium carbonate). For alkaline soil (pH > 7.5), mix in agricultural gypsum or organic peat moss.",
    pest: "For general pest control, spray Neem Oil (1500 ppm) with liquid soap weekly as a safe biological prevention. For heavy infestations, diagnose the pest in our Pest Advisor panel for chemical treatments.",
    irrigation: "Our smart scheduler checks your soil moisture and weather forecast. Irrigate during cooler hours (early morning/late evening) using drip systems to save water.",
    market: "Mandi prices fluctuate based on supply and festival demand. Check our Market pricing grid to see current rates and select the most profitable crop for planting.",
    organic: "Organic solutions improve long-term soil structure. Use well-rotted cow dung manure, composted leaf mold, biofertilizers (Azotobacter, Rhizobium), and spray botanical extracts like Neem Oil or Ginger-Garlic-Chilli paste for pest control.",
    sandy: "Sandy soil drains quickly but lacks nutrient retention. Add organic compost, green manure, and biochar to increase soil binding capacity. Use mulch to preserve water content.",
    clayey: "Clayey soil retains water but has poor aeration and is heavy to till. Mix in organic compost, vermicompost, or agricultural gypsum to break down tight clay aggregates and improve drainage.",
    loamy: "Loamy soil is the ideal balanced agriculture texture. Maintain its fertility by applying organic vermicompost annually and rotating shallow and deep-root crops.",
    stemborer: "Stem Borer causes 'dead hearts' in paddy. Spray Chlorantraniliprole 18.5% SC @ 60ml/acre or Cartap Hydrochloride 50% SP. Biologically, deploy Trichogramma cards.",
    rust: "Leaf Rust causes orange-brown pustules on wheat. Spray Propiconazole 25% EC (Tilt) @ 200ml/acre in 200L water. Remove infected weed hosts near fields.",
    whitefly: "Whiteflies curl leaves and spread viral diseases in cotton. Deploy yellow sticky traps (10-15/acre). Spray Diafenthiuron 50% WP @ 240g/acre or spray Neem oil soap mix.",
    armyworm: "Fall Armyworm creates ragged holes in maize whorls. Apply Spinetoram 11.7% SC @ 100ml/acre or Bacillus thuringiensis (Bt) dust during twilight.",
    default: "I am Krishi Sahayak. You can ask me about soil nutrients (N, P, K, pH, moisture), organic manure, pest remedies (stem borer, leaf rust, whitefly, armyworm), mandi pricing, or ask me for a 'soil audit' to evaluate your current dashboard readings!"
  },
  hi: {
    nitrogen: "कम नाइट्रोजन (N) के कारण पत्तियां पीली पड़ जाती हैं और विकास धीमा हो जाता है। जैविक खाद, केंचुआ खाद, या यूरिया (46% N) का प्रयोग करें। दलहनी फसलें लगाने से भी नाइट्रोजन प्राकृतिक रूप से बढ़ती है।",
    phosphorus: "फास्फोरस (P) की कमी से जड़ का विकास रुक जाता है। खेत की तैयारी के समय सिंगल सुपर फास्फेट (SSP) या डीएपी (DAP) डालने से जड़ें मजबूत होती हैं।",
    potassium: "पोटेशियम (K) की कमी से फसलों की रोग प्रतिरोधक क्षमता कम हो जाती है। तने की मजबूती और अनाज की गुणवत्ता बढ़ाने के लिए म्यूटेट ऑफ पोटाश (MOP) का छिड़काव करें।",
    ph: "मिट्टी का आदर्श पीएच 6.0 से 7.5 के बीच होता है। अम्लीय मिट्टी (pH < 6.0) के लिए कृषि चूना मिलाएं। क्षारीय मिट्टी (pH > 7.5) के लिए जिप्सम या जैविक पीट मॉस का उपयोग करें।",
    pest: "सामान्य कीटों के नियंत्रण के लिए हर हफ्ते नीम का तेल (1500 ppm) साबुन के घोल के साथ मिलाकर छिड़कें। गंभीर कीट हमलों के लिए कीट सलाहकार पैनल में निदान देखें।",
    irrigation: "हमारा स्मार्ट शेड्यूलर मिट्टी की नमी और मौसम की स्थिति को जांचता है। पानी बचाने के लिए सुबह या शाम को ड्रिप सिंचाई का उपयोग करें।",
    market: "मंडी के भाव आपूर्ति के आधार पर बदलते हैं। नवीनतम दरों को देखने के लिए बाजार मूल्य ग्रिड की जांच करें और सबसे अधिक लाभ देने वाली फसल चुनें।",
    organic: "जैविक समाधान मिट्टी की गुणवत्ता में सुधार करते हैं। सड़ी हुई गोबर की खाद, कम्पोस्ट, जैव उर्वरक (एज़ोटोबैक्टर, राइजोबियम) का उपयोग करें, और नीम तेल या अदरक-लहसुन-मिर्च के पेस्ट का छिड़काव करें।",
    sandy: "बलुई मिट्टी जल्दी सूख जाती है। मिट्टी की जल धारण क्षमता बढ़ाने के लिए जैविक खाद, हरी खाद और बायोचार (जैविक कोयला) डालें। नमी बचाने के लिए मल्चिंग करें।",
    clayey: "चिकनी मिट्टी पानी रोकती है लेकिन इसमें हवा का प्रवाह कम होता है। चिकनी मिट्टी को भुरभुरा बनाने और जल निकासी में सुधार के लिए जिप्सम और जैविक खाद मिलाएं।",
    loamy: "दोमट मिट्टी खेती के लिए सबसे उत्तम है। इसकी उर्वरता बनाए रखने के लिए सालाना वर्मीकंपोस्ट (केंचुआ खाद) डालें और फसल चक्र अपनाएं।",
    stemborer: "तना छेदक धान में 'सूखे दिल' (डेड हार्ट) का कारण बनता है। क्लोरेंट्रानिलिप्रोल 18.5% SC @ 60ml/एकड़ या कार्टाप हाइड्रोक्लोराइड का छिड़काव करें। ट्राइकोग्रामा जैव-कार्ड लगाएं।",
    rust: "गेहूं में गेरुआ रोग पत्तियों पर नारंगी-भूरे धब्बे बनाता है। प्रोपिकोनाज़ोल 25% EC @ 200ml/एकड़ का छिड़काव करें। संक्रमित खरपतवारों को नष्ट करें।",
    whitefly: "सफेद मक्खी कपास में पत्तियां सिकोड़ती है। पीले चिपचिपे जाल लगाएं। डायफेंथियूरॉन 50% WP @ 240 ग्राम/एकड़ या नीम के तेल का छिड़काव करें।",
    armyworm: "फॉल आर्मीवॉर्म मक्का के पत्तों में बड़े छेद करता है। स्पिनेटोरम 11.7% SC @ 100ml/एकड़ का छिड़काव करें या शाम को बैसिलस थुरिंगिएंसिस (Bt) धूल डालें।",
    default: "मैं आपका कृषि सहायक हूँ। आप मुझसे मिट्टी के पोषक तत्व, जैविक खाद, कीट उपचार (तना छेदक, गेरुआ, सफेद मक्खी), मंडी भाव के बारे में पूछ सकते हैं, या डैशबोर्ड के वर्तमान आंकड़ों का विश्लेषण करने के लिए 'soil audit' या 'मिट्टी ऑडिट' कह सकते हैं!"
  },
  ta: {
    nitrogen: "நைட்ரஜன் (N) குறைபாடு இலைகள் மஞ்சளாவதற்கும் மந்தமான வளர்ச்சிக்கும் வழிவகுக்கும். இயற்கை உரம், மண்புழு உரம் அல்லது யூரியா (46% N) பயன்படுத்தவும். உளுந்து போன்ற பயறு வகை பயிர்களை நடுவதன் மூலமும் நைட்ரஜனை அதிகரிக்கலாம்.",
    phosphorus: "பாஸ்பரஸ் (P) குறைபாடு வேர் வளர்ச்சியை பாதிக்கும். வேர்களை வலுப்படுத்த ஆரம்பக்கட்ட உழவின்போது சூப்பர் பாஸ்பேட் (SSP) அல்லது டிஏபி (DAP) உரங்களை இடுங்கள்.",
    potassium: "பொட்டாசியம் (K) குறைபாடு நோய் எதிர்ப்பு சக்தியைக் குறைக்கும். பயிரின் தண்டு வலிமை மற்றும் தானிய தரத்தை அதிகரிக்க பொட்டாஷ் (MOP) உரத்தைப் பயன்படுத்தவும்.",
    ph: "மண்ணின் உகந்த pH அளவு 6.0 முதல் 7.5 ஆகும். அமில மண்ணுக்கு (pH < 6.0) விவசாய சுண்ணாம்பையும், கார மண்ணுக்கு (pH > 7.5) ஜிப்சம் பொடியையும் சேர்த்து நிலத்தை சமன்படுத்தவும்.",
    pest: "பொதுவான பூச்சி கட்டுப்பாட்டிற்கு வாரந்தோறும் வேப்ப எண்ணெய் (1500 ppm) தெளிக்கவும். கடுமையான தாக்குதலுக்கு எமது பூச்சி மேலாண்மை பக்கத்தில் தீர்வு காண்க.",
    irrigation: "எங்கள் ஸ்மார்ட் கால அட்டவணை ஈரப்பதத்தை சரிபார்த்து நீர் பாசனத்தை திட்டமிடுகிறது. சொட்டு நீர் பாசன முறைகளை பயன்படுத்தி அதிகாலையில் நீர் பாய்ச்சவும்.",
    market: "சந்தை விலை சப்ளை மற்றும் தேவையை பொறுத்து மாறுபடும். தற்போதைய மண்டி விலைகளை சரிபார்த்து அதிக லாபம் தரும் பயிர்களை பயிரிடவும்.",
    organic: "இயற்கை உரங்கள் மண்ணின் நீண்டகால வளம் காக்கும். மக்கிய தொழு உரம், இலை தழை உரம், மற்றும் பூச்சி விரட்டியாக வேப்ப எண்ணெய் பயன்படுத்தவும்.",
    sandy: "மணல் மண் நீரைத் தக்கவைக்காது. மண்ணின் நீர் பிடிப்புத் திறனை அதிகரிக்க மண்புழு உரம், பசுந்தாள் உரங்களை இடுங்கள். ஈரப்பதத்தைக் காக்க மூடாக்கு போடுங்கள்.",
    clayey: "களிமண் நீர் தேங்கக்கூடியது. மண்ணின் வடிகால் வசதியை மேம்படுத்த ஜிப்சம் பொடி மற்றும் இயற்கை உரங்களை நன்றாகக் கலந்து இடுங்கள்.",
    loam: "வண்டல் மண் விவசாயத்திற்கு மிகவும் உகந்தது. மண்புழு உரங்களை இட்டு பயிர் சுழற்சி முறையை கடைப்பிடிக்கவும்.",
    stemborer: "குருத்துப்பூச்சி நெற்பயிரில் குருத்து காய்வதற்கு வழிவகுக்கும். கார்டாப் ஹைட்ரோகுளோரைடு தெளிக்கவும் அல்லது ட்ரைகோகிரம்மா அட்டைகளை பயன்படுத்தவும்.",
    rust: "கோதுமை துரு நோய் இலைகளில் பழுப்பு புள்ளிகளை ஏற்படுத்தும். புரோபிகோனசோல் 25% EC @ 200ml தெளிக்கவும்.",
    whitefly: "பருத்தியில் வெள்ளை ஈ இலை சுருட்டலை ஏற்படுத்தும். மஞ்சள் பசை பொறிகளை வைக்கவும். டயாபெந்தியார்ன் 50% WP தெளிக்கவும்.",
    armyworm: "சோளத்தில் படைப்புழு இலைகளில் துளைகளை இடும். ஸ்பைநெடோரம் 11.7% SC தெளிக்கவும்.",
    default: "நான் உங்கள் வேளாண் உதவியாளர். மண் சத்துக்கள், இயற்கை உரங்கள், பூச்சி மேலாண்மை அல்லது மண்டி சந்தை விலைகள் பற்றி கேளுங்கள், அல்லது உங்கள் மண் அளவுகளை ஆய்வு செய்ய 'soil audit' என கேளுங்கள்!"
  },
  te: {
    nitrogen: "నత్రజని (N) లోపిస్తే ఆకులు పసుపు రంగులోకి మారి పంట ఎదుగుదల మందగిస్తుంది. సేంద్రీయ ఎరువులు లేదా యూరియా వాడండి. జీలుగ, పిల్లిపెసర వంటి పచ్చిరొట్ట పంటల ద్వారా నత్రజని సహజంగా పెరుగుతుంది.",
    phosphorus: "భాస్వరం (P) లోపం వల్ల వేర్ల ఎదుగుదల ఆగిపోతుంది. దుక్కి తయారీ సమయంలో సూపర్ ఫాస్ఫేట్ (SSP) లేదా డీఏపీ (DAP) వాడితే వేర్లు బలంగా ఎదుగుతాయి.",
    potassium: "పొటాషియం (K) లోపిస్తే పంటలకు తెగుళ్లను తట్టుకునే శక్తి తగ్గుతుంది. నాణ్యమైన దిగుబడి మరియు కాండం బలానికి మ్యూరియేట్ ఆఫ్ పొటాష్ (MOP) వాడండి.",
    ph: "నేల pH విలువ 6.0 నుండి 7.5 మధ్య ఉండాలి. ఆమ్ల నేలలకు (pH < 6.0) సున్నం మరియు క్షార నేలలకు (pH > 7.5) జిప్సం వాడి నేలను సమతుల్యం చేయండి.",
    pest: "సాధారణ తెగుళ్ల నివారణకు ప్రతి వారం వేప నూనె (1500 ppm) పిచికారీ చేయండి. తీవ్రమైన తెగుళ్ల నివారణకు మా తెగుళ్ల సలహాదారు విభాగంలో చూడండి.",
    irrigation: "మా స్మార్ట్ అలర్ట్ సిస్టమ్ తేమను బట్టి నీటి పారుదల షెడ్యూల్ చేస్తుంది. నీటిని ఆదా చేయడానికి ఉదయం లేదా సాయంత్రం వేళల్లో డ్రిప్ సిస్టమ్ వాడండి.",
    market: "మార్కెట్ ధరలు ఎప్పటికప్పుడు మారుతుంటాయి. మా మార్కెట్ గ్రిడ్ ధరలను పరిశీలించి అత్యధిక లాభాలు ఇచ్చే పంటలను ఎంచుకోండి.",
    organic: "సేంద్రీయ ఎరువులు నేల నాణ్యతను పెంచుతాయి. బాగా కుళ్లిన పశువుల ఎరువు, వర్మీకంపోస్ట్ వాడండి. పురుగుల నివారణకు వేప నూనె పిచికారీ చేయండి.",
    sandy: "ఇసుక నేలల్లో నీరు నిల్వ ఉండదు. నేల తేమ నిలిపే శక్తి పెంచడానికి పచ్చిరొట్ట ఎరువులు, కంపోస్ట్ వాడండి. తేమ ఆవిరి కాకుండా మల్చింగ్ చేయండి.",
    clayey: "నల్లరేగడి నేలలో నీరు ఎక్కువగా నిల్వ ఉంటుంది. నేలను గుల్లబారేలా చేయడానికి మరియు నీరు పోవడానికి జిప్సం మరియు పశువుల ఎరువు కలపండి.",
    loam: "ఎర్ర నేలలు వ్యవసాయానికి చాలా మంచివి. వర్మీకంపోస్ట్ వాడుతూ పంట మార్పిడి పద్ధతిని పాటించండి.",
    stemborer: "వరిలో కాండం తొలిచే పురుగు ఆకులు ఎండిపోయేలా చేస్తుంది. క్లోరాంట్రానిలిప్రోల్ లేదా కార్టాప్ హైడ్రోక్లోరైడ్ పిచికారీ చేయండి.",
    rust: "గోధుమలో ఆకు తుప్పు తెగులు నివారణకు ప్రొపికోనజోల్ 25% EC పిచికారీ చేయండి.",
    whitefly: "పత్తిలో తెల్లదోమ ఆకు ముడుతకు కారణమవుతుంది. పసుపు జిగురు కార్లు పెట్టండి. డయాఫెంథియురాన్ పిచికారీ చేయండి.",
    armyworm: "మొక్కజొన్నలో కత్తెర పురుగు ఆకులకు రంధ్రాలు చేస్తుంది. స్పైనిటోరమ్ పిచికారీ చేయండి.",
    default: "నేను మీ కృషి సహాయక్. నేల పోషకాలు, తెగుళ్లు, మార్కెట్ ధరల గురించి అడగండి లేదా మీ నేల విలువలను విశ్లేషించడానికి 'soil audit' అని అడగండి!"
  },
  bn: {
    nitrogen: "নাইট্রোজেন (N) কম হলে পাতা হলুদ হয়ে যায় এবং গাছের বৃদ্ধি কমে যায়। জৈব সার, কেঁচো সার বা ইউরিয়া (46% N) প্রয়োগ করুন। শিম বা ডাল জাতীয় ফসল চাষ করলে প্রাকৃতিকভাবে নাইট্রোজেন বাড়ে।",
    phosphorus: "ফসফরাস (P) কম হলে শিকড়ের বৃদ্ধি থমকে যায়। জমি তৈরির সময় সিঙ্গেল সুপার ফসফেট (SSP) বা ডিএপি (DAP) প্রয়োগ করলে শিকড় মজবুত হয়।",
    potassium: "পটাশিয়াম (K) কম হলে ফসলের রোগ প্রতিরোধ ক্ষমতা কমে যায়। গাছের কাণ্ড ও শস্যের গুণমান উন্নত করতে পটাশ (MOP) সার প্রয়োগ করুন।",
    ph: "মাটির আদর্শ পিএইচ ৬.০ থেকে ৭.৫ এর মধ্যে হওয়া উচিত। অম্লীয় মাটির (pH < 6.0) জন্য চুন যোগ করুন এবং ক্ষারীয় মাটির (pH > 7.5) জন্য জিপসাম ব্যবহার করুন।",
    pest: "সাধারণ পোকা দমনে প্রতি সপ্তাহে নিম তেল (1500 ppm) সাবান জলের সঙ্গে মিশিয়ে স্প্রে করুন। মারাত্মক আক্রমণের জন্য আমাদের পেস্ট অ্যাডভাইজার দেখুন।",
    irrigation: "আমাদের স্মার্ট সেচ ব্যবস্থা মাটির আর্দ্রতা এবং আবহাওয়ার পূর্বাভাস ট্র্যাক করে। জল বাঁচাতে সকাল বা সন্ধ্যায় ড্রিপ সেচ ব্যবহার করুন।",
    market: "মন্ডির বাজার দর চাহিদা অনুযায়ী পরিবর্তিত হয়। আমাদের বাজার দর তালিকাটি দেখুন এবং সর্বাধিক লাভজনক ফসলটি চাষের জন্য বেছে নিন।",
    organic: "জৈব সার মাটির দীর্ঘমেয়াদী গঠন উন্নত করে। ভালোভাবে পচানো গোবর সার, খোল, জৈব কম্পোস্ট ব্যবহার করুন। পোকা দমনে নিম তেল স্প্রে করুন।",
    sandy: "বেলে মাটি জল ধরে রাখতে পারে না। মাটির জল ধারণ ক্ষমতা বাড়াতে জৈব সার, সবুজ সার ও জৈব কাঠকয়লা মেশান। মালচিং পদ্ধতি ব্যবহার করুন।",
    clayey: "এঁটেল মাটি জল ধরে রাখে তবে নিষ্কাশন ভালো নয়। এঁটেল মাটির গঠন হালকা করতে জিপসাম এবং জৈব কম্পোস্ট ভালো করে মেশান।",
    loam: "দোআঁশ মাটি চাষের জন্য আদর্শ। প্রতি বছর ভার্মিকম্পোস্ট প্রয়োগ করুন এবং শস্য আবর্তন পদ্ধতি ব্যবহার করুন।",
    stemborer: "মাজরা পোকা ধানের পাতা শুকিয়ে দেয়। ক্লোরেন্ট্রানিলিপ্রোল বা কারটাপ হাইড্রোক্লোরাইড স্প্রে করুন। ট্রাইকোগ্রামা জৈব কার্ড ব্যবহার করুন।",
    rust: "গম গাছের পাতায় মরচে রোগ হলে প্রোপিকোনাজোল ২৫% ইসি স্প্রে করুন। মাঠের চারপাশের আগাছা পরিষ্কার রাখুন।",
    whitefly: "তুলা গাছে সাদা মাছি পাতা কোঁকড়ানো রোগ ছড়ায়। হলুদ আঠালো ফাঁদ পাতুন। ডায়াফেন্টিউরন স্প্রে করুন।",
    armyworm: "ভুট্টায় ফল আর্মিওয়ার্ম পাতা ফুটো করে দেয়। স্পিনেটোরাম ১১.৭% এসসি স্প্রে করুন বা সন্ধ্যায় বিটি স্প্রে করুন।",
    default: "আমি আপনার কৃষি সহায়ক। আপনি মাটি, সার, কীট দমন (মাজরা পোকা, মরচে রোগ, সাদা মাছি), মন্ডির বাজার দর নিয়ে প্রশ্ন করতে পারেন অথবা আপনার ড্যাশবোর্ডের ডেটা মূল্যায়ন করতে 'soil audit' বলুন!"
  }
};

// Maps language codes to browser speech synthesis locales
const VOICE_LANGS = {
  en: "en-IN",
  hi: "hi-IN",
  ta: "ta-IN",
  te: "te-IN",
  bn: "bn-IN"
};

window.KrishiAssistant = class KrishiAssistant {
  constructor(lang = "en") {
    this.lang = lang;
    this.recognition = null;
    this.speechActive = false;
    this.initSpeech();
  }

  setLanguage(lang) {
    this.lang = lang;
  }

  initSpeech() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      
      this.recognition.onstart = () => {
        this.speechActive = true;
        if (this.onSpeechStateChange) this.onSpeechStateChange(true);
      };

      this.recognition.onend = () => {
        this.speechActive = false;
        if (this.onSpeechStateChange) this.onSpeechStateChange(false);
      };

      this.recognition.onerror = (e) => {
        console.error("Speech recognition error:", e.error);
        this.speechActive = false;
        if (this.onSpeechStateChange) this.onSpeechStateChange(false);
      };
    } else {
      console.warn("Web Speech Recognition not supported in this browser.");
    }
  }

  startListening(onResultCallback) {
    if (!this.recognition) return false;
    try {
      this.recognition.lang = VOICE_LANGS[this.lang] || "en-IN";
      this.recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        onResultCallback(text);
      };
      this.recognition.start();
      return true;
    } catch (e) {
      console.error("Failed to start speech recognition:", e);
      return false;
    }
  }

  stopListening() {
    if (this.recognition && this.speechActive) {
      this.recognition.stop();
    }
  }

  speak(text) {
    if (!window.speechSynthesis) return;
    
    // Stop any current speaking
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = VOICE_LANGS[this.lang] || "en-IN";
    
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(v => v.lang.startsWith(this.lang));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  }

  stopSpeaking() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  // Live DOM Soil Audit Auditor Method
  performSoilAudit() {
    try {
      const n = parseInt(document.getElementById("inputN").value) || 0;
      const p = parseInt(document.getElementById("inputP").value) || 0;
      const k = parseInt(document.getElementById("inputK").value) || 0;
      const ph = parseFloat(document.getElementById("inputPh").value) || 7.0;
      const moisture = parseInt(document.getElementById("inputMoisture").value) || 0;
      const regionEl = document.getElementById("inputRegion");
      const region = regionEl.options[regionEl.selectedIndex]?.text || "Punjab";
      
      let phText = "Neutral (नॉर्मल)";
      let rec = "Your parameters are standard. Balance with organic inputs.";
      
      if (this.lang === "hi") {
        phText = "तटस्थ (नॉर्मल)";
        rec = "आपके रसायन मानक हैं। केवल सामान्य कम्पोस्ट का उपयोग करें।";
      }

      if (ph < 5.5) {
        phText = this.lang === "hi" ? "अत्यधिक अम्लीय (Acidic)" : "Highly Acidic";
        rec = this.lang === "hi" ? "पीएच बढ़ाने के लिए खेत में प्रति एकड़ 200 किलोग्राम कृषि चूना (Lime) मिलाएं।" : "Soil pH is low. Spread agricultural lime (calcium carbonate) @ 200kg/acre to raise pH.";
      } else if (ph > 7.8) {
        phText = this.lang === "hi" ? "अत्यधिक क्षारीय (Alkaline)" : "Highly Alkaline";
        rec = this.lang === "hi" ? "क्षारीयता कम करने के लिए प्रति एकड़ 2-3 बैग कृषि जिप्सम (Gypsum) मिलाएं।" : "Soil is alkaline. Mix in 100-150kg/acre of agricultural gypsum to lower pH.";
      }

      let nutrientTip = "";
      if (n < 60) {
        nutrientTip += this.lang === "hi" ? " नाइट्रोजन काफी कम है, यूरिया या गोबर खाद डालें।" : " Nitrogen is low; top-dress with Urea or rich vermicompost.";
      }
      if (p < 35) {
        nutrientTip += this.lang === "hi" ? " फास्फोरस कम है, सुपर फास्फेट (SSP) या DAP डालें।" : " Phosphorus is low; apply Single Super Phosphate (SSP) or DAP.";
      }
      if (k < 35) {
        nutrientTip += this.lang === "hi" ? " पोटाश कम है, म्यूटेट ऑफ पोटाश (MOP) डालें।" : " Potassium is low; apply Muriate of Potash (MOP).";
      }

      if (this.lang === "hi") {
        return `मिट्टी स्वास्थ्य ऑडिट विश्लेषण: आपके सक्रिय आंकड़े N=${n}, P=${p}, K=${k}, pH=${ph} (${phText}), और नमी=${moisture}% हैं। ${region} क्षेत्र में: ${rec}${nutrientTip}`;
      } else if (this.lang === "ta") {
        return `மண் பரிசோதனை அறிக்கை: உங்கள் அளவுகள் N=${n}, P=${p}, K=${k}, pH=${ph}, மற்றும் ஈரப்பதம்=${moisture}%. இதில்: ${ph < 5.5 ? "அமிலத்தன்மை அதிகம். சுண்ணாம்பு இடுங்கள்." : "மண் தரம் நன்று."} சத்துக்கள் குறைபாட்டை சரிசெய்ய இயற்கை உரங்களை பயன்படுத்தவும்.`;
      } else if (this.lang === "te") {
        return `నేల ఆరోగ్య నివేదిక: మీ విలువలు N=${n}, P=${p}, K=${k}, pH=${ph}, మరియు తేమ=${moisture}%. సూచన: ${ph < 5.5 ? "ఆమ్ల నేల. సున్నం చల్లండి." : "నేల నాణ్యత బాగుంది."} పోషకాల లోపానికి తగిన ఎరువులు వాడండి.`;
      } else if (this.lang === "bn") {
        return `মাটি স্বাস্থ্য রিপোর্ট: আপনার ইনপুট N=${n}, P=${p}, K=${k}, pH=${ph}, এবং আর্দ্রতা=${moisture}%. মাটি ${ph < 5.5 ? "অত্যন্ত অম্লীয়। চুন মেশান।" : "স্বাভাবিক মাটির গঠন।"} ইউরিয়া ও পটাশ সার ব্যবহার করুন।`;
      }

      return `Soil Health Audit: Your current dashboard parameters are N=${n}, P=${p}, K=${k}, pH=${ph} (${phText}), and Moisture=${moisture}% in ${region}. Diagnosis: ${rec}${nutrientTip}`;
    } catch (e) {
      return this.lang === "hi" ? "ऑडिट करने के लिए कृपया पहले मिट्टी का डेटा फॉर्म भरें।" : "To audit, please fill out the soil forms first.";
    }
  }

  getResponse(query) {
    const q = query.toLowerCase();
    const dict = RESPONSES[this.lang] || RESPONSES.en;

    // Detect Soil Audit Intent
    if (q.includes("audit") || q.includes("ऑडिट") || q.includes("மதிப்பீடு") || q.includes("how is my soil") || q.includes("मेरी मिट्टी")) {
      return this.performSoilAudit();
    }

    // Stem borer paddy
    if (q.includes("stem borer") || q.includes("stemborer") || q.includes("छेदक") || q.includes("குருத்துப்பூச்சி") || q.includes("மাজরা")) {
      return dict.stemborer;
    }

    // Wheat rust
    if (q.includes("rust") || q.includes("गेरुआ") || q.includes("துரு நோய்") || q.includes("মরচে")) {
      return dict.rust;
    }

    // Cotton whitefly
    if (q.includes("whitefly") || q.includes("white fly") || q.includes("सफेद मक्खी") || q.includes("வெள்ளை ஈ") || q.includes("తెల్లదోమ") || q.includes("সাদা মাছি")) {
      return dict.whitefly;
    }

    // Armyworm maize
    if (q.includes("armyworm") || q.includes("army worm") || q.includes("आर्मीवॉर्म") || q.includes("படைப்புழு") || q.includes("కత్తెర పురుగు")) {
      return dict.armyworm;
    }

    // Organic compost
    if (q.includes("organic") || q.includes("compost") || q.includes("manure") || q.includes("जैविक") || q.includes("गोबर") || q.includes("இயற்கை உரம்") || q.includes("సేంద్రీయ")) {
      return dict.organic;
    }

    // Soil types triggers
    if (q.includes("sandy") || q.includes("बलुई") || q.includes("மணல்") || q.includes("ఇసుక") || q.includes("বেলে")) {
      return dict.sandy;
    }
    if (q.includes("clay") || q.includes("चिकनी") || q.includes("களிமண்") || q.includes("నల్లరేగడి") || q.includes("এঁটেল")) {
      return dict.clayey;
    }
    if (q.includes("loam") || q.includes("दोमट") || q.includes("வண்டல்") || q.includes("ఎర్ర") || q.includes("দোআঁশ")) {
      return dict.loamy;
    }

    // Standard variables triggers
    if (q.includes("nitrogen") || q.includes("नाइट्रोजन") || q.includes("நைட்ரஜன்") || q.includes("నత్రజని")) {
      return dict.nitrogen;
    }
    if (q.includes("phosphorus") || q.includes("फास्फोरस") || q.includes("பாஸ்பரஸ்") || q.includes("భాస్వరం")) {
      return dict.phosphorus;
    }
    if (q.includes("potassium") || q.includes("पोटेशियम") || q.includes("பொட்டாசியம்") || q.includes("పొటాషియం") || q.includes("পটাশ")) {
      return dict.potassium;
    }
    if (q.includes("ph") || q.includes("पीएच") || q.includes("பிஎச்")) {
      return dict.ph;
    }
    if (q.includes("pest") || q.includes("कीट") || q.includes("பூச்சி") || q.includes("తెగులు") || q.includes("পোকা")) {
      return dict.pest;
    }
    if (q.includes("irrigation") || q.includes("सिंचाई") || q.includes("பாசனம்") || q.includes("నీటి పారుదల") || q.includes("সেচ")) {
      return dict.irrigation;
    }
    if (q.includes("market") || q.includes("मंडी") || q.includes("விலை") || q.includes("ధర") || q.includes("price") || q.includes("भाव") || q.includes("দর")) {
      return dict.market;
    }

    return dict.default;
  }
}
