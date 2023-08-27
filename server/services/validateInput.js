exports.validateInput = (...inputs) => {
  const missingFields = [];
  inputs.forEach((input, index) => {
    if (!input || input.trim() === "") {
      missingFields.push(`Field ${index + 1}`);
    }
  });
  return missingFields.length === 0 ? true : missingFields;
};
