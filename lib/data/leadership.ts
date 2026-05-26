export type TeamGroup = "Director" | "Deputy" | "Scientific Team" | "Administrative & Support" | "Developer";

export type TeamProfile = {
  slug: string;
  name: string;
  role: string;
  group: TeamGroup;
  specialization: string;
  institution?: string;
  image?: string;
  imagePosition?: string;
  featuredSummary?: string;
  profileSummary?: string[];
  qualifications?: string[];
  researchInterests?: string[];
  roleAtCentre?: string;
  email?: string;
  phone?: string;
  googleScholar?: string;
};

export const director: TeamProfile = {
  slug: "dauda-bawa",
  name: "Prof. Dauda B. Bawa",
  role: "Director",
  group: "Director",
  specialization: "Institutional leadership, research coordination, and food security systems",
  institution: "TETFund Centre of Excellence in Food Security, University of Jos",
  image: "/people/dauda-bawa.png",
  featuredSummary:
    "Prof. Dauda B. Bawa assumed office as Director of the TETFund Centre of Excellence in Food Security in April 2025. Since assumption of duty, he has led a structured institutional repositioning process focused on strengthening research capacity, infrastructure readiness, postgraduate programme development, enterprise sustainability, and strategic partnerships. Under his leadership, the Centre has expanded scientific staffing, strengthened documentation and performance tracking systems, activated enterprise-driven agricultural initiatives, enhanced infrastructure utilization, and aligned operations with TETFund Monitoring and Evaluation expectations.",
};

