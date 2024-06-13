export type PrivacyItem = {
    title: string;
    isPrivacyItem: boolean;
    to: string;
};

export type PrivacyItemComponent = {
    isPrivacyItem: PrivacyItem["isPrivacyItem"];
};
