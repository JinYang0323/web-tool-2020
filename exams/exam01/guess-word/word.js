const validWords = [
    "TEA",
    "EAT",
    "TEE",
    "PEA",
    "PET",
    "APE",
    "ABC",
    "TRY",
    "CAT",
    "DOG",
    "GET",
    "CRY",
    "YES",
    "THE",
    "CSS",
    "ACE",
    "ACT",
    "APP",
    "NET",
    "ASK",
    "ART",
    "AGO",
    "VAR",
    "LET",
    "TWO",
    "TOY",
    "SIX",
    "TEN",
    "TOO",
    "USE",
    "TOP",
    "TIP",
    "WAR",
    "ZIP",
    "ZOO",
    "CPT",
    "OPT",
    "VIM",
    "VAN",
    "YAY",
    "SUN",
    "TAG",
    "TAB",
    "SON",
    "SUN",
    "MOM",
    "SKI",
    "SIR",
    "SHA",
    "SHE",
];

function generateSecret() {
    return validWords[Math.floor(Math.random() * validWords.length)];
}

module.exports = { validWords, generateSecret };
