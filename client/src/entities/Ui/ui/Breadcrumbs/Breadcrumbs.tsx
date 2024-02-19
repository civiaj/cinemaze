import { AddBreadcrumb } from "./AddBreadcrumb";
import { BreadcrumbsBody } from "./BreadcrumbsBody";

type Props = {
    label: string;
};

export const Breadcrumbs = (props: Props) => {
    const { label } = props;

    return (
        <AddBreadcrumb label={label}>
            <BreadcrumbsBody />
        </AddBreadcrumb>
    );
};