export const deputies: TeamProfile[] = [
  {
    slug: "deshi-kyenpiya-eunice",
    name: "Dr. Deshi Kyenpiya Eunice",
    role: "Deputy Director (Innovation and Entrepreneurship)",
    group: "Deputy",
    specialization: "Plant Science and Biotechnology",
    image: "/people/deshi-kyenpiya-eunice.jpg",
    imagePosition: "center 15%",
    roleAtCentre: "Deputy Director (Innovation and Entrepreneurship)",
    email: "deshik@unijos.edu.ng",
    googleScholar: "https://scholar.google.com/citations?user=z5ObiLQAAAAJ&hl=en",
    phone: "+2348060997792",
    qualifications: ["PhD Plant Physiology", "M.Sc. Cytogenetics and Plant Breeding"],
    researchInterests: [
      "Plant Physiology",
      "Genetics and Plant Breeding",
      "Horticulture",
      "Plant Multiplication Techniques",
      "Post-Harvest Management",
      "Seed Technology",
    ],
    profileSummary: [
      "Dr. Kyenpiya Eunice Deshi is a Reader in the Department of Plant Science and Biotechnology and a Deputy Director (Innovation and Entrepreneurship) at the TETFund Centre of Excellence in Food Security, at the University of Jos, Nigeria. She holds a Ph.D. in Plant Physiology and an M.Sc. in Cytogenetics and Plant Breeding.",
      "She obtained trainings in: seed potato technology, certification and supply systems at Center for Development Innovation, Wageningen, the Netherlands; post-harvest management of maize, rice and legumes at the University of Sydney; Project Management Cycle at CRUDAN Headquarters, Jos; and Plant Breeding to Fight Hunger at Michigan State University, USA.",
      "She has held several leadership roles in the Department of Plant Science and Biotechnology at the University of Jos, including Post Graduate Programme Coordinator, Cytogenetics and Plant Breeding, Examination Officer, Level Coordinator, and Chairperson of Botanical Garden Committee of the Department.",
      "She teaches and conducts research with both undergraduate and postgraduate students. Several of her research findings have been published in both local and international journals. She is a member of professional bodies such as Botanical Society of Nigeria, International Society for Horticultural Science (ISHS), Genetics Society of Nigeria (GSN), African Potato Association (APA), and Plant Breeding Association of Nigeria (PBAN).",
      "For her community service, she is involved with different organizations and communities, including Country Women Association of Nigeria (COWAN), GIZ, SASAKAWA Africa, National Potato Multistakeholder Forum, and SHARON Multipurpose Cooperative. She is the founder of RITDUN Integrated Farm Resources, a home garden where she grows exotic fruits and vegetables and provides professional services on the growth of exotic fruits to potential farmers. Schools and institutions visit the garden as a learning centre."
    ],
    featuredSummary:
      "Dr. Deshi Kyenpiya Eunice is a Reader in Plant Science and Biotechnology at the University of Jos, with expertise in seed science, plant physiology, and sustainable crop systems. Trained internationally in seed potato technology and post-harvest management, she leads innovation, enterprise development, and commercialization initiatives within the Centre, strengthening value addition and agribusiness integration.",
  },
  {
    slug: "uchele-okpanachi",
    name: "Prof. Uchele Okpanachi",
    role: "Deputy Director (Training and Research)",
    group: "Deputy",
    specialization: "Animal Science, ruminant nutrition, and sustainable livestock production",
    image: "/people/uchele-okpanachi.jpg",
    imagePosition: "center 15%",
    roleAtCentre: "Researcher and Deputy Director Training & Research",
    email: "Okpanachiu@unijos.edu.ng",
    googleScholar: "https://scholar.google.com/citations?hl=en&user=16hLHPcAAAAJ",
    phone: "+2348034377953",
    qualifications: [
      "B.Agric. Animal Production",
      "M.Sc. Animal Nutrition & Biochemistry",
      "PhD Animal Nutrition",
    ],
    researchInterests: [
      "Feed Formulation",
      "Ruminant Nutrition",
      "Consultancy",
      "Livestock Training",
      "In Vitro Gas Production",
    ],
    profileSummary: [
      "Prof. Uchele Okpanachi is a Professor of Animal Science at the University of Jos and the Deputy Director (Training and Research) at the TETFund Centre of Excellence in Food Security (TCoEFS), University of Jos.",
      "He holds a B.Agric. (Animal Production), M.Sc. (Animal Nutrition & Biochemistry) and Ph.D. (Animal Nutrition). He obtained trainings in: Low-cost Animal Feed Formulation & Production for poultry & livestock, in vitro gas Production, Small Ruminant (Sheep & Goats) Production, Animal Science related Computer Software application among others.",
      "He has held several leadership roles including Examination Officer, Head of Department and currently the Deputy Dean, Faculty of Agriculture, University of Jos. He has published over eighty-three (83) publications in journals and edited conference papers and has presented papers at both international and national conferences.",
      "He has taught and supervised several students at undergraduate and postgraduate levels and has been external examiner and assessor to several universities within and outside Nigeria. A Registered Animal Scientist (RAS) and member of Animal Science Association of Nigeria (ASAN), Nigerian Society for Animal Production (NSAP), Nigerian Institute of Animal Science (NIAS), Biotechnology Society of Nigeria, North Central Region, Agricultural Policy Research Network (APRNet), Bioethics Society of Nigeria and Society of Christian Scholars.",
      "He conducts extensive research in low-cost animal and pet feeds, environmental protection through the reduction in greenhouse gases, and use of medications from medicinal plants among others. He has been involved in several trainings, consultancies and has won and attracted some grants, consulting for World Bank, African Development Bank among others."
    ],
    featuredSummary:
      "Prof. Uchele Okpanachi is a Professor of Animal Science specializing in ruminant nutrition and sustainable livestock production. With extensive academic leadership experience and over 80 scholarly publications, he coordinates research delivery, postgraduate supervision, and capacity-building programmes, ensuring alignment with TETFund performance standards and institutional priorities.",
  },
];

