export const inputStyles = {
  "& .MuiOutlinedInput-root": {
    borderColor: "white",
    color: "white",
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "white",
  },
  '.MuiOutlinedInput-root': {
    color: 'white',
  },
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
  },
  '.MuiSvgIcon-root': {
    color: 'white',
  },
};

export const selectStyles = {
  MenuProps: {
    PaperProps: {
      sx: {
        bgcolor: "rgb(55, 55, 55)",
        color: "white",
        width: "350px",
        "&::-webkit-scrollbar": {
          width: "0px",
          height: "0px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        boxShadow: "none",
        borderRadius: "0px",
      },
    },
  },
}