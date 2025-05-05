export const getEquipmentTypesService = () => {
  return new Promise<{ label: string; value: string }[]>((resolve) => {
    setTimeout(() => {
      resolve([
        { label: "Ventilator", value: "ventilator" },
        { label: "Phototheraphy", value: "phototheraphy" },
        { label: "Dialyser", value: "dialyser" },
        { label: "NST", value: "nst" },
      ]);
    }, 1000);
  });
};
export const getEquipmentConditionsService = () => {
  return new Promise<{ label: string; value: string }[]>((resolve) => {
    setTimeout(() => {
      resolve([
        { label: "Good", value: "good" },
        { label: "UM", value: "underMaintanance" },
      ]);
    }, 1000);
  });
};
