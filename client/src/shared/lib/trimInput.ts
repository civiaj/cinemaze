export const trimInput = (str: string, val: "password" | "name" = "name") => {
    switch (val) {
        case "password": {
            return str.replaceAll(" ", "");
        }
        case "name": {
            return str.replace(/\s+/g, " ").trim();
        }
        default: {
            return str;
        }
    }
};
