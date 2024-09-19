const getCurrentDateTime = () => {
    const currentDateTime = new Date();

    currentDateTime.setHours(currentDateTime.getHours() + 1);

    const year = currentDateTime.getFullYear();
    const month = String(currentDateTime.getMonth() + 1).padStart(2, "0");
    const day = String(currentDateTime.getDate()).padStart(2, "0");
    const hours = String(currentDateTime.getHours()).padStart(2, "0");
    const minutes = String(currentDateTime.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export default getCurrentDateTime;
