import { routePath } from "app/router/router";
import { Page } from "entities/Ui";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Checked, Close } from "shared/assets/icons";
import { Box } from "shared/ui/Boxes/Box";
import { Button } from "shared/ui/Button/Button";
import { Text } from "shared/ui/Text/Text";

export const EmailIsVerified = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const isSuccess = searchParams.get("status") === "success";
    const isError = searchParams.get("status") === "error";

    if (!isError && !isSuccess) return <Navigate to={routePath.main} replace />;

    return (
        <Page>
            <Box className="items-center">
                {isSuccess && (
                    <div className="rounded-full bg-my-green-500 p-2">
                        <Checked className="text-3xl" />
                    </div>
                )}
                {isError && (
                    <div className="rounded-full bg-my-red-500 p-2">
                        <Close className="text-3xl" />
                    </div>
                )}

                <Text>
                    {isSuccess && "Электронный адрес почты подтвержден."}
                    {isError && "Невозможно верифицировать адрес электронной почты."}
                </Text>
                <Button theme="regular" onClick={() => navigate(routePath.main, { replace: true })}>
                    Перейти на главную
                </Button>
            </Box>
        </Page>
    );
};
