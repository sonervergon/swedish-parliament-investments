const isSpecialCharacter = (char: string) => {
  return /[!@#$%^&*(),.?":{}|<>]/g.test(char);
};

// Remove AB, Ltd, AS, Oy, etc...
const removeCompanyAbbreviations = (investment: string) => {
  const abbreviations = [
    "AB",
    "Ltd",
    "AS",
    "Oy",
    "SE",
    "Inc",
    "LLC",
    "AG",
    "A/S",
    "GmbH",
    "Pref",
  ];

  let abbreviationFound = "";
  const nameWithoutAbbreviation = investment
    .split(" ")
    .filter((word) => {
      const isAbbreviation = abbreviations.includes(word);
      if (isAbbreviation) {
        abbreviationFound = word;
        return false;
      }
      return true;
    })
    .join(" ");

  return { abbreviation: abbreviationFound, name: nameWithoutAbbreviation };
};

export const getCompanyName = (
  investment: string
): {
  name: string;
  type: string;
} => {
  const formattedName = investment.trim();
  const { name, abbreviation } = removeCompanyAbbreviations(formattedName);
  return { name, type: abbreviation };
};
