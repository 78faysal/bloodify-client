
const useBlood = () => {
    const bloodOptions = [
        { value: "O+", label: "O+" },
        { value: "O-", label: "O-" },
        { value: "A+", label: "A+" },
        { value: "A-", label: "A-" },
        { value: "B+", label: "B+" },
        { value: "B-", label: "B-" },
        { value: "AB+", label: "AB+" },
        { value: "AB-", label: "AB-" },
      ];

    return {bloodOptions};
};

export default useBlood;