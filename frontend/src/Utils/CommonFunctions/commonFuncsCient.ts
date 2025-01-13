export const DOBformator = (date: string, doNotReturnAge?: boolean) => {
  const today = new Date();
  const birthDate = new Date(date);

  // Get year, month, and day
  const year = birthDate.getFullYear();
  const month = birthDate.toLocaleString("default", { month: "long" });
  const day = birthDate.getDate();

  // Determine the correct suffix for the day (st, nd, rd, th)
  const getDaySuffix = (dayd: number) => {
    if (dayd > 3 && dayd < 21) return "th"; // covers 11th - 19th
    switch (dayd % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const dayWithSuffix = day + getDaySuffix(day);

  // Calculate age
  const age = today.getFullYear() - year;
  // const hasHadBirthdayThisYear =
  //   today.getMonth() > birthDate.getMonth() ||
  //   (today.getMonth() === birthDate.getMonth() &&
  //     today.getDate() >= birthDate.getDate());

  // if (!hasHadBirthdayThisYear) {
  //   age;
  // }

  // Return formatted string
  return `${month} ${dayWithSuffix} ${year} ${doNotReturnAge ? "" : `(${age} years old)`}`;
};
