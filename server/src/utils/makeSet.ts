export default (payload: { [key: string]: string | number | boolean | null }) => {
    return Object.keys(payload).reduce(
        (acc: { [key: string]: string | number | boolean | null }, key) => {
            if (key in payload) {
                acc[`favorites.$.${key}`] = payload[key as keyof typeof payload]!;
            }
            return acc;
        },
        {}
    );
};
