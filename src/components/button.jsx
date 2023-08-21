import { Button, Typography } from "@material-tailwind/react";

export const AddButton = ({ addButtonName, navigator, customStyle }) => (
  <Button
    className={`${customStyle}`}
    type="button"
    variant="gradient"
    size="lg"
    onClick={navigator}
  >
    <Typography>{addButtonName}</Typography>
  </Button>
);
