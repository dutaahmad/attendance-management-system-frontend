import { Button, Typography } from "@material-tailwind/react";

export const AddButton = ({ addButtonName, addDataPath }) => (
  <Button
    // className="w-full md:w-[12rem]"
    type="button"
    variant="gradient"
    size="lg"
    onClick={() => navigate.push(addDataPath)}
  >
    <Typography>{addButtonName}</Typography>
  </Button>
);
