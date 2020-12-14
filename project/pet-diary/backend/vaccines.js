const vaccineList = {
    "Bordetella Bronchiseptica": {
        info:
            "This highly infectious bacterium causes severe fits of coughing, whooping, vomiting, and, in rare cases, seizures and death. It is the primary cause of kennel cough. There are injectable and nasal spray vaccines available.\nIf you plan on boarding your puppy in the future, attending group training classes, or using dog daycare services, often proof of this vaccination will be a requirement.",
    },
    "Canine Distemper": {
        info:
            "A severe and contagious disease caused by a virus that attacks the respiratory, gastrointestinal (GI), and nervous systems of dogs, raccoons, skunks, and other animals, distemper spreads through airborne exposure (through sneezing or coughing) from an infected animal. The virus can also be transmitted by shared food and water bowls and equipment. It causes discharges from the eyes and nose, fever, coughing, vomiting, diarrhea, seizures, twitching, paralysis, and, often, death. This disease used to be known as “hard pad” because it causes the footpad to thicken and harden.\nThere is no cure for distemper. Treatment consists of supportive care and efforts to prevent secondary infections, control symptoms of vomiting, seizures and more. If the animal survives the symptoms, it is hoped that the dog’s immune system will have a chance to fight it off. Infected dogs can shed the virus for months.",
    },
    "Canine Hepatitis": {
        info:
            "Infectious canine hepatitis is a highly contagious viral infection that affects the liver, kidneys, spleen, lungs, and the eyes of the affected dog. This disease of the liver is caused by a virus that is unrelated to the human form of hepatitis. Symptoms range from a slight fever and congestion of the mucous membranes to vomiting, jaundice, stomach enlargement, and pain around the liver. Many dogs can overcome the mild form of the disease, but the severe form can kill. There is no cure, but doctors can treat the symptoms.",
    },
    "Canine Parainfluenza": {
        info: "One of several viruses that can contribute to kennel cough.",
    },
    Coronavirus: {
        info:
            "The canine coronavirus is not the same virus that causes COVID-19 in people. COVID-19 is not thought to be a health threat to dogs, and there is no evidence it makes dogs sick. Canine coronavirus usually affects dogs’ gastrointestinal systems, though it can also cause respiratory infections. Signs include most GI symptoms, including loss of appetite, vomiting, and diarrhea. Doctors can keep a dog hydrated, warm, and comfortable, and help alleviate nausea, but no drug kills coronaviruses.",
    },
    Heartworm: {
        info:
            "When your puppy is around 12-to-16 weeks, talk to your vet about starting a heartworm preventive. Though there is no vaccine for this condition, it is preventable with regular medication that your veterinarian will prescribe.\nThe name is descriptive — these worms lodge in the right side of the heart and the pulmonary arteries (that send blood to the lungs), though they can travel through the rest of the body and sometimes invade the liver and kidneys. The worms can grow to 14 inches long and, if clumped together, block and injure organs.\nA new heartworm infection often causes no symptoms, though dogs in later stages of the disease may cough, become lethargic, lose their appetite or have difficulty breathing. Infected dogs may tire after mild exercise. Unlike most of the conditions listed here, which are passed by urine, feces, and other body fluids, heartworms are transmitted by mosquitoes. Therefore, diagnosis is made via a blood test and not a fecal exam.",
    },
    "Kennel Cough": {
        info:
            "Also known as infectious tracheobronchitis, kennel cough results from inflammation of the upper airways. It can be caused by bacterial, viral, or other infections, such as Bordetella and canine parainfluenza, and often involves multiple infections simultaneously. Usually, the disease is mild, causing bouts of harsh, dry coughing; sometimes it’s severe enough to spur retching and gagging, along with a loss of appetite. In rare cases, it can be deadly. It is easily spread between dogs kept close together, which is why it passes quickly through kennels. Antibiotics are usually not necessary, except in severe, chronic cases. Cough suppressants can make a dog more comfortable.",
    },
    Leptospirosis: {
        info:
            "Unlike most diseases on this list, Leptospirosis is caused by bacteria, and some dogs may show no symptoms at all. Leptospirosis can be found worldwide in soil and water. It is a zoonotic disease, meaning that it can be spread from animals to people. When symptoms do appear, they can include fever, vomiting, abdominal pain, diarrhea, loss of appetite, severe weakness and lethargy, stiffness, jaundice, muscle pain, infertility, kidney failure (with or without liver failure). Antibiotics are effective, and the sooner they are given, the better.",
    },
    "Lyme Disease": {
        info:
            "Unlike the famous “bull’s-eye” rash that people exposed to Lyme disease often spot, no such telltale symptom occurs in dogs. Lyme disease (or borreliosis) is an infectious, tick-borne disease caused by a type of bacteria called a spirochete. Transmitted via ticks, an infected dog often starts limping, his lymph nodes swell, his temperature rises, and he stops eating. The disease can affect his heart, kidney, and joints, among other things, or lead to neurological disorders if left untreated. If diagnosed quickly, a course of antibiotics is extremely helpful, though relapses can occur months or even years later.",
    },
    Parvovirus: {
        info:
            "Parvo is a highly contagious virus that affects all dogs, but unvaccinated dogs and puppies less than four months of age are at the most risk to contract it. The virus attacks the gastrointestinal system and creates a loss of appetite, vomiting, fever, and often severe, bloody diarrhea. Extreme dehydration can come on rapidly and kill a dog within 48-to-72 hours, so prompt veterinary attention is crucial. There is no cure, so keeping the dog hydrated and controlling the secondary symptoms can keep him going until his immune system beats the illness.",
    },
    Rabies: {
        info:
            "Rabies is a viral disease of mammals that invades the central nervous system, causing headache, anxiety, hallucinations, excessive drooling, fear of water, paralysis, and death. It is most often transmitted through the bite of a rabid animal. Treatment within hours of infection is essential, otherwise, death is highly likely. Most states require a rabies vaccination. Check with your vet about rabies vaccination laws in your area.",
    },
};

const vaccineSchedule = [
    {
        "Puppy’s Age": "6 — 8 weeks",
        "Recommended Vaccinations": "Distemper, parvovirus",
        "Optional Vaccinations": "Bordetella",
    },
    {
        "Puppy’s Age": "10 — 12 weeks",
        "Recommended Vaccinations":
            "DHPP (vaccines for distemper, adenovirus [hepatitis], parainfluenza, and parvovirus)",
        "Optional Vaccinations":
            "Influenza, Leptospirosis, Bordetella, Lyme disease per lifestyle as recommended by veterinarian",
    },
    {
        "Puppy’s Age": "16 — 18 weeks",
        "Recommended Vaccinations": "DHPP, rabies",
        "Optional Vaccinations":
            "Influenza, Lyme disease, Leptospirosis, Bordetella per lifestyle",
    },
    {
        "Puppy’s Age": "12 — 16 months",
        "Recommended Vaccinations": "DHPP, rabies",
        "Optional Vaccinations":
            "Coronavirus, Leptospirosis, Bordetella, Lyme disease",
    },
    {
        "Puppy’s Age": "Every 1 — 2 years",
        "Recommended Vaccinations": "DHPP",
        "Optional Vaccinations":
            "Influenza, Coronavirus, Leptospirosis, Bordetella, Lyme disease per lifestyle",
    },
    {
        "Puppy’s Age": "Every 1 — 3 years",
        "Recommended Vaccinations": "Rabies (as required by law)",
        "Optional Vaccinations": "",
    },
];

const getVaccineInfo = () => {
    return { vaccineList, vaccineSchedule };
};

module.exports = {
    getVaccineInfo,
};