export const scientificTeam: TeamProfile[] = [
  {
    slug: "rosemary-anga",
    name: "Dr. Rosemary Anga",
    role: "Scientific Team Member",
    group: "Scientific Team",
    specialization: "Economics",
    image: "/people/rosemary-anga.png",
  },
  {
    slug: "idachaba-udagbene",
    name: "Dr. Idachaba Collins Udagbene",
    role: "Scientific Team Member",
    group: "Scientific Team",
    specialization: "Animal Production",
    image: "/people/idachaba-udagbene.jpg",
    googleScholar: "https://scholar.google.com/citations?user=REYAbTQAAAAJ",
    email: "udagbenei@unijos.edu.ng",
    phone: "+2348066222650",
    qualifications: ["B.Agric.", "M.Sc.", "PhD Animal Science"],
    researchInterests: [
      "Feed Science",
      "Animal Nutrition and Feeding Systems",
      "Sustainable Livestock Production Research",
      "Alternative Feed Resources for Monogastric Animals",
      "Alternative Protein Sources",
    ],
    profileSummary: [
      "Dr. Collins Udagbene Idachaba is a Reader in Animal Science (Monogastric Nutrition) in the Department of Animal Production, University of Jos, Nigeria. He holds a B.Agric., M.Sc., and Ph.D. in Animal Science (Monogastric Nutrition) from Ahmadu Bello University, Zaria.",
      "His academic career reflects a strong commitment to teaching, research, and institutional service, with progressive advancement from Lecturer I to Senior Lecturer and currently Reader. Dr. Idachaba's research focuses on poultry nutrition, feed resource utilization, enzyme and organic acid supplementation, and the valorization of agro-industrial by-products for cost-effective and sustainable monogastric production.",
      "His scholarly work addresses critical industry challenges such as phytate utilization, gut health modulation, alternative feed ingredients, and feed safety. He has authored and co-authored numerous peer-reviewed journal articles and conference papers, contributing significantly to broiler nutrition and feed technology.",
      "In addition to his research contributions, he plays key leadership roles within the University of Jos, including Departmental Examination Officer and Departmental Postgraduate Coordinator. He has previously served as SIWES Coordinator and Faculty Level Coordinator, demonstrating strong administrative and mentoring capacity.",
      "Dr. Idachaba actively supervises postgraduate research at M.Sc. and Ph.D. levels, fostering the next generation of animal nutrition scientists. He is a member of several professional bodies and a recipient of TETFund Institutional Research Grants."
    ],
  },
  {
    slug: "daniel-idakwo",
    name: "Daniel A. Idakwo",
    role: "Scientific Team Member",
    group: "Scientific Team",
    specialization: "Agricultural Economics",
    image: "/people/daniel-idakwo.png",
    email: "idakwod@unijos.edu.ng",
    phone: "+2348039665035",
    qualifications: ["M.Sc. Agricultural Economics"],
    researchInterests: ["Agricultural Economics", "Agribusiness", "Development Economics", "Production Economics"],
    profileSummary: [
      "Daniel A. Idakwo is a lecturer and doctoral researcher in Agricultural Economics at the University of Jos, Nigeria, with a strong commitment to advancing empirical research and policy-relevant analysis in the field of development economics.",
      "His academic work is situated at the intersection of food security, rural livelihoods, and applied econometrics, with particular emphasis on smallholder agriculture and household welfare dynamics in Nigeria.",
      "He holds extensive teaching and administrative experience, currently serving as an Exams Officer in the Department of Agricultural Economics and Extension, where he plays a key role in academic coordination and assessment management.",
      "His research portfolio spans critical areas such as food security among smallholder farmers, post-harvest losses, agricultural value chains, and the impact of development interventions, including the Fadama III-Additional Financing Project."
    ],
  },
  {
    slug: "solomon-folorunso",
    name: "Dr. Solomon Taiwo Folorunso",
    role: "Scientific Team Member",
    group: "Scientific Team",
    specialization: "Agricultural Economics & Extension",
    image: "/people/solomon-folorunso.jpg",
    roleAtCentre: "Researcher / Ag. Thematic Head",
    email: "folorunsos@unijos.edu.ng",
    phone: "+2348037018157",
    qualifications: ["B. Agriculture", "M.Sc.", "PhD"],
    researchInterests: ["Agricultural Development Economics", "Agricultural Production Economics"],
    profileSummary: [
      "Dr. Solomon Folorunso obtained B. Agriculture in 1998 at the Federal University of Agriculture, Abeokuta, Nigeria, and MSc. and PhD degrees in 2011 and 2016 respectively."
    ],
  },
  {
    slug: "olusegun-oshibanjo",
    name: "Dr. Oshibanjo Olusegun Debola",
    role: "Scientific Team Member",
    group: "Scientific Team",
    specialization: "Animal Production",
    image: "/people/olusegun-oshibanjo.jpeg",
    email: "oshibanjoo@unijos.edu.ng",
    googleScholar: "https://scholar.google.com/citations?user=7O-NR40AAAAJ&hl=en",
    phone: "+2348055438564",
    qualifications: ["PhD Animal Products and Processing Nutrition"],
    researchInterests: [
      "Functional Foods and Products Development",
      "Meat Science",
      "Molecular Docking",
      "Carcass Evaluation / Meat Quality Appraisal",
      "Value Addition / Food Safety",
    ],
    profileSummary: [
      "Dr. Olusegun Debola Oshibanjo is a Nigerian academic and researcher in Animal Science, currently serving as an Associate Professor in the Department of Animal Production at the University of Jos, Nigeria.",
      "His academic specialization lies in Animal Products and Processing Nutrition, with research interests focused on animal products processing, functional foods, meat science, phytomedicine, molecular docking, and nanotechnology applications in food and animal production systems.",
      "His research integrates animal science with emerging interdisciplinary approaches aimed at improving food quality, nutritional value, and sustainable livestock production systems. His work explores how bioactive compounds, advanced food processing technologies, and nutritional innovations can enhance animal-derived foods and contribute to disease prevention through functional food development.",
      "He has authored and co-authored several peer-reviewed publications in reputable journals, contributing to studies on animal nutrition, livestock performance, meat quality, and sustainable animal production practices.",
      "In addition to his teaching and research responsibilities, Dr. Oshibanjo contributes to interdisciplinary agricultural research initiatives and serves as a researcher and scientific team member at the TETFund Centre of Excellence in Food Security (TCoEFS) at the University of Jos, where he collaborates with experts across agriculture, veterinary science, and public health to address food security and One Health challenges in Nigeria and Africa."
    ],
  },
  {
    slug: "solomon-karshima",
    name: "Prof. Solomon Ngutor Karshima",
    role: "Scientific Team Member",
    group: "Scientific Team",
    specialization: "Veterinary Public Health & Preventive Medicine",
  },
  {
    slug: "stephen-dachi",
    name: "Prof. Stephen Nanbahal Dachi",
    role: "Scientific Team Member",
    group: "Scientific Team",
    specialization: "Crop Production",
  },
  {
    slug: "gloria-pisha",
    name: "Dr. Karaye Gloria Pisha",
    role: "Scientific Team Member",
    group: "Scientific Team",
    specialization: "Veterinary Parasitology & Entomology",
  },
  {
    slug: "ameji-onogu",
    name: "Dr. Ameji Negedu Onogu",
    role: "Research Team Lead",
    group: "Scientific Team",
    specialization: "Veterinary Science / Animal Production",
    roleAtCentre: "Research Team Lead",
    image: "/people/ameji-onogu.png",
    googleScholar: "https://scholar.google.com/citations?hl=en&user=3iNXILcAAAAJ",
    email: "amejio@unijos.edu.ng",
    phone: "+2348035907570",
    qualifications: [
      "Doctor of Veterinary Medicine (DVM, 2001)",
      "Master of Science in Veterinary Medicine (MSc, 2010)",
      "Doctor of Philosophy in Avian Medicine (PhD, 2015)",
    ],
    researchInterests: [
      "Avian and wildlife medicine",
      "Avian wildlife conservation and biodiversity",
    ],
    profileSummary: [
      "Dr. Ameji Negedu Onogu is a Research Team Lead in Veterinary Science / Animal Production at the University of Jos, Nigeria.",
      "He holds a DVM (2001), MSc in Veterinary Medicine (2010), and PhD in Avian Medicine (2015), with research interests in avian and wildlife medicine as well as avian wildlife conservation and biodiversity."
    ],
  },
  {
    slug: "adebisi-folashade",
    name: "Dr. Adebisi Oyedapo Folashade",
    role: "Scientific Team Member",
    group: "Scientific Team",
    specialization: "Animal Production",
  },
  {
    slug: "daniel-lenka",
    name: "Prof. Daniel Musa Lenka",
    role: "Scientific Team Member",
    group: "Scientific Team",
    specialization: "Agricultural Economics & Extension",
    image: "/people/daniel-lenka.png",
    email: "lenkad@unijos.edu.ng",
    phone: "+2348035372803",
    googleScholar: "https://scholar.google.com/citations?user=kkwDjVQAAAAJ&hl=id",
    qualifications: ["M.Sc. Agricultural Economics", "PhD"],
    researchInterests: ["Production economics", "Marketing", "Econometrics", "Seed Systems", "Socioeconomic Studies"],
    profileSummary: [
      "Professor Daniel Musa Lenka is a distinguished scholar in the Department of Agricultural Economics and Extension, Faculty of Agriculture, University of Jos. He specializes in Agricultural Economics, with core expertise in Production Economics and Econometrics.",
      "He obtained his M.Sc. in Agricultural Economics from Odessa Agricultural Institute, Ukraine, in 1992, and later earned his Ph.D. from Abubakar Tafawa Balewa University, Bauchi.",
      "He currently serves as a Professor and also holds academic responsibilities as the Departmental SIWES Coordinator and 500 Level Coordinator, Faculty Examination Officer University of Jos.",
      "Prof. Lenka has over two decades of professional experience in agricultural research, teaching, and development. Before joining the university system, he served extensively at the National Root Crops Research Institute, Umudike, where he contributed significantly to potato, ginger, and product development programmes.",
      "He has presented scholarly papers at reputable conferences such as the African Potato Association and the International Society for Tropical Root Crops Conference. Through numerous publications, consultancy engagements, and professional memberships, Prof. Lenka continues to contribute meaningfully to agricultural transformation, food security, and rural development in Nigeria."
    ],
  },
  {
    slug: "asinamai-bitrus",
    name: "Assoc. Prof. Asinamai Athliamai Bitrus",
    role: "Scientific Team Member",
    group: "Scientific Team",
    specialization: "Animal Production",
    image: "/people/asinamai-bitrus.jpeg",
    email: "bitrusaa@unijos.edu.ng",
    googleScholar: "https://scholar.google.com/citations?user=e4AwF9IAAAAJ&hl=en",
    phone: "+2348065680664",
    qualifications: ["PhD Bacteriology and Molecular Biology"],
    researchInterests: [
      "AMR",
      "Antimicrobial Stewardship",
      "Vaccine Development",
      "Epidemiology",
      "Molecular Biology",
    ],
    profileSummary: [
      "Dr. Asinamai Athliamai Bitrus is a Veterinarian and Reader with extensive experience in antimicrobial resistance (AMR) surveillance, animal health systems, One Health coordination, and laboratory systems strengthening.",
      "He has a proven track record of collaborating with FAO-ECTAD, government ministries, laboratories, and international partners. He demonstrates FAO's core competencies including Results Focus, Teamwork, Communication, Knowledge Sharing, Building Effective Relationships, and Innovation.",
      "He successfully leads AMR research, capacity building, diagnostic laboratory development, and policy contributions — supported by over 70 peer-reviewed publications."
    ],
  },
  {
    slug: "daniel-bwala",
    name: "Daniel Bwala",
    role: "Scientific Team Member",
    group: "Scientific Team",
    specialization: "Crop Production",
  },
  {
    slug: "adebayo-adeniyi",
    name: "Mr. Adebayo Kunle Adeniyi",
    role: "Scientific Team Member",
    group: "Scientific Team",
    specialization: "Animal Production",
    image: "/people/adebayo-adeniyi.jpg",
    imagePosition: "center 34%",
    roleAtCentre: "Researcher / Scientific Team Member",
    email: "kunlea@unijos.edu.ng",
    phone: "+2348039136703",
    googleScholar: "https://scholar.google.com/citations?hl=en&user=r4O6vkQAAAAJ",
    qualifications: ["B.Sc. Food Science and Technology", "M.Sc. Food Technology"],
    researchInterests: ["Food Biotechnology", "Fermentation", "Functional Food", "Food Safety"],
    profileSummary: [
      "Adeniyi Adebayo is a Food Scientist with expertise in Food Safety and Biotechnology. He holds a B.Sc. in Food Science and Technology from the University of Agriculture, Abeokuta, and an M.Sc. in Food Technology from the University of Ibadan.",
      "His research centers on microbial safety of animal-derived foods, bioactive compounds, fermentation processes, and sustainable strategies to improve food safety, quality, and nutrition. His work includes studies on microbial contamination in animal products, fermentation processes, detection of food contaminants, evaluation of alternative feed resources such as agro-processing by-products, and research on underutilized crops.",
      "He has contributed to several peer-reviewed publications in the areas of food biochemistry, food fermentation, food safety, and nutritional evaluation of unconventional feed materials. Apart from research and teaching, he plays an active academic leadership role as a level coordinator within the Faculty of Agriculture, supporting student development and curriculum delivery.",
      "He is a member of the Nigerian Society for Animal Production and has received recognition for scholarly contributions, including a Best Oral Presentation Award at the 50th Annual Conference of the Society."
    ],
  },
  {
    slug: "simi-chuktu",
    name: "Dr. Simi Sekyen Goyol",
    role: "Scientific Team Member",
    group: "Scientific Team",
    specialization: "Geography",
    image: "/people/simi-chuktu.jpg",
    imagePosition: "center 33%",
    roleAtCentre: "Safeguard Officer / Scientific Team Member",
    googleScholar: "https://scholar.google.com/citations?user=ZgBdShIAAAAJ&hl=en",
    email: "goyols@unijos.edu.ng",
    qualifications: ["PhD Disaster Management", "M.Sc. Environmental and Resources Planning", "B.Sc. Geography"],
    researchInterests: [
      "Disaster Management",
      "Climate Change",
      "Community Resilience",
      "Environmental Security",
      "Research Methodology",
    ],
    profileSummary: [
      "Dr. Simi Sekyen Goyol is a Nigerian academic, researcher, and development practitioner in the Department of Geography and Planning at the University of Jos, Nigeria, where she contributes to teaching, research, and community engagement within the Faculty of Environmental Sciences.",
      "Goyol has a PhD in Disaster Management from the University of Salford, United Kingdom (specializing in climate-related disasters and community resilience), a Master's Degree in Environmental and Resources Planning, and a Bachelor's Degree in Geography, both from the University of Jos.",
      "Her work focuses on the intersection of climate change, environmental management, and sustainable development. Her key research areas include climate change adaptation and resilience, disaster risk management, environmental and sustainable development planning, waste management and circular economy, eco-friendly infrastructure development, environmental education and awareness, food security, and agricultural resilience.",
      "Goyol has authored more than 20 academic publications contributing to peer-reviewed journals and collaborative research on environmental and development issues. Her work contributes to policy discussions on climate resilience, agricultural development, and infrastructure planning in developing countries.",
      "She participates in capacity-building programs for farmers and stakeholders through the Centre of Excellence in Food Security, engages in research dissemination and training on food security and data-driven decision making for agricultural development, contributes to environmental awareness initiatives and sustainability advocacy, and promotes climate-smart agriculture and community resilience in vulnerable rural communities."
    ],
  },
  {
    slug: "mohammed-yahaya",
    name: "Mr. Mohammed Musa Yahaya",
    role: "Scientific Team Member",
    group: "Scientific Team",
    specialization: "Animal Production",
    image: "/people/mohammed-yahaya.jpg",
    imagePosition: "center 35%",
    email: "yahayam@unijos.edu.ng",
    googleScholar: "https://scholar.google.com/citations?user=IOhf3psAAAAJ&hl=en",
    phone: "+2348144031535",
    qualifications: ["M.Sc. Fisheries and Aquaculture"],
    researchInterests: ["Fisheries and Aquaculture", "Aquatic Toxicology"],
    profileSummary: [
      "Musa Yahaya Mohammed is a dedicated academician and researcher born on May 25, 1991, in Potiskum, Yobe State, Nigeria. He attended Army Children Primary School Potiskum, Government Science and Technical College Potiskum, and Yobe State College of Agriculture Gujba, where he obtained National Diploma.",
      "He earned his Bachelor's degree in Agriculture from Kano University of Science and Technology Wudil. Musa furthered his education at the University of Jos and Federal University of Technology Minna, obtaining Masters degrees.",
      "Currently, he serves as a Lecturer II in the Department of Animal Production at the University of Jos, focusing on improving animal welfare and productivity. His research interests include aquatic animal welfare, environmental enrichment, and sustainable aquaculture practices."
    ],
  },
  {
    slug: "elijah-akintunde",
    name: "Dr. Elijah Akintunde",
    role: "Scientific Team Member",
    group: "Scientific Team",
    specialization: "Geography",
    image: "/people/elijah-akintunde.jpeg",
    roleAtCentre: "Scientific Team Member",
    googleScholar: "https://scholar.google.com/citations?hl=en&user=gW6u-5QAAAAJ",
    email: "akinyelea@unijos.edu.ng",
    phone: "+2348068241066",
    qualifications: ["PhD Environmental Management"],
    researchInterests: [
      "Environmental Management",
      "Waste Management",
      "Climate Action",
      "Early Warning Systems",
    ],
    profileSummary: [
      "Elijah Akintunde holds a joint PhD in Environmental Management from the University of Ibadan and Pan-African University of Life and Earth Sciences (PAULESI) of the African Union.",
      "An African Union Scholar, lecturing at the University of Jos, he has over 10 years of teaching and research experience. He specializes in environmental quality, waste management, land degradation, resource depletion, environmental education, and climate action.",
      "He has numerous local and international publications and has received continental and global recognition, including the 2023 James Kweku Global Mentorship Award."
    ],
  },
  {
    slug: "andrew-donye",
    name: "Prof. Andrew Oziel Donye",
    role: "Scientific Team Member",
    group: "Scientific Team",
    specialization: "Agricultural Economics & Extension",
    image: "/people/andrew-donye.png",
  },
  {
    slug: "sahmicit-kumswa",
    name: "Dr. Sahmicit Kankemwa Kumswa",
    role: "Scientific Team Member",
    group: "Scientific Team",
    specialization: "Sociology",
    image: "/people/sahmicit-kumswa.jpeg",
    roleAtCentre: "Researcher / Visiting Lecturer",
    email: "kumswas@unijos.edu.ng",
    googleScholar: "https://scholar.google.com/citations?user=Crm1FmQAAAAJ&hl=en",
    qualifications: ["PhD Sociology"],
    researchInterests: ["Sociology", "Demography", "Gender", "Qualitative Research Methodology"],
    profileSummary: [
      "Sahmicit Kankemwa Kumswa, PhD, is a distinguished Senior Lecturer and Researcher in the Department of Sociology at the University of Jos, Nigeria. With a career spanning nearly two decades, she currently serves as the Deputy Director of the Centre for Gender and Women's Studies and is a Visiting Lecturer/Researcher at the TETFUND Centre of Excellence on Food Security at the same institution.",
      "Dr. Kumswa holds a PhD in Sociology from the University of South Africa (UNISA) and completed a prestigious Post-Doctoral Research Fellowship at the University of the Western Cape under the Andrew Mellon Programme. Her academic expertise is specialized in the Sociology of the Family and Demography, with a prolific publication record focusing on commuter marriages, gender-based violence, and intergenerational support.",
      "Beyond the classroom, Dr. Kumswa is a sought-after consultant and researcher for international and national organizations, including working with partners at FCDO Nigeria, the World Bank, OSPRE, and the Plateau Peace Building Agency.",
      "Her recent work involves leading critical baseline assessments for the SPARC and SPRiNG projects, focusing on peace, resilience, and early warning systems in Plateau State, Nigeria. An active member of the International Sociological Association (ISA), she is dedicated to bridging the gap between academic research and community development through her leadership in various NGOs and advisory boards."
    ],
  },
];

