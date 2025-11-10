import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 3,
      }}
    >
      <Button
        variant="outlined"
        startIcon={<ChevronLeftIcon />}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>

      <Typography variant="body2" color="text.secondary">
        Page {currentPage} / {totalPages}
      </Typography>

      <Button
        variant="outlined"
        endIcon={<ChevronRightIcon />}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
