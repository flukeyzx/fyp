const LOCATIONS = [
  // United States
  "New York, USA",
  "Los Angeles, USA",
  "Chicago, USA",
  "Houston, USA",
  "Phoenix, USA",
  "Philadelphia, USA",
  "San Antonio, USA",
  "San Diego, USA",
  "Dallas, USA",
  "San Jose, USA",
  "San Francisco, USA",
  "Seattle, USA",
  "Boston, USA",
  "Miami, USA",
  "Las Vegas, USA",

  // United Kingdom
  "London, UK",
  "Manchester, UK",
  "Birmingham, UK",
  "Liverpool, UK",
  "Edinburgh, UK",
  "Glasgow, UK",

  // Germany
  "Berlin, Germany",
  "Munich, Germany",
  "Hamburg, Germany",
  "Frankfurt, Germany",
  "Cologne, Germany",

  // France
  "Paris, France",
  "Marseille, France",
  "Lyon, France",
  "Toulouse, France",
  "Nice, France",

  // Japan
  "Tokyo, Japan",
  "Osaka, Japan",
  "Kyoto, Japan",
  "Yokohama, Japan",
  "Nagoya, Japan",

  // Australia
  "Sydney, Australia",
  "Melbourne, Australia",
  "Brisbane, Australia",
  "Perth, Australia",
  "Adelaide, Australia",

  // Canada
  "Toronto, Canada",
  "Vancouver, Canada",
  "Montreal, Canada",
  "Calgary, Canada",
  "Ottawa, Canada",

  // China
  "Beijing, China",
  "Shanghai, China",
  "Hong Kong, China",
  "Guangzhou, China",
  "Shenzhen, China",

  // India
  "Mumbai, India",
  "Delhi, India",
  "Bangalore, India",
  "Hyderabad, India",
  "Chennai, India",

  // Russia
  "Moscow, Russia",
  "Saint Petersburg, Russia",
  "Novosibirsk, Russia",

  // Pakistan (all major cities)
  "Karachi, Pakistan",
  "Lahore, Pakistan",
  "Faisalabad, Pakistan",
  "Rawalpindi, Pakistan",
  "Multan, Pakistan",
  "Hyderabad, Pakistan",
  "Gujranwala, Pakistan",
  "Peshawar, Pakistan",
  "Quetta, Pakistan",
  "Islamabad, Pakistan",
  "Bahawalpur, Pakistan",
  "Sargodha, Pakistan",
  "Sialkot, Pakistan",
  "Sukkur, Pakistan",
  "Larkana, Pakistan",
  "Sheikhupura, Pakistan",
  "Mardan, Pakistan",
  "Gujrat, Pakistan",
  "Kasur, Pakistan",
  "Rahim Yar Khan, Pakistan",
  "Sahiwal, Pakistan",
  "Okara, Pakistan",
  "Wah Cantonment, Pakistan",
  "Dera Ghazi Khan, Pakistan",
  "Mirpur Khas, Pakistan",
  "Nawabshah, Pakistan",
  "Mingora, Pakistan",
  "Chiniot, Pakistan",
  "Kamoke, Pakistan",
  "Hafizabad, Pakistan",
  "Kot Addu, Pakistan",
  "Mandi Bahauddin, Pakistan",
  "Attock, Pakistan",
  "Jhelum, Pakistan",
  "Murree, Pakistan",
  "Skardu, Pakistan",
  "Gilgit, Pakistan",

  // Other notable global cities
  "Dubai, UAE",
  "Singapore, Singapore",
  "Bangkok, Thailand",
  "Seoul, South Korea",
  "Mexico City, Mexico",
  "Cairo, Egypt",
  "Johannesburg, South Africa",
  "Nairobi, Kenya",
  "Istanbul, Turkey",
  "Rome, Italy",
  "Madrid, Spain",
  "Amsterdam, Netherlands",
  "Brussels, Belgium",
  "Vienna, Austria",
  "Zurich, Switzerland",
  "Stockholm, Sweden",
  "Copenhagen, Denmark",
  "Oslo, Norway",
  "Helsinki, Finland",
  "Warsaw, Poland",
  "Prague, Czech Republic",
  "Budapest, Hungary",
  "Athens, Greece",
  "Dublin, Ireland",
  "Reykjavik, Iceland",
  "Taipei, Taiwan",
  "Manila, Philippines",
  "Jakarta, Indonesia",
  "Kuala Lumpur, Malaysia",
  "Hanoi, Vietnam",
  "Ho Chi Minh City, Vietnam",
  "Dhaka, Bangladesh",
  "Colombo, Sri Lanka",
  "Kathmandu, Nepal",
  "Tehran, Iran",
  "Baghdad, Iraq",
  "Riyadh, Saudi Arabia",
  "Doha, Qatar",
  "Kuwait City, Kuwait",
  "Muscat, Oman",
  "Jerusalem, Israel",
  "Tel Aviv, Israel",
  "Beirut, Lebanon",
  "Amman, Jordan",
  "Damascus, Syria",
  "Sana'a, Yemen",
  "Addis Ababa, Ethiopia",
  "Khartoum, Sudan",
  "Lagos, Nigeria",
  "Accra, Ghana",
  "Dar es Salaam, Tanzania",
  "Kampala, Uganda",
  "Lusaka, Zambia",
  "Harare, Zimbabwe",
  "Cape Town, South Africa",
  "Auckland, New Zealand",
  "Wellington, New Zealand",
  "Honolulu, USA",
  "Anchorage, USA",
  "Hawaii, USA",
  // Afghanistan
  "Kabul, Afghanistan",
  "Kandahar, Afghanistan",
  "Herat, Afghanistan",

  // Bangladesh
  "Chittagong, Bangladesh",
  "Khulna, Bangladesh",
  "Sylhet, Bangladesh",

  // Bhutan
  "Thimphu, Bhutan",
  "Paro, Bhutan",

  // Cambodia
  "Phnom Penh, Cambodia",
  "Siem Reap, Cambodia",

  // Indonesia
  "Surabaya, Indonesia",
  "Bandung, Indonesia",
  "Medan, Indonesia",
  "Bali, Indonesia",

  // Iran
  "Mashhad, Iran",
  "Isfahan, Iran",
  "Tabriz, Iran",

  // Iraq
  "Basra, Iraq",
  "Mosul, Iraq",
  "Erbil, Iraq",

  // Israel
  "Haifa, Israel",
  "Eilat, Israel",

  // Jordan
  "Aqaba, Jordan",
  "Petra, Jordan",

  // Kazakhstan
  "Almaty, Kazakhstan",
  "Nur-Sultan (Astana), Kazakhstan",

  // Kyrgyzstan
  "Bishkek, Kyrgyzstan",
  "Osh, Kyrgyzstan",

  // Laos
  "Vientiane, Laos",
  "Luang Prabang, Laos",

  // Lebanon
  "Tripoli, Lebanon",
  "Byblos, Lebanon",

  // Malaysia
  "Penang, Malaysia",
  "Johor Bahru, Malaysia",
  "Kuching, Malaysia",

  // Maldives
  "Malé, Maldives",

  // Mongolia
  "Ulaanbaatar, Mongolia",

  // Myanmar (Burma)
  "Yangon, Myanmar",
  "Mandalay, Myanmar",
  "Naypyidaw, Myanmar",

  // Nepal
  "Pokhara, Nepal",
  "Bhaktapur, Nepal",

  // North Korea
  "Pyongyang, North Korea",

  // Oman
  "Salalah, Oman",

  // Palestine
  "Gaza City, Palestine",
  "Ramallah, Palestine",

  // Philippines
  "Cebu City, Philippines",
  "Davao City, Philippines",
  "Baguio, Philippines",

  // Saudi Arabia
  "Jeddah, Saudi Arabia",
  "Mecca, Saudi Arabia",
  "Medina, Saudi Arabia",
  "Dammam, Saudi Arabia",

  // Sri Lanka
  "Kandy, Sri Lanka",
  "Galle, Sri Lanka",
  "Negombo, Sri Lanka",

  // Syria
  "Aleppo, Syria",
  "Homs, Syria",
  "Latakia, Syria",

  // Tajikistan
  "Dushanbe, Tajikistan",

  // Thailand
  "Chiang Mai, Thailand",
  "Phuket, Thailand",
  "Pattaya, Thailand",

  // Turkmenistan
  "Ashgabat, Turkmenistan",

  // Uzbekistan
  "Tashkent, Uzbekistan",
  "Samarkand, Uzbekistan",
  "Bukhara, Uzbekistan",

  // Vietnam
  "Da Nang, Vietnam",
  "Hue, Vietnam",
  "Nha Trang, Vietnam",

  // Yemen
  "Aden, Yemen",
  "Taiz, Yemen",
  // Algeria
  "Algiers, Algeria",
  "Oran, Algeria",
  "Constantine, Algeria",

  // Angola
  "Luanda, Angola",
  "Lubango, Angola",

  // Benin
  "Cotonou, Benin",
  "Porto-Novo, Benin",

  // Botswana
  "Gaborone, Botswana",
  "Francistown, Botswana",

  // Burkina Faso
  "Ouagadougou, Burkina Faso",
  "Bobo-Dioulasso, Burkina Faso",

  // Burundi
  "Bujumbura, Burundi",

  // Cameroon
  "Douala, Cameroon",
  "Yaoundé, Cameroon",

  // Central African Republic
  "Bangui, Central African Republic",

  // Chad
  "N'Djamena, Chad",

  // Comoros
  "Moroni, Comoros",

  // Congo (DRC)
  "Kinshasa, DR Congo",
  "Lubumbashi, DR Congo",

  // Congo (Republic)
  "Brazzaville, Republic of the Congo",
  "Pointe-Noire, Republic of the Congo",

  // Côte d'Ivoire (Ivory Coast)
  "Abidjan, Ivory Coast",
  "Yamoussoukro, Ivory Coast",

  // Djibouti
  "Djibouti City, Djibouti",

  // Egypt (additional)
  "Alexandria, Egypt",
  "Luxor, Egypt",
  "Sharm El Sheikh, Egypt",

  // Equatorial Guinea
  "Malabo, Equatorial Guinea",

  // Eritrea
  "Asmara, Eritrea",

  // Eswatini (Swaziland)
  "Mbabane, Eswatini",
  "Manzini, Eswatini",

  // Ethiopia (additional)
  "Dire Dawa, Ethiopia",
  "Gondar, Ethiopia",

  // Gabon
  "Libreville, Gabon",

  // Gambia
  "Banjul, Gambia",
  "Serekunda, Gambia",

  // Ghana (additional)
  "Kumasi, Ghana",
  "Tamale, Ghana",

  // Guinea
  "Conakry, Guinea",

  // Guinea-Bissau
  "Bissau, Guinea-Bissau",

  // Kenya (additional)
  "Mombasa, Kenya",
  "Kisumu, Kenya",
  "Nakuru, Kenya",

  // Lesotho
  "Maseru, Lesotho",

  // Liberia
  "Monrovia, Liberia",

  // Libya
  "Tripoli, Libya",
  "Benghazi, Libya",

  // Madagascar
  "Antananarivo, Madagascar",
  "Toamasina, Madagascar",

  // Malawi
  "Lilongwe, Malawi",
  "Blantyre, Malawi",

  // Mali
  "Bamako, Mali",
  "Timbuktu, Mali",

  // Mauritania
  "Nouakchott, Mauritania",
  "Nouadhibou, Mauritania",

  // Mauritius
  "Port Louis, Mauritius",

  // Morocco (additional)
  "Casablanca, Morocco",
  "Fes, Morocco",
  "Tangier, Morocco",
  "Marrakech, Morocco",

  // Mozambique
  "Maputo, Mozambique",
  "Beira, Mozambique",

  // Namibia
  "Windhoek, Namibia",
  "Swakopmund, Namibia",

  // Niger
  "Niamey, Niger",

  // Nigeria (additional)
  "Abuja, Nigeria",
  "Kano, Nigeria",
  "Port Harcourt, Nigeria",
  "Benin City, Nigeria",

  // Rwanda
  "Kigali, Rwanda",

  // São Tomé and Príncipe
  "São Tomé, São Tomé and Príncipe",

  // Senegal
  "Dakar, Senegal",
  "Saint-Louis, Senegal",

  // Seychelles
  "Victoria, Seychelles",

  // Sierra Leone
  "Freetown, Sierra Leone",

  // Somalia
  "Mogadishu, Somalia",
  "Hargeisa, Somalia",

  // South Africa (additional)
  "Durban, South Africa",
  "Pretoria, South Africa",
  "Port Elizabeth, South Africa",

  // South Sudan
  "Juba, South Sudan",

  // Sudan (additional)
  "Port Sudan, Sudan",

  // Tanzania (additional)
  "Zanzibar City, Tanzania",
  "Arusha, Tanzania",

  // Togo
  "Lomé, Togo",

  // Tunisia
  "Tunis, Tunisia",
  "Sfax, Tunisia",
  "Sousse, Tunisia",

  // Uganda (additional)
  "Entebbe, Uganda",
  "Jinja, Uganda",

  // Zambia (additional)
  "Livingstone, Zambia",

  // Zimbabwe (additional)
  "Bulawayo, Zimbabwe",
  "Victoria Falls, Zimbabwe",

  // Albania
  "Tirana, Albania",
  "Durrës, Albania",

  // Andorra
  "Andorra la Vella, Andorra",

  // Armenia
  "Yerevan, Armenia",
  "Gyumri, Armenia",

  // Austria (additional)
  "Salzburg, Austria",
  "Graz, Austria",
  "Innsbruck, Austria",

  // Azerbaijan
  "Baku, Azerbaijan",
  "Ganja, Azerbaijan",

  // Belarus
  "Minsk, Belarus",
  "Gomel, Belarus",

  // Belgium (additional)
  "Antwerp, Belgium",
  "Ghent, Belgium",
  "Bruges, Belgium",

  // Bosnia and Herzegovina
  "Sarajevo, Bosnia",
  "Mostar, Bosnia",
  "Banja Luka, Bosnia",

  // Bulgaria
  "Sofia, Bulgaria",
  "Plovdiv, Bulgaria",
  "Varna, Bulgaria",

  // Croatia
  "Zagreb, Croatia",
  "Split, Croatia",
  "Dubrovnik, Croatia",

  // Cyprus
  "Nicosia, Cyprus",
  "Limassol, Cyprus",
  "Paphos, Cyprus",

  // Czech Republic (additional)
  "Brno, Czech Republic",
  "Ostrava, Czech Republic",
  "Český Krumlov, Czech Republic",

  // Denmark (additional)
  "Aarhus, Denmark",
  "Odense, Denmark",
  "Aalborg, Denmark",

  // Estonia
  "Tallinn, Estonia",
  "Tartu, Estonia",

  // Finland (additional)
  "Tampere, Finland",
  "Turku, Finland",
  "Rovaniemi, Finland",

  // Georgia
  "Tbilisi, Georgia",
  "Batumi, Georgia",
  "Kutaisi, Georgia",

  // Greece (additional)
  "Thessaloniki, Greece",
  "Patras, Greece",
  "Heraklion, Greece",
  "Rhodes, Greece",

  // Hungary (additional)
  "Debrecen, Hungary",
  "Pécs, Hungary",
  "Szeged, Hungary",

  // Iceland (additional)
  "Akureyri, Iceland",
  "Vík, Iceland",

  // Ireland (additional)
  "Cork, Ireland",
  "Galway, Ireland",
  "Limerick, Ireland",

  // Italy (additional)
  "Milan, Italy",
  "Venice, Italy",
  "Florence, Italy",
  "Naples, Italy",
  "Bologna, Italy",
  "Palermo, Italy",
  "Verona, Italy",
  "Turin, Italy",

  // Kosovo
  "Pristina, Kosovo",
  "Prizren, Kosovo",

  // Latvia
  "Riga, Latvia",
  "Daugavpils, Latvia",

  // Lithuania
  "Vilnius, Lithuania",
  "Kaunas, Lithuania",
  "Klaipėda, Lithuania",

  // Luxembourg
  "Luxembourg City, Luxembourg",

  // Malta
  "Valletta, Malta",
  "Mdina, Malta",

  // Moldova
  "Chișinău, Moldova",
  "Tiraspol, Moldova",

  // Montenegro
  "Podgorica, Montenegro",
  "Kotor, Montenegro",
  "Budva, Montenegro",

  // Netherlands (additional)
  "Rotterdam, Netherlands",
  "The Hague, Netherlands",
  "Utrecht, Netherlands",
  "Eindhoven, Netherlands",

  // North Macedonia
  "Skopje, North Macedonia",
  "Ohrid, North Macedonia",

  // Norway (additional)
  "Bergen, Norway",
  "Trondheim, Norway",
  "Stavanger, Norway",
  "Tromsø, Norway",

  // Poland (additional)
  "Kraków, Poland",
  "Wrocław, Poland",
  "Gdańsk, Poland",
  "Poznań, Poland",

  // Portugal (additional)
  "Porto, Portugal",
  "Lisbon, Portugal",
  "Faro, Portugal",
  "Coimbra, Portugal",

  // Romania
  "Bucharest, Romania",
  "Cluj-Napoca, Romania",
  "Timișoara, Romania",
  "Brașov, Romania",

  // San Marino
  "San Marino, San Marino",

  // Serbia
  "Belgrade, Serbia",
  "Novi Sad, Serbia",
  "Niš, Serbia",

  // Slovakia
  "Bratislava, Slovakia",
  "Košice, Slovakia",

  // Slovenia
  "Ljubljana, Slovenia",
  "Maribor, Slovenia",
  "Bled, Slovenia",

  // Spain (additional)
  "Barcelona, Spain",
  "Valencia, Spain",
  "Seville, Spain",
  "Bilbao, Spain",
  "Granada, Spain",
  "Málaga, Spain",
  "Santiago de Compostela, Spain",

  // Sweden (additional)
  "Gothenburg, Sweden",
  "Malmö, Sweden",
  "Uppsala, Sweden",

  // Switzerland (additional)
  "Geneva, Switzerland",
  "Basel, Switzerland",
  "Lausanne, Switzerland",
  "Lucerne, Switzerland",

  // Ukraine
  "Kyiv, Ukraine",
  "Lviv, Ukraine",
  "Odessa, Ukraine",
  "Kharkiv, Ukraine",

  // Vatican City
  "Vatican City, Vatican City",

  // Argentina (additional)
  "Buenos Aires, Argentina",
  "Córdoba, Argentina",
  "Rosario, Argentina",
  "Mendoza, Argentina",
  "Bariloche, Argentina",
  "Salta, Argentina",

  // Bolivia
  "La Paz, Bolivia",
  "Santa Cruz, Bolivia",
  "Sucre, Bolivia",
  "Cochabamba, Bolivia",

  // Brazil (additional)
  "São Paulo, Brazil",
  "Rio de Janeiro, Brazil",
  "Salvador, Brazil",
  "Brasília, Brazil",
  "Fortaleza, Brazil",
  "Belo Horizonte, Brazil",
  "Manaus, Brazil",
  "Curitiba, Brazil",
  "Recife, Brazil",
  "Porto Alegre, Brazil",
  "Florianópolis, Brazil",

  // Chile
  "Santiago, Chile",
  "Valparaíso, Chile",
  "Concepción, Chile",
  "Antofagasta, Chile",
  "Puerto Montt, Chile",
  "Punta Arenas, Chile",

  // Colombia
  "Bogotá, Colombia",
  "Medellín, Colombia",
  "Cali, Colombia",
  "Cartagena, Colombia",
  "Barranquilla, Colombia",
  "Santa Marta, Colombia",

  // Ecuador
  "Quito, Ecuador",
  "Guayaquil, Ecuador",
  "Cuenca, Ecuador",
  "Galápagos Islands, Ecuador",

  // Falkland Islands (UK)
  "Stanley, Falkland Islands",

  // French Guiana (France)
  "Cayenne, French Guiana",

  // Guyana
  "Georgetown, Guyana",
  "Linden, Guyana",

  // Paraguay
  "Asunción, Paraguay",
  "Ciudad del Este, Paraguay",
  "Encarnación, Paraguay",

  // Peru
  "Lima, Peru",
  "Cusco, Peru",
  "Arequipa, Peru",
  "Trujillo, Peru",
  "Iquitos, Peru",
  "Machu Picchu, Peru",

  // Suriname
  "Paramaribo, Suriname",
  "Lelydorp, Suriname",

  // Uruguay
  "Montevideo, Uruguay",
  "Punta del Este, Uruguay",
  "Colonia del Sacramento, Uruguay",

  // Venezuela
  "Caracas, Venezuela",
  "Maracaibo, Venezuela",
  "Valencia, Venezuela",
  "Mérida, Venezuela",
  "Margarita Island, Venezuela",
];

export default LOCATIONS;
