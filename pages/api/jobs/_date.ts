

export function isFirstWeekDayNow(firstWeekDayNumber: number) {
  let now = new Date();
  let date = getDateOfFirst(firstWeekDayNumber);
  if (!date) {
    return false;
  }

  return  now.getFullYear() == date.getFullYear() && 
          now.getMonth() == date.getMonth() && 
          now.getDate() == date.getDate()

}

export function getDateOfFirst(firstWeekDayNeeded: number): Date|null {
  let now = new Date();
  let firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  let current = firstDay;

  while (current.getDate()<28) {
    if (current.getDay() == firstWeekDayNeeded)  {
      // found
      return current;
    }

    current.setDate(current.getDate()+1);
  }

  return null;
}

