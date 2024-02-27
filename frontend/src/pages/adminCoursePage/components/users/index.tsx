import { Box, Container, Stack, Typography } from "@mui/material";
import UserSearch from "./UserSearch";
import { UserTable } from "./UserTable";
export const AdminUserPage = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction="row"
          mb={2}
          justifyContent="space-between"
          spacing={4}
        >
          <Stack spacing={1}>
            <Typography variant="h5">Quản lý người dùng</Typography>
          </Stack>
        </Stack>
        <UserSearch />
        <UserTable />
      </Container>
    </Box>
  );
};
