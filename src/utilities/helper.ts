export const updateState = (
    key: string,
    value: any,
    setForm: any,
    updateError?: React.Dispatch<React.SetStateAction<any>> | null
  ) => {
    setForm((prev: any) => {
      return { ...prev, [key]: value };
    });
    if (updateError) {
      updateError((prev: any) => {
        return { ...prev, [key]: "" };
      });
    }
  };

  export const FormatDate = (date: string) => {
    const _date = new Date(date);
    return _date.toLocaleDateString("En-Us", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  