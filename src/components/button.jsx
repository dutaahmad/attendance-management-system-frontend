import { Button, Typography } from "@material-tailwind/react";

export const AddButton = ({ addButtonName, addDataPath, customStyle }) => (
  <Button
    className={`${customStyle}`}
    type="button"
    variant="gradient"
    size="lg"
    onClick={() => navigate.push(addDataPath)}
  >
    <Typography>{addButtonName}</Typography>
  </Button>
);
