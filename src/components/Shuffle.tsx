export const Shuffle = (array: number[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const b = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[b]] = [newArray[b], newArray[i]];
    }
    return newArray;
  };