export const supportTeam: TeamProfile[] = [
  {
    slug: "jimme-matyek",
    name: "Jimme Garba Matyek",
    role: "Communication & Documentation Officer",
    group: "Administrative & Support",
    specialization: "Mass Communication",
    image: "/people/jimme-matyek.png",
    roleAtCentre: "Communication and Documentation Officer",
    email: "matyekj@unijos.edu.ng",
    googleScholar: "https://scholar.google.com/citations?user=8Ld-8LwAAAAJ&hl=en",
    phone: "+2349097419923",
    qualifications: ["M.Sc. Mass Communication"],
    researchInterests: [
      "Science Communication",
      "Participatory Photography",
      "Agricultural Innovation Journalism",
      "Media and Information Literacy",
      "Participatory Culture",
    ],
    profileSummary: [
      "With an MSc in Mass Communication and PhD in view, Jimme G. Matyek graduated from the University of Jos, where he currently works in the Department of Mass Communication, Nigeria.",
      "He specializes in science communication, participatory photography, agricultural innovation journalism, media and information literacy, and participatory culture. His research examines how grassroots media fosters rural development, peacebuilding, and agricultural knowledge dissemination in Nigerian contexts like Plateau State.",
      "He has authored publications in national and international journals on media literacy, agricultural communication, science and technology, tech startups, health technology assessment, journalism, social media, and related fields."
    ],
  },
  {
    slug: "john-bawa",
    name: "John Bawa",
    role: "Data Analyst, IT Systems Specialist",
    group: "Administrative & Support",
    specialization: "Economics",
    image: "/people/john-bawa.jpg",
    roleAtCentre: "Data Analyst, IT Systems Specialist",
    email: "dauda.bawa@binghamuni.edu.ng",
    phone: "+2348138046523",
    qualifications: ["B.Sc. Economics", "Agricultural Economics"],
    researchInterests: [
      "Agricultural Economics",
      "Data Analytics",
      "Development Economics",
      "Food Security Analysis",
      "Econometric Modeling",
    ],
    profileSummary: [
      "John is an economist and data analyst with a strong interest in agricultural economics, food security, and data-driven policy research. He holds a B.Sc. in Economics from Bingham University, Nigeria, where he graduated with strong academic distinction.",
      "His work focuses on applying econometric methods and data analytics to understand economic dynamics in agriculture, development, and public policy. At the TETFund Centre of Excellence in Food Security (TCoEFS), University of Jos, he contributes to research and data analysis activities that support evidence-based decision making in food systems, agricultural markets, and rural development.",
      "His analytical work involves the use of statistical and econometric tools for economic modeling, policy evaluation, and impact analysis. His research interests include agricultural export performance, food systems transformation, climate-agriculture interactions, and development finance for agricultural growth in Africa.",
      "He has also been involved in data collection, market estimation studies, and applied economic analysis supporting field-based research projects. Bawa is passionate about leveraging data, research, and digital tools to address food security challenges and strengthen sustainable agricultural systems."
    ],
  },
  {
    slug: "muyiwa-adeboyi",
    name: "Muyiwa Ajiboye",
    role: "Solutions Engineer & Developer",
    group: "Developer",
    specialization: "Computer Science",
    image: "/people/muyiwa-adeboyi.png",
    imagePosition: "center 44%",
    roleAtCentre: "Developer of TCoEFS Website & Portal",
    email: "majiboye4@protonmail.com",
    qualifications: ["B.Sc. Computer Science"],
    researchInterests: ["Backend Architecture", "DevOps", "Solution Engineering", "System Design"],
    profileSummary: [
      "Muyiwa Ajiboye is a solutions engineer and developer who has architected and continues to build solutions for various businesses.",
      "He designed and developed the TCoEFS official website and the Centre's research portal, implementing digital tools that support institutional operations, research dissemination, and stakeholder engagement."
    ],
  },
];

export const leadershipProfiles = [
  director,
  ...deputies,
  ...scientificTeam,
  ...supportTeam,
];

export function getLeadershipProfile(slug: string) {
  return leadershipProfiles.find((profile) => profile.slug === slug);
}